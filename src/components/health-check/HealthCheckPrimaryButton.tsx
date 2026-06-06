import Link from "next/link";
import type { ReactNode } from "react";

type HealthCheckPrimaryButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "leaf" | "accent";
  pulse?: boolean;
  type?: "button" | "submit";
};

export function HealthCheckPrimaryButton({
  children,
  href,
  onClick,
  disabled,
  variant = "leaf",
  pulse = false,
  type = "button"
}: HealthCheckPrimaryButtonProps) {
  const baseClass = `flex w-full items-center justify-center rounded-full px-6 py-4 text-base font-bold text-white shadow-card transition hover:scale-[1.02] active:scale-[0.98] ${
    variant === "accent"
      ? "bg-gradient-to-r from-accent to-orange-500 hover:from-orange-600 hover:to-orange-600 disabled:from-orange-200 disabled:to-orange-200"
      : "bg-gradient-to-r from-leaf to-emerald-600 hover:from-emerald-700 hover:to-emerald-700 disabled:from-emerald-200 disabled:to-emerald-300"
  } ${pulse ? "animate-pulseSoft" : ""} disabled:cursor-not-allowed disabled:hover:scale-100`;

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClass}>
      {children}
    </button>
  );
}
