type HealthCheckStepProgressProps = {
  step: number;
  total: number;
  category: string;
  petName?: string;
  onBack: () => void;
};

function getProgressMessage(step: number, total: number, petName?: string) {
  const remaining = total - step - 1;
  const name = petName ? `${petName}ちゃん` : "うちの子";
  const current = step + 1;

  if (step === total - 1) {
    return { headline: "ラストの質問です！", sub: `${name}のレポートが完成間近`, emoji: "🎉" };
  }
  if (remaining === 1) {
    return { headline: "あと1問で結果が見られます", sub: "見守りポイントと今週のケアが届きます", emoji: "✨" };
  }
  if (remaining <= 3) {
    return { headline: `あと${remaining}問`, sub: "もう少しでレポート完成", emoji: "🐾" };
  }
  if (current >= Math.ceil(total / 2)) {
    return { headline: "半分以上クリア！", sub: `${name}に合った分析を準備中`, emoji: "🌱" };
  }
  if (petName && current >= 3) {
    return { headline: `${name}のレポート作成中`, sub: "答えるほど結果が具体化します", emoji: "🔍" };
  }
  return { headline: "診断スタート", sub: "11問のかんたんチェック", emoji: "🐕" };
}

export function HealthCheckStepProgress({ step, total, category, petName, onBack }: HealthCheckStepProgressProps) {
  const progress = ((step + 1) / total) * 100;
  const remaining = total - step - 1;
  const { headline, sub, emoji } = getProgressMessage(step, total, petName);

  return (
    <div className="overflow-hidden rounded-2xl border border-leaf/15 bg-white/90 shadow-card backdrop-blur-sm">
      <div className="px-4 pt-3">
        <div className="flex items-center justify-between">
          <button type="button" onClick={onBack} className="text-sm font-semibold text-leaf transition hover:text-emerald-700">
            ← 戻る
          </button>
          {step < total - 1 ? (
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold text-accent">
              あと{remaining}問
            </span>
          ) : (
            <span className="rounded-full bg-leaf/10 px-2.5 py-0.5 text-[10px] font-bold text-leaf">最終問</span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint text-lg">{emoji}</span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-navy">{headline}</p>
            <p className="text-xs text-slate-500">{sub}</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-[10px] font-bold text-slate-400">
            <span className="uppercase tracking-wider text-leaf">{category}</span>
            <span className="tabular-nums text-navy">
              {step + 1} / {total}
            </span>
          </div>

          <div className="relative h-3 overflow-visible rounded-full bg-beige">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-leaf via-emerald-400 to-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
            <span
              className="absolute top-1/2 -translate-y-1/2 text-sm transition-all duration-500 ease-out"
              style={{ left: `clamp(0px, calc(${progress}% - 10px), calc(100% - 20px))` }}
              aria-hidden
            >
              🐾
            </span>
          </div>

          <div className="mt-2.5 flex justify-between gap-0.5 px-0.5">
            {Array.from({ length: total }, (_, index) => (
              <span
                key={index}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  index <= step ? "bg-leaf" : "bg-beige"
                }`}
                aria-hidden
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
