import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
export const metadata: Metadata = { title: "Shop — Absurd Dynasty" };

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get("x-pathname") || "/shop";
  const isDetail = pathname.startsWith("/shop/") && pathname.split("/").length > 2;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#fdf6e3] via-[#e0d7c6] to-white text-indigo-900">

      <main className="flex-1 container mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <nav className="text-sm text-indigo-700">
            <Link className="underline" href="/">Trang Chủ</Link>
            <span className="mx-2">/</span>
            <Link className="underline" href="/shop">Triều Kho Báu</Link>
            {isDetail && <span className="mx-2">/</span>}
            {isDetail && <span className="text-indigo-900 font-semibold">Chi tiết báu vật</span>}
          </nav>
        </div>
        {children}
      </main>

    </div>
  );
}
