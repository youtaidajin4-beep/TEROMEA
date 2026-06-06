import { HealthCheckDisclaimer } from "@/components/HealthCheckDisclaimer";
import { HealthCheckMysteryPreview } from "@/components/health-check/HealthCheckMysteryPreview";
import { HealthCheckPrimaryButton } from "@/components/health-check/HealthCheckPrimaryButton";
import { HealthCheckSectionCard } from "@/components/health-check/HealthCheckSectionCard";

const flowSteps = [
  { icon: "📝", title: "かんたん入力", desc: "11の質問に答えるだけ", time: "約1分" },
  { icon: "📊", title: "スコア算出", desc: "健康見守りスコアを表示", time: "すぐに" },
  { icon: "💡", title: "あなただけのヒント", desc: "見守りポイントと今週のケア", time: "パーソナル" }
];

export default function HealthCheckTopPage() {
  return (
    <div className="space-y-8 pb-8">
      <section className="animate-fadeSlide space-y-5 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <p className="inline-flex rounded-full bg-mint/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-leaf">
            無料 · 約1分
          </p>
          <p className="inline-flex rounded-full bg-beige px-4 py-1.5 text-xs font-semibold tracking-wide text-navy">
            ログイン不要
          </p>
        </div>
        <h1 className="font-serif text-3xl font-bold leading-tight text-navy md:text-4xl">
          うちの子の健康寿命を、
          <br />
          <span className="bg-gradient-to-r from-leaf to-emerald-600 bg-clip-text text-transparent">
            毎日のケアへ。
          </span>
        </h1>
        <p className="text-base leading-7 text-slate-600">
          食事・運動・体重・便・元気度から、
          <br />
          <span className="font-semibold text-navy">あなただけの見守りレポート</span>が届きます。
        </p>
      </section>

      <HealthCheckMysteryPreview className="animate-fadeSlide" />

      <HealthCheckSectionCard variant="highlight" eyebrow="3ステップで完了">
        <div className="grid gap-4">
          {flowSteps.map((step, index) => (
            <div key={step.title} className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 animate-float items-center justify-center rounded-2xl bg-white text-xl shadow-sm" style={{ animationDelay: `${index * 0.5}s` }}>
                {step.icon}
              </span>
              <div className="flex-1 pt-0.5">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold text-leaf">STEP {index + 1}</p>
                  <span className="rounded-full bg-beige px-2 py-0.5 text-[10px] font-bold text-slate-500">{step.time}</span>
                </div>
                <p className="font-serif text-base font-bold text-navy">{step.title}</p>
                <p className="mt-0.5 text-sm text-slate-600">{step.desc}</p>
              </div>
            </div>
          ))}
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
