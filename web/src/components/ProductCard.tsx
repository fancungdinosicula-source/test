import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatVND } from "@/lib/format";
import AddToCartButton from "@/features/cart/AddToCartButton";

export type ProductCardProps = {
  product: Product & { discount?: number };
};

export default function ProductCard({ product }: ProductCardProps) {
  const {
    title,
    price,
    slug,
    images,
    stock,
    brand,
    rating,
    description,
    discount,
  } = product;

  const outOfStock = (stock ?? 0) <= 0;
  const href = `/shop/${slug}`;

  const imageSrc =
    Array.isArray(images) && images.length > 0 && typeof images[0] === "string"
      ? images[0]
      : "/IMAGES/1.png";

  const finalPrice =
    discount && discount > 0
      ? Math.round(price * (1 - discount / 100))
      : price;

  return (
    <div
      className="group relative rounded-2xl overflow-hidden
                 bg-gradient-to-b from-yellow-50 via-white to-yellow-50
                 border-4 border-yellow-600
                 shadow-[0_10px_25px_rgba(0,0,0,0.25)]
                 hover:shadow-[0_18px_40px_rgba(0,0,0,0.4)]
                 transition-all duration-300 hover:-translate-y-2"
    >
      {/* 🔱 Header */}
      <div className="flex items-center justify-between px-3 py-2
                      bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200
                      border-b-2 border-yellow-600 text-xs font-semibold">
        <span className="text-red-900 truncate max-w-[70%]">
          {brand || "Hoàng Gia"}
        </span>

        {typeof rating === "number" && (
          <span className="flex items-center gap-1 text-red-800">
            ★ {rating}
          </span>
        )}
      </div>

      {/* 🖼 Image */}
      <Link href={href} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Hết hàng */}
          {outOfStock && (
            <span className="absolute left-3 top-3 z-10
                             bg-red-700 text-yellow-200
                             text-xs font-bold px-3 py-1 rounded-full
                             shadow-lg">
               Hết hàng
            </span>
          )}

          {/* Giảm giá */}
          {discount && discount > 0 && (
            <span className="absolute right-3 top-3 z-10
                             bg-green-700 text-white
                             text-xs font-bold px-3 py-1 rounded-full
                             shadow-lg">
               -{discount}%
            </span>
          )}
        </div>

        {/* 📜 Nội dung */}
        <div className="p-4 space-y-2">
          <h3 className="text-base font-bold text-red-900 line-clamp-2 min-h-[2.5rem]">
            {title}
          </h3>

          <p className="text-xs text-gray-700 line-clamp-2">
            {description}
          </p>

          {/* 💰 Giá */}
          <div className="pt-2 text-sm">
            {discount && discount > 0 ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="line-through text-gray-400 text-xs">
                  {formatVND(price)}
                </span>
                <span className="text-red-700 font-extrabold text-base">
                  {formatVND(finalPrice)}
                </span>
                <span className="text-xs font-bold text-green-700">
                  (-{discount}%)
                </span>
              </div>
            ) : (
              <span className="text-red-800 font-extrabold text-base">
                {formatVND(price)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* 🏺 Footer */}
      <div className="flex items-center justify-between px-4 py-3
                      bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100
                      border-t-2 border-yellow-600">
        <span className="text-xs font-medium text-red-800">
          {outOfStock ? "Kho trống" : `Kho: ${stock}`}
        </span>

        <AddToCartButton
          product={product}
          disabled={outOfStock}
          className="
            h-9 px-5 rounded-full
            bg-gradient-to-r from-red-700 via-red-800 to-red-700
            text-yellow-200 text-xs font-bold
            border-2 border-yellow-500
            hover:from-red-800 hover:to-red-900
            transition-all duration-300
            shadow-lg disabled:opacity-50"
        />
      </div>

      {/* 🐉 Hoa văn đáy */}
      
    </div>
  );
}
