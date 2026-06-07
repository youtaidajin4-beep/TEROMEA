import { HealthCheckDisclaimer } from "@/components/HealthCheckDisclaimer";
import { HealthCheckFlowSteps } from "@/components/health-check/HealthCheckFlowSteps";
import { HealthCheckHero } from "@/components/health-check/HealthCheckHero";
import { HealthCheckMysteryPreview } from "@/components/health-check/HealthCheckMysteryPreview";
import { HealthCheckPrimaryButton } from "@/components/health-check/HealthCheckPrimaryButton";

export default function HealthCheckTopPage() {
  return (
    <div className="space-y-8 pb-8">
      <HealthCheckHero />

      <HealthCheckMysteryPreview className="animate-fadeSlide" />

      <div className="animate-fadeSlide rounded-[1.75rem] border border-slate-100/80 bg-white/60 px-5 py-6 shadow-sm backdrop-blur-sm">
        <HealthCheckFlowSteps />
      </div>

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
