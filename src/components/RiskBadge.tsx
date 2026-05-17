import { getRiskLabel, getRiskTone, type RiskLevel } from "@/lib/mockData";

export function RiskBadge({ riskLevel }: { riskLevel: RiskLevel }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ring-1 ${getRiskTone(riskLevel)}`}>
      {getRiskLabel(riskLevel)}
    </span>
  );
}
