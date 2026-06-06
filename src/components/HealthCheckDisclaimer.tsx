type HealthCheckDisclaimerProps = {
  variant?: "compact" | "full";
};

export function HealthCheckDisclaimer({ variant = "full" }: HealthCheckDisclaimerProps) {
  if (variant === "compact") {
    return (
      <p className="text-xs leading-6 text-slate-500">
        本サービスは診断・治療を目的としたものではありません。表示される結果は、健康管理と生活改善の参考情報です。
      </p>
    );
  }

  return (
    <div className="rounded-2xl border border-sky-100 bg-skysoft/70 px-4 py-4 text-sm leading-7 text-slate-700">
      <p>本サービスは診断・治療を目的としたものではありません。</p>
      <p>表示される結果は、健康管理と生活改善の参考情報です。</p>
      <p>気になる変化が続く場合は、動物病院への相談をおすすめします。</p>
    </div>
  );
}
