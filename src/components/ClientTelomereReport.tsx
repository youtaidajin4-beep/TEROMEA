"use client";

import Link from "next/link";
import { Notice } from "@/components/Notice";
import { RiskBadge } from "@/components/RiskBadge";
import { ScoreRing } from "@/components/ScoreRing";
import { getAgeGapLabel } from "@/lib/localPets";
import { useLocalPets } from "@/lib/useLocalPets";

export function ClientTelomereReport({ id }: { id: string }) {
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

  const diff = pet.telomereScore - pet.sameAgeAverageScore;
  const ageGap = getAgeGapLabel(pet);
  const careAdvice = [
    ["食事", "たんぱく質・水分・体重の変化を見ながら、急に変えず少しずつ整えましょう。"],
    ["運動", "年齢と体力に合わせて、短く続けやすい散歩や遊びを毎日の習慣にしましょう。"],
    ["睡眠", "静かに休める場所を整え、寝る時間や落ち着き方の変化を記録しましょう。"],
    ["ストレス", "環境変化の後は、食欲・便・元気度をやさしく見守りましょう。"]
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white/85 p-6 shadow-soft md:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">Telomere Report</p>
            <h1 className="mt-3 text-4xl font-bold text-ink md:text-5xl">{pet.name}のテロメア検査結果</h1>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              テロメアスコアは、寿命を断定するものではなく、健康年齢の目安や生活改善の方向性を知るための参考情報です。
            </p>
          </div>
          <ScoreRing score={pet.telomereScore} />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <MetricCard label="実年齢" value={`${pet.age}歳`} tone="bg-cream" />
          <MetricCard label="健康年齢の目安" value={`${pet.biologicalAge}歳`} tone="bg-skysoft" />
          <MetricCard label="年齢差" value={ageGap.gap > 0 ? `+${ageGap.gap}歳` : `${ageGap.gap}歳`} tone="bg-mint" />
          <div className="rounded-3xl bg-white p-5 ring-1 ring-slate-100">
            <p className="text-sm text-slate-500">リスクレベル</p>
            <div className="mt-3">
              <RiskBadge riskLevel={pet.riskLevel} />
            </div>
          </div>
        </div>
      </section>

      <Notice />

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[2rem] bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold text-leaf">この結果の読み方</p>
          <h2 className="mt-2 text-2xl font-bold text-ink">{ageGap.title}</h2>
          <p className="mt-4 leading-7 text-slate-600">{ageGap.message}</p>
          <div className="mt-5 rounded-3xl bg-cream p-5">
            <p className="text-sm text-slate-500">同年齢平均との差</p>
            <p className="mt-2 text-3xl font-bold text-ink">
              {diff >= 0 ? "+" : ""}
              {diff}pt
            </p>
            <p className="mt-2 text-sm text-slate-600">同じ年齢帯のモック平均と比べた参考値です。</p>
          </div>
        </article>

        <article className="rounded-[2rem] bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold text-leaf">差を埋めるための予防ケア</p>
          <div className="mt-4 grid gap-3">
            {pet.todayTasks.map((task) => (
              <p key={task} className="rounded-2xl bg-mint px-4 py-3 text-sm font-bold text-ink">
                {task}
              </p>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {careAdvice.map(([title, text]) => (
          <article key={title} className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="text-xl font-bold text-ink">{title}の改善アドバイス</h2>
            <p className="mt-3 leading-7 text-slate-600">{text}</p>
          </article>
        ))}
      </section>

      <div className="rounded-[2rem] border border-amber-100 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
        テロメア検査は、寿命や病気を確定する検査ではありません。犬種・猫種・体格・生活環境によって差が出るため、結果は日々の健康管理と動物病院への相談の参考として使います。
      </div>

      <Link href={`/pets/${pet.id}`} className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-leaf ring-1 ring-emerald-100">
        {pet.name}の詳細に戻る
      </Link>
    </div>
  );
}

function MetricCard({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className={`rounded-3xl p-5 ${tone}`}>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-ink">{value}</p>
    </div>
  );
}
