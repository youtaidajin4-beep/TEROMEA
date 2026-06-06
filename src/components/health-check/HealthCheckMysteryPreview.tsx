type HealthCheckMysteryPreviewProps = {
  className?: string;
};

const lockedItems = [
  { label: "健康見守りスコア", icon: "📊" },
  { label: "ライフステージ", icon: "🌱" },
  { label: "見守りポイント", icon: "💡" },
  { label: "今週のケア", icon: "🐾" }
];

export function HealthCheckMysteryPreview({ className = "" }: HealthCheckMysteryPreviewProps) {
  return (
    <div className={`relative overflow-hidden rounded-[1.75rem] border border-leaf/20 bg-gradient-to-br from-white via-mint/30 to-beige/40 p-6 shadow-card ${className}`}>
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-leaf/10 blur-2xl" />
      <p className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-leaf">診断後にわかること</p>

      <div className="relative mx-auto mt-5 flex h-28 w-28 items-center justify-center">
        <div
          className="absolute inset-0 rounded-full opacity-60"
          style={{
            background: "conic-gradient(from 0deg, #4f9f72 0deg, #e8f6ef 120deg, #4f9f72 240deg, #e8f6ef 360deg)"
          }}
        />
        <div className="relative flex h-[78%] w-[78%] flex-col items-center justify-center rounded-full bg-white/95 backdrop-blur">
          <span className="font-serif text-3xl font-bold text-slate-300">??</span>
          <span className="text-[10px] font-medium text-slate-400">スコア</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {lockedItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 rounded-xl border border-white/80 bg-white/70 px-3 py-2.5 backdrop-blur-sm"
          >
            <span className="text-base opacity-70">{item.icon}</span>
            <span className="text-xs font-semibold text-slate-600">{item.label}</span>
            <span className="ml-auto text-[10px] text-slate-400">🔒</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-sm font-medium text-navy">
        あなたの回答から、<span className="text-leaf">うちの子だけ</span>のレポートが届きます
      </p>
    </div>
  );
}
