import { generateHealthCheckInsight, type HealthCheckInsight } from "./healthCheckInsights";
import type { HealthCheckFieldId } from "./healthCheckQuestions";

export type { HealthCheckInsight };

export const HEALTH_CHECK_STORAGE_KEY = "zutto-petto:health-check";
export const HEALTH_CHECK_DRAFT_KEY = "zutto-petto:health-check-draft";
export const HEALTH_CHECK_UPDATED_EVENT = "zutto-petto:health-check-updated";

/** LINE公式アカウントURL（後で差し替え） */
export const LINE_OFFICIAL_URL =
  process.env.NEXT_PUBLIC_LINE_OFFICIAL_URL ?? "https://line.me/R/ti/p/@placeholder";

export type Species = "dog" | "cat";
export type BodyType = "thin" | "normal" | "slightly_overweight" | "overweight";
export type Appetite = "good" | "normal" | "slightly_low" | "very_low";
export type Energy = "very_active" | "normal" | "slightly_low" | "very_low";
export type Stool = "good" | "slightly_loose" | "constipated" | "concerning";
export type Exercise = "enough" | "normal" | "low" | "very_low";
export type MedicalConcern = "none" | "slight" | "treatment" | "serious";
export type OwnerConcern =
  | "aging"
  | "diet"
  | "weight"
  | "exercise"
  | "digestion"
  | "early_detection"
  | "longevity"
  | "other";
export type TelomereInterest = "high" | "price_dependent" | "learn_more" | "not_now";

/** フォーム入力（将来の API / DB 連携用） */
export type HealthCheckInput = {
  petName: string;
  species: Species;
  age: number;
  bodyType: BodyType;
  appetite: Appetite;
  energy: Energy;
  stool: Stool;
  exercise: Exercise;
  medicalConcern: MedicalConcern;
  ownerConcern: OwnerConcern;
  telomereInterest: TelomereInterest;
};

export type HealthCheckResult = {
  id: string;
  input: HealthCheckInput;
  score: number;
  typeLabel: string;
  insight: HealthCheckInsight;
  telomereMessage: string;
  completedAt: string;
};

export type HealthCheckFormState = Partial<Record<HealthCheckFieldId, string | number>>;

const MIN_SCORE = 30;
const MAX_SCORE = 100;
const BASE_SCORE = 100;

/** 年齢による減点 */
function getAgeDeduction(age: number): number {
  if (age <= 6) return 0;
  if (age <= 10) return 8;
  if (age <= 14) return 15;
  return 22;
}

/** 基準100点から各項目の減点を合算 */
export function calculateHealthScore(input: HealthCheckInput): number {
  let deduction = 0;

  deduction += getAgeDeduction(input.age);

  const bodyTypeDeduction: Record<BodyType, number> = {
    normal: 0,
    thin: 5,
    slightly_overweight: 7,
    overweight: 12
  };
  deduction += bodyTypeDeduction[input.bodyType];

  const appetiteDeduction: Record<Appetite, number> = {
    good: 0,
    normal: 0,
    slightly_low: 8,
    very_low: 15
  };
  deduction += appetiteDeduction[input.appetite];

  const energyDeduction: Record<Energy, number> = {
    very_active: 0,
    normal: 0,
    slightly_low: 10,
    very_low: 18
  };
  deduction += energyDeduction[input.energy];

  const stoolDeduction: Record<Stool, number> = {
    good: 0,
    slightly_loose: 6,
    constipated: 6,
    concerning: 12
  };
  deduction += stoolDeduction[input.stool];

  const exerciseDeduction: Record<Exercise, number> = {
    enough: 0,
    normal: 3,
    low: 8,
    very_low: 14
  };
  deduction += exerciseDeduction[input.exercise];

  const medicalDeduction: Record<MedicalConcern, number> = {
    none: 0,
    slight: 8,
    treatment: 12,
    serious: 18
  };
  deduction += medicalDeduction[input.medicalConcern];

  return Math.max(MIN_SCORE, Math.min(MAX_SCORE, BASE_SCORE - deduction));
}

/** スコア帯に応じたタイプ判定 */
export function getScoreType(score: number): string {
  if (score >= 85) return "今の調子を大切にしたいタイプ";
  if (score >= 70) return "少しずつ見守りを始めたいタイプ";
  if (score >= 55) return "生活習慣を見直したいタイプ";
  return "早めに相談・確認したいタイプ";
}

/** テロメア健康年齢チェックへの興味に応じた案内文 */
export function getTelomereInterestMessage(interest: TelomereInterest): string {
  const messages: Record<TelomereInterest, string> = {
    high: "健康年齢チェックにご興味がある方には、今後詳しいご案内をお届けします。",
    price_dependent: "価格や内容について、わかりやすいご案内を準備しています。詳しく知りたい方はLINEからお問い合わせください。",
    learn_more: "テロメア健康年齢チェックについて、もう少し詳しくご案内できる情報をお届けします。",
    not_now: "今は必要ないとのことですね。毎日のケアを続けることで、健康管理の参考になります。"
  };

  return messages[interest];
}

