import { pets, type Pet, type PetType, type RiskLevel } from "./mockData";

export const LOCAL_PETS_KEY = "pet-life-score:local-pets";

// #region agent log
let debugSnapshotCalls = 0;
let debugSubscribeCalls = 0;
let debugLastSnapshot: Pet[] | undefined;
function agentDebugLog(runId: string, hypothesisId: string, location: string, message: string, data: Record<string, unknown>) {
  fetch("http://127.0.0.1:7533/ingest/604d9eab-aa28-449e-a6d2-2c9ef3130568", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "090859" },
    body: JSON.stringify({ sessionId: "090859", runId, hypothesisId, location, message, data, timestamp: Date.now() })
  }).catch(() => {});
}
// #endregion

let cachedLocalPetsRaw: string | null | undefined;
let cachedClientPetsSnapshot: Pet[] = pets;

export type PetProfileInput = {
  name: string;
  type: PetType;
  breed: string;
  age: number;
  gender: string;
  ownerName: string;
  weight: number;
};

export function getLocalPets(): Pet[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(LOCAL_PETS_KEY);
    return stored ? (JSON.parse(stored) as Pet[]) : [];
  } catch {
    return [];
  }
}

export function saveLocalPets(localPets: Pet[]) {
  window.localStorage.setItem(LOCAL_PETS_KEY, JSON.stringify(localPets));
}

export function getAllClientPets() {
  return [...pets, ...getLocalPets()];
}

export function subscribeLocalPets(callback: () => void) {
  // #region agent log
  debugSubscribeCalls += 1;
  if (debugSubscribeCalls <= 8) {
    agentDebugLog("pre-fix", "H3", "src/lib/localPets.ts:subscribeLocalPets", "subscribeLocalPets called", {
      subscribeCalls: debugSubscribeCalls
    });
  }
  // #endregion
  window.addEventListener("pet-life-score:local-pets-updated", callback);
  window.addEventListener("storage", callback);

  return () => {
    // #region agent log
    if (debugSubscribeCalls <= 8) {
      agentDebugLog("pre-fix", "H3", "src/lib/localPets.ts:subscribeLocalPets.cleanup", "subscribeLocalPets cleanup", {
        subscribeCalls: debugSubscribeCalls
      });
    }
    // #endregion
    window.removeEventListener("pet-life-score:local-pets-updated", callback);
    window.removeEventListener("storage", callback);
  };
}

export function getClientPetsSnapshot() {
  const stored = typeof window === "undefined" ? null : window.localStorage.getItem(LOCAL_PETS_KEY);

  if (!stored) {
    cachedLocalPetsRaw = stored;
    cachedClientPetsSnapshot = pets;
  }

  if (stored && stored !== cachedLocalPetsRaw) {
    cachedLocalPetsRaw = stored;
    cachedClientPetsSnapshot = getAllClientPets();
  }

  const snapshot = cachedClientPetsSnapshot;
  // #region agent log
  debugSnapshotCalls += 1;
  if (debugSnapshotCalls <= 12) {
    agentDebugLog("pre-fix", "H1,H2", "src/lib/localPets.ts:getClientPetsSnapshot", "client snapshot generated", {
      snapshotCalls: debugSnapshotCalls,
      sameReferenceAsPrevious: debugLastSnapshot === snapshot,
      length: snapshot.length,
      localLength: snapshot.length - pets.length
    });
  }
  debugLastSnapshot = snapshot;
  // #endregion
  return snapshot;
}

export function getServerPetsSnapshot() {
  // #region agent log
  agentDebugLog("pre-fix", "H4", "src/lib/localPets.ts:getServerPetsSnapshot", "server snapshot returned", {
    length: pets.length
  });
  // #endregion
  return pets;
}

export function getClientPetById(id: string) {
  return getAllClientPets().find((pet) => pet.id === id);
}

