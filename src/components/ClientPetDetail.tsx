"use client";

import Link from "next/link";
import { Notice } from "@/components/Notice";
import { RiskBadge } from "@/components/RiskBadge";
import { ScoreRing } from "@/components/ScoreRing";
import { getAgeGapLabel } from "@/lib/localPets";
import { useLocalPets } from "@/lib/useLocalPets";
import { getLogsByPetId } from "@/lib/mockData";

export function ClientPetDetail({ id }: { id: string }) {
  const allPets = useLocalPets();
  const pet = allPets.find((item) => item.id === id);

  if (!pet) {
    return (
      <div className="rounded-[2rem] bg-white p-8 shadow-soft">
        <h1 className="text-2xl font-bold text-ink">ペットが見つかりません</h1>
        <Link href="/pets" className="mt-5 inline-flex rounded-full bg-leaf px-5 py-3 text-sm font-bold text-white">
          うちの子一覧へ
        </Link>
      </div>
    );
  }

  const logs = getLogsByPetId(pet.id).slice(0, 3);
  const ageGap = getAgeGapLabel(pet);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 rounded-[2rem] bg-white/80 p-6 shadow-soft lg:grid-cols-[0.8fr_1.2fr] lg:p-8">
        <div className="flex flex-col items-center justify-center rounded-3xl bg-cream p-6 text-center">
          <ScoreRing score={pet.telomereScore} />
          <h1 className="mt-5 text-4xl font-bold text-ink">{pet.name}</h1>
          <p className="mt-2 text-slate-600">
            {pet.breed}・{pet.age}歳・{pet.gender}
          </p>
          <p className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-leaf">記録継続 {pet.careStreak}日</p>
        </div>
        <div className="space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">Care Summary</p>
              <h2 className="mt-2 text-3xl font-bold text-ink">今の状態と次のケア</h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">{pet.lastLogSummary}</p>
            </div>
            <RiskBadge riskLevel={pet.riskLevel} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["飼い主", pet.ownerName],
              ["実年齢", `${pet.age}歳`],
              ["健康年齢", `${pet.biologicalAge}歳`],
              ["体重", `${pet.weight}kg`],
              ["保険プラン", pet.insurancePlan],
              ["次回検査", pet.nextCheckupDate]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-1 font-bold text-ink">{value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-3xl bg-mint p-5">
            <p className="text-sm font-semibold text-leaf">テロメアから見たヒント</p>
            <p className="mt-2 text-lg font-bold text-ink">{ageGap.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{ageGap.message}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={`/pets/${pet.id}/telomere`} className="rounded-full bg-leaf px-5 py-3 text-sm font-bold text-white">
              検査結果を見る
            </Link>
            <Link href={`/pets/${pet.id}/daily-log`} className="rounded-full bg-white px-5 py-3 text-sm font-bold text-leaf ring-1 ring-emerald-100">
              毎日の記録へ
            </Link>
          </div>
        </div>
      </section>

      <Notice />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-ink">今日やること</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {pet.todayTasks.map((task, index) => (
            <article key={task} className="rounded-3xl bg-white p-5 shadow-soft">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-leaf text-sm font-bold text-white">{index + 1}</span>
              <p className="mt-4 font-bold text-ink">{task}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold text-leaf">気をつけるサイン</p>
          <div className="mt-4 space-y-3">
            {pet.watchSigns.map((sign) => (
              <p key={sign} className="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
                {sign}
              </p>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-ink">最近の記録</h2>
          <div className="grid gap-4">
            {logs.length > 0 ? (
              logs.map((log) => (
                <article key={`${log.petId}-${log.date}`} className="rounded-3xl bg-white p-5 shadow-soft">
                  <div className="flex flex-wrap justify-between gap-3">
                    <p className="text-sm font-semibold text-leaf">{log.date}</p>
                    <p className="text-sm font-semibold text-slate-500">通院 {log.hospitalVisit ? "あり" : "なし"}</p>
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
                    <p>散歩・遊び: {log.walkMinutes}分</p>
                    <p>食事: {log.mealQuality}</p>
                    <p>元気度: {log.energyLevel}</p>
                  </div>
                  <p className="mt-3 text-sm text-slate-500">{log.memo}</p>
                </article>
              ))
            ) : (
              <div className="rounded-3xl bg-white p-6 shadow-soft">
                <p className="font-bold text-ink">まだ記録がありません</p>
                <p className="mt-2 text-sm text-slate-600">今日の食事や元気度から、気軽に記録してみましょう。</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
