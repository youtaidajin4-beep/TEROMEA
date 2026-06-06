import { HealthCheckBrandMark } from "@/components/health-check/HealthCheckBrandMark";

export function HealthCheckHero() {
  return (
    <section className="animate-fadeSlide relative overflow-hidden rounded-[1.75rem] border border-leaf/20 bg-gradient-to-br from-mint/50 via-white/40 to-beige/50 px-6 py-8 text-center shadow-card backdrop-blur-sm">
      <div className="pointer-events-none absolute -left-8 top-0 h-32 w-32 rounded-full bg-leaf/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-6 top-10 h-28 w-28 rounded-full bg-skysoft/40 blur-3xl" aria-hidden />

      <div className="relative space-y-5">
        <HealthCheckBrandMark />

        <p className="inline-flex rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-leaf ring-1 ring-leaf/15">
          無料 · 約1分 · 11問
        </p>

        <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full opacity-60"
            style={{
              background: "conic-gradient(from 0deg, #4f9f72 0deg, #e8f6ef 120deg, #4f9f72 240deg, #e8f6ef 360deg)"
            }}
            aria-hidden
          />
          <div className="relative flex h-[78%] w-[78%] flex-col items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur">
            <span className="font-serif text-2xl font-bold text-slate-300">??</span>
            <span className="text-[9px] font-medium text-slate-400">スコア</span>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="font-serif text-2xl font-bold leading-tight text-navy md:text-3xl">
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
        </div>
      </div>
    </section>
  );
}
