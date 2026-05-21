import Link from "next/link";
import { Notice } from "@/components/Notice";
import { ScoreRing } from "@/components/ScoreRing";
import { lossRatioSimulation, pets } from "@/lib/mockData";

const valueCards = [
  {
    title: "検査結果を、今日のケアに変える",
    description: "DNA・テロメア検査の結果をスコアや健康年齢の目安として表示し、食事・運動・睡眠・ストレスケアの具体的な行動につなげます。"
  },
  {
    title: "病気の前の小さな変化に気づく",
    description: "毎日の記録とスコアの変化を合わせて見守ることで、気になるサインを早めに把握し、動物病院へ相談する目安を作ります。"
  },
  {
    title: "保険会社の予防介入を支える",
    description: "契約ペット全体のリスク分布や介入優先度を可視化し、将来的な損害率改善につながる予防型サービス設計を支援します。"
  }
];

const ownerFeatures = ["テロメアスコアと健康年齢の目安", "今日やるケアの提案", "毎日の健康記録", "やさしいAIアドバイス"];
const insurerFeatures = ["リスク分布の可視化", "介入優先リスト", "犬/猫・年齢帯別の傾向分析", "損害率改善シミュレーション"];

const flowSteps = [
  ["1", "検査する", "DNA・テロメア検査キットで、うちの子の健康状態を知るための入口を作ります。"],
  ["2", "記録する", "食事、運動、体重、便、元気度など、日々の変化をかんたんに残します。"],
  ["3", "提案を受ける", "検査結果と生活記録をもとに、今日できる小さなケアを提案します。"],
  ["4", "保険とつなぐ", "予防ケアの継続を保険体験に組み込み、飼い主と保険会社の双方に価値を返します。"]
];

const faqs = [
  {
    question: "テロメア検査で寿命が分かりますか？",
    answer: "寿命や病気を断定するものではありません。健康年齢の目安や生活改善の方向性を知るための参考情報として使います。"
  },
  {
    question: "飼い主には何が便利ですか？",
    answer: "難しい検査結果を、今日の食事・運動・相談目安などの行動に変換できるため、毎日の見守りを続けやすくなります。"
  },
  {
    question: "保険会社にはどんな価値がありますか？",
    answer: "高リスク化する前の予防介入を設計しやすくなり、顧客体験の向上と将来的な保険金支払いリスクの抑制を同時に狙えます。"
  }
];