/** フォーム状態を HealthCheckInput に変換 */
export function parseHealthCheckInput(form: HealthCheckFormState): HealthCheckInput | null {
  const petName = String(form.petName ?? "").trim();
  if (!petName) return null;

  const requiredFields: HealthCheckFieldId[] = [
    "species",
    "age",
    "bodyType",
    "appetite",
    "energy",
    "stool",
    "exercise",
    "medicalConcern",
    "ownerConcern",
    "telomereInterest"
  ];

  for (const field of requiredFields) {
    if (form[field] === undefined || form[field] === "") return null;
  }

  return {
    petName,
    species: form.species as Species,
    age: Number(form.age),
    bodyType: form.bodyType as BodyType,
    appetite: form.appetite as Appetite,
    energy: form.energy as Energy,
    stool: form.stool as Stool,
    exercise: form.exercise as Exercise,
    medicalConcern: form.medicalConcern as MedicalConcern,
    ownerConcern: form.ownerConcern as OwnerConcern,
    telomereInterest: form.telomereInterest as TelomereInterest
  };
}

/** 入力から結果オブジェクトを生成 */
export function buildHealthCheckResult(input: HealthCheckInput): HealthCheckResult {
  const score = calculateHealthScore(input);

  return {
    id: `hc-${Date.now().toString(36)}`,
    input,
    score,
    typeLabel: getScoreType(score),
    insight: generateHealthCheckInsight(input, score),
    telomereMessage: getTelomereInterestMessage(input.telomereInterest),
    completedAt: new Date().toISOString()
  };
}

/** 旧形式の localStorage データを新形式に補完 */
function normalizeHealthCheckResult(raw: HealthCheckResult): HealthCheckResult {
  if (raw.insight) return raw;

  const score = raw.score ?? calculateHealthScore(raw.input);
  return {
    ...raw,
    score,
    typeLabel: raw.typeLabel ?? getScoreType(score),
    insight: generateHealthCheckInsight(raw.input, score),
    telomereMessage: raw.telomereMessage ?? getTelomereInterestMessage(raw.input.telomereInterest)
  };
}

export function saveHealthCheckResult(input: HealthCheckInput): HealthCheckResult {
  const result = buildHealthCheckResult(input);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(HEALTH_CHECK_STORAGE_KEY, JSON.stringify(result));
    invalidateHealthCheckSnapshotCache();
    window.dispatchEvent(new Event(HEALTH_CHECK_UPDATED_EVENT));
  }

  return result;
}

let healthCheckSnapshotCache: { raw: string | null; snapshot: HealthCheckResult | null } | undefined;

function invalidateHealthCheckSnapshotCache() {
  healthCheckSnapshotCache = undefined;
}

/** useSyncExternalStore 用：同一データなら同じ参照を返す */
export function getHealthCheckResultSnapshot(): HealthCheckResult | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(HEALTH_CHECK_STORAGE_KEY);

    if (healthCheckSnapshotCache && healthCheckSnapshotCache.raw === raw) {
      return healthCheckSnapshotCache.snapshot;
    }

    const parsed = raw ? normalizeHealthCheckResult(JSON.parse(raw) as HealthCheckResult) : null;
    healthCheckSnapshotCache = { raw, snapshot: parsed };
    return parsed;
  } catch {
    return null;
  }
}

export function subscribeHealthCheckResult(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleUpdate = () => {
    invalidateHealthCheckSnapshotCache();
    callback();
  };

  window.addEventListener(HEALTH_CHECK_UPDATED_EVENT, handleUpdate);
  window.addEventListener("storage", handleUpdate);

  return () => {
    window.removeEventListener(HEALTH_CHECK_UPDATED_EVENT, handleUpdate);
    window.removeEventListener("storage", handleUpdate);
  };
}

export function getLatestHealthCheckResult(): HealthCheckResult | null {
  return getHealthCheckResultSnapshot();
}

export function hasHealthCheckResult(): boolean {
  return getLatestHealthCheckResult() !== null;
}

/** フォーム途中入力の保存（sessionStorage） */
export function saveHealthCheckDraft(form: HealthCheckFormState, step: number) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(HEALTH_CHECK_DRAFT_KEY, JSON.stringify({ form, step }));
}

export function getHealthCheckDraft(): { form: HealthCheckFormState; step: number } | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.sessionStorage.getItem(HEALTH_CHECK_DRAFT_KEY);
    return stored ? (JSON.parse(stored) as { form: HealthCheckFormState; step: number }) : null;
  } catch {
    return null;
  }
}

export function clearHealthCheckDraft() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(HEALTH_CHECK_DRAFT_KEY);
}
