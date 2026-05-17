import { ClientPetDetail } from "@/components/ClientPetDetail";
import { pets } from "@/lib/mockData";

export function generateStaticParams() {
  return pets.map((pet) => ({ id: pet.id }));
}

export default async function PetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ClientPetDetail id={id} />;
}
