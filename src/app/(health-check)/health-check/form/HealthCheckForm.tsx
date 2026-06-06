"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HealthCheckAnalyzingOverlay } from "@/components/health-check/HealthCheckAnalyzingOverlay";
import { HealthCheckChoiceCard } from "@/components/health-check/HealthCheckChoiceCard";
import { HealthCheckFormTeaser } from "@/components/health-check/HealthCheckFormTeaser";
import { HealthCheckLogo } from "@/components/health-check/HealthCheckLogo";
import { HealthCheckPrimaryButton } from "@/components/health-check/HealthCheckPrimaryButton";
import { HealthCheckStepProgress } from "@/components/health-check/HealthCheckStepProgress";
import {
  clearHealthCheckDraft,
  getHealthCheckDraft,
  saveHealthCheckDraft,
  saveHealthCheckResult
} from "@/lib/healthCheckClient";
import { parseHealthCheckInput, type HealthCheckFormState } from "@/lib/healthCheck";
import {
  getPersonalizedLabel,
  healthCheckQuestions,
  TOTAL_HEALTH_CHECK_STEPS,
  type HealthCheckQuestion
} from "@/lib/healthCheckQuestions";

function getInitialFormState() {
  const draft = getHealthCheckDraft();
  return draft ?? { form: {} as HealthCheckFormState, step: 0 };
}

export function HealthCheckForm() {
  const router = useRouter();
  const initialState = getInitialFormState();
  const [step, setStep] = useState(initialState.step);
  const [form, setForm] = useState<HealthCheckFormState>(initialState.form);
  const [animKey, setAnimKey] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    saveHealthCheckDraft(form, step);
  }, [form, step]);

  const currentQuestion = healthCheckQuestions[step];
  const petName = String(form.petName ?? "").trim();
  const isLastStep = step === TOTAL_HEALTH_CHECK_STEPS - 1;
  const canProceed = isStepValid(currentQuestion, form);

  function updateField(id: string, value: string | number) {
    setForm((current) => ({ ...current, [id]: value }));
  }

  function goToStep(nextStep: number) {
    setStep(nextStep);
    setAnimKey((current) => current + 1);
  }

  const finishAndNavigate = useCallback(() => {
    router.push("/health-check/result");
  }, [router]);

  function handleNext() {
    if (!canProceed) return;

    if (isLastStep) {
      const input = parseHealthCheckInput(form);
      if (!input) return;

      saveHealthCheckResult(input);
      clearHealthCheckDraft();
      setIsAnalyzing(true);
      return;
    }

    goToStep(step + 1);
  }

  function handleBack() {
    if (step === 0) {
      router.push("/health-check");
      return;
    }
    goToStep(step - 1);
  }

  return (
    <>
      {isAnalyzing ? (
        <HealthCheckAnalyzingOverlay petName={petName || "うちの子"} onComplete={finishAndNavigate} />
      ) : null}

      <div className="space-y-5 pb-8">
        <Link href="/health-check" className="flex justify-center transition hover:opacity-80">
          <HealthCheckLogo variant="header" />
        </Link>

        <HealthCheckFormTeaser step={step} total={TOTAL_HEALTH_CHECK_STEPS} petName={petName || undefined} />

        <HealthCheckStepProgress
          step={step}
          total={TOTAL_HEALTH_CHECK_STEPS}
          category={currentQuestion.category}
          onBack={handleBack}
        />

        <div
          key={animKey}
          className="animate-fadeSlide rounded-[1.75rem] border border-slate-100/80 bg-white/95 p-6 shadow-card backdrop-blur-sm"
        >
          <h2 className="font-serif text-xl font-bold leading-8 text-navy">
            {getPersonalizedLabel(currentQuestion, petName || undefined)}
          </h2>
          {currentQuestion.hint ? (
            <p className="mt-2 text-sm text-slate-500">{currentQuestion.hint}</p>
          ) : null}

          <div className="mt-6">
            {currentQuestion.type === "text" && (
              <input
                value={String(form.petName ?? "")}
                onChange={(event) => updateField("petName", event.target.value)}
                placeholder={currentQuestion.placeholder}
                className="w-full rounded-2xl border border-slate-200/80 bg-beige/30 px-4 py-4 text-base outline-none transition focus:border-leaf focus:bg-white focus:ring-2 focus:ring-leaf/20"
                autoFocus
              />
            )}

            {currentQuestion.type === "number" && (
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                {Array.from({ length: currentQuestion.max - currentQuestion.min + 1 }, (_, index) => {
                  const age = currentQuestion.min + index;
                  const selected = Number(form.age) === age;

                  return (
                    <button
                      key={age}
                      type="button"
                      onClick={() => updateField("age", age)}
                      className={`min-h-[52px] rounded-2xl text-sm font-bold transition active:scale-95 ${
                        selected
                          ? "bg-leaf text-white shadow-card ring-2 ring-leaf/30"
                          : "border border-slate-100 bg-beige/40 text-slate-600 hover:border-leaf/30 hover:bg-white"
                      }`}
                    >
                      {age}歳
                    </button>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === "choice" && (
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <HealthCheckChoiceCard
                    key={option.value}
                    label={option.label}
                    icon={option.icon}
                    selected={form[currentQuestion.id] === option.value}
                    onClick={() => updateField(currentQuestion.id, option.value)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <HealthCheckPrimaryButton
          onClick={handleNext}
          disabled={!canProceed}
          variant={isLastStep ? "accent" : "leaf"}
          pulse={isLastStep && canProceed}
        >
          {isLastStep ? "✨ 結果を見る" : "次へ"}
        </HealthCheckPrimaryButton>
      </div>
    </>
  );
}

function isStepValid(question: HealthCheckQuestion, form: HealthCheckFormState): boolean {
  if (question.type === "text") {
    return String(form.petName ?? "").trim().length > 0;
  }

  if (question.type === "number") {
    const age = Number(form.age);
    return !Number.isNaN(age) && age >= question.min && age <= question.max;
  }

  return Boolean(form[question.id]);
}
