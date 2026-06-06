type HealthCheckStepProgressProps = {
  step: number;
  total: number;
  category: string;
  onBack: () => void;
};

export function HealthCheckStepProgress({ step, total, category, onBack }: HealthCheckStepProgressProps) {
  const progress = ((step + 1) / total) * 100;
  const milestones = [0, Math.floor(total / 3), Math.floor((total * 2) / 3), total - 1];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <button type="button" onClick={onBack} className="font-semibold text-leaf transition hover:text-emerald-700">
          ← 戻る
        </button>
        <span className="rounded-full bg-beige px-3 py-1 text-xs font-bold text-navy">
          {step + 1} / {total}
        </span>
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-leaf">{category}</p>
      <div className="relative">
        <div className="h-1.5 overflow-hidden rounded-full bg-beige">
          <div
            className="h-full rounded-full bg-gradient-to-r from-leaf via-emerald-400 to-leaf transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="absolute -top-1 left-0 flex w-full justify-between px-0.5">
          {milestones.map((milestone) => (
            <span
              key={milestone}
              className={`h-3.5 w-3.5 rounded-full border-2 transition-all duration-300 ${
                step >= milestone
                  ? "border-leaf bg-leaf shadow-sm"
                  : "border-beige bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
