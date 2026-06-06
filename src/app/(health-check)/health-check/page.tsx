import { HealthCheckDisclaimer } from "@/components/HealthCheckDisclaimer";
import { HealthCheckPrimaryButton } from "@/components/health-check/HealthCheckPrimaryButton";
import { HealthCheckSectionCard } from "@/components/health-check/HealthCheckSectionCard";

const flowSteps = [
  { icon: "📝", title: "かんたん入力", desc: "11の質問に答えるだけ" },
  { icon: "📊", title: "見守りスコア", desc: "いまの状態を参考値で表示" },
  { icon: "💚", title: "ケアのヒント", desc: "うちの子に合った一歩を提案" }
];

export default function HealthCheckTopPage() {
  return (
    <div className="space-y-8 pb-8">
      <section className="animate-fadeSlide space-y-5 text-center">
        <p className="inline-flex rounded-full bg-mint/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-leaf">
          無料 · 約1分
        </p>
        <h1 className="font-serif text-3xl font-bold leading-tight text-navy">
          うちの子の健康寿命を、
          <br />
          毎日のケアへ。
        </h1>
        <p className="text-base leading-7 text-slate-600">
          食事・運動・体重・便・元気度などから、
          <br />
          今の見守りポイントをチェックできます。
        </p>
      </section>

      <HealthCheckSectionCard variant="highlight">
        <div className="grid gap-4">
          {flowSteps.map((step, index) => (
            <div key={step.title} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                {step.icon}
              </span>
              <div className="pt-1">
                <p className="text-xs font-semibold text-leaf">STEP {index + 1}</p>
                <p className="font-serif text-base font-bold text-navy">{step.title}</p>
                <p className="mt-0.5 text-sm text-slate-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </HealthCheckSectionCard>

      <HealthCheckPrimaryButton href="/health-check/form">
        無料で健康寿命チェックをはじめる
      </HealthCheckPrimaryButton>

      <HealthCheckDisclaimer variant="compact" />
    </div>
  );
}
