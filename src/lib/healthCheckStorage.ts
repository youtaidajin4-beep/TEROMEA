import {
  HEALTH_CHECK_DRAFT_KEY,
  HEALTH_CHECK_STORAGE_KEY,
  HEALTH_CHECK_UPDATED_EVENT
} from "./healthCheckConfig";
import type { HealthCheckFormState, HealthCheckInput, HealthCheckResult } from "./healthCheck";
import { buildHealthCheckResult, calculateHealthScore, getScoreType, getTelomereInterestMessage } from "./healthCheck";
import { generateHealthCheckInsight } from "./healthCheckInsights";

/**
 * 健康寿命チェックの永続化レイヤー
 * 現状は localStorage。将来は Firebase / Supabase 実装に差し替えやすいよう分離。
 */
export type HealthCheckRepository = {
  saveResult(input: HealthCheckInput): HealthCheckResult;
  getResult(): HealthCheckResult | null;
  subscribeResult(callback: () => void): () => void;
  saveDraft(form: HealthCheckFormState, step: number): void;
  getDraft(): { form: HealthCheckFormState; step: number } | null;
  clearDraft(): void;
};

let snapshotCache: { raw: string | null; snapshot: HealthCheckResult | null } | undefined;

function invalidateSnapshotCache() {
  snapshotCache = undefined;
}

function normalizeResult(raw: HealthCheckResult): HealthCheckResult {
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

export const localHealthCheckRepository: HealthCheckRepository = {
  saveResult(input) {
    const result = buildHealthCheckResult(input);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(HEALTH_CHECK_STORAGE_KEY, JSON.stringify(result));
      invalidateSnapshotCache();
      window.dispatchEvent(new Event(HEALTH_CHECK_UPDATED_EVENT));
    }

    return result;
  },

  getResult() {
    if (typeof window === "undefined") return null;

    try {
      const raw = window.localStorage.getItem(HEALTH_CHECK_STORAGE_KEY);

      if (snapshotCache && snapshotCache.raw === raw) {
        return snapshotCache.snapshot;
      }

      const parsed = raw ? normalizeResult(JSON.parse(raw) as HealthCheckResult) : null;
      snapshotCache = { raw, snapshot: parsed };
      return parsed;
    } catch {
      return null;
    }
  },

  subscribeResult(callback) {
    if (typeof window === "undefined") {
      return () => {};
    }

    const handleUpdate = () => {
      invalidateSnapshotCache();
      callback();
    };

    window.addEventListener(HEALTH_CHECK_UPDATED_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(HEALTH_CHECK_UPDATED_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  },

  saveDraft(form, step) {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(HEALTH_CHECK_DRAFT_KEY, JSON.stringify({ form, step }));
  },

  getDraft() {
    if (typeof window === "undefined") return null;

    try {
      const stored = window.sessionStorage.getItem(HEALTH_CHECK_DRAFT_KEY);
      return stored ? (JSON.parse(stored) as { form: HealthCheckFormState; step: number }) : null;
    } catch {
      return null;
    }
  },

  clearDraft() {
    if (typeof window === "undefined") return;
    window.sessionStorage.removeItem(HEALTH_CHECK_DRAFT_KEY);
  }
};

/** 本番では localStorage、将来はリモート実装に差し替え */
export const healthCheckRepository: HealthCheckRepository = localHealthCheckRepository;
