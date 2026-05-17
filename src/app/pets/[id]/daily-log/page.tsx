import { pets } from "@/lib/mockData";
import { ClientDailyLogPage } from "./ClientDailyLogPage";

export function generateStaticParams() {
  return pets.map((pet) => ({ id: pet.id }));
}

export default async function DailyLogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ClientDailyLogPage id={id} />;
}
