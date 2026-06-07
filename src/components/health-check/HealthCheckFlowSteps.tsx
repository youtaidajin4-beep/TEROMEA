const flowSteps = [
  { number: "1", icon: "📝", title: "かんたん入力", desc: "11の質問に答える", time: "約1分" },
  { number: "2", icon: "📊", title: "スコア算出", desc: "見守り度を表示", time: "すぐに" },
  { number: "3", icon: "💡", title: "ヒントを受け取る", desc: "今週のケアが届く", time: "パーソナル" }
];

export function HealthCheckFlowSteps() {
  return (
    <section className="space-y-4">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">How it works</p>
        <h2 className="mt-1 font-serif text-lg font-bold text-navy">3ステップで完了</h2>
      </div>

      <div className="relative space-y-0">
        {flowSteps.map((step, index) => (
          <div key={step.number} className="relative flex gap-4">
            {index < flowSteps.length - 1 ? (
              <div className="absolute left-5 top-10 h-[calc(100%-8px)] w-px bg-gradient-to-b from-leaf/40 to-leaf/10" aria-hidden />
            ) : null}

            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-leaf text-sm font-bold text-white shadow-sm">
              {step.number}
            </div>

            <div className={`flex flex-1 items-start gap-3 pb-6 ${index === flowSteps.length - 1 ? "pb-0" : ""}`}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-beige text-lg">
                {step.icon}
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-center gap-2">
                  <p className="font-serif text-sm font-bold text-navy">{step.title}</p>
                  <span className="rounded-full bg-mint px-2 py-0.5 text-[9px] font-bold text-leaf">{step.time}</span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">{step.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
