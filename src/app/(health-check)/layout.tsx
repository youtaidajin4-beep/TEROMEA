import Link from "next/link";
import { Noto_Serif_JP } from "next/font/google";
import type { Metadata } from "next";
import { HealthCheckBlobBg } from "@/components/health-check/HealthCheckBlobBg";

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap"
});

export const metadata: Metadata = {
  title: "うちの子健康寿命チェック | ZuttoPetto",
  description: "ログイン不要。食事・運動・体重・便・元気度などから、今の見守りポイントをチェックできます。"
};

export default function HealthCheckLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${notoSerif.variable} relative mx-auto min-h-screen max-w-lg px-5 py-5 md:py-8`}>
      <HealthCheckBlobBg />
      <header className="mb-6 flex items-center justify-center gap-3">
        <Link href="/health-check" className="flex items-center gap-3 transition hover:opacity-80">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-leaf font-serif text-lg font-bold text-white shadow-card">
            Z
          </span>
          <div className="text-left">
            <p className="font-serif text-base font-bold text-navy">ZuttoPetto</p>
            <p className="text-xs text-slate-500">うちの子の健康寿命を、毎日のケアへ。</p>
          </div>
        </Link>
      </header>
      {children}
    </div>
  );
}
