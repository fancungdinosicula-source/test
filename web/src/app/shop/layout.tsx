import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";

export const metadata: Metadata = { title: "Shop — Absurd Dynasty" };

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get("x-pathname") || "/shop";
  const isDetail = pathname.startsWith("/shop/") && pathname.split("/").length > 2;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-yellow-100 via-yellow-200 to-yellow-100 text-red-900">
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <nav className="text-sm text-red-800 font-medium">
            <Link className="underline hover:text-red-900" href="/">Trang Chủ</Link>
            <span className="mx-2">/</span>
            <Link className="underline hover:text-red-900" href="/shop">Triều Kho Báu</Link>
            {isDetail && <span className="mx-2">/</span>}
            {isDetail && (
              <span className="text-red-900 font-semibold">Chi tiết báu vật</span>
            )}
          </nav>
        </div>
        {children}
      </main>

      {/* Trang trí hoa văn dưới cùng để đồng bộ với header/footer */}
      <div className="h-2 bg-gradient-to-r from-red-700 via-yellow-500 to-red-700"></div>
    </div>
  );
}
