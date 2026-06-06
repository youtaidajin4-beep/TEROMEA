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
  description: "食事・運動・体重・便・元気度などから、今の見守りポイントをチェックできます。"
};

export default function HealthCheckLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${notoSerif.variable} relative mx-auto min-h-screen max-w-lg px-5 py-5 md:py-8`}>
      <HealthCheckBlobBg />
      {children}
    </div>
  );
}
