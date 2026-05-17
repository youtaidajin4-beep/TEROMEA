import { Notice } from "@/components/Notice";
import { ClientPetsList } from "@/components/ClientPetsList";
import { SectionHeader } from "@/components/SectionHeader";

export default function PetsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Family"
        title="ペット一覧"
        description="検査スコア、健康年齢、毎日の記録をまとめて見守ります。気になる子を選ぶと詳細を確認できます。"
      />
      <Notice />
      <ClientPetsList />
    </div>
  );
}
