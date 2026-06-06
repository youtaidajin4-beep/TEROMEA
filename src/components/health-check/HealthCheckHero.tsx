const careTopics = [
  { icon: "🍽", label: "食事" },
  { icon: "🚶", label: "運動" },
  { icon: "⚖️", label: "体重" },
  { icon: "💩", label: "便" },
  { icon: "✨", label: "元気" }
];

const heroStats = [
  { value: "無料", label: "いつでも" },
  { value: "約1分", label: "で完了" },
  { value: "11問", label: "かんたん" }
];

function PetSilhouette({ className, color }: { className?: string; color: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M18 22c0-4 2-8 6-8s6 4 6 8-2 6-6 6-6-2-6-6zm16 0c0-4 2-8 6-8s6 4 6 8-2 6-6 6-6-2-6-6zM12 38c2-10 10-16 20-16s18 6 20 16c1 6-4 12-10 12H22c-6 0-11-6-10-12z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M28 44c2 3 6 3 8 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CatSilhouette({ className, color }: { className?: string; color: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M14 24l6-10 6 8M38 22l6-8 6 10M20 38c0-8 6-14 12-14s12 6 12 14c0 6-5 10-12 10s-12-4-12-10z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M26 40c1.5 2 4.5 2 6 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function HealthCheckHero() {
  return (
    <section className="animate-fadeSlide relative overflow-hidden rounded-[1.75rem] border border-leaf/20 bg-gradient-to-br from-mint/60 via-white/50 to-beige/60 p-6 shadow-card backdrop-blur-sm">
      <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-leaf/15 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-8 top-12 h-36 w-36 rounded-full bg-skysoft/50 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-accent/10 blur-3xl" aria-hidden />

      <div className="relative space-y-6 text-center">
        <div className="space-y-2">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-leaf">
            <span className="h-1.5 w-1.5 rounded-full bg-leaf" aria-hidden />
            ZuttoPetto
            <span className="h-1.5 w-1.5 rounded-full bg-leaf" aria-hidden />
          </p>
          <p className="text-[11px] font-medium tracking-wide text-slate-500">うちの子健康寿命チェック</p>
        </div>

        <div className="relative mx-auto flex h-44 max-w-xs items-center justify-center">
          <div
            className="absolute inset-0 rounded-full opacity-50"
            style={{
              background:
                "conic-gradient(from 180deg, rgba(79,159,114,0.35) 0deg, rgba(232,246,239,0.2) 90deg, rgba(224,122,58,0.2) 180deg, rgba(232,246,239,0.2) 270deg, rgba(79,159,114,0.35) 360deg)"
            }}
            aria-hidden
          />
          <div className="absolute inset-3 rounded-full border border-white/60 bg-white/40 backdrop-blur-sm" aria-hidden />

          <PetSilhouette
            className="absolute left-2 top-1/2 h-16 w-16 -translate-y-1/2 animate-float opacity-90"
            color="#C69C6D"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 animate-float" style={{ animationDelay: "1s" }}>
            <CatSilhouette className="h-16 w-16 opacity-90" color="#809165" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-leaf/25 bg-white/90 shadow-card backdrop-blur">
              <span className="font-serif text-2xl font-bold text-leaf">??</span>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">Score</span>
            </div>
            <span
              className="absolute -bottom-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-accent to-orange-400 text-sm shadow-sm"
              aria-hidden
            >
              🐾
            </span>
          </div>

          <span
            className="absolute left-8 top-4 flex h-8 w-8 animate-float items-center justify-center rounded-xl border border-white/80 bg-white/80 text-sm shadow-sm backdrop-blur-sm"
            style={{ animationDelay: "0.5s" }}
            aria-hidden
          >
            🍽
          </span>
          <span
            className="absolute right-8 top-6 flex h-8 w-8 animate-float items-center justify-center rounded-xl border border-white/80 bg-white/80 text-sm shadow-sm backdrop-blur-sm"
            style={{ animationDelay: "1.5s" }}
            aria-hidden
          >
            🚶
          </span>
          <span
            className="absolute bottom-6 left-1/2 flex h-8 w-8 -translate-x-1/2 animate-float items-center justify-center rounded-xl border border-white/80 bg-white/80 text-sm shadow-sm backdrop-blur-sm"
            style={{ animationDelay: "2s" }}
            aria-hidden
          >
            ✨
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {heroStats.map((stat) => (
            <div
              key={stat.value}
              className="rounded-2xl border border-white/70 bg-white/60 px-2 py-3 backdrop-blur-sm"
            >
              <p className="font-serif text-lg font-bold text-navy">{stat.value}</p>
              <p className="text-[10px] font-medium text-slate-500">{stat.label}</p>
            </div>
          ))}
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

        <div className="flex flex-wrap justify-center gap-2">
          {careTopics.map((topic, index) => (
            <span
              key={topic.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-leaf/15 bg-mint/50 px-3 py-1.5 text-xs font-semibold text-navy backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span aria-hidden>{topic.icon}</span>
              {topic.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
