import { healthCheckRepository } from "./healthCheckStorage";
import type { HealthCheckFormState, HealthCheckInput, HealthCheckResult } from "./healthCheck";

/** localStorage に結果を保存（ログイン不要） */
export function saveHealthCheckResult(input: HealthCheckInput): HealthCheckResult {
  return healthCheckRepository.saveResult(input);
}

/** useSyncExternalStore 用：同一データなら同じ参照を返す */
export function getHealthCheckResultSnapshot(): HealthCheckResult | null {
  return healthCheckRepository.getResult();
}

export function subscribeHealthCheckResult(callback: () => void) {
  return healthCheckRepository.subscribeResult(callback);
}

export function getLatestHealthCheckResult(): HealthCheckResult | null {
  return healthCheckRepository.getResult();
}

export function hasHealthCheckResult(): boolean {
  return healthCheckRepository.getResult() !== null;
}

export function saveHealthCheckDraft(form: HealthCheckFormState, step: number) {
  healthCheckRepository.saveDraft(form, step);
}

export function getHealthCheckDraft(): { form: HealthCheckFormState; step: number } | null {
  return healthCheckRepository.getDraft();
}

export function clearHealthCheckDraft() {
  healthCheckRepository.clearDraft();
}
