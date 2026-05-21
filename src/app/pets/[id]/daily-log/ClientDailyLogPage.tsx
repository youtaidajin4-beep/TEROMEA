"use client";

import Link from "next/link";
import { Notice } from "@/components/Notice";
import { useLocalPets } from "@/lib/useLocalPets";
import { getLogsByPetId } from "@/lib/mockData";
import { DailyLogForm } from "./DailyLogForm";

export function ClientDailyLogPage({ id }: { id: string }) {
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

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white/80 p-6 shadow-soft md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">Daily Log</p>
        <h1 className="mt-3 text-4xl font-bold text-ink">{pet.name}の毎日の健康記録</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
          散歩、食事、体重、元気度、便の状態を気軽に残しましょう。小さな変化の積み重ねが、次の予防アクションにつながります。
        </p>
      </section>
      <Notice />
      <DailyLogForm petId={pet.id} initialLogs={getLogsByPetId(pet.id)} />
    </div>
  );
}
