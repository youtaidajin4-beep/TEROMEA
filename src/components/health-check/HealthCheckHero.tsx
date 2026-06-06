import Image from "next/image";

export function HealthCheckHero() {
  return (
    <section className="animate-fadeSlide relative overflow-hidden rounded-[1.75rem] border border-leaf/20 bg-gradient-to-br from-mint/50 via-white/40 to-beige/50 p-6 text-center shadow-card backdrop-blur-sm">
      <div className="pointer-events-none absolute -left-8 top-4 h-32 w-32 rounded-full bg-[#C69C6D]/25 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-6 top-8 h-28 w-28 rounded-full bg-[#809165]/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute bottom-6 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-[#F26522]/15 blur-3xl" aria-hidden />

      <div className="relative mx-auto flex justify-center">
        <Image
          src="/health-check/zutto-petto-logo.png"
          alt="ZuttoPetto｜ずっとペット"
          width={220}
          height={280}
          priority
          className="animate-float h-auto w-[min(220px,72vw)] drop-shadow-sm"
        />
      </div>

      <div className="relative mt-5 space-y-4">
        <p className="inline-flex rounded-full bg-mint/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-leaf">
          無料 · 約1分
        </p>
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
    </section>
  );
}