export function addLocalPet(input: PetProfileInput) {
  const newPet = createPetFromProfile(input);
  const currentPets = getLocalPets();
  saveLocalPets([newPet, ...currentPets]);
  window.dispatchEvent(new Event("pet-life-score:local-pets-updated"));
  return newPet;
}

export function createPetFromProfile(input: PetProfileInput): Pet {
  const normalizedAge = Math.max(0, Number(input.age) || 0);
  const score = estimateTelomereScore(normalizedAge, input.type);
  const biologicalAge = estimateBiologicalAge(normalizedAge, score);
  const riskLevel = getRiskFromScore(score);
  const id = `${slugify(input.name)}-${Date.now().toString(36)}`;
  const segment = normalizedAge <= 4 ? "young" : normalizedAge >= 9 ? "senior" : "adult";

  return {
    id,
    name: input.name,
    type: input.type,
    breed: input.breed,
    age: normalizedAge,
    gender: input.gender,
    ownerName: input.ownerName,
    telomereScore: score,
    biologicalAge,
    riskLevel,
    weight: Number(input.weight) || 0,
    latestCondition: "登録直後です。まずは毎日の記録を少しずつためていきましょう。",
    recommendedAction: "最初の1週間は、食事・運動・体重の変化をやさしく記録しましょう。",
    insurancePlan: "プロフィール登録デモ",
    lastCheckupDate: "未検査",
    nextCheckupDate: "検査キット申込後に表示",
    sameAgeAverageScore: estimateSameAgeAverage(normalizedAge),
    trend: "stable",
    careStreak: 0,
    todayTasks: ["体重を記録する", "食事の様子をメモする", "いつもの元気度を確認する"],
    watchSigns: ["食欲が落ちる日が続く", "元気がない状態が続く", "便やトイレの様子がいつもと違う"],
    lastLogSummary: "まだ記録が少ないため、まずは普段の様子を見える化しましょう。",
    claimRiskScore: Math.max(25, 100 - score),
    interventionPriority: getInterventionPriority(riskLevel),
    estimatedClaimReduction: riskLevel === "high" ? 980000 : riskLevel === "middle" ? 620000 : 360000,
    recentHospitalVisits: 0,
    segment
  };
}

export function getAgeGapLabel(pet: Pet) {
  const gap = Number((pet.biologicalAge - pet.age).toFixed(1));

  if (gap < -0.3) {
    return {
      gap,
      title: `実年齢より${Math.abs(gap)}歳若めの目安`,
      message: "今の生活リズムが良い方向に働いている可能性があります。続けやすいケアを維持しましょう。"
    };
  }

  if (gap > 0.3) {
    return {
      gap,
      title: `実年齢より${gap}歳高めの目安`,
      message: "老化傾向の参考サインとして、食事・運動・睡眠・ストレスを少しずつ整えるきっかけにしましょう。"
    };
  }

  return {
    gap,
    title: "実年齢に近い健康年齢の目安",
    message: "大きな差は見られません。日々の記録を続けて、変化に早く気づける状態を保ちましょう。"
  };
}

function estimateTelomereScore(age: number, type: PetType) {
  const base = type === "dog" ? 82 : 78;
  return Math.max(48, Math.min(88, base - Math.round(age * 1.8)));
}

function estimateBiologicalAge(age: number, score: number) {
  const ageGap = (70 - score) / 8;
  return Number(Math.max(0.5, age + ageGap).toFixed(1));
}

function estimateSameAgeAverage(age: number) {
  return Math.max(55, Math.round(82 - age * 1.7));
}

function getRiskFromScore(score: number): RiskLevel {
  if (score >= 72) {
    return "low";
  }
  if (score >= 60) {
    return "middle";
  }
  return "high";
}

function getInterventionPriority(riskLevel: RiskLevel): Pet["interventionPriority"] {
  const priorityByRisk: Record<RiskLevel, Pet["interventionPriority"]> = {
    low: "monitor",
    middle: "high",
    high: "urgent"
  };

  return priorityByRisk[riskLevel];
}

function slugify(value: string) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "") || "pet"
  );
}
