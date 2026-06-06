import type { ReactNode } from "react";

type HealthCheckSectionCardProps = {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  variant?: "default" | "highlight" | "accent";
  className?: string;
};

const variantStyles = {
  default: "border-slate-100/80 bg-white/95",
  highlight: "border-leaf/20 bg-gradient-to-br from-mint/40 to-white",
  accent: "border-accent/20 bg-gradient-to-br from-orange-50/60 to-white"
};

export function HealthCheckSectionCard({
  title,
  eyebrow,
  children,
  variant = "default",
  className = ""
}: HealthCheckSectionCardProps) {
  return (
    <section className={`rounded-[1.75rem] border p-6 shadow-card backdrop-blur-sm ${variantStyles[variant]} ${className}`}>
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.12em] text-leaf">{eyebrow}</p> : null}
      {title ? <h2 className={`font-serif text-lg font-bold text-navy ${eyebrow ? "mt-2" : ""}`}>{title}</h2> : null}
      <div className={title || eyebrow ? "mt-4" : ""}>{children}</div>
    </section>
  );
}
