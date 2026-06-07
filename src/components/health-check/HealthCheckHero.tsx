import { HealthCheckBrandMark } from "@/components/health-check/HealthCheckBrandMark";
import { HealthCheckScoreRing } from "@/components/health-check/HealthCheckScoreRing";

const careDimensions = [
  { icon: "🍽", label: "食事" },
  { icon: "🚶", label: "運動" },
  { icon: "⚖️", label: "体重" },
  { icon: "💩", label: "便" },
  { icon: "✨", label: "元気" }
];

export function HealthCheckHero() {
  return (
    <section className="animate-fadeSlide relative overflow-hidden rounded-[1.75rem] border border-leaf/20 bg-gradient-to-br from-mint/55 via-white/45 to-beige/55 px-5 py-7 shadow-card backdrop-blur-sm">
      <div className="pointer-events-none absolute -left-10 top-0 h-36 w-36 rounded-full bg-leaf/12 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-8 top-16 h-32 w-32 rounded-full bg-skysoft/45 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-accent/8 blur-3xl" aria-hidden />

      <div className="relative space-y-6">
        <HealthCheckBrandMark />

        <div className="space-y-3 text-center">
          <h1 className="font-serif text-[1.65rem] font-bold leading-tight text-navy md:text-3xl">
            うちの子の健康寿命を、
            <br />
            <span className="bg-gradient-to-r from-leaf to-emerald-600 bg-clip-text text-transparent">
              毎日のケアへ。
            </span>
          </h1>
          <p className="text-sm leading-6 text-slate-600">
            毎日の見守りを、
            <span className="font-semibold text-navy">あなただけのレポート</span>に変えます。
          </p>
        </div>

        <div className="rounded-2xl border border-white/70 bg-white/45 p-5 shadow-sm backdrop-blur-sm">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-leaf">あなたが答えること</p>
            <p className="mt-1 font-serif text-sm font-bold text-navy">5つの日常から、今の見守り度をチェック</p>
          </div>

          <div className="mt-4 grid grid-cols-5 gap-1.5">
            {careDimensions.map((dim) => (
              <div
                key={dim.label}
                className="flex flex-col items-center gap-1 rounded-xl bg-gradient-to-b from-mint/50 to-white/90 py-2.5 ring-1 ring-leaf/10"
              >
                <span className="text-base leading-none" aria-hidden>
                  {dim.icon}
                </span>
                <span className="text-[9px] font-bold text-navy">{dim.label}</span>
              </div>
            ))}
          </div>

          <div className="my-4 flex flex-col items-center gap-1" aria-hidden>
            <div className="h-4 w-px bg-gradient-to-b from-transparent to-leaf/40" />
            <p className="rounded-full bg-leaf/10 px-3 py-1 text-[10px] font-bold text-leaf">11問 · 約1分で完了</p>
            <div className="h-4 w-px bg-gradient-to-b from-leaf/40 to-transparent" />
          </div>

          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-leaf">診断後に届くもの</p>
            <p className="mt-1 font-serif text-sm font-bold text-navy">健康見守りスコアと、今週のケア</p>
          </div>

          <div className="mt-4 flex flex-col items-center">
            <HealthCheckScoreRing size="lg" glow />
            <p className="mt-3 text-xs font-medium text-slate-500">
              答えた内容から、<span className="font-bold text-leaf">うちの子だけ</span>のスコアが算出されます
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
