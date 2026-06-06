import Image from "next/image";

type HealthCheckLogoProps = {
  priority?: boolean;
};

export function HealthCheckLogo({ priority = false }: HealthCheckLogoProps) {
  return (
    <Image
      src="/health-check/zutto-petto-logo.png"
      alt="ZuttoPetto｜ずっとペット"
      width={100}
      height={128}
      priority={priority}
      className="h-auto w-[100px] drop-shadow-sm"
    />
  );
}
