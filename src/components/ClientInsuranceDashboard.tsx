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
  insurerPreventionMenuItems,
  lossRatioSimulation
} from "@/lib/mockData";

const servicePurposeNotice =
  "本サービスは診断・治療・保険審査を目的としたものではありません。表示されるスコアやシミュレーションは、健康管理と予防行動を支援するための参考情報です。気になる変化が続く場合は、動物病院への相談をおすすめします。";

const demoDataNotice =
  "※この画面の数値はデモ用の仮データです。実際の導入時には、契約ペット数・通院履歴・保険金請求データ・健康記録データをもとに個別算出します。";

const simulationDemoFootnote =
  "※この数値はデモ用の仮説シミュレーションです。実際の導入時には、契約ペット数・通院履歴・保険金請求データ・健康記録データをもとに個別算出します。";

const claimRiskTableFootnote =
  "※請求リスクは、年齢・健康記録・通院記録・テロメアスコアをもとにしたデモ用の参考指標です。実際の保険審査や保険料算定には使用しません。";

const teromeaLegalNotice =
  "TEROMEAのスコアは、契約者の健康支援・予防行動支援を目的とした参考情報です。保険加入可否、保険料算定、保険金支払い可否を直接判断するものではありません。";

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
    ["平均テロメアスコア", `${averageScore}pt`, "全契約ペット平均（健康管理の参考）"],
    ["高リスク率", `${highRiskRate}%`, `${highRiskCount}匹が高リスク（参考分布）`],
    ["介入対象数", `${interventionTargets.length}匹`, "フォロー優先の参考（最優先・高）"],
    ["通院発生率", `${visitRate}%`, "直近記録ベースの参考値"],
    ["損害率改善シミュレーション", `${savedRatio}pt`, "仮説シミュレーション上の差分（参考）"]
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Insurance Dashboard</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight md:text-5xl">
          予防介入で、将来の通院リスクと保険金支払いの抑制を目指す。
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-300">
          テロメアスコアと日々の健康記録をもとに、健康変化の早期把握と生活改善フォローを支援するBtoB向け管理画面です。
          このデモでは、飼い主が追加したペットも集計に含めます。
        </p>
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-soft md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">Dashboard</p>
        <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">このダッシュボードでできること</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {insurerDashboardInsights.map((line) => (
            <div key={line} className="rounded-2xl border border-slate-100 bg-cream/40 p-5 shadow-sm">
              <p className="text-sm font-semibold leading-7 text-slate-800">{line}</p>
            </div>
          ))}
        </div>
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

      <section className="rounded-[2rem] border border-sky-100 bg-skysoft/80 p-6 shadow-soft md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-600">Important</p>
        <p className="mt-3 text-sm leading-7 text-slate-700 md:text-[0.9375rem]">{servicePurposeNotice}</p>
        <p className="mt-4 text-sm leading-7 text-slate-600 md:text-[0.9375rem]">{demoDataNotice}</p>
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

      <section className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-soft md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">Prevention</p>
        <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">予防介入メニュー</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
          高リスク化の兆しがある契約ペットに対して、飼い主の生活改善行動を促すためのフォロー施策です。
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {insurerPreventionMenuItems.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-ink"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[2rem] bg-white p-6 shadow-soft">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-leaf">通院回数の推移</p>
              <h2 className="mt-2 text-2xl font-bold text-ink">通院件数の推移（デモ・参考）</h2>
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
              <p className="text-sm text-slate-500">現状の想定損害率（参考）</p>
              <p className="mt-2 text-4xl font-bold text-rose-700">{lossRatioSimulation.currentLossRatio}%</p>
            </div>
            <div className="rounded-3xl bg-emerald-50 p-5">
              <p className="text-sm text-slate-500">予防介入後の想定損害率（仮説）</p>
              <p className="mt-2 text-4xl font-bold text-leaf">{lossRatioSimulation.expectedLossRatio}%</p>
            </div>
          </div>
          <p className="mt-5 leading-7 text-slate-600">
            予防介入率{lossRatioSimulation.preventionReach}%の仮説シナリオでは、損害率が約{savedRatio}pt低下する可能性を検証した一例です。年間の
            <span className="font-semibold text-ink">改善インパクト試算</span>
            として、約{(lossRatioSimulation.projectedClaimReduction / 10000).toLocaleString()}
            万円の保険金支払い抑制の可能性を参考として示しています。
          </p>
          <p className="mt-4 text-xs leading-6 text-slate-500">{simulationDemoFootnote}</p>
        </article>
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-soft">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-leaf">介入優先リスト</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">生活改善フォローの優先候補</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">健康管理の参考情報として、フォローを検討しやすい順に並べています。</p>
          </div>
          <p className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white">
            改善インパクト試算 合計 {(totalReduction / 10000).toLocaleString()}万円
          </p>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="py-3">ペット</th>
                <th className="py-3">種別/年齢</th>
                <th className="py-3">プラン</th>
                <th className="py-3 pr-2">
                  <div>スコア</div>
                  <div className="mt-1 text-xs font-normal text-slate-400">（健康管理の参考）</div>
                </th>
                <th className="py-3">リスク</th>
                <th className="py-3">介入優先度</th>
                <th className="py-3">直近通院</th>
                <th className="py-3">参考インパクト</th>
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
                      <div className="font-medium text-ink">{pet.telomereScore}pt</div>
                      <div className="mt-1 text-xs text-slate-500">
                        請求リスク（参考） <span className="font-semibold text-ink">{pet.claimRiskScore}</span>
                      </div>
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
        <p className="mt-4 text-xs leading-6 text-slate-500">{claimRiskTableFootnote}</p>
      </section>

      <p className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-xs leading-6 text-slate-600">{teromeaLegalNotice}</p>
    </div>
  );
}
