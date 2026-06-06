import Link from "next/link";

type HealthCheckBrandMarkProps = {
  href?: string;
};

export function HealthCheckBrandMark({ href }: HealthCheckBrandMarkProps) {
  const content = (
    <div className="text-center">
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-leaf">
        <span className="h-1 w-1 rounded-full bg-leaf" aria-hidden />
        ZuttoPetto
        <span className="h-1 w-1 rounded-full bg-leaf" aria-hidden />
      </p>
      <p className="mt-1 font-serif text-sm font-bold text-navy">うちの子健康寿命チェック</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block transition hover:opacity-80">
        {content}
      </Link>
    );
  }

  return content;
}
