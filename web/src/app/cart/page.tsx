"use client";

import { useCart } from "@/features/cart/cart-context";
import { formatVND } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "@/mock/products";

// 🔍 Tìm sản phẩm
function findProduct(productId?: string, slug?: string) {
  return (
    PRODUCTS.find((p) => p._id === productId) ||
    PRODUCTS.find((p) => p.slug === slug)
  );
}

// 💰 Giá sau giảm
function getFinalPrice(price: number, discount?: number) {
  const d = Math.max(0, Math.min(discount ?? 0, 99));
  return Math.round(price * (1 - d / 100));
}

export default function CartPage() {
  const { state, dispatch, hydrated } = useCart();
  const router = useRouter();
  if (!hydrated) return null;

  const items = state.items;

  const subtotal = items.reduce((sum, it) => {
    const p = findProduct(it.productId, it.slug);
    const price = p ? getFinalPrice(p.price, p.discount) : it.price;
    return sum + price * it.quantity;
  }, 0);

  const shipping = items.length ? 15000 : 0;
  const total = subtotal + shipping;

  function goCheckout() {
    const qs = items
      .map((it) => {
        const p = findProduct(it.productId, it.slug);
        return `${p?.slug ?? it.slug}:${it.quantity}`;
      })
      .join(",");
    router.push(`/checkout?items=${encodeURIComponent(qs)}`);
  }

  return (
    <main className="py-12 bg-gradient-to-b from-yellow-100 via-yellow-200 to-yellow-100 min-h-screen text-red-900">

      {/* 👑 KHUNG HOÀNG GIA */}
      <div className="relative max-w-3xl mx-auto mb-14">
        <div className="absolute inset-0 rounded-[2rem]
            bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600
            shadow-[0_0_40px_rgba(255,215,0,0.6)]" />
        <div className="absolute inset-[6px] rounded-[1.7rem]
            bg-gradient-to-br from-red-900 via-red-800 to-red-900" />

        <div className="relative rounded-[1.4rem] bg-gradient-to-b
            from-yellow-50 via-yellow-100 to-yellow-50
            border-4 border-yellow-500
            px-10 py-8 text-center">

          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl opacity-40">🐉</div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl opacity-40">🐉</div>

          <div className="mx-auto mb-4 w-16 h-16 rounded-full
              bg-gradient-to-br from-red-700 to-red-900
              border-4 border-yellow-400
              flex items-center justify-center
              shadow-[0_0_20px_rgba(255,215,0,0.8)]">
            <span className="text-yellow-200 text-2xl">👑</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-extrabold
              text-red-900 tracking-wide drop-shadow-lg">
            Giỏ hàng của Trẫm
          </h1>

          <p className="mt-3 italic text-red-700">
            Bảo vật đã chọn – chuẩn bị ban chỉ thanh toán
          </p>

          <div className="mt-5 h-1 w-40 mx-auto rounded-full
              bg-gradient-to-r from-red-700 via-yellow-500 to-red-700" />
        </div>
      </div>

      {/* 🛒 NỘI DUNG */}
      {items.length === 0 ? (
        <div className="text-center text-red-800">
          Giỏ hàng trống.{" "}
          <Link href="/shop" className="underline font-semibold">
            Mua sắm ngay →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 container mx-auto max-w-6xl px-4">

          {/* 📦 DANH SÁCH */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((it) => {
              const p = findProduct(it.productId, it.slug);
              const discount = p?.discount ?? 0;
              const finalPrice = p ? getFinalPrice(p.price, discount) : it.price;

              return (
                <div
                  key={it.productId}
                  className="flex gap-4 border-2 border-yellow-600 rounded-xl p-4
                             bg-white/80 shadow-md hover:shadow-lg"
                >
                  <Image
                    src={p?.images?.[0] ?? it.image ?? "/placeholder.png"}
                    alt={p?.title ?? it.title}
                    width={96}
                    height={96}
                    className="rounded-md border-2 border-yellow-500 object-cover"
                  />

                  <div className="flex-1">
                    <Link
                      href={`/shop/${p?.slug ?? it.slug}`}
                      className="font-semibold hover:underline"
                    >
                      {p?.title ?? it.title}
                    </Link>

                    <div className="text-sm mt-1">
                      {discount > 0 ? (
                        <>
                          <span className="line-through mr-2">
                            {formatVND(p!.price)}
                          </span>
                          <span className="font-bold">
                            {formatVND(finalPrice)}
                          </span>
                          <span className="ml-2 text-green-700">-{discount}%</span>
                        </>
                      ) : (
                        formatVND(p?.price ?? it.price)
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <label className="text-sm">SL:</label>
                      <input
                        type="number"
                        min={1}
                        value={it.quantity}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_QTY",
                            payload: {
                              productId: it.productId,
                              quantity: Number(e.target.value) || 1,
                            },
                          })
                        }
                        className="w-20 h-9 px-2 border rounded-md"
                      />
                      <button
                        onClick={() =>
                          dispatch({
                            type: "REMOVE",
                            payload: { productId: it.productId },
                          })
                        }
                        className="ml-auto h-9 px-3 rounded-md border text-red-700 hover:bg-red-100"
                      >
                        Xoá
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 📊 TÓM TẮT */}
          <aside className="border-2 border-yellow-600 rounded-xl p-6 bg-white/90 shadow-lg h-fit">
            <h2 className="text-xl font-bold">Tóm tắt đơn hàng</h2>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>{formatVND(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Vận chuyển</span>
                <span>{formatVND(shipping)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Tổng</span>
                <span>{formatVND(total)}</span>
              </div>
            </div>

            <button
              onClick={goCheckout}
              className="mt-6 w-full h-11 rounded-md
                         bg-red-700 text-yellow-100 font-semibold
                         hover:bg-red-800 shadow-md"
            >
              Ban Chỉ Thanh Toán
            </button>

            <button
              onClick={() => dispatch({ type: "CLEAR" })}
              className="mt-3 w-full h-11 rounded-md border
                         hover:bg-yellow-100"
            >
              Xoá toàn bộ bảo vật
            </button>
          </aside>
        </div>
      )}

      <div className="mt-14 h-3 w-full bg-gradient-to-r from-red-700 via-yellow-500 to-red-700" />
    </main>
  );
}
