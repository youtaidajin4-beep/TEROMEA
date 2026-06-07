import type { CSSProperties, ReactNode } from "react";

type HealthCheckResultInsightPanelProps = {
  eyebrow: string;
  icon?: string;
  title?: string;
  children: ReactNode;
  variant?: "hero" | "focus" | "pattern" | "action" | "default";
  className?: string;
  style?: CSSProperties;
};

const variantStyles = {
  hero: "border-leaf/25 bg-gradient-to-br from-mint/60 via-white to-beige/40",
  focus: "border-leaf/20 bg-white/95",
  pattern: "border-sky-100 bg-gradient-to-br from-skysoft/40 to-white",
  action: "border-accent/25 bg-gradient-to-br from-orange-50/80 via-white to-mint/30",
  default: "border-slate-100/80 bg-white/95"
};

export function HealthCheckResultInsightPanel({
  eyebrow,
  icon,
  title,
  children,
  variant = "default",
  className = "",
  style
}: HealthCheckResultInsightPanelProps) {
  return (
    <section
      className={`relative overflow-hidden rounded-[1.75rem] border p-6 shadow-card backdrop-blur-sm ${variantStyles[variant]} ${className}`}
      style={style}
    >
      {variant === "hero" ? (
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-leaf/10 blur-3xl" aria-hidden />
      ) : null}

      <div className="relative">
        <div className="flex items-center gap-2">
          {icon ? <span className="text-lg" aria-hidden>{icon}</span> : null}
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-leaf">{eyebrow}</p>
        </div>
        {title ? <h3 className="mt-2 font-serif text-lg font-bold text-navy">{title}</h3> : null}
        <div className={title ? "mt-4" : "mt-3"}>{children}</div>
      </div>
    </section>
  );
}
