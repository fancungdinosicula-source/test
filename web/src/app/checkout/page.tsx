"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PRODUCTS } from "@/mock/products";

type PM = "cod";

type CheckoutItem = {
  slug: string;
  quantity: number;
  product: (typeof PRODUCTS)[number];
  finalPrice: number;
  lineTotal: number;
};

function formatVND(n: number) {
  return n.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

function getFinalPrice(price: number, discount?: number) {
  return discount && discount > 0
    ? Math.round(price * (1 - discount / 100))
    : price;
}

export default function CheckoutPage() {
  const sp = useSearchParams();
  const router = useRouter();

  const itemsParam = sp.get("items") || "";

  const parsed = useMemo<CheckoutItem[]>(() => {
    return itemsParam
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean)
      .map((pair) => {
        const [slug, qty] = pair.split(":");
        const product = PRODUCTS.find((p) => p.slug === slug);
        if (!product) return null;

        const quantity = Math.max(Number(qty) || 1, 1);
        const finalPrice = getFinalPrice(product.price, product.discount);

        return {
          slug,
          quantity,
          product,
          finalPrice,
          lineTotal: finalPrice * quantity,
        } satisfies CheckoutItem;
      })
      .filter((x): x is CheckoutItem => x !== null);
  }, [itemsParam]);

  const totals = useMemo(() => {
    const subtotal = parsed.reduce(
      (sum, item) => sum + item.lineTotal,
      0
    );
    const shippingFee = 15000;

    return {
      subtotal,
      shippingFee,
      total: subtotal + shippingFee,
    };
  }, [parsed]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addr, setAddr] = useState("");
  const [pm, setPM] = useState<PM>("cod");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [order, setOrder] = useState<{
    id: string;
    status: string;
    customer: { name: string; phone: string; addr: string };
    pm: PM;
    note: string;
    items: CheckoutItem[];
    totals: typeof totals;
  } | null>(null);

  const [showSuccess, setShowSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!parsed.length) return setError("Giỏ hàng trống.");
    if (!name.trim()) return setError("Vui lòng nhập Họ tên.");
    if (!/^[A-Za-zÀ-ỹ\s]+$/.test(name))
      return setError("Họ tên không được chứa số.");
    if (!/^[0-9]{9,11}$/.test(phone))
      return setError("SĐT phải gồm 9–11 chữ số.");
    if (!addr.trim()) return setError("Vui lòng nhập địa chỉ.");

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));

    setOrder({
      id: "ORDER-" + Date.now(),
      status: "Đang xử lý",
      customer: { name, phone, addr },
      pm,
      note,
      items: parsed,
      totals,
    });

    setSubmitting(false);
    setShowSuccess(true);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-100 via-yellow-200 to-yellow-100 text-red-900">
      <header className="bg-gradient-to-r from-red-800 via-red-700 to-red-900
        text-yellow-200 py-8 text-center text-4xl
        border-b-4 border-yellow-500 shadow-xl">
        📜 Ngự Lệnh Thanh Toán
        <div className="mt-2 text-base italic text-yellow-300">
          Hoàn tất nghi thức giao dịch của triều đại
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl border-4 border-yellow-600 bg-white/90 shadow-xl p-5">
            <h2 className="text-xl font-bold mb-4">🏺 Tóm tắt bảo vật</h2>

            {parsed.map((x) => (
              <div key={x.slug} className="py-3 border-b last:border-0">
                <p className="font-semibold">{x.product.title}</p>

                <div className="text-sm text-red-700 flex justify-between">
                  <span>SL: {x.quantity}</span>
                  <span>{formatVND(x.lineTotal)}</span>
                </div>

                {x.product.discount && (
                  <div className="text-xs text-green-700 italic">
                    Giảm {x.product.discount}% — Giá gốc{" "}
                    <span className="line-through">
                      {formatVND(x.product.price)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-2xl border-4 border-yellow-600 bg-white/95 shadow-xl p-6 space-y-4"
          >
            <h2 className="text-xl font-bold">📜 Thông tin nhận bảo vật</h2>

            <input
              className="w-full h-11 border-2 border-yellow-600 px-3 rounded-md"
              placeholder="👤 Họ tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full h-11 border-2 border-yellow-600 px-3 rounded-md"
              placeholder="📞 Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <textarea
              className="w-full border-2 border-yellow-600 px-3 py-2 rounded-md"
              placeholder="🏰 Địa chỉ giao hàng"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
            />

            <textarea
              className="w-full border-2 border-yellow-600 px-3 py-2 rounded-md"
              placeholder="🖋 Ghi chú"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            {error && <p className="text-red-600">{error}</p>}

            <button
              disabled={submitting}
              className="w-full h-12 rounded-full bg-gradient-to-r from-red-700 to-red-900
              text-yellow-200 font-bold border-2 border-yellow-500 shadow-xl"
            >
              {submitting ? "⏳ Đang hành lễ..." : "👑 Ban Chỉ Đặt Hàng"}
            </button>
          </form>
        </div>

        <aside className="rounded-2xl border-4 border-yellow-600 bg-white/95 shadow-xl p-6 h-fit">
          <h2 className="text-xl font-bold mb-3">📊 Tổng kết</h2>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span>{formatVND(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Vận chuyển</span>
              <span>{formatVND(totals.shippingFee)}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Tổng cộng</span>
              <span>{formatVND(totals.total)}</span>
            </div>
          </div>
        </aside>
      </section>

      {showSuccess && order && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-white rounded-2xl border-4 border-yellow-600 shadow-2xl max-w-2xl w-full p-6">
            <h2 className="text-2xl font-extrabold text-green-700 text-center mb-4">
              ✅ ĐẶT HÀNG THÀNH CÔNG
            </h2>

            <div className="space-y-1 text-sm">
              <p><b>Mã đơn:</b> {order.id}</p>
              <p><b>Người nhận:</b> {order.customer.name}</p>
              <p><b>SĐT:</b> {order.customer.phone}</p>
              <p><b>Địa chỉ:</b> {order.customer.addr}</p>
            </div>

            <div className="mt-3 border-t pt-2 flex justify-between font-bold">
              <span>Tổng cộng</span>
              <span>{formatVND(order.totals.total)}</span>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => router.push("/shop")}
                className="px-6 h-11 rounded-full bg-red-700 text-yellow-200 font-bold"
              >
                🏺 Về Shop
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
