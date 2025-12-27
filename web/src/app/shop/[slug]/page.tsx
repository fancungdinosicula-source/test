import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from '@/mock/products';
import { formatVND } from "@/lib/format"; 
import type { Product } from "@/types/product";
import { getProductBySlug } from "@/lib/catalog";
import AddToCartButton from "@/features/cart/AddToCartButton";

const ProductList = PRODUCTS as (Product & { discount?: number })[];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = (await params).slug;
  const product = getProductBySlug(slug);
  return {
    title: product ? `${product.title} — Shoply` : "Sản phẩm — Shoply",
  };
}

function getRandomProducts(currentSlug: string, count: number) {
  const filteredProducts = ProductList.filter(
    (p) => p.slug !== currentSlug && (p.stock ?? 0) > 0
  );
  const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const slug = (await params).slug;
  const product = getProductBySlug(slug) as Product & { discount?: number }; 
  
  if (!product) {
    notFound();
  }
  
  const imageSrc = product.images?.[0] ?? "/ham.png";
  const currentStock = product.stock ?? 0;
  const outOfStock = currentStock <= 0;
  const finalPrice = product.discount && product.discount > 0
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  const relatedProducts = getRandomProducts(slug, 4); 

  return (
    <main className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative w-full">
          <div className="relative aspect-square">
            <Image
              src={imageSrc} 
              alt={product.title}
              width={600}
              height={600}
              className="w-full h-auto rounded-xl border object-cover"
            />
            {outOfStock && (
              <span className="absolute left-2 top-2 text-xs bg-red-500 text-white px-2 py-1 rounded-md">
                Hết hàng
              </span>
            )}
            {product.discount && product.discount > 0 && (
              <span className="absolute right-2 top-2 text-xs bg-green-600 text-white px-2 py-1 rounded-md">
                -{product.discount}%
              </span>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">{product.title}</h2>
          <p className="mt-2 text-gray-600">Mã: {product.slug}</p>
          <p className="mt-2 text-black-600">Hãng: {product.brand}</p>
          <p className="mt-2 text-black-600">Đánh giá: {product.rating}</p>

          {product.description && (
            <p className="mt-4 text-gray-700 leading-relaxed">
              {product.description}
            </p>
          )}

          <p className="mt-4 text-2xl font-bold">
            {product.discount && product.discount > 0 ? (
              <>
                <span className="line-through text-gray-400 mr-2">
                  {formatVND(product.price)}
                </span>
                <span className="text-red-600 font-semibold">
                  {formatVND(finalPrice)}
                </span>
                <span className="ml-2 text-sm text-green-600">-{product.discount}%</span>
              </>
            ) : (
              formatVND(product.price)
            )}
          </p>

          {outOfStock ? (
            <p className="mt-2 text-red-600 font-medium">Hết hàng</p>
          ) : (
            <p className="mt-2 text-green-600 font-medium">Còn {currentStock} sản phẩm</p>
          )}

          <div className="mt-6 flex gap-4">
            <AddToCartButton
              product={product}
              disabled={outOfStock}
              fullWidth={false}
              className="h-12 px-6 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors shadow-md"
            />
            <Link
              href="/shop"
              className="h-12 px-6 rounded-lg border border-yellow-500 text-yellow-700 font-medium hover:bg-yellow-100 transition-colors flex items-center shadow-sm"
            >
              ← Quay lại Shop
            </Link>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">Có thể bạn quan tâm</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => {
              const relatedImageSrc = p.images?.[0] ?? "/ham.png";
              const relatedOutOfStock = (p.stock ?? 0) <= 0;
              const relatedFinalPrice = p.discount && p.discount > 0
                ? Math.round(p.price * (1 - p.discount / 100))
                : p.price;

              return (
                <Link key={p.slug} href={`/shop/${p.slug}`} className="block">
                  <div className="relative rounded-xl border border-gray-300 hover:shadow-md transition-shadow duration-300 bg-white">
                    <Image
                      src={relatedImageSrc}
                      alt={p.title}
                      width={300}
                      height={300}
                      className="w-full h-auto rounded-t-xl object-cover"
                    />
                    {relatedOutOfStock && (
                      <span className="absolute left-2 top-2 text-xs bg-red-500 text-white px-2 py-1 rounded-md">
                        Hết hàng
                      </span>
                    )}
                    {p.discount && p.discount > 0 && (
                      <span className="absolute right-2 top-2 text-xs bg-green-600 text-white px-2 py-1 rounded-md">
                        -{p.discount}%
                      </span>
                    )}

                    <div className="p-4">
                      <h4 className="text-base font-semibold truncate">{p.title}</h4>
                      <p className="mt-1 text-sm text-gray-900">Hãng: {p.brand}</p>
                      <p className="mt-1 text-sm text-gray-600">
                        Kho: <span className={relatedOutOfStock ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
                          {relatedOutOfStock ? 'Hết hàng' : `${p.stock} sản phẩm`}
                        </span>
                      </p>
                      <p className="mt-1 text-sm text-gray-600">Đánh giá: {p.rating}</p>
                      {p.description && (
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                          {p.description}
                        </p>
                      )}
                      <p className="mt-2 font-bold text-sm text-gray-800">
                        {p.discount && p.discount > 0 ? (
                          <>
                            <span className="line-through text-gray-400 mr-2">
                              {formatVND(p.price)}
                            </span>
                            <span className="text-red-600 font-semibold">
                              {formatVND(relatedFinalPrice)}
                            </span>
                            <span className="ml-2 text-green-600 text-xs">-{p.discount}%</span>
                          </>
                        ) : (
                          formatVND(p.price)
                        )}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
