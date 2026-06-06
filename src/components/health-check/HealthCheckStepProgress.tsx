type HealthCheckStepProgressProps = {
  step: number;
  total: number;
  category: string;
  onBack: () => void;
};

export function HealthCheckStepProgress({ step, total, category, onBack }: HealthCheckStepProgressProps) {
  const progress = ((step + 1) / total) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <button type="button" onClick={onBack} className="font-semibold text-leaf transition hover:text-emerald-700">
          ← 戻る
        </button>
        <span className="text-slate-500">
          {step + 1} / {total}
        </span>
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-leaf">{category}</p>
      <div className="h-1 overflow-hidden rounded-full bg-beige">
        <div
          className="h-full rounded-full bg-gradient-to-r from-leaf to-emerald-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
