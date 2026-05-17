import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pet Life Score | ペットの健康寿命を伸ばす予防型ケアサービス",
  description: "ペットのDNA・テロメア検査結果を毎日の健康管理と予防型ペット保険体験につなげるMVPデモ"
};

const navItems = [
  { href: "/", label: "商品紹介" },
  { href: "/pets", label: "飼い主デモ" },
  { href: "/advice", label: "AIアドバイス" },
  { href: "/insurance-dashboard", label: "事業者向け" }
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">
        <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-leaf text-lg font-bold text-white">
                P
              </span>
              <div>
                <p className="text-lg font-bold leading-tight text-ink">Pet Life Score</p>
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
        <main className="mx-auto max-w-7xl px-5 py-8 md:py-12">{children}</main>
      </body>
    </html>
  );
}
