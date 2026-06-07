"use client";

import { useEffect, useState, useSyncExternalStore, type CSSProperties } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HealthCheckDisclaimer } from "@/components/HealthCheckDisclaimer";
import { HealthCheckAnimatedScore } from "@/components/health-check/HealthCheckAnimatedScore";
import { HealthCheckResultInsightPanel } from "@/components/health-check/HealthCheckResultInsightPanel";
import { HealthCheckResultUnlockGrid } from "@/components/health-check/HealthCheckResultUnlockGrid";
import { LINE_OFFICIAL_URL } from "@/lib/healthCheckConfig";
import { getHealthCheckResultSnapshot, subscribeHealthCheckResult } from "@/lib/healthCheckClient";
import type { HealthCheckResult } from "@/lib/healthCheck";

type RevealPhase = "loading" | "score" | "unlock" | "content";

const stagger = (delay: string): CSSProperties => ({
  animationDelay: delay,
  animationFillMode: "forwards"
});

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

    const scoreTimer = setTimeout(() => setPhase("score"), 300);
    const unlockTimer = setTimeout(() => setPhase("unlock"), 2200);
    const contentTimer = setTimeout(() => setPhase("content"), 3800);

    return () => {
      clearTimeout(scoreTimer);
      clearTimeout(unlockTimer);
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
  const petName = result.input.petName;

  return (
    <div className="space-y-6 pb-8">
      {/* クライマックス：スコア演出 */}
      <section
        className={`relative overflow-hidden rounded-[2rem] border px-5 py-8 text-center shadow-card transition-all duration-700 ${scoreTone.bg} ${
          phase === "loading" ? "opacity-60" : "opacity-100"
        }`}
      >
        <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-leaf/15 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-8 bottom-0 h-36 w-36 rounded-full bg-accent/10 blur-3xl" aria-hidden />

        <div className="relative space-y-5">
          {phase !== "loading" ? (
            <div className="animate-fadeSlide space-y-2">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-4 py-1.5 text-xs font-bold text-leaf shadow-sm ring-1 ring-leaf/15">
                <span aria-hidden>🎉</span>
                レポート完成
              </p>
              <h1 className="font-serif text-2xl font-bold leading-tight text-navy">
                <span className="text-leaf">{petName}ちゃん</span>だけの
                <br />
                健康見守りレポート
              </h1>
              <span className="inline-flex rounded-full border border-leaf/20 bg-white/70 px-4 py-1.5 text-sm font-semibold text-navy">
                {insight.lifeStage.label}
              </span>
            </div>
          ) : (
            <div className="py-4">
              <p className="animate-pulse font-serif text-lg font-bold text-navy">レポートを表示しています…</p>
            </div>
          )}

          {phase !== "loading" ? (
            <>
              <HealthCheckAnimatedScore score={result.score} size="hero" delay={200} />
              <p
                className={`inline-flex animate-popIn rounded-full px-5 py-2.5 text-sm font-bold ${scoreTone.badge}`}
                style={stagger("1.4s")}
              >
                {result.typeLabel}
              </p>
              <p className="text-sm leading-6 text-slate-600">{insight.lifeStage.description}</p>
            </>
          ) : (
            <div className="py-8">
              <span className="animate-pulse text-4xl">📊</span>
            </div>
          )}
        </div>
      </section>

      {/* アンロック演出：トップの MysteryPreview の回収 */}
      <HealthCheckResultUnlockGrid
        score={result.score}
        typeLabel={result.typeLabel}
        insight={insight}
        visible={phase === "unlock" || phase === "content"}
      />

      {phase === "unlock" ? (
        <p className="animate-pulse text-center text-sm font-medium text-leaf">レポートの詳細を展開しています…</p>
      ) : null}

      {/* 詳細レポート */}
      {phase === "content" ? (
        <div className="space-y-5">
          <HealthCheckResultInsightPanel
            eyebrow="いま伝えたいこと"
            icon="💬"
            variant="hero"
            className="animate-staggerIn opacity-0"
            style={stagger("0.05s")}
          >
            <h3 className="font-serif text-xl font-bold leading-8 text-navy">{insight.hero.headline}</h3>
            <p className="mt-3 text-base leading-8 text-slate-700">{insight.hero.body}</p>
          </HealthCheckResultInsightPanel>

          <HealthCheckResultInsightPanel
            eyebrow="いま一番意識したいこと"
            icon="🎯"
            title={insight.focusArea.title}
            variant="focus"
            className="animate-staggerIn opacity-0"
            style={stagger("0.15s")}
          >
            <p className="rounded-xl bg-mint/50 px-4 py-2.5 text-sm font-semibold text-leaf">{insight.focusArea.whyNow}</p>
            <p className="mt-3 text-base leading-8 text-slate-700">{insight.focusArea.insight}</p>
          </HealthCheckResultInsightPanel>

          {insight.patternNote ? (
            <HealthCheckResultInsightPanel
              eyebrow="つながりのヒント"
              icon="🔗"
              title={insight.patternNote.title}
              variant="pattern"
              className="animate-staggerIn opacity-0"
              style={stagger("0.25s")}
            >
              <p className="text-base leading-8 text-slate-700">{insight.patternNote.body}</p>
            </HealthCheckResultInsightPanel>
          ) : null}

          <HealthCheckResultInsightPanel
            eyebrow="今週のひとこと"
            icon="✨"
            variant="action"
            className="animate-staggerIn opacity-0"
            style={stagger("0.35s")}
          >
            <p className="font-serif text-xl font-bold leading-8 text-navy">{insight.thisWeekAction}</p>
            <p className="mt-2 text-sm text-slate-500">今日から試せる、小さな一歩です</p>
          </HealthCheckResultInsightPanel>

          <HealthCheckResultInsightPanel
            eyebrow="もっと深く知る"
            icon="🧬"
            title="テロメア健康年齢チェック"
            variant="default"
            className="animate-staggerIn opacity-0"
            style={stagger("0.45s")}
          >
            <p className="text-base leading-7 text-slate-600">{result.telomereMessage}</p>
          </HealthCheckResultInsightPanel>

          <HealthCheckResultInsightPanel
            eyebrow="次のステップ"
            icon="💚"
            title="LINEで見守りを続ける"
            variant="focus"
            className="animate-staggerIn opacity-0"
            style={stagger("0.55s")}
          >
            <p className="text-base leading-7 text-slate-600">
              この結果をもとに、LINEで週1回の健康記録を続けてみましょう。小さな変化を記録することで、うちの子の状態を見守りやすくなります。
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
          </HealthCheckResultInsightPanel>

          <Link
            href="/health-check/form"
            className="animate-staggerIn flex w-full items-center justify-center rounded-full border border-slate-200 bg-white/90 px-6 py-4 text-base font-bold text-slate-600 opacity-0 transition hover:bg-beige"
            style={stagger("0.65s")}
          >
            もう一度チェックする
          </Link>

          <HealthCheckDisclaimer variant="full" />
        </div>
      ) : null}
    </div>
  );
}

function getScoreTone(score: number) {
  if (score >= 85) {
    return { bg: "border-leaf/25 bg-gradient-to-br from-mint/70 via-white/60 to-beige/40", badge: "bg-leaf/15 text-leaf" };
  }
  if (score >= 70) {
    return { bg: "border-sky-100 bg-gradient-to-br from-skysoft/50 via-white/60 to-mint/30", badge: "bg-sky-100 text-sky-700" };
  }
  if (score >= 55) {
    return { bg: "border-amber-100 bg-gradient-to-br from-amber-50/70 via-white/60 to-beige/40", badge: "bg-amber-100 text-amber-800" };
  }
  return { bg: "border-orange-100 bg-gradient-to-br from-orange-50/60 via-white/60 to-beige/40", badge: "bg-accent/15 text-accent" };
}
