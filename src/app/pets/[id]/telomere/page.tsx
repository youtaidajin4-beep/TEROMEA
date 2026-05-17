import { ClientTelomereReport } from "@/components/ClientTelomereReport";
import { pets } from "@/lib/mockData";

export function generateStaticParams() {
  return pets.map((pet) => ({ id: pet.id }));
}

export default async function TelomerePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ClientTelomereReport id={id} />;
}
