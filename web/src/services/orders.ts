import { apiFetch } from "@/lib/api";

export type CreateOrderInput = {
  customerName: string;
  customerPhone?: string;
  customerAddress: string;
  paymentMethod: "cod" | "banking" | "momo";
  note?: string;
  items: { productId: string; quantity: number }[];
};

export type OrderItem = {
  productId: string;
  quantity: number;
};

export type Order = {
  id: string;
  customerName: string;
  customerPhone?: string;
  customerAddress: string;
  paymentMethod: "cod" | "banking" | "momo";
  note?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
};

export function createOrder(input: CreateOrderInput) {
  return apiFetch<{ ok: boolean; order: Order }>("/api/v1/orders", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
