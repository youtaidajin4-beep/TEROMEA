"use client";

import { useEffect, useState } from "react";

type HealthCheckAnimatedScoreProps = {
  score: number;
  label?: string;
  delay?: number;
};

export function HealthCheckAnimatedScore({ score, label = "健康見守りスコア", delay = 400 }: HealthCheckAnimatedScoreProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setRevealed(true);
      const duration = 1200;
      const start = performance.now();

      function tick(now: number) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayScore(Math.round(score * eased));

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      }

      requestAnimationFrame(tick);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [score, delay]);

  return (
    <div className="relative mx-auto flex flex-col items-center">
      <div
        className={`relative flex h-40 w-40 flex-col items-center justify-center rounded-full border-[10px] border-emerald-100 bg-white shadow-soft transition-transform duration-700 ${
          revealed ? "scale-100" : "scale-90"
        }`}
        style={{
          background: `conic-gradient(#4f9f72 ${displayScore * 3.6}deg, #e8f6ef 0deg)`
        }}
      >
        <div className="flex h-[82%] w-[82%] flex-col items-center justify-center rounded-full bg-white">
          <span className="font-serif text-5xl font-bold tabular-nums text-leaf">{displayScore}</span>
          <span className="mt-1 text-center text-xs font-medium text-slate-500">{label}</span>
        </div>
      </div>
      {revealed && displayScore === score ? (
        <p className="mt-3 animate-popIn text-sm font-semibold text-leaf">スコアが出ました</p>
      ) : null}
    </div>
  );
}
