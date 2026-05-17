type ScoreRingProps = {
  score: number;
  label?: string;
  size?: "sm" | "lg";
};

export function ScoreRing({ score, label = "テロメアスコア", size = "lg" }: ScoreRingProps) {
  const boxSize = size === "lg" ? "h-36 w-36" : "h-24 w-24";
  const textSize = size === "lg" ? "text-4xl" : "text-2xl";

  return (
    <div
      className={`${boxSize} flex flex-col items-center justify-center rounded-full border-8 border-emerald-100 bg-white shadow-soft`}
      style={{
        background: `conic-gradient(#4f9f72 ${score * 3.6}deg, #e8f6ef 0deg)`
      }}
    >
      <div className="flex h-[82%] w-[82%] flex-col items-center justify-center rounded-full bg-white">
        <span className={`${textSize} font-bold text-leaf`}>{score}</span>
        <span className="text-center text-xs font-medium text-slate-500">{label}</span>
      </div>
    </div>
  );
}
