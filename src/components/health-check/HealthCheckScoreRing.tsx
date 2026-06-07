type HealthCheckScoreRingProps = {
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  className?: string;
};

const sizeStyles = {
  sm: { outer: "h-20 w-20", score: "text-xl", label: "text-[8px]" },
  md: { outer: "h-28 w-28", score: "text-3xl", label: "text-[10px]" },
  lg: { outer: "h-32 w-32", score: "text-4xl", label: "text-[11px]" }
};

export function HealthCheckScoreRing({ size = "md", glow = false, className = "" }: HealthCheckScoreRingProps) {
  const { outer, score, label } = sizeStyles[size];

  return (
    <div className={`relative flex items-center justify-center ${outer} ${className}`}>
      {glow ? (
        <div className="absolute inset-0 animate-glow rounded-full bg-leaf/20 blur-md" aria-hidden />
      ) : null}
      <div
        className="absolute inset-0 rounded-full opacity-70"
        style={{
          background: "conic-gradient(from 0deg, #4f9f72 0deg, #e8f6ef 100deg, #4f9f72 220deg, #e8f6ef 320deg, #4f9f72 360deg)"
        }}
        aria-hidden
      />
      <div className="relative flex h-[78%] w-[78%] flex-col items-center justify-center rounded-full border border-white/80 bg-white/95 shadow-card backdrop-blur">
        <span className={`font-serif font-bold text-slate-300 ${score}`}>??</span>
        <span className={`font-medium text-slate-400 ${label}`}>スコア</span>
      </div>
    </div>
  );
}
