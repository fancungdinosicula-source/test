"use client";
import { useCart } from "@/features/cart/cart-context";
import { formatVND } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { state, dispatch, subtotal, hydrated } = useCart();
  if (!hydrated) return null;

  const items = state.items;
  const shipping = items.length ? 15000 : 0;
  const total = subtotal + shipping;

  return (
    <main className="py-10 bg-gradient-to-b from-[#fdf6e3] via-[#e0d7c6] to-white min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-indigo-900 mb-8">
        🛒 Giỏ hàng của Trẫm
      </h1>

      {items.length === 0 ? (
        <div className="mt-6 text-center text-gray-700">
          Giỏ hàng trống.{" "}
          <Link
            className="underline text-indigo-700 hover:text-indigo-900 font-medium"
            href="/shop"
          >
            Mua sắm ngay →
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8 container mx-auto max-w-6xl px-4">
          {/* Danh sách sản phẩm */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((it) => (
              <div
                key={it.productId}
                className="flex gap-4 border rounded-xl p-4 bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <Image
                  src={it.image || "/placeholder.png"}
                  alt={it.title}
                  width={96}
                  height={96}
                  className="rounded-md border object-cover"
                />
                <div className="flex-1">
                  <Link
                    href={`/shop/${it.slug}`}
                    className="font-semibold text-indigo-900 hover:underline"
                  >
                    {it.title}
                  </Link>
                  <div className="text-sm text-gray-600 mt-1">
                    {formatVND(it.price)}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <label className="text-sm font-medium">SL:</label>
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
                      className="w-20 h-9 px-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                      onClick={() =>
                        dispatch({
                          type: "REMOVE",
                          payload: { productId: it.productId },
                        })
                      }
                      className="ml-auto h-9 px-3 rounded-md border text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Xoá
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tóm tắt */}
          <aside className="border rounded-xl p-6 bg-white shadow-lg h-fit">
            <h2 className="text-xl font-bold text-indigo-900">Tóm tắt đơn hàng</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>{formatVND(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span>{formatVND(shipping)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Tổng</span>
                <span>{formatVND(total)}</span>
              </div>
            </div>
            <button className="mt-6 w-full h-11 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-md">
              Thanh toán (mock)
            </button>
            <button
              className="mt-3 w-full h-11 rounded-md border text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => dispatch({ type: "CLEAR" })}
            >
              Xoá toàn bộ
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
