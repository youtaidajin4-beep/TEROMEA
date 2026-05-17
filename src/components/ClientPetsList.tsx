"use client";

import Link from "next/link";
import { PetCard } from "@/components/PetCard";
import { useLocalPets } from "@/lib/useLocalPets";

export function ClientPetsList() {
  const allPets = useLocalPets();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[2rem] bg-white p-5 shadow-soft">
        <div>
          <p className="text-sm font-semibold text-leaf">登録中の家族</p>
          <p className="mt-1 text-2xl font-bold text-ink">{allPets.length}匹</p>
        </div>
        <Link href="/pets/new" className="rounded-full bg-leaf px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">
          うちの子を追加
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {allPets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
}
