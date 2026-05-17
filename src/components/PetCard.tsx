import Link from "next/link";
import { type Pet } from "@/lib/mockData";
import { RiskBadge } from "./RiskBadge";
import { ScoreRing } from "./ScoreRing";

export function PetCard({ pet }: { pet: Pet }) {
  return (
    <Link
      href={`/pets/${pet.id}`}
      className="group block rounded-3xl border border-white/80 bg-white/90 p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{pet.ownerName}さんの家族</p>
          <h2 className="mt-1 text-2xl font-bold text-ink">{pet.name}</h2>
          <p className="mt-1 text-sm text-slate-600">
            {pet.breed}・{pet.age}歳・{pet.gender}
          </p>
        </div>
        <RiskBadge riskLevel={pet.riskLevel} />
      </div>
      <div className="mt-5 flex items-center gap-5">
        <ScoreRing score={pet.telomereScore} size="sm" />
        <div className="space-y-2 text-sm text-slate-600">
          <p>
            健康年齢 <span className="font-semibold text-ink">{pet.biologicalAge}歳</span>
          </p>
          <p>
            体重 <span className="font-semibold text-ink">{pet.weight}kg</span>
          </p>
          <p className="line-clamp-2">{pet.latestCondition}</p>
        </div>
      </div>
      <div className="mt-5 rounded-2xl bg-cream p-4">
        <p className="text-xs font-semibold text-slate-500">今日のケア</p>
        <p className="mt-1 text-sm font-bold text-ink">{pet.todayTasks[0]}</p>
        <p className="mt-2 text-xs font-semibold text-leaf">記録継続 {pet.careStreak}日</p>
      </div>
      <p className="mt-5 text-sm font-semibold text-leaf group-hover:text-emerald-700">見守り詳細を見る</p>
    </Link>
  );
}
