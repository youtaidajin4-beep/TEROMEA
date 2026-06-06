export type HealthCheckFieldId =
  | "petName"
  | "species"
  | "age"
  | "bodyType"
  | "appetite"
  | "energy"
  | "stool"
  | "exercise"
  | "medicalConcern"
  | "ownerConcern"
  | "telomereInterest";

export type QuestionCategory = "基本情報" | "体の様子" | "生活習慣" | "気になること";

export type ChoiceOption = {
  value: string;
  label: string;
  icon?: string;
};

type QuestionBase = {
  category: QuestionCategory;
  hint?: string;
};

export type HealthCheckQuestion =
  | (QuestionBase & {
      id: "petName";
      type: "text";
      label: string;
      placeholder: string;
      required: true;
    })
  | (QuestionBase & {
      id: "age";
      type: "number";
      label: string;
      min: number;
      max: number;
      required: true;
    })
  | (QuestionBase & {
      id: Exclude<HealthCheckFieldId, "petName" | "age">;
      type: "choice";
      label: string;
      options: ChoiceOption[];
      required: true;
    });

export const healthCheckQuestions: HealthCheckQuestion[] = [
  {
    id: "petName",
    type: "text",
    category: "基本情報",
    label: "うちの子の名前を教えてください",
    placeholder: "例: むぎちゃん",
    required: true
  },
  {
    id: "species",
    type: "choice",
    category: "基本情報",
    label: "種類を選んでください",
    options: [
      { value: "dog", label: "犬", icon: "🐕" },
      { value: "cat", label: "猫", icon: "🐈" }
    ],
    required: true
  },
  {
    id: "age",
    type: "number",
    category: "基本情報",
    label: "年齢を選んでください",
    hint: "ライフステージの目安としてお使いください",
    min: 0,
    max: 20,
    required: true
  },
  {
    id: "bodyType",
    type: "choice",
    category: "体の様子",
    label: "体型はどれに近いですか？",
    options: [
      { value: "thin", label: "やせ気味" },
      { value: "normal", label: "ちょうどよい" },
      { value: "slightly_overweight", label: "少し太り気味" },
      { value: "overweight", label: "太り気味" }
    ],
    required: true
  },
  {
    id: "appetite",
    type: "choice",
    category: "体の様子",
    label: "最近の食欲はいかがですか？",
    options: [
      { value: "good", label: "よく食べる" },
      { value: "normal", label: "いつも通り" },
      { value: "slightly_low", label: "少し少ない" },
      { value: "very_low", label: "かなり少ない" }
    ],
    required: true
  },
  {
    id: "energy",
    type: "choice",
    category: "体の様子",
    label: "最近の元気度はいかがですか？",
    options: [
      { value: "very_active", label: "とても元気" },
      { value: "normal", label: "いつも通り" },
      { value: "slightly_low", label: "少し元気がない" },
      { value: "very_low", label: "かなり元気がない" }
    ],
    required: true
  },
  {
    id: "stool",
    type: "choice",
    category: "体の様子",
    label: "便の状態はいかがですか？",
    options: [
      { value: "good", label: "良い" },
      { value: "slightly_loose", label: "少しゆるい" },
      { value: "constipated", label: "便秘気味" },
      { value: "concerning", label: "気になる状態がある" }
    ],
    required: true
  },
  {
    id: "exercise",
    type: "choice",
    category: "生活習慣",
    label: "運動・散歩量はいかがですか？",
    options: [
      { value: "enough", label: "十分できている" },
      { value: "normal", label: "普通" },
      { value: "low", label: "少なめ" },
      { value: "very_low", label: "ほとんどできていない" }
    ],
    required: true
  },
  {
    id: "medicalConcern",
    type: "choice",
    category: "気になること",
    label: "通院中の病気や気になる症状はありますか？",
    options: [
      { value: "none", label: "特になし" },
      { value: "slight", label: "少し気になることがある" },
      { value: "treatment", label: "現在通院中" },
      { value: "serious", label: "かなり心配なことがある" }
    ],
    required: true
  },
  {
    id: "ownerConcern",
    type: "choice",
    category: "気になること",
    label: "飼い主さんが一番気になっていることは？",
    options: [
      { value: "aging", label: "年齢による変化" },
      { value: "diet", label: "食事" },
      { value: "weight", label: "体重" },
      { value: "exercise", label: "運動不足" },
      { value: "digestion", label: "便やお腹の調子" },
      { value: "early_detection", label: "病気の早期発見" },
      { value: "longevity", label: "長生き・健康寿命" },
      { value: "other", label: "その他" }
    ],
    required: true
  },
  {
    id: "telomereInterest",
    type: "choice",
    category: "気になること",
    label: "テロメア健康年齢チェックへの興味は？",
    options: [
      { value: "high", label: "かなり興味がある" },
      { value: "price_dependent", label: "価格次第で検討したい" },
      { value: "learn_more", label: "もう少し詳しく知りたい" },
      { value: "not_now", label: "今は必要ない" }
    ],
    required: true
  }
];

export const TOTAL_HEALTH_CHECK_STEPS = healthCheckQuestions.length;

/** ペット名を含めたパーソナライズ見出し */
export function getPersonalizedLabel(question: HealthCheckQuestion, petName?: string): string {
  if (!petName || question.id === "petName") return question.label;

  const personalizedPrefixes: Partial<Record<HealthCheckFieldId, string>> = {
    species: "の種類は？",
    age: "の年齢は？",
    bodyType: "の体型は？",
    appetite: "の最近の食欲は？",
    energy: "の最近の元気度は？",
    stool: "の便の状態は？",
    exercise: "の運動・散歩量は？",
    medicalConcern: "について、気になることは？",
    ownerConcern: "について、いちばん気になることは？",
    telomereInterest: "について、健康年齢チェックへの興味は？"
  };

  const suffix = personalizedPrefixes[question.id];
  if (suffix) return `${petName}ちゃん${suffix}`;

  return question.label;
}
