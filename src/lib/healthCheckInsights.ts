import type { HealthCheckInput } from "./healthCheck";

export type LifeStageKey = "puppyKitten" | "young" | "adult" | "senior";
export type FocusAreaKey = "vitality" | "body" | "digestion" | "concern";

export type HealthCheckInsight = {
  lifeStage: { label: string; description: string };
  hero: { headline: string; body: string };
  focusArea: { title: string; insight: string; whyNow: string };
  patternNote: { title: string; body: string } | null;
  thisWeekAction: string;
};

type FocusAreaContent = {
  title: string;
  insight: string;
  whyNow: string;
  thisWeekAction: string;
};

type PatternMatch = {
  priority: number;
  match: (input: HealthCheckInput) => boolean;
  title: string;
  body: string;
};

function isSenior(age: number) {
  return age >= 11;
}

function isYoung(age: number) {
  return age >= 2 && age <= 6;
}

function isLowAppetite(appetite: HealthCheckInput["appetite"]) {
  return appetite === "slightly_low" || appetite === "very_low";
}

function isLowEnergy(energy: HealthCheckInput["energy"]) {
  return energy === "slightly_low" || energy === "very_low";
}

function isOverweight(bodyType: HealthCheckInput["bodyType"]) {
  return bodyType === "slightly_overweight" || bodyType === "overweight";
}

function isLowExercise(exercise: HealthCheckInput["exercise"]) {
  return exercise === "low" || exercise === "very_low";
}

/** ライフステージ判定 */
export function getLifeStage(age: number): LifeStageKey {
  if (age <= 1) return "puppyKitten";
  if (age <= 6) return "young";
  if (age <= 10) return "adult";
  return "senior";
}

export function getLifeStageInfo(input: HealthCheckInput) {
  const stage = getLifeStage(input.age);
  const speciesLabel = input.species === "dog" ? "犬" : "猫";

  const labels: Record<LifeStageKey, string> = {
    puppyKitten: "はじめの1年",
    young: "成長・安定期",
    adult: "変化が出やすい時期",
    senior: "シニア期"
  };

  const descriptions: Record<LifeStageKey, Record<"dog" | "cat", string>> = {
    puppyKitten: {
      dog: "体と習慣の土台ができていく大切な時期です。",
      cat: "体と生活リズムの土台ができていく大切な時期です。"
    },
    young: {
      dog: "活動量と食事のバランスが、これからの体づくりにつながりやすい時期です。",
      cat: "遊びと食事のリズムが、これからの体づくりにつながりやすい時期です。"
    },
    adult: {
      dog: "見た目は元気でも、小さな変化が出始めやすい時期です。",
      cat: "落ち着いて見えても、小さな変化が出始めやすい時期です。"
    },
    senior: {
      dog: "食事・運動・睡眠の変化を、やさしく見守る時期に入ります。",
      cat: "食事・トイレ・休息の変化を、やさしく見守る時期に入ります。"
    }
  };

  return {
    label: labels[stage],
    description: `${speciesLabel}の${labels[stage]}。${descriptions[stage][input.species]}`
  };
}

function scoreVitality(input: HealthCheckInput): number {
  let score = 0;
  if (isLowAppetite(input.appetite)) score += input.appetite === "very_low" ? 18 : 10;
  if (isLowEnergy(input.energy)) score += input.energy === "very_low" ? 20 : 12;
  if (isLowAppetite(input.appetite) && isLowEnergy(input.energy)) score += 8;
  return score;
}

function scoreBody(input: HealthCheckInput): number {
  let score = 0;
  if (input.bodyType === "overweight") score += 14;
  else if (input.bodyType === "slightly_overweight") score += 9;
  else if (input.bodyType === "thin") score += 6;
  if (isLowExercise(input.exercise)) score += input.exercise === "very_low" ? 12 : 7;
  if (isOverweight(input.bodyType) && isLowExercise(input.exercise)) score += 8;
  if (input.age >= 7 && isOverweight(input.bodyType)) score += 6;
  return score;
}

function scoreDigestion(input: HealthCheckInput): number {
  let score = 0;
  if (input.stool === "concerning") score += 18;
  else if (input.stool === "slightly_loose" || input.stool === "constipated") score += 10;
  if (input.stool !== "good" && isLowAppetite(input.appetite)) score += 6;
  if (isSenior(input.age) && input.stool !== "good") score += 5;
  return score;
}

