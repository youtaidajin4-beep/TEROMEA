"use client";

import { useEffect, useState } from "react";

const messages = [
  "うちの子の回答を読み取っています…",
  "ライフステージを確認しています…",
  "見守りポイントを整理しています…",
  "あなただけのレポートを作成中…"
];

type HealthCheckAnalyzingOverlayProps = {
  petName: string;
  onComplete: () => void;
};

export function HealthCheckAnalyzingOverlay({ petName, onComplete }: HealthCheckAnalyzingOverlayProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setMessageIndex((current) => (current + 1) % messages.length);
    }, 600);

    const progressTimer = setInterval(() => {
      setProgress((current) => Math.min(current + 4, 100));
    }, 80);

    const completeTimer = setTimeout(onComplete, 2400);

    return () => {
      clearInterval(messageTimer);
      clearInterval(progressTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 px-6 backdrop-blur-sm">
      <div className="w-full max-w-sm animate-popIn rounded-[2rem] bg-white p-8 text-center shadow-soft">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint">
          <span className="animate-pulse text-2xl">✨</span>
        </div>
        <p className="mt-5 font-serif text-xl font-bold text-navy">{petName}ちゃんのレポート作成中</p>
        <p className="mt-2 text-sm text-slate-500">{messages[messageIndex]}</p>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-beige">
          <div
            className="h-full rounded-full bg-gradient-to-r from-leaf to-emerald-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-xs text-slate-400">もうすぐ結果が見られます</p>
      </div>
    </div>
  );
}
