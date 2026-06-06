type HealthCheckFormTeaserProps = {
  step: number;
  total: number;
  petName?: string;
};

function getTeaserMessage(step: number, total: number, petName?: string): { headline: string; sub: string } {
  const remaining = total - step - 1;
  const name = petName ? `${petName}ちゃん` : "うちの子";

  if (step === total - 1) {
    return {
      headline: "すべての回答が揃いました！",
      sub: `${name}の見守りレポートを作成する準備ができました`
    };
  }

  if (remaining <= 2) {
    return {
      headline: `あと${remaining}問で結果が見られます`,
      sub: "見守りポイントと今週のケアが届きます"
    };
  }

  if (step >= Math.floor(total * 0.5)) {
    return {
      headline: "半分以上回答しました",
      sub: `${name}に合ったライフステージ分析を準備中…`
    };
  }

  if (petName && step >= 2) {
    return {
      headline: `${name}のレポートを作成中`,
      sub: "健康見守りスコアを算出しています…"
    };
  }

  return {
    headline: "診断が始まりました",
    sub: "答えるほど、あなただけの結果が具体化します"
  };
}

export function HealthCheckFormTeaser({ step, total, petName }: HealthCheckFormTeaserProps) {
  const { headline, sub } = getTeaserMessage(step, total, petName);
  const progress = ((step + 1) / total) * 100;

  return (
    <div className="rounded-2xl border border-leaf/15 bg-gradient-to-r from-mint/50 to-white/80 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-leaf/15 text-sm">
          {progress >= 100 ? "🎉" : progress >= 80 ? "✨" : "🔍"}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-navy">{headline}</p>
          <p className="text-xs text-slate-500">{sub}</p>
        </div>
      </div>
    </div>
  );
}