function scoreConcern(input: HealthCheckInput): number {
  let score = 0;
  if (input.medicalConcern === "serious") score += 22;
  else if (input.medicalConcern === "treatment") score += 14;
  else if (input.medicalConcern === "slight") score += 8;

  const ownerWeights: Record<HealthCheckInput["ownerConcern"], number> = {
    early_detection: 6,
    aging: 5,
    digestion: 5,
    longevity: 4,
    weight: 4,
    diet: 3,
    exercise: 3,
    other: 2
  };
  score += ownerWeights[input.ownerConcern];
  return score;
}

const focusAreaContent: Record<FocusAreaKey, FocusAreaContent> = {
  vitality: {
    title: "元気と食欲のリズム",
    insight:
      "食べる量と元気度は、体のコンディションを映しやすいサインです。どちらかだけの変化より、同時に変わるときは見守りを少し厚くする目安になります。",
    whyNow: "いまの入力では、体のリズムの変化に気づくことが先になりそうです。",
    thisWeekAction: "今週は、食事の量・回数と元気度を“同じ時間帯”にメモしてみる"
  },
  body: {
    title: "体づくりと動きのバランス",
    insight:
      "体型と運動量は、将来の関節や代謝の負担にもつながりやすい要素です。いきなり負荷を増やすより、食事と動きの“質”を整える方が続けやすいことが多いです。",
    whyNow: "いまの入力では、体の負担をやさしく整えるタイミングかもしれません。",
    thisWeekAction: "今週は、同じタイミングで体重を1回だけ記録してみる"
  },
  digestion: {
    title: "お腹のリズム",
    insight:
      "便の状態は、食事や体のリズムの変化をいち早く教えてくれるサインになりやすいです。色・固さ・回数の変化を見ると、相談の目安を作りやすくなります。",
    whyNow: "いまの入力では、お腹まわりの変化を意識して見守る時期です。",
    thisWeekAction: "今週は、便の状態を“色・固さ・回数”の3つだけメモしてみる"
  },
  concern: {
    title: "いまの不安と変化",
    insight:
      "気になる症状や通院中の変化は、飼い主さんの不安とセットで見ることが大切です。いつもとの違いを短く記録しておくと、相談のきっかけになります。",
    whyNow: "いまの入力では、変化の記録がケアの中心になりそうです。",
    thisWeekAction: "今週は、気になる変化を“いつから・どんな時”の2行だけメモしてみる"
  }
};

/** フォーカスエリアを優先度スコアで1つ選ぶ */
export function getFocusArea(input: HealthCheckInput): { key: FocusAreaKey } & FocusAreaContent {
  const scores: Record<FocusAreaKey, number> = {
    vitality: scoreVitality(input),
    body: scoreBody(input),
    digestion: scoreDigestion(input),
    concern: scoreConcern(input)
  };

  const sorted = (Object.entries(scores) as [FocusAreaKey, number][]).sort((a, b) => b[1] - a[1]);
  const key = sorted[0][1] > 0 ? sorted[0][0] : "vitality";

  return { key, ...focusAreaContent[key] };
}

