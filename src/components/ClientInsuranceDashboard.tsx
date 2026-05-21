"use client";

import { Notice } from "@/components/Notice";
import { useLocalPets } from "@/lib/useLocalPets";
import {
  dailyLogs,
  getInterventionLabel,
  getInterventionTone,
  getRiskLabel,
  getRiskTone,
  hospitalVisitTrend,
  insurerDashboardInsights,
  insurerOnboardingSteps,
  lossRatioSimulation
} from "@/lib/mockData";

export function ClientInsuranceDashboard() {
  const allPets = useLocalPets();

  const averageScore = Math.round(allPets.reduce((sum, pet) => sum + pet.telomereScore, 0) / Math.max(allPets.length, 1));
  const highRiskCount = allPets.filter((pet) => pet.riskLevel === "high").length;
  const totalVisits = dailyLogs.filter((log) => log.hospitalVisit).length + allPets.reduce((sum, pet) => sum + pet.recentHospitalVisits, 0);
  const maxVisits = Math.max(...hospitalVisitTrend.map((item) => item.visits));
  const savedRatio = lossRatioSimulation.currentLossRatio - lossRatioSimulation.expectedLossRatio;
  const interventionTargets = allPets.filter((pet) => pet.interventionPriority === "urgent" || pet.interventionPriority === "high");
  const highRiskRate = Math.round((highRiskCount / Math.max(allPets.length, 1)) * 100);
  const visitRate = Math.round((allPets.reduce((sum, pet) => sum + pet.recentHospitalVisits, 0) / Math.max(allPets.length, 1)) * 100);
  const totalReduction = allPets.reduce((sum, pet) => sum + pet.estimatedClaimReduction, 0);
  const localPetCount = Math.max(allPets.length - 6, 0);

  const riskDistribution = [
    { label: "低リスク", count: allPets.filter((pet) => pet.riskLevel === "low").length, tone: "bg-emerald-500" },
    { label: "中リスク", count: allPets.filter((pet) => pet.riskLevel === "middle").length, tone: "bg-amber-500" },
    { label: "高リスク", count: allPets.filter((pet) => pet.riskLevel === "high").length, tone: "bg-rose-500" }
  ];
  const segmentScores = (["young", "adult", "senior"] as const).map((segment) => {
    const segmentPets = allPets.filter((pet) => pet.segment === segment);
    return {
      segment,
      label: { young: "若年", adult: "成犬・成猫", senior: "シニア" }[segment],
      score: segmentPets.length > 0 ? Math.round(segmentPets.reduce((sum, pet) => sum + pet.telomereScore, 0) / segmentPets.length) : 0
    };
  });
  const typeScores = (["dog", "cat"] as const).map((type) => {
    const typePets = allPets.filter((pet) => pet.type === type);
    return {
      type,
      label: type === "dog" ? "犬" : "猫",
      score: typePets.length > 0 ? Math.round(typePets.reduce((sum, pet) => sum + pet.telomereScore, 0) / typePets.length) : 0
    };
  });

  const metrics = [
    ["契約ペット数", `${allPets.length}匹`, `ユーザー追加 ${localPetCount}匹を含む`],
    ["平均テロメアスコア", `${averageScore}pt`, "全契約ペット平均"],
    ["高リスク率", `${highRiskRate}%`, `${highRiskCount}匹が高リスク`],
    ["介入対象数", `${interventionTargets.length}匹`, "最優先・高の合計"],
    ["通院発生率", `${visitRate}%`, "直近記録ベース"],
    ["損害率改善幅", `${savedRatio}pt`, "予防介入後シナリオ"]
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Insurance Dashboard</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight md:text-5xl">
          予防介入で、将来の保険金支払いを抑える。
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-300">
          テロメアスコアと日々の健康記録を使い、高リスク化する前の生活改善を支援するBtoB向け管理画面です。
          このデモでは、飼い主が追加したペットも集計に含めます。
        </p>
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-soft md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">At a glance</p>
        <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">この画面で分かること</h2>
        <ul className="mt-5 space-y-4 text-base leading-7 text-slate-700 md:text-lg">
          {insurerDashboardInsights.map((line) => (
            <li key={line} className="flex gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-leaf" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[2rem] border border-emerald-100 bg-mint/60 p-6 shadow-soft md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">Onboarding</p>
        <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">保険会社導入フロー</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
          導入後の業務の流れをイメージしやすくするためのデモです。実運用では契約・個人情報の取り扱いに合わせて調整します。
        </p>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {insurerOnboardingSteps.map((step, index) => (
            <li key={step} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-leaf text-sm font-bold text-white">
                {index + 1}
              </span>
              <p className="text-sm font-semibold leading-6 text-ink">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <Notice />

      <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {metrics.map(([label, value, note]) => (
          <article key={label} className="rounded-3xl bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-bold text-ink">{value}</p>
            <p className="mt-2 text-sm text-slate-500">{note}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
        <article className="rounded-[2rem] bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold text-leaf">リスクレベル別分布</p>
          <h2 className="mt-2 text-2xl font-bold text-ink">ポートフォリオ構成</h2>
          <div className="mt-6 space-y-4">
            {riskDistribution.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm font-semibold text-slate-600">
                  <span>{item.label}</span>
                  <span>{item.count}匹</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${item.tone}`} style={{ width: `${(item.count / Math.max(allPets.length, 1)) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold text-leaf">犬/猫別 平均スコア</p>
          <h2 className="mt-2 text-2xl font-bold text-ink">種別比較</h2>
          <div className="mt-6 grid gap-4">
            {typeScores.map((item) => (
              <div key={item.type} className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-500">{item.label}</p>
                <p className="mt-2 text-3xl font-bold text-ink">{item.score}pt</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold text-leaf">年齢帯別 平均スコア</p>
          <h2 className="mt-2 text-2xl font-bold text-ink">介入タイミング分析</h2>
          <div className="mt-6 space-y-3">
            {segmentScores.map((item) => (
              <div key={item.segment} className="flex items-center justify-between rounded-2xl bg-cream px-4 py-3">
                <span className="text-sm font-semibold text-slate-600">{item.label}</span>
                <span className="text-lg font-bold text-ink">{item.score}pt</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[2rem] bg-white p-6 shadow-soft">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-leaf">通院回数の推移</p>
              <h2 className="mt-2 text-2xl font-bold text-ink">生活改善フォロー後の変化</h2>
            </div>
            <p className="text-sm text-slate-500">直近記録内の通院: {totalVisits}件</p>
          </div>
          <div className="mt-8 space-y-4">
            {hospitalVisitTrend.map((item) => (
              <div key={item.month} className="grid grid-cols-[3rem_1fr_3rem] items-center gap-3">
                <p className="text-sm font-semibold text-slate-600">{item.month}</p>
                <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-leaf" style={{ width: `${(item.visits / maxVisits) * 100}%` }} />
                </div>
                <p className="text-right text-sm font-bold text-ink">{item.visits}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold text-leaf">損害率改善シミュレーション</p>
          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl bg-rose-50 p-5">
              <p className="text-sm text-slate-500">現状の想定損害率</p>
              <p className="mt-2 text-4xl font-bold text-rose-700">{lossRatioSimulation.currentLossRatio}%</p>
            </div>
            <div className="rounded-3xl bg-emerald-50 p-5">
              <p className="text-sm text-slate-500">予防介入後の想定損害率</p>
              <p className="mt-2 text-4xl font-bold text-leaf">{lossRatioSimulation.expectedLossRatio}%</p>
            </div>
          </div>
          <p className="mt-5 leading-7 text-slate-600">
            予防介入率{lossRatioSimulation.preventionReach}%のシナリオでは、損害率を{savedRatio}pt改善し、
            年間約{(lossRatioSimulation.projectedClaimReduction / 10000).toLocaleString()}万円の保険金支払い抑制余地を見込みます。
          </p>
        </article>
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-soft">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-leaf">介入優先リスト</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">損害率改善につながるフォロー候補</h2>
          </div>
          <p className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white">
            期待削減額 合計 {(totalReduction / 10000).toLocaleString()}万円
          </p>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="py-3">ペット</th>
                <th className="py-3">種別/年齢</th>
                <th className="py-3">プラン</th>
                <th className="py-3">スコア</th>
                <th className="py-3">リスク</th>
                <th className="py-3">介入優先度</th>
                <th className="py-3">直近通院</th>
                <th className="py-3">期待効果</th>
                <th className="py-3">推奨介入</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allPets
                .slice()
                .sort((a, b) => b.claimRiskScore - a.claimRiskScore)
                .map((pet) => (
                  <tr key={pet.id}>
                    <td className="py-4 font-bold text-ink">{pet.name}</td>
                    <td className="py-4 text-slate-600">
                      {pet.type === "dog" ? "犬" : "猫"} / {pet.age}歳
                    </td>
                    <td className="py-4 text-slate-600">{pet.insurancePlan}</td>
                    <td className="py-4 text-slate-600">
                      {pet.telomereScore}pt / 請求リスク{pet.claimRiskScore}
                    </td>
                    <td className="py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${getRiskTone(pet.riskLevel)}`}>
                        {getRiskLabel(pet.riskLevel)}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${getInterventionTone(pet.interventionPriority)}`}>
                        {getInterventionLabel(pet.interventionPriority)}
                      </span>
                    </td>
                    <td className="py-4 text-slate-600">{pet.recentHospitalVisits}件</td>
                    <td className="py-4 font-bold text-ink">{(pet.estimatedClaimReduction / 10000).toLocaleString()}万円</td>
                    <td className="py-4 text-slate-600">{pet.recommendedAction}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
