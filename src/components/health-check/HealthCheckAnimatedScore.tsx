"use client";

import { useEffect, useState } from "react";

type HealthCheckAnimatedScoreProps = {
  score: number;
  label?: string;
  delay?: number;
  size?: "default" | "hero";
};

const sizeConfig = {
  default: { outer: "h-40 w-40", border: "border-[10px]", score: "text-5xl", label: "text-xs" },
  hero: { outer: "h-48 w-48", border: "border-[12px]", score: "text-6xl", label: "text-sm" }
};

export function HealthCheckAnimatedScore({
  score,
  label = "健康見守りスコア",
  delay = 400,
  size = "default"
}: HealthCheckAnimatedScoreProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [burst, setBurst] = useState(false);
  const { outer, border, score: scoreText, label: labelText } = sizeConfig[size];

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setRevealed(true);
      const duration = 1400;
      const start = performance.now();

      function tick(now: number) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayScore(Math.round(score * eased));

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          setBurst(true);
        }
      }

      requestAnimationFrame(tick);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [score, delay]);

  return (
    <div className="relative mx-auto flex flex-col items-center">
      {burst ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
          <div className="h-full w-full animate-scoreBurst rounded-full bg-leaf/25" />
        </div>
      ) : null}

      <div
        className={`relative flex ${outer} flex-col items-center justify-center rounded-full ${border} border-emerald-100 bg-white shadow-soft transition-transform duration-700 ${
          revealed ? "scale-100" : "scale-75 opacity-60"
        }`}
        style={{
          background: `conic-gradient(#4f9f72 ${displayScore * 3.6}deg, #e8f6ef 0deg)`
        }}
      >
        <div className="flex h-[82%] w-[82%] flex-col items-center justify-center rounded-full bg-white shadow-inner">
          <span className={`font-serif font-bold tabular-nums text-leaf ${scoreText}`}>{displayScore}</span>
          <span className={`mt-1 text-center font-medium text-slate-500 ${labelText}`}>{label}</span>
        </div>
      </div>

      {burst ? (
        <p className="mt-4 animate-popIn font-serif text-base font-bold text-leaf">スコア確定！</p>
      ) : revealed ? (
        <p className="mt-4 text-sm font-medium text-slate-400">算出中…</p>
      ) : null}
    </div>
  );
}
