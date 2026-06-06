"use client";

import { useEffect, useState, useSyncExternalStore, type CSSProperties } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HealthCheckDisclaimer } from "@/components/HealthCheckDisclaimer";
import { HealthCheckAnimatedScore } from "@/components/health-check/HealthCheckAnimatedScore";
import { HealthCheckSectionCard } from "@/components/health-check/HealthCheckSectionCard";
import { LINE_OFFICIAL_URL } from "@/lib/healthCheckConfig";
import { getHealthCheckResultSnapshot, subscribeHealthCheckResult } from "@/lib/healthCheckClient";
import type { HealthCheckResult } from "@/lib/healthCheck";

type RevealPhase = "loading" | "score" | "content";

export function HealthCheckResultView() {
  const router = useRouter();
  const result = useSyncExternalStore<HealthCheckResult | null>(
    subscribeHealthCheckResult,
    getHealthCheckResultSnapshot,
    () => null
  );
  const [phase, setPhase] = useState<RevealPhase>("loading");

  useEffect(() => {
    if (!result) {
      router.replace("/health-check/form");
    }
  }, [result, router]);

  useEffect(() => {
    if (!result) return;

    const scoreTimer = setTimeout(() => setPhase("score"), 600);
    const contentTimer = setTimeout(() => setPhase("content"), 2200);

    return () => {
      clearTimeout(scoreTimer);
      clearTimeout(contentTimer);
    };
  }, [result]);

  if (!result) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
        <span className="animate-pulse text-3xl">✨</span>
        <p className="text-sm text-slate-500">結果を読み込んでいます…</p>
      </div>
    );
  }

  const { insight } = result;
  const scoreTone = getScoreTone(result.score);

  return (
    <div className="space-y-6 pb-8">
      {/* ヘッダー */}
      <section className="animate-fadeSlide space-y-3 text-center">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-leaf/10 px-4 py-1.5 text-xs font-bold text-leaf">
          <span>🎉</span> レポート完成
        </p>
        <h1 className="font-serif text-2xl font-bold text-navy">
          {result.input.petName}ちゃんの
          <br />
          健康見守りレポート
        </h1>
        <span className="inline-flex rounded-full border border-leaf/20 bg-beige px-4 py-1.5 text-sm font-semibold text-navy">
          {insight.lifeStage.label}
        </span>
      </section>

      {/* スコア — カウントアップ演出 */}
      <section
        className={`rounded-[1.75rem] border p-6 text-center shadow-card transition-all duration-700 ${scoreTone.bg} ${
          phase === "loading" ? "opacity-50" : "opacity-100"
        }`}
      >
        {phase !== "loading" ? (
          <>
            <HealthCheckAnimatedScore score={result.score} />
            <p
              className={`mt-5 inline-flex animate-popIn rounded-full px-5 py-2.5 text-sm font-bold ${scoreTone.badge}`}
              style={{ animationDelay: "1.2s" }}
            >
              {result.typeLabel}
            </p>
          </>
        ) : (
          <div className="py-10">
            <span className="animate-pulse text-4xl">📊</span>
            <p className="mt-3 text-sm text-slate-500">スコアを表示しています…</p>
          </div>
        )}
      </section>

      {/* 以降 — 段階的に表示 */}
      {phase === "content" ? (
        <div className="space-y-5">
          <HealthCheckSectionCard
            eyebrow="いま伝えたいこと"
            variant="highlight"
            className="animate-staggerIn opacity-0"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" } as CSSProperties}
          >
            <h3 className="font-serif text-xl font-bold leading-8 text-navy">{insight.hero.headline}</h3>
            <p className="mt-3 text-base leading-8 text-slate-700">{insight.hero.body}</p>
          </HealthCheckSectionCard>

          <HealthCheckSectionCard
            eyebrow="いま一番意識したいこと"
            title={insight.focusArea.title}
            className="animate-staggerIn opacity-0"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" } as CSSProperties}
          >
            <p className="rounded-xl bg-mint/40 px-4 py-2 text-sm font-medium text-leaf">{insight.focusArea.whyNow}</p>
            <p className="mt-3 text-base leading-8 text-slate-700">{insight.focusArea.insight}</p>
          </HealthCheckSectionCard>

          {insight.patternNote ? (
            <HealthCheckSectionCard
              eyebrow="💡 つながりのヒント"
              title={insight.patternNote.title}
              className="animate-staggerIn opacity-0"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" } as CSSProperties}
            >
              <p className="text-base leading-8 text-slate-700">{insight.patternNote.body}</p>
            </HealthCheckSectionCard>
          ) : null}

          <HealthCheckSectionCard
            eyebrow="今週のひとこと"
            variant="accent"
            className="animate-staggerIn opacity-0"
            style={{ animationDelay: "0.55s", animationFillMode: "forwards" } as CSSProperties}
          >
            <p className="font-serif text-lg font-bold leading-8 text-navy">{insight.thisWeekAction}</p>
          </HealthCheckSectionCard>

          <HealthCheckSectionCard
            title="テロメア健康年齢チェック"
            className="animate-staggerIn opacity-0"
            style={{ animationDelay: "0.7s", animationFillMode: "forwards" } as CSSProperties}
          >
            <p className="text-base leading-7 text-slate-600">{result.telomereMessage}</p>
          </HealthCheckSectionCard>

          <HealthCheckSectionCard
            variant="highlight"
            className="animate-staggerIn opacity-0"
            style={{ animationDelay: "0.85s", animationFillMode: "forwards" } as CSSProperties}
          >
            <h2 className="font-serif text-lg font-bold text-navy">LINEで続ける</h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              この結果をもとに、LINEで週1回の健康記録を続けてみましょう。
              小さな変化を記録することで、うちの子の状態を見守りやすくなります。
            </p>
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#06C755] px-6 py-4 text-base font-bold text-white shadow-card transition hover:bg-[#05b04d]"
            >
              <span>LINE</span>
              <span>で健康記録を続ける</span>
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
      ) : phase === "score" ? (
        <p className="animate-pulse text-center text-sm font-medium text-leaf">レポートの詳細を読み込んでいます…</p>
      ) : null}
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