export default function Home() {
  const mainPet = pets[0];
  const riskPets = pets.filter((pet) => pet.riskLevel !== "low").length;
  const averageScore = Math.round(pets.reduce((sum, pet) => sum + pet.telomereScore, 0) / pets.length);

  return (
    <div className="space-y-16">
      <section className="overflow-hidden rounded-[2.5rem] bg-white/80 shadow-soft">
        <div className="space-y-6 border-b border-slate-100 p-6 md:p-10 lg:p-12">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
            <div className="rounded-[1.75rem] bg-ink p-6 text-white shadow-soft md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">For insurers</p>
              <p className="mt-3 text-xl font-bold leading-snug md:text-2xl">
                ペット保険会社の損害率を下げる、予防型ヘルスケアMVP
              </p>
              <p className="mt-4 text-sm leading-7 text-emerald-50/90 md:text-base">
                テロメア検査 × 日々の健康記録 × AI介入で、通院リスクの高いペットを早期に見つける。
              </p>
              <Link
                href="/insurance-dashboard"
                className="mt-5 inline-flex text-sm font-bold text-emerald-200 underline-offset-4 hover:text-white hover:underline"
              >
                導入フローとダッシュボードはこちら
              </Link>
            </div>
            <div className="flex flex-col justify-center rounded-[1.75rem] bg-mint p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-leaf">For owners</p>
              <p className="mt-3 text-lg font-bold leading-snug text-ink md:text-xl">
                うちの子の健康年齢を見える化し、毎日のケアにつなげるアプリ
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-8 p-6 md:grid-cols-[1.05fr_0.95fr] md:p-10 lg:p-12">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-5">
              <p className="inline-flex w-fit rounded-full bg-mint px-4 py-2 text-sm font-bold text-leaf">
                Zutto Petto
              </p>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-ink md:text-6xl">
                  検査で終わらせない。
                  <br />
                  うちの子の未来を、毎日のケアへ。
                </h1>
                <p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                  Zutto Petto は、DNA・テロメアと生活記録をつなぎ、飼い主の安心と保険会社の予防介入を同じデータ上で進めるMVPです。
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/pets/new"
                className="rounded-full bg-leaf px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
              >
                うちの子で体験する
              </Link>
              <Link
                href="/insurance-dashboard"
                className="rounded-full bg-white px-6 py-3 text-sm font-bold text-leaf ring-1 ring-emerald-100 transition hover:bg-mint"
              >
                保険会社向けデモを見る
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["平均スコア", `${averageScore}pt`],
                ["見守り対象", `${riskPets}匹`],
                ["想定削減額", `${Math.round(lossRatioSimulation.projectedClaimReduction / 10000).toLocaleString()}万円/月`]
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl bg-cream px-5 py-4">
                  <p className="text-xs font-semibold text-slate-500">{label}</p>
                  <p className="mt-1 text-2xl font-bold text-ink">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-[2rem] bg-gradient-to-br from-mint to-skysoft p-6">
            <div className="absolute right-6 top-6 rounded-full bg-white/80 px-4 py-2 text-xs font-bold text-leaf shadow-sm">
              Sample Report
            </div>
            <div className="mt-12 rounded-[2rem] bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">今日の状態</p>
                  <h2 className="text-3xl font-bold text-ink">{mainPet.name}</h2>
                </div>
                <ScoreRing score={mainPet.telomereScore} size="sm" />
              </div>
              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl bg-cream p-4">
                  <p className="text-xs font-semibold text-slate-500">健康年齢の目安</p>
                  <p className="mt-1 text-3xl font-bold text-ink">{mainPet.biologicalAge}歳</p>
                </div>
                <div className="rounded-2xl bg-mint p-4">
                  <p className="text-xs font-semibold text-leaf">今日のおすすめケア</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-ink">{mainPet.recommendedAction}</p>
                </div>
                <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                  <p className="text-xs font-semibold text-amber-700">相談目安</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-amber-900">{mainPet.watchSigns[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Notice />

      <section className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">Why Zutto Petto</p>
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">ペット保険を「支払う保険」から「元気を続ける体験」へ</h2>
          <p className="leading-7 text-slate-600">
            一般的なペット保険は、病気やケガが起きた後の補償が中心です。Zutto Petto は、検査と日々の記録から予防ケアの接点を作り、
            飼い主の安心と保険会社のリスク改善を同時に目指します。
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {valueCards.map((card) => (
            <article key={card.title} className="rounded-3xl bg-white p-6 shadow-soft">
              <h3 className="text-xl font-bold text-ink">{card.title}</h3>
              <p className="mt-4 leading-7 text-slate-600">{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-[2rem] bg-white p-6 shadow-soft md:p-8">
          <p className="text-sm font-semibold text-leaf">For Owners</p>
          <h2 className="mt-2 text-3xl font-bold text-ink">飼い主には、毎日続けられる安心を。</h2>
          <p className="mt-4 leading-7 text-slate-600">
            検査結果を難しいレポートで終わらせず、「今日やること」「気をつけるサイン」「次回検査の目安」に変えて届けます。
          </p>
          <div className="flex flex-wrap gap-3">
            {ownerFeatures.map((feature) => (
              <span key={feature} className="mt-4 rounded-full bg-mint px-4 py-2 text-sm font-bold text-leaf">
                {feature}
              </span>
            ))}
          </div>
          <Link href="/pets" className="mt-6 inline-flex rounded-full bg-leaf px-5 py-3 text-sm font-bold text-white">
            飼い主向けデモへ
          </Link>
        </article>

        <article className="rounded-[2rem] bg-ink p-6 text-white shadow-soft md:p-8">
          <p className="text-sm font-semibold text-emerald-200">For Insurers</p>
          <h2 className="mt-2 text-3xl font-bold">保険会社には、予防介入の判断材料を。</h2>
          <p className="mt-4 leading-7 text-emerald-50/85">
            契約ペット全体の健康傾向を把握し、どの層に、いつ、どんなケア提案を届けるべきかを説明可能な形で整理します。
          </p>
          <div className="mt-6 grid gap-3">
            {insurerFeatures.map((feature) => (
              <div key={feature} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold">
                {feature}
              </div>
            ))}
          </div>
          <Link href="/insurance-dashboard" className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-ink">
            BtoBダッシュボードへ
          </Link>
        </article>
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-soft md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">How It Works</p>
            <h2 className="mt-2 text-3xl font-bold text-ink">検査、記録、提案、保険体験をひとつの流れに。</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {flowSteps.map(([number, title, description]) => (
            <article key={number} className="rounded-3xl bg-cream p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-leaf text-sm font-bold text-white">
                {number}
              </span>
              <h3 className="mt-4 text-xl font-bold text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[2rem] bg-mint p-6 shadow-soft md:p-8">
          <p className="text-sm font-semibold text-leaf">登録して体験</p>
          <h2 className="mt-2 text-3xl font-bold text-ink">新しい家族もすぐ追加できます</h2>
          <p className="mt-4 leading-7 text-slate-600">
            検査結果がまだない状態でも、モックの初期スコアを使って体験できます。入力したプロフィールは同じブラウザ内に保存されます。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/pets/new" className="rounded-full bg-leaf px-5 py-3 text-sm font-bold text-white">
              プロフィール登録へ
            </Link>
            <Link href={`/pets/${mainPet.id}/telomere`} className="rounded-full bg-white px-5 py-3 text-sm font-bold text-leaf">
              検査結果サンプルを見る
            </Link>
          </div>
        </article>
        <article className="rounded-[2rem] bg-white p-6 shadow-soft md:p-8">
          <p className="text-sm font-semibold text-leaf">Product Demo</p>
          <h2 className="mt-2 text-3xl font-bold text-ink">MVPで確認できる画面</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["/pets", "ペット一覧"],
              [`/pets/${mainPet.id}`, "ペット詳細"],
              [`/pets/${mainPet.id}/daily-log`, "毎日の健康記録"],
              ["/advice", "AI健康アドバイス"]
            ].map(([href, label]) => (
              <Link key={href} href={href} className="rounded-2xl bg-cream px-4 py-4 font-bold text-ink transition hover:bg-mint">
                {label}
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="space-y-4">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">FAQ</p>
          <h2 className="mt-2 text-3xl font-bold text-ink">よくある質問</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-3xl bg-white p-6 shadow-soft">
              <h3 className="text-lg font-bold text-ink">{faq.question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-leaf p-6 text-white shadow-soft md:p-10">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-emerald-100">Start Zutto Petto</p>
            <h2 className="text-3xl font-bold md:text-4xl">うちの子の健康を、今日から見える化する。</h2>
            <p className="max-w-2xl leading-7 text-emerald-50">
              飼い主向け体験と保険会社向けダッシュボードの両方を、Zutto Petto のMVPで確認できます。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/pets/new" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-leaf">
              体験を始める
            </Link>
            <Link href="/insurance-dashboard" className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-bold text-white">
              事業者向けを見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
