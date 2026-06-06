import Image from "next/image";

type HealthCheckLogoProps = {
  variant?: "hero" | "header";
  priority?: boolean;
};

const sizes = {
  hero: { width: 280, height: 200, className: "h-auto w-[min(280px,85vw)]" },
  header: { width: 140, height: 100, className: "h-auto w-[120px]" }
};

export function HealthCheckLogo({ variant = "hero", priority = false }: HealthCheckLogoProps) {
  const { width, height, className } = sizes[variant];

  return (
    <Image
      src="/health-check/zutto-petto-logo.png"
      alt="ZuttoPetto｜ずっとペット"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
