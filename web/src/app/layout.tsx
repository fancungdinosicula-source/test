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
        className="min-h-screen flex flex-col text-yellow-50"
        style={{
          backgroundImage:
            "url('https://i.etsystatic.com/16646781/r/il/344947/2987790926/il_680x540.2987790926_es2n.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Providers>
          {/* Ngai vàng trên cao */}
          <SiteHeader />

          {/* Nội dung chính */}
          <main className="flex-1 container mx-auto max-w-6xl px-4 py-8 bg-black/40 rounded-xl shadow-lg">
            {children}
          </main>

          {/* Quan trung thành dưới chân trang */}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
