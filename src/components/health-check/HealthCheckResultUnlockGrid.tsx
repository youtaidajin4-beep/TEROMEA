import type { HealthCheckInsight } from "@/lib/healthCheck";

type UnlockItem = {
  id: string;
  icon: string;
  label: string;
  preview: string;
  delay: string;
};

type HealthCheckResultUnlockGridProps = {
  score: number;
  typeLabel: string;
  insight: HealthCheckInsight;
  visible: boolean;
};

export function HealthCheckResultUnlockGrid({ score, typeLabel, insight, visible }: HealthCheckResultUnlockGridProps) {
  const items: UnlockItem[] = [
    {
      id: "score",
      icon: "📊",
      label: "健康見守りスコア",
      preview: `${score}点 · ${typeLabel}`,
      delay: "0.1s"
    },
    {
      id: "stage",
      icon: "🌱",
      label: "ライフステージ",
      preview: insight.lifeStage.label,
      delay: "0.25s"
    },
    {
      id: "focus",
      icon: "💡",
      label: "見守りポイント",
      preview: insight.focusArea.title,
      delay: "0.4s"
    },
    {
      id: "action",
      icon: "🐾",
      label: "今週のケア",
      preview: insight.thisWeekAction,
      delay: "0.55s"
    }
  ];

  if (!visible) return null;

  return (
    <section className="space-y-4">
      <div className="text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-leaf/10 px-4 py-1.5 text-xs font-bold text-leaf">
          <span aria-hidden>🔓</span>
          レポートが開きました
        </p>
        <h2 className="mt-3 font-serif text-lg font-bold text-navy">
          あなたの回答から、<span className="text-leaf">4つ</span>のヒントが届きました
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            className="animate-unlockReveal relative overflow-hidden rounded-2xl border border-leaf/20 bg-gradient-to-br from-white to-mint/30 p-3.5 opacity-0 shadow-card"
            style={{ animationDelay: item.delay, animationFillMode: "forwards" }}
          >
            <div className="absolute -right-3 -top-3 h-12 w-12 rounded-full bg-leaf/10 blur-xl" aria-hidden />
            <div className="relative flex items-start gap-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm ring-1 ring-leaf/10">
                {item.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-leaf">{item.label}</p>
                  <span className="text-[10px] text-leaf" aria-hidden>
                    ✓
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs font-bold leading-snug text-navy">{item.preview}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
