export type RiskLevel = "low" | "middle" | "high";
export type PetType = "dog" | "cat";

export type Pet = {
  id: string;
  name: string;
  type: PetType;
  breed: string;
  age: number;
  gender: string;
  ownerName: string;
  telomereScore: number;
  biologicalAge: number;
  riskLevel: RiskLevel;
  weight: number;
  latestCondition: string;
  recommendedAction: string;
  insurancePlan: string;
  lastCheckupDate: string;
  nextCheckupDate: string;
  sameAgeAverageScore: number;
  trend: "improving" | "stable" | "watch";
  careStreak: number;
  todayTasks: string[];
  watchSigns: string[];
  lastLogSummary: string;
  claimRiskScore: number;
  interventionPriority: "urgent" | "high" | "standard" | "monitor";
  estimatedClaimReduction: number;
  recentHospitalVisits: number;
  segment: "young" | "adult" | "senior";
};

export type DailyLog = {
  date: string;
  petId: string;
  walkMinutes: number;
  mealQuality: string;
  weight: number;
  energyLevel: string;
  stoolCondition: string;
  hospitalVisit: boolean;
  memo: string;
};

export type AdviceSet = {
  meal: string;
  exercise: string;
  hospital: string;
  nextTest: string;
};

export const pets: Pet[] = [
  {
    id: "mugi",
    name: "むぎ",
    type: "dog",
    breed: "柴犬",
    age: 6,
    gender: "女の子",
    ownerName: "佐藤 花",
    telomereScore: 82,
    biologicalAge: 5.1,
    riskLevel: "low",
    weight: 9.8,
    latestCondition: "食欲も元気も安定。散歩後の回復も良好です。",
    recommendedAction: "朝の散歩を10分だけ長めにして、筋力維持を続けましょう。",
    insurancePlan: "予防ケアプラン Plus",
    lastCheckupDate: "2026-04-18",
    nextCheckupDate: "2026-10-18",
    sameAgeAverageScore: 74,
    trend: "improving",
    careStreak: 12,
    todayTasks: ["朝の散歩を10分長めにする", "水分をいつもより少し意識する", "夜に体重を記録する"],
    watchSigns: ["暑い時間帯の息切れ", "食欲の急な変化", "便の状態が2日続けて変わる"],
    lastLogSummary: "散歩45分、食事良好。元気度は安定しています。",
    claimRiskScore: 28,
    interventionPriority: "monitor",
    estimatedClaimReduction: 420000,
    recentHospitalVisits: 0,
    segment: "adult"
  },
  {
    id: "sora",
    name: "そら",
    type: "cat",
    breed: "アメリカンショートヘア",
    age: 8,
    gender: "男の子",
    ownerName: "田中 健",
    telomereScore: 68,
    biologicalAge: 8.9,
    riskLevel: "middle",
    weight: 5.4,
    latestCondition: "少し運動量が減り、体重が増えやすい傾向です。",
    recommendedAction: "遊びの時間を1日2回に分け、食事量をゆるやかに見直しましょう。",
    insurancePlan: "スタンダード予防プラン",
    lastCheckupDate: "2026-03-22",
    nextCheckupDate: "2026-09-22",
    sameAgeAverageScore: 70,
    trend: "watch",
    careStreak: 5,
    todayTasks: ["夜の遊びを10分追加する", "間食の量をメモする", "水飲み場を1つ増やす"],
    watchSigns: ["水を飲む量の変化", "トイレ回数の変化", "食欲が落ちる日が続く"],
    lastLogSummary: "活動量が少なめ。体重と水分摂取を見守りたい状態です。",
    claimRiskScore: 56,
    interventionPriority: "high",
    estimatedClaimReduction: 760000,
    recentHospitalVisits: 0,
    segment: "adult"
  },
  {
    id: "luna",
    name: "ルナ",
    type: "dog",
    breed: "トイプードル",
    age: 4,
    gender: "女の子",
    ownerName: "山口 美咲",
    telomereScore: 77,
    biologicalAge: 3.8,
    riskLevel: "low",
    weight: 4.1,
    latestCondition: "睡眠時間が安定し、活動量も良い状態です。",
    recommendedAction: "今の食事リズムを維持しながら、週末に軽い長めの散歩を入れましょう。",
    insurancePlan: "ライト予防プラン",
    lastCheckupDate: "2026-05-02",
    nextCheckupDate: "2026-11-02",
    sameAgeAverageScore: 72,
    trend: "stable",
    careStreak: 18,
    todayTasks: ["いつもの散歩コースを歩く", "食事の切り替えはゆっくり行う", "睡眠時間をメモする"],
    watchSigns: ["小型犬らしい急な食欲低下", "震えや落ち着きのなさ", "散歩を嫌がる変化"],
    lastLogSummary: "運動量、食事、便の状態がそろって良好です。",
    claimRiskScore: 34,
    interventionPriority: "standard",
    estimatedClaimReduction: 510000,
    recentHospitalVisits: 0,
    segment: "young"
  },
  {
    id: "leo",
    name: "レオ",
    type: "cat",
    breed: "ミックス",
    age: 11,
    gender: "男の子",
    ownerName: "小林 誠",
    telomereScore: 55,
    biologicalAge: 12.8,
    riskLevel: "high",
    weight: 6.1,
    latestCondition: "活動量と便の状態にばらつきがあり、見守りが必要です。",
    recommendedAction: "急な変化が続く場合は、早めに動物病院へ相談しましょう。",
    insurancePlan: "シニア見守りプラン",
    lastCheckupDate: "2026-02-14",
    nextCheckupDate: "2026-08-14",
    sameAgeAverageScore: 63,
    trend: "watch",
    careStreak: 2,
    todayTasks: ["食べやすい量に分ける", "短い室内遊びにする", "便と食欲をメモする"],
    watchSigns: ["元気の低下が続く", "食事を残す日が増える", "便の変化が続く"],
    lastLogSummary: "元気度と便の状態にばらつきがあります。早めの相談目安を表示します。",
    claimRiskScore: 83,
    interventionPriority: "urgent",
    estimatedClaimReduction: 1380000,
    recentHospitalVisits: 1,
    segment: "senior"
  },
  {
    id: "coco",
    name: "ココ",
    type: "dog",
    breed: "ミニチュアダックスフンド",
    age: 9,
    gender: "女の子",
    ownerName: "鈴木 彩",
    telomereScore: 61,
    biologicalAge: 9.7,
    riskLevel: "middle",
    weight: 5.8,
    latestCondition: "体重は安定。階段や段差の負担には注意しましょう。",
    recommendedAction: "短い散歩を複数回に分け、腰に負担の少ない運動を続けましょう。",
    insurancePlan: "スタンダード予防プラン",
    lastCheckupDate: "2026-04-05",
    nextCheckupDate: "2026-10-05",
    sameAgeAverageScore: 66,
    trend: "stable",
    careStreak: 9,
    todayTasks: ["段差を避けて散歩する", "体重を記録する", "歩き方の変化を見る"],
    watchSigns: ["段差を嫌がる", "歩き方がいつもと違う", "抱っこを嫌がる"],
    lastLogSummary: "体重は安定。腰への負担を避けるケアが続いています。",
    claimRiskScore: 61,
    interventionPriority: "high",
    estimatedClaimReduction: 880000,
    recentHospitalVisits: 0,
    segment: "senior"
  },
  {
    id: "nana",
    name: "ナナ",
    type: "cat",
    breed: "スコティッシュフォールド",
    age: 5,
    gender: "女の子",
    ownerName: "伊藤 玲奈",
    telomereScore: 73,
    biologicalAge: 5.2,
    riskLevel: "low",
    weight: 4.6,
    latestCondition: "食事の質が安定し、毛づやも良い状態です。",
    recommendedAction: "水分摂取を意識して、遊びながら活動量を維持しましょう。",
    insurancePlan: "予防ケアプラン Plus",
    lastCheckupDate: "2026-03-28",
    nextCheckupDate: "2026-09-28",
    sameAgeAverageScore: 69,
    trend: "improving",
    careStreak: 15,
    todayTasks: ["水分を取りやすい場所を用意する", "おもちゃで10分遊ぶ", "トイレの様子を確認する"],
    watchSigns: ["ジャンプを嫌がる", "トイレ回数の変化", "食欲が落ちる"],
    lastLogSummary: "食事と活動量が安定し、良い見守りリズムです。",
    claimRiskScore: 39,
    interventionPriority: "standard",
    estimatedClaimReduction: 530000,
    recentHospitalVisits: 0,
    segment: "adult"
  }
];

