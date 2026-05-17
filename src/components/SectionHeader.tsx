type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">{eyebrow}</p> : null}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-ink md:text-5xl">{title}</h1>
        {description ? <p className="max-w-3xl text-base leading-7 text-slate-600 md:text-lg">{description}</p> : null}
      </div>
    </div>
  );
}
