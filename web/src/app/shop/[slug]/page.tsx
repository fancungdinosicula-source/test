import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PRODUCTS } from "@/mock/products";
import { formatVND } from "@/lib/format";
import type { Product } from "@/types/product";
import { getProductBySlug } from "@/lib/catalog";
import AddToCartButton from "@/features/cart/AddToCartButton";

/* ================================
   Types (⚠️ KHÔNG dùng PageProps)
================================ */
type Props = {
  params: {
    slug: string;
  };
};

const ProductList = PRODUCTS as (Product & { discount?: number })[];

/* ================================
   Metadata
================================ */
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const product = getProductBySlug(params.slug);

  return {
    title: product ? `${product.title} — Shoply` : "Sản phẩm — Shoply",
  };
}

/* ================================
   Helpers
================================ */
function getRandomProducts(currentSlug: string, count: number) {
  const filteredProducts = ProductList.filter(
    (p) => p.slug !== currentSlug && (p.stock ?? 0) > 0
  );
  return filteredProducts.sort(() => 0.5 - Math.random()).slice(0, count);
}

/* ================================
   Page
================================ */
export default function ProductDetailPage({ params }: Props) {
  const product = getProductBySlug(params.slug) as
    | (Product & { discount?: number })
    | undefined;

  if (!product) {
    notFound();
  }

  const imageSrc = product.images?.[0] ?? "/ham.png";
  const currentStock = product.stock ?? 0;
  const outOfStock = currentStock <= 0;

  const finalPrice =
    product.discount && product.discount > 0
      ? Math.round(product.price * (1 - product.discount / 100))
      : product.price;

  const relatedProducts = getRandomProducts(params.slug, 4);

  return (
    <main className="py-6">
      <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>
      <p className="text-gray-600 mb-2">Giá: {formatVND(finalPrice)}</p>

      <AddToCartButton
        product={product}
        disabled={outOfStock}
        fullWidth={false}
      />

      <Link href="/shop" className="block mt-4 text-yellow-600">
        ← Quay lại Shop
      </Link>
    </main>
  );
}
