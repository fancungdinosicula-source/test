import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Absurd Dynasty — Shoply",
  description: "Triều đại siêu thực: Catalog, giỏ hàng, đơn hàng, admin CRUD",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col text-red-900"
        style={{
          backgroundImage: "url('/IMAGES/back.png')", // 👑 ảnh nền hoàng gia
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Providers>
          {/* Ngai vàng trên cao */}
          <SiteHeader />

          {/* Nội dung chính */}
          <main className="flex-1 container mx-auto max-w-4xl px-6 py-10 bg-white/70 border-2 border-yellow-600 rounded-2xl shadow-xl">
            {children}
          </main>

          {/* Quan trung thành dưới chân trang */}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
