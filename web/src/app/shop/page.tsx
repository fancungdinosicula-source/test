"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useProductsQuery } from "@/hooks/useProductsQuery";

const LIMIT = 12;

export default function ShopPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageParam = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
  const qParam = searchParams.get("q") || "";

  const [qInput, setQInput] = useState(qParam);
  useEffect(() => setQInput(qParam), [qParam]);

  const queryArgs = useMemo(
    () => ({ page: pageParam, limit: LIMIT, q: qParam || undefined }),
    [pageParam, qParam]
  );

  const { data, isLoading, isError, error } = useProductsQuery(queryArgs);

  function setUrl(next: { page?: number; q?: string | null }) {
    const sp = new URLSearchParams(searchParams.toString());
    if (typeof next.page === "number") sp.set("page", String(next.page));
    if (next.q !== undefined) {
      if (next.q && next.q.trim()) {
        sp.set("q", next.q.trim());
        sp.set("page", "1");
      } else {
        sp.delete("q");
        sp.set("page", "1");
      }
    }
    router.push(`${pathname}?${sp.toString()}`);
  }

  const shuffledProducts = data?.data
    ? [...data.data].sort(() => Math.random() - 0.5)
    : [];

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      {/* Header trang Shop */}
      <header className="bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100 border-b-4 border-yellow-600 shadow-lg">
        <div className="container mx-auto max-w-6xl px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-red-900 tracking-wide drop-shadow-md">
            Triều Kho Báu
          </h1>

          {/* 🔍 Thanh tìm kiếm Hoàng Gia */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUrl({ q: qInput });
            }}
            className="flex items-center gap-3
                       bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100
                       px-4 py-3 rounded-full
                       border-4 border-yellow-600
                       shadow-[0_6px_20px_rgba(0,0,0,0.35)]
                       w-full md:w-auto"
          >
            <span className="text-2xl text-red-800 drop-shadow-md">🔍</span>

            <input
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
              placeholder="Tìm bảo vật trong triều đại..."
              aria-label="Tìm kiếm sản phẩm"
              className="flex-1 md:w-72 h-11 px-4 rounded-full
                         bg-white/90
                         text-red-900 font-medium
                         placeholder:text-red-400
                         focus:outline-none
                         focus:ring-2 focus:ring-yellow-500"
            />

            <button
              type="submit"
              className="h-11 px-6 rounded-full
                         bg-gradient-to-r from-red-700 via-red-800 to-red-700
                         text-yellow-200 font-bold tracking-wide
                         border-2 border-yellow-500
                         hover:from-red-800 hover:to-red-900
                         transition-all duration-300
                         shadow-lg"
            >
              👑 Tìm
            </button>
          </form>
        </div>

        {/* Hoa văn */}
        <div className="h-2 bg-gradient-to-r from-red-700 via-yellow-500 to-red-700"></div>
      </header>

      {/* Nội dung */}
      <section className="container mx-auto max-w-6xl px-4 flex-1">
        {isLoading && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
            {Array.from({ length: LIMIT }).map((_, i) => (
              <div key={i} className="h-60 bg-gray-200 rounded-xl border" />
            ))}
          </div>
        )}

        {isError && (
          <p className="mt-6 text-red-600">
            Lỗi tải dữ liệu: {(error as Error)?.message}
          </p>
        )}

        {data && shuffledProducts.length === 0 && (
          <p className="mt-6 text-gray-600">
            Không tìm thấy bảo vật phù hợp.
          </p>
        )}

        {data && shuffledProducts.length > 0 && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shuffledProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}

        {data && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              className="h-10 px-5 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-40"
              onClick={() => setUrl({ page: Math.max(pageParam - 1, 1) })}
              disabled={pageParam <= 1}
            >
              ← Trang trước
            </button>
            <span className="text-sm text-gray-700">
              Trang {data.page}
            </span>
            <button
              className="h-10 px-5 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-40"
              onClick={() => setUrl({ page: data.page + 1 })}
              disabled={!data.hasNext}
            >
              Trang sau →
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
