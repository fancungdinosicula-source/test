import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "@/mock/products";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/").pop(); // hoặc dùng regex nếu cần chính xác hơn

  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
