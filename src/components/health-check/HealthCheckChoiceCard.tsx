type HealthCheckChoiceCardProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon?: string;
};

export function HealthCheckChoiceCard({ label, selected, onClick, icon }: HealthCheckChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex min-h-[56px] w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 active:scale-[0.98] ${
        selected
          ? "border-leaf bg-mint/80 text-navy shadow-card ring-2 ring-leaf/20"
          : "border-slate-100/80 bg-white/90 text-slate-700 hover:border-leaf/30 hover:bg-beige/50 hover:shadow-sm"
      }`}
    >
      {icon ? (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-beige text-lg">{icon}</span>
      ) : null}
      <span className="flex-1 text-base font-semibold leading-snug">{label}</span>
      {selected ? (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf text-xs font-bold text-white">
          ✓
        </span>
      ) : (
        <span className="h-6 w-6 shrink-0 rounded-full border-2 border-slate-200 transition group-hover:border-leaf/40" />
      )}
    </button>
  );
}
