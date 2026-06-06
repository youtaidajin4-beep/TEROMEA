import type { Metadata } from "next";
import { RootHeader, RootMain } from "@/components/RootHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zutto Petto | ペットの健康寿命を伸ばす予防型ケアサービス",
  description: "Zutto Petto — ペットのDNA・テロメア検査結果を毎日の健康管理と予防型ペット保険体験につなげるMVPデモ"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">
        <RootHeader />
        <RootMain>{children}</RootMain>
      </body>
    </html>
  );
}
