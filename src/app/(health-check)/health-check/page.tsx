import { HealthCheckDisclaimer } from "@/components/HealthCheckDisclaimer";
import { HealthCheckHero } from "@/components/health-check/HealthCheckHero";
import { HealthCheckMysteryPreview } from "@/components/health-check/HealthCheckMysteryPreview";
import { HealthCheckPrimaryButton } from "@/components/health-check/HealthCheckPrimaryButton";
import { HealthCheckSectionCard } from "@/components/health-check/HealthCheckSectionCard";

const flowSteps = [
  { icon: "📝", title: "かんたん入力", desc: "11の質問", time: "約1分" },
  { icon: "📊", title: "スコア算出", desc: "見守り度を表示", time: "すぐに" },
  { icon: "💡", title: "ヒントを受け取る", desc: "今週のケア", time: "パーソナル" }
];

export default function HealthCheckTopPage() {
  return (
    <div className="space-y-8 pb-8">
      <HealthCheckHero />

      <HealthCheckMysteryPreview className="animate-fadeSlide" />

      <HealthCheckSectionCard variant="highlight" eyebrow="3ステップで完了" title="はじめてでもかんたん">
        <div className="relative mt-2">
          <div className="absolute left-[16.67%] right-[16.67%] top-6 h-px bg-gradient-to-r from-transparent via-leaf/30 to-transparent" aria-hidden />
          <div className="grid grid-cols-3 gap-3">
            {flowSteps.map((step, index) => (
              <div key={step.title} className="relative flex flex-col items-center text-center">
                <span
                  className="relative z-10 flex h-12 w-12 animate-float items-center justify-center rounded-2xl border border-white/80 bg-white text-lg shadow-sm"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  {step.icon}
                </span>
                <span className="mt-2 rounded-full bg-beige px-2 py-0.5 text-[9px] font-bold text-slate-500">{step.time}</span>
                <p className="mt-1.5 font-serif text-xs font-bold leading-snug text-navy">{step.title}</p>
                <p className="mt-0.5 text-[10px] leading-snug text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </HealthCheckSectionCard>

      <div className="space-y-3">
        <HealthCheckPrimaryButton href="/health-check/form" pulse>
          無料で健康寿命チェックをはじめる
        </HealthCheckPrimaryButton>
        <p className="text-center text-xs text-slate-400">診断結果はその場ですぐに見られます</p>
      </div>

      <HealthCheckDisclaimer variant="compact" />
    </div>
  );
}