const patternMatchers: PatternMatch[] = [
  {
    priority: 100,
    match: (input) => isLowAppetite(input.appetite) && isLowEnergy(input.energy),
    title: "食欲と元気が同時に下がるとき",
    body: "食べる量と元気度が同時に下がるときは、体の中の変化のサインとして見守りを厚くする目安になります。数日単位で変化をメモしておくと、相談の参考になります。"
  },
  {
    priority: 95,
    match: (input) => input.appetite === "normal" && isLowEnergy(input.energy),
    title: "食事は変わらないのに元気が落ちるとき",
    body: "食事はいつも通りなのに元気が落ちる日が続くときは、見た目では分かりにくい変化のサインになることがあります。活動量や睡眠の様子も一緒に見てみましょう。"
  },
  {
    priority: 90,
    match: (input) => isSenior(input.age) && isOverweight(input.bodyType) && isLowExercise(input.exercise),
    title: "シニア期の体型と運動のバランス",
    body: "関節への負担が増えやすい時期です。いきなり運動量を増やすより、食事量と散歩の“質”を整える方が続けやすいことが多いです。"
  },
  {
    priority: 88,
    match: (input) => input.species === "cat" && isSenior(input.age) && input.stool === "slightly_loose",
    title: "猫のシニア期と便の変化",
    body: "猫のシニア期は、便の状態の変化が体のリズムの変化とつながりやすい時期です。食事の量や水分の取り方も一緒に見守ってみましょう。"
  },
  {
    priority: 85,
    match: (input) => input.species === "dog" && isYoung(input.age) && isOverweight(input.bodyType),
    title: "成長期の体型は“これからの体づくり”の参考に",
    body: "成長期の体重は、将来の関節や代謝に影響しやすい時期です。今の体型は、これからの体づくりを考えるきっかけになります。"
  },
  {
    priority: 82,
    match: (input) =>
      (input.medicalConcern === "treatment" || input.medicalConcern === "serious") && isLowEnergy(input.energy),
    title: "通院中は元気の波が出やすい",
    body: "治療中は、薬や体調の影響で元気の波が出やすい時期です。いつもとの違いをメモしておくと、動物病院への相談の参考になります。"
  },
  {
    priority: 78,
    match: (input) => input.stool !== "good" && isLowAppetite(input.appetite),
    title: "お腹のリズムと食欲のつながり",
    body: "便の状態と食欲が同時に変わるときは、体のリズムの変化を示すサインになることがあります。食後の様子も含めて、短く記録してみましょう。"
  },
  {
    priority: 75,
    match: (input) => input.bodyType === "thin" && isLowAppetite(input.appetite),
    title: "やせ気味と食欲の変化",
    body: "やせ気味で食欲も落ちているときは、体のエネルギーバランスの変化を意識して見守る目安になります。体重の変化も一緒に記録してみましょう。"
  },
  {
    priority: 70,
    match: (input) => isLowExercise(input.exercise) && input.ownerConcern === "exercise",
    title: "運動不足への意識と、無理のない一歩",
    body: "運動不足が気になっているときは、いきなり時間を増やすより、短い散歩や遊びを“毎日同じ時間”に入れる方が続けやすいです。"
  }
];

/** 組み合わせパターンから最優先の1件を返す */
export function getPatternNote(input: HealthCheckInput): { title: string; body: string } | null {
  const matched = patternMatchers
    .filter((pattern) => pattern.match(input))
    .sort((a, b) => b.priority - a.priority);

  if (matched.length === 0) return null;

  return { title: matched[0].title, body: matched[0].body };
}

const focusHeadlineByKey: Record<FocusAreaKey, string> = {
  vitality: "元気と食欲の変化",
  body: "体づくりと動きのバランス",
  digestion: "お腹のリズム",
  concern: "いまの変化と不安"
};

/** ヒーローインサイト（2〜3文のナラティブ） */
export function generateHeroInsight(
  input: HealthCheckInput,
  score: number,
  lifeStage: { label: string },
  focusKey: FocusAreaKey
): { headline: string; body: string } {
  const name = input.petName;
  const focusPhrase = focusHeadlineByKey[focusKey];

  let tone: string;
  if (score >= 85) {
    tone = "いまの生活リズムを大切にしながら、小さな変化に気づく見守りを続けていきたいタイミング";
  } else if (score >= 70) {
    tone = "日々のケアを少しずつ整えながら、変化に早く気づく見守りを始めたいタイミング";
  } else if (score >= 55) {
    tone = `特に「${focusPhrase}」を意識して見守るタイミング`;
  } else {
    tone = `「${focusPhrase}」を中心に、変化を記録しながら見守るタイミング`;
  }

  const stagePhrase: Record<LifeStageKey, string> = {
    puppyKitten: `${name}ちゃんは、体と習慣の土台づくりが大切な時期です。`,
    young: `${name}ちゃんは、活動と食事のバランスがこれからの体づくりにつながる時期です。`,
    adult: `${name}ちゃんは、見た目は元気でも小さな変化が出始めやすい時期です。`,
    senior: `${name}ちゃんは、${lifeStage.label}に入り、日々の変化をやさしく見守る時期です。`
  };

  const headline = `${name}ちゃんの、いまの見守りのヒント`;

  const body = [
    stagePhrase[getLifeStage(input.age)],
    `今回のチェックからは、${tone}かもしれません。`,
    "毎日の小さな変化を記録することが、これからのケアの土台になります。"
  ].join("");

  return { headline, body };
}

/** インサイト一式を生成 */
export function generateHealthCheckInsight(input: HealthCheckInput, score: number): HealthCheckInsight {
  const lifeStage = getLifeStageInfo(input);
  const focus = getFocusArea(input);
  const patternNote = getPatternNote(input);
  const hero = generateHeroInsight(input, score, lifeStage, focus.key);

  return {
    lifeStage,
    hero,
    focusArea: {
      title: focus.title,
      insight: focus.insight,
      whyNow: focus.whyNow
    },
    patternNote,
    thisWeekAction: focus.thisWeekAction
  };
}
