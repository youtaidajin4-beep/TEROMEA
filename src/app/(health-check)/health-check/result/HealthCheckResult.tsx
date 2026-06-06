"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HealthCheckDisclaimer } from "@/components/HealthCheckDisclaimer";
import { HealthCheckSectionCard } from "@/components/health-check/HealthCheckSectionCard";
import { ScoreRing } from "@/components/ScoreRing";
import { getHealthCheckResultSnapshot, LINE_OFFICIAL_URL, subscribeHealthCheckResult, type HealthCheckResult } from "@/lib/healthCheck";

export function HealthCheckResultView() {
  const router = useRouter();
  const result = useSyncExternalStore<HealthCheckResult | null>(
    subscribeHealthCheckResult,
    getHealthCheckResultSnapshot,
    () => null
  );

  useEffect(() => {
    if (!result) {
      router.replace("/health-check/form");
    }
  }, [result, router]);

  if (!result) {
    return <div className="py-12 text-center text-sm text-slate-500">結果を読み込んでいます...</div>;
  }

  const { insight } = result;
  const scoreTone = getScoreTone(result.score);

  return (
    <div className="space-y-6 pb-8">
      <section className="animate-fadeSlide space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-leaf">健康見守りレポート</p>
        <h1 className="font-serif text-2xl font-bold text-navy">{result.input.petName}ちゃんの結果</h1>
        <span className="inline-flex rounded-full bg-beige px-4 py-1.5 text-sm font-semibold text-navy">
          {insight.lifeStage.label}
        </span>
        <p className="text-sm leading-6 text-slate-600">{insight.lifeStage.description}</p>
      </section>

      <section
        className={`animate-scoreReveal rounded-[1.75rem] border p-6 text-center shadow-card ${scoreTone.bg}`}
      >
        <ScoreRing score={result.score} label="健康見守りスコア" />
        <p className={`mt-4 inline-flex rounded-full px-5 py-2 text-sm font-bold ${scoreTone.badge}`}>
          {result.typeLabel}
        </p>
      </section>

      <HealthCheckSectionCard eyebrow="いま伝えたいこと" variant="highlight">
        <h3 className="font-serif text-xl font-bold leading-8 text-navy">{insight.hero.headline}</h3>
        <p className="mt-3 text-base leading-8 text-slate-700">{insight.hero.body}</p>
      </HealthCheckSectionCard>

      <HealthCheckSectionCard eyebrow="いま一番意識したいこと" title={insight.focusArea.title}>
        <p className="text-sm font-medium text-leaf">{insight.focusArea.whyNow}</p>
        <p className="mt-3 text-base leading-8 text-slate-700">{insight.focusArea.insight}</p>
      </HealthCheckSectionCard>

      {insight.patternNote ? (
        <HealthCheckSectionCard eyebrow="つながりのヒント" title={insight.patternNote.title}>
          <p className="text-base leading-8 text-slate-700">{insight.patternNote.body}</p>
        </HealthCheckSectionCard>
      ) : null}

      <HealthCheckSectionCard eyebrow="今週のひとこと" variant="accent">
        <p className="font-serif text-lg font-bold leading-8 text-navy">{insight.thisWeekAction}</p>
      </HealthCheckSectionCard>

      <HealthCheckSectionCard title="テロメア健康年齢チェック">
        <p className="text-base leading-7 text-slate-600">{result.telomereMessage}</p>
      </HealthCheckSectionCard>

      <HealthCheckSectionCard variant="highlight">
        <h2 className="font-serif text-lg font-bold text-navy">LINEで続ける</h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          この結果をもとに、LINEで週1回の健康記録を続けてみましょう。
          小さな変化を記録することで、うちの子の状態を見守りやすくなります。
        </p>
        <a
          href={LINE_OFFICIAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center rounded-full bg-leaf px-6 py-4 text-base font-bold text-white shadow-card transition hover:bg-emerald-700"
        >
          LINEで健康記録を続ける
        </a>
      </HealthCheckSectionCard>

      <Link
        href="/health-check/form"
        className="flex w-full items-center justify-center rounded-full border border-slate-200 bg-white/90 px-6 py-4 text-base font-bold text-slate-600 transition hover:bg-beige"
      >
        もう一度チェックする
      </Link>

      <HealthCheckDisclaimer variant="full" />
    </div>
  );
}

function getScoreTone(score: number) {
  if (score >= 85) {
    return { bg: "border-leaf/20 bg-mint/50", badge: "bg-leaf/15 text-leaf" };
  }
  if (score >= 70) {
    return { bg: "border-sky-100 bg-skysoft/40", badge: "bg-sky-100 text-sky-700" };
  }
  if (score >= 55) {
    return { bg: "border-amber-100 bg-amber-50/60", badge: "bg-amber-100 text-amber-800" };
  }
  return { bg: "border-orange-100 bg-orange-50/50", badge: "bg-accent/15 text-accent" };
}