export const dailyLogs: DailyLog[] = [
  {
    date: "2026-05-15",
    petId: "mugi",
    walkMinutes: 45,
    mealQuality: "よい",
    weight: 9.8,
    energyLevel: "元気",
    stoolCondition: "良好",
    hospitalVisit: false,
    memo: "朝夕ともに楽しそうに散歩できました。"
  },
  {
    date: "2026-05-14",
    petId: "mugi",
    walkMinutes: 35,
    mealQuality: "よい",
    weight: 9.9,
    energyLevel: "ふつう",
    stoolCondition: "良好",
    hospitalVisit: false,
    memo: "暑さで夕方は短めにしました。"
  },
  {
    date: "2026-05-13",
    petId: "mugi",
    walkMinutes: 40,
    mealQuality: "よい",
    weight: 9.8,
    energyLevel: "元気",
    stoolCondition: "良好",
    hospitalVisit: false,
    memo: "おやつを少なめに調整。"
  },
  {
    date: "2026-05-15",
    petId: "sora",
    walkMinutes: 15,
    mealQuality: "ふつう",
    weight: 5.4,
    energyLevel: "少し低め",
    stoolCondition: "やや硬め",
    hospitalVisit: false,
    memo: "夜の遊び時間を増やしたいです。"
  },
  {
    date: "2026-05-14",
    petId: "sora",
    walkMinutes: 10,
    mealQuality: "ふつう",
    weight: 5.5,
    energyLevel: "ふつう",
    stoolCondition: "良好",
    hospitalVisit: false,
    memo: "水を飲む量が少なめでした。"
  },
  {
    date: "2026-05-15",
    petId: "luna",
    walkMinutes: 50,
    mealQuality: "よい",
    weight: 4.1,
    energyLevel: "とても元気",
    stoolCondition: "良好",
    hospitalVisit: false,
    memo: "公園でよく歩けました。"
  },
  {
    date: "2026-05-15",
    petId: "leo",
    walkMinutes: 5,
    mealQuality: "少し残した",
    weight: 6.1,
    energyLevel: "低め",
    stoolCondition: "やわらかめ",
    hospitalVisit: true,
    memo: "念のため相談。大きな問題はないとのこと。"
  },
  {
    date: "2026-05-14",
    petId: "leo",
    walkMinutes: 8,
    mealQuality: "ふつう",
    weight: 6.1,
    energyLevel: "低め",
    stoolCondition: "やわらかめ",
    hospitalVisit: false,
    memo: "寝ている時間が長めでした。"
  },
  {
    date: "2026-05-15",
    petId: "coco",
    walkMinutes: 28,
    mealQuality: "よい",
    weight: 5.8,
    energyLevel: "ふつう",
    stoolCondition: "良好",
    hospitalVisit: false,
    memo: "段差を避けて近所をゆっくり歩きました。"
  },
  {
    date: "2026-05-15",
    petId: "nana",
    walkMinutes: 20,
    mealQuality: "よい",
    weight: 4.6,
    energyLevel: "元気",
    stoolCondition: "良好",
    hospitalVisit: false,
    memo: "新しいおもちゃでよく遊びました。"
  }
];

