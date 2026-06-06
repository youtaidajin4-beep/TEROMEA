"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "商品紹介" },
  { href: "/pets", label: "飼い主デモ" },
  { href: "/advice", label: "AIアドバイス" },
  { href: "/insurance-dashboard", label: "事業者向け" }
];

export function RootHeader() {
  const pathname = usePathname();

  if (pathname.startsWith("/health-check")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-leaf text-lg font-bold text-white">
            Z
          </span>
          <div>
            <p className="text-lg font-bold leading-tight text-ink">Zutto Petto</p>
            <p className="text-xs text-slate-500">検査を毎日のケアへ</p>
          </div>
        </Link>
        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm ring-1 ring-slate-100 transition hover:bg-mint hover:text-leaf"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export function RootMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHealthCheck = pathname.startsWith("/health-check");

  return (
    <main className={isHealthCheck ? "" : "mx-auto max-w-7xl px-5 py-8 md:py-12"}>{children}</main>
  );
}
