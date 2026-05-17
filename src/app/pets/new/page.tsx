import Link from "next/link";
import { Notice } from "@/components/Notice";
import { SectionHeader } from "@/components/SectionHeader";
import { NewPetForm } from "./NewPetForm";

export default function NewPetPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Add Family"
        title="うちの子を追加"
        description="まずはプロフィールを登録して、毎日の健康記録とテロメア検査の見え方を体験しましょう。"
      />
      <Notice />
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <NewPetForm />
        <aside className="space-y-5">
          <div className="rounded-[2rem] bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold text-leaf">テロメア検査で分かること</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">寿命の断定ではなく、ケアの方向性を知る</h2>
            <p className="mt-4 leading-7 text-slate-600">
              テロメアスコアは、細胞の老化傾向を知るための参考指標です。実年齢と健康年齢の差を見ながら、食事・運動・睡眠・ストレスケアに変換します。
            </p>
          </div>
          <div className="rounded-[2rem] bg-cream p-6">
            <p className="text-sm font-semibold text-leaf">登録後の流れ</p>
            <ol className="mt-4 space-y-3 text-sm font-semibold text-slate-700">
              <li>1. プロフィールを登録</li>
              <li>2. 健康年齢の目安を確認</li>
              <li>3. 今日やるケアを記録</li>
              <li>4. 検査結果ページで差分を見る</li>
            </ol>
          </div>
          <Link href="/pets" className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-leaf ring-1 ring-emerald-100">
            うちの子一覧へ戻る
          </Link>
        </aside>
      </div>
    </div>
  );
}