export const weeklyTasks = [
  "体重を2回記録する",
  "いつもの食事量を写真で残す",
  "遊びや散歩の時間を合計30分増やす",
  "気になる変化をメモに残す"
];

export const aiAdviceByPet: Record<string, AdviceSet> = {
  mugi: {
    meal: "たんぱく質をしっかり取りつつ、おやつは散歩後のごほうびに絞ると今の良いリズムを保ちやすくなります。",
    exercise: "朝の涼しい時間に10分だけ長く歩くと、筋力維持と気分転換の両方に役立ちます。",
    hospital: "食欲、便、元気のどれかが2日以上いつもと違うときは、早めに相談しましょう。",
    nextTest: "今の状態なら6か月後の再検査で変化を見守るのがおすすめです。"
  },
  sora: {
    meal: "体重が増えやすい傾向があるため、食事量を急に減らさず、まずは間食と夜食の頻度を見直しましょう。",
    exercise: "短い遊びを朝と夜に分けると、無理なく活動量を増やせます。",
    hospital: "水を飲む量、トイレ回数、食欲の変化が続く場合は相談の目安です。",
    nextTest: "3か月後に生活記録を見直し、必要に応じて再検査時期を早めましょう。"
  },
  luna: {
    meal: "今の食事バランスは良好です。新しいフードに変える場合は1週間ほどかけてゆっくり切り替えましょう。",
    exercise: "週末に少し長めの散歩を入れると、良い活動リズムを保てます。",
    hospital: "小型犬は体調変化が見えにくいこともあるため、食欲低下が続く場合は相談しましょう。",
    nextTest: "6か月後の定期検査で十分に見守れる状態です。"
  },
  leo: {
    meal: "食事を残す日があるため、量よりも食べやすさと水分を意識してみましょう。",
    exercise: "無理な運動は避け、部屋の中で短く遊ぶ時間を作るだけでも十分です。",
    hospital: "元気の低下、便の変化、食欲低下が重なる場合は早めに動物病院へ相談してください。",
    nextTest: "今後3か月以内に再チェックし、生活記録と合わせて変化を確認しましょう。"
  },
  coco: {
    meal: "体重は安定しています。関節や腰への負担を考えて、急な増減がないよう記録を続けましょう。",
    exercise: "短い散歩を複数回に分けると、腰への負担を抑えながら活動量を保てます。",
    hospital: "段差を嫌がる、歩き方が変わる、抱っこを嫌がる変化があれば相談しましょう。",
    nextTest: "次回検査まで今の記録を続け、運動量と体重の関係を見ていきましょう。"
  },
  nana: {
    meal: "毛づやが良く、食事の質も安定しています。水分を取りやすい工夫を続けましょう。",
    exercise: "おもちゃを使った短い遊びを毎日続けると、ストレスケアにもつながります。",
    hospital: "ジャンプを嫌がる、食欲が落ちる、トイレの様子が変わる場合は相談の目安です。",
    nextTest: "6か月後の再検査で、今の良い傾向を確認しましょう。"
  }
};

