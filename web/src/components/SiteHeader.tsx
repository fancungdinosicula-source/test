"use client";
import CartIndicator from "@/components/CartIndicator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";

export default function SiteHeader() {
  const pathname = usePathname();
  const [q, setQ] = useState("");

  const Nav = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className={cn(
        "px-4 py-2 rounded-full transition-all duration-300 hover:bg-indigo-100 hover:text-indigo-900",
        pathname === href && "font-bold text-indigo-700 underline"
      )}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#fdf6e3] via-[#e0d7c6] to-[#fdf6e3] backdrop-blur border-b border-indigo-200 shadow-md">
      <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold tracking-wide text-indigo-900">
          Absurd Dynasty
        </Link>
        <nav className="flex gap-3 items-center">
          <Nav href="/shop">Triều Kho Báu</Nav>
          <CartIndicator />
          <Nav href="/admin">Ngự Thư Phòng</Nav>
          <Nav href="/login">Đăng Nhập</Nav>
          <Nav href="/register">Đăng Ký</Nav>
        </nav>
      </div>
    </header>
  );
}
