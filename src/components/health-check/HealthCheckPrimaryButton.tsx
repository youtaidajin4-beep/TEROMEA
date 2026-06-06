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
  const baseClass = `flex w-full items-center justify-center rounded-full px-6 py-4 text-base font-bold text-white shadow-card transition ${
    variant === "accent"
      ? "bg-accent hover:bg-orange-600 disabled:bg-orange-200"
      : "bg-leaf hover:bg-emerald-700 disabled:bg-emerald-200"
  } ${pulse ? "animate-pulseSoft" : ""} disabled:cursor-not-allowed`;

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
