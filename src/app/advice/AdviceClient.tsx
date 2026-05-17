"use client";

import { useState } from "react";
import { Notice } from "@/components/Notice";
import { RiskBadge } from "@/components/RiskBadge";
import { ScoreRing } from "@/components/ScoreRing";
import { aiAdviceByPet, pets } from "@/lib/mockData";

export function AdviceClient() {
  const [selectedPetId, setSelectedPetId] = useState(pets[0].id);
  const pet = pets.find((item) => item.id === selectedPetId) ?? pets[0];
  const advice = aiAdviceByPet[pet.id];
  const reason = `${pet.name}は「${pet.lastLogSummary}」という直近傾向があるため、無理なく続けられるケアを優先しています。`;

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white/85 p-6 shadow-soft md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">Mock AI Advice</p>
        <h1 className="mt-3 text-4xl font-bold text-ink md:text-5xl">AI健康アドバイス</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
          選んだペットのモックデータをもとに、食事・運動・相談目安・次回検査をやさしい言葉で提案します。なぜその提案なのかも短く添えます。
        </p>
      </section>

      <Notice />

      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <aside className="rounded-[2rem] bg-white p-6 shadow-soft">
          <label className="text-sm font-semibold text-slate-600" htmlFor="pet-select">
            ペットを選択
          </label>
          <select
            id="pet-select"
            value={selectedPetId}
            onChange={(event) => setSelectedPetId(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-leaf"
          >
            {pets.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}（{item.breed}）
              </option>
            ))}
          </select>
          <div className="mt-6 flex flex-col items-center rounded-3xl bg-cream p-5 text-center">
            <ScoreRing score={pet.telomereScore} size="sm" />
            <h2 className="mt-4 text-2xl font-bold text-ink">{pet.name}</h2>
            <p className="mt-1 text-sm text-slate-600">健康年齢 {pet.biologicalAge}歳</p>
            <div className="mt-3">
              <RiskBadge riskLevel={pet.riskLevel} />
            </div>
            <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm leading-6 text-slate-600">{reason}</p>
          </div>
        </aside>

        <section className="grid gap-4 md:grid-cols-2">
          {[
            ["食事改善", advice.meal, "体重・食事メモから、続けやすい調整を優先します。"],
            ["運動改善", advice.exercise, "直近の活動量と年齢に合わせて、無理のない量にしています。"],
            ["動物病院に相談する目安", advice.hospital, "病気の断定ではなく、変化が続く時の相談タイミングです。"],
            ["次回検査の提案", advice.nextTest, "生活記録と検査結果を一緒に見直すための目安です。"]
          ].map(([title, text, why]) => (
            <article key={title} className="rounded-3xl bg-white p-6 shadow-soft">
              <p className="text-sm font-semibold text-leaf">{title}</p>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
              <p className="mt-4 rounded-2xl bg-cream px-4 py-3 text-sm font-semibold text-slate-600">理由: {why}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