export const hospitalVisitTrend = [
  { month: "1月", visits: 18 },
  { month: "2月", visits: 17 },
  { month: "3月", visits: 14 },
  { month: "4月", visits: 12 },
  { month: "5月", visits: 10 }
];

export const lossRatioSimulation = {
  currentLossRatio: 68,
  expectedLossRatio: 61,
  preventionReach: 74,
  projectedClaimReduction: 12000000,
  currentMonthlyClaims: 42000000,
  projectedMonthlyClaims: 37800000,
  assumptions: ["高リスク群へ月1回のケア提案を配信", "中リスク群の記録継続率を15%改善", "早期相談により重症化前の受診を促進"]
};

/** BtoBダッシュボード上部「この画面で分かること」用（モック文言） */
export const insurerDashboardInsights = [
  "どのペットが将来の保険金支払いリスクになりやすいか",
  "どの契約者に予防ケアを届けるべきか",
  "予防介入によって、どれくらい損害率改善が見込めるか"
] as const;

/** 保険会社が導入したときの業務フロー（デモ用） */
export const insurerOnboardingSteps = [
  "契約者にテロメア検査キットを配布",
  "飼い主がペット情報を登録",
  "検査結果と日々の記録をアプリで管理",
  "高リスクペットを自動抽出",
  "食事・運動・通院相談を促す",
  "通院回数・請求リスク・損害率の変化を確認"
] as const;

export function getPetById(id: string) {
  return pets.find((pet) => pet.id === id);
}

export function getLogsByPetId(petId: string) {
  return dailyLogs
    .filter((log) => log.petId === petId)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getRiskLabel(riskLevel: RiskLevel) {
  return {
    low: "低リスク",
    middle: "中リスク",
    high: "高リスク"
  }[riskLevel];
}

export function getRiskTone(riskLevel: RiskLevel) {
  return {
    low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    middle: "bg-amber-50 text-amber-700 ring-amber-200",
    high: "bg-rose-50 text-rose-700 ring-rose-200"
  }[riskLevel];
}

export function getInterventionLabel(priority: Pet["interventionPriority"]) {
  return {
    urgent: "最優先",
    high: "高",
    standard: "標準",
    monitor: "見守り"
  }[priority];
}

export function getInterventionTone(priority: Pet["interventionPriority"]) {
  return {
    urgent: "bg-rose-100 text-rose-800 ring-rose-200",
    high: "bg-amber-100 text-amber-800 ring-amber-200",
    standard: "bg-sky-100 text-sky-800 ring-sky-200",
    monitor: "bg-emerald-100 text-emerald-800 ring-emerald-200"
  }[priority];
}
