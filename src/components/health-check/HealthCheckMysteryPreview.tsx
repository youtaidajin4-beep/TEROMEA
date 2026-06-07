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
    <div className={`overflow-hidden rounded-[1.75rem] border border-navy/10 shadow-card ${className}`}>
      <div className="bg-gradient-to-r from-navy to-[#2a3d52] px-5 py-4 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-mint/80">Your Report</p>
        <p className="mt-1 font-serif text-base font-bold text-white">診断後にわかること</p>
      </div>

      <div className="space-y-2 bg-gradient-to-b from-slate-50 to-white p-4">
        {lockedItems.map((item) => (
          <div
            key={item.label}
            className="relative flex items-center gap-3 overflow-hidden rounded-xl border border-slate-100 bg-white px-4 py-3.5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/70 to-white/90 backdrop-blur-[1px]" aria-hidden />
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/5 text-lg">
              {item.icon}
            </span>
            <div className="relative min-w-0 flex-1">
              <p className="text-sm font-bold text-navy">{item.label}</p>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
            <span className="relative shrink-0 rounded-full bg-navy/5 px-2 py-0.5 text-[10px] font-bold text-slate-400">
              🔒 開示前
            </span>
          </div>
        ))}
      </div>

      <p className="border-t border-slate-100 bg-mint/30 px-5 py-3 text-center text-xs font-medium text-navy">
        あなたの回答から、<span className="font-bold text-leaf">うちの子だけ</span>のレポートが届きます
      </p>
    </div>
  );
}
