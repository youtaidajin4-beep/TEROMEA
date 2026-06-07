type HealthCheckMysteryPreviewProps = {
  className?: string;
};

const lockedItems = [
  { label: "健康見守りスコア", desc: "今の見守り度を数値で", icon: "📊" },
  { label: "ライフステージ", desc: "年齢に合った段階", icon: "🌱" },
  { label: "見守りポイント", desc: "気をつけたいこと", icon: "💡" },
  { label: "今週のケア", desc: "すぐできるひとこと", icon: "🐾" }
];

export function HealthCheckMysteryPreview({ className = "" }: HealthCheckMysteryPreviewProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] border border-leaf/20 bg-gradient-to-br from-white via-mint/25 to-beige/35 p-6 shadow-card ${className}`}
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-leaf/10 blur-2xl" aria-hidden />

      <div className="relative space-y-5">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-leaf">診断後にわかること</p>
          <p className="mt-1 font-serif text-base font-bold text-navy">レポートに含まれる4つのヒント</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {lockedItems.map((item) => (
            <div
              key={item.label}
              className="relative overflow-hidden rounded-xl border border-white/80 bg-white/75 p-3.5 backdrop-blur-sm"
            >
              <div className="flex items-start gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mint/60 text-base">
                  {item.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-navy">{item.label}</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-slate-500">{item.desc}</p>
                </div>
                <span className="text-[10px] text-slate-300" aria-label="診断後に開示">
                  🔒
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm font-medium text-navy">
          あなたの回答から、<span className="font-bold text-leaf">うちの子だけ</span>のレポートが届きます
        </p>
      </div>
    </div>
  );
}
