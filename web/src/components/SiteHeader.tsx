"use client";
import CartIndicator from "@/components/CartIndicator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import Image from "next/image";

export default function SiteHeader() {
  const pathname = usePathname();
  const [q, setQ] = useState("");

  const Nav = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className={cn(
        "px-4 py-2 rounded-full transition-all duration-300 hover:bg-yellow-200 hover:text-red-900",
        pathname === href && "font-bold text-red-800 underline decoration-yellow-500"
      )}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100 border-b-4 border-yellow-600 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
      <div className="container mx-auto max-w-6xl px-4 h-20 flex items-center justify-between">
        {/* 👑 Logo + chữ */}
        <Link href="/" className="flex items-center gap-3">
          <div
      className="relative w-15 h-15 rounded-full
                 bg-red-900
                 border-[4px] border-yellow-500
                 shadow-[0_0_25px_rgba(255,215,0,0.85)]
                 overflow-hidden"
    >
      <Image
        src="/IMAGES/Logo.png"
        alt="Triều Đại Vô Lý"
        fill
        className="object-cover"
        priority
      />
    </div>
          <span className="text-3xl font-serif font-extrabold tracking-wide text-red-900 drop-shadow-md">
            Absurd Dynasty
          </span>
        </Link>

        {/* Thanh điều hướng */}
        <nav className="flex gap-4 items-center text-lg font-semibold text-red-800">
          <Nav href="/shop">Triều Kho Báu</Nav>
          <CartIndicator />
          <Nav href="/admin">Ngự Thư Phòng</Nav>
          <Nav href="/login">Đăng Nhập</Nav>
          <Nav href="/register"> Đăng Ký</Nav>
        </nav>
      </div>

      {/* Trang trí hoa văn rồng phượng */}
      <div className="h-2 bg-gradient-to-r from-red-700 via-yellow-500 to-red-700"></div>
    </header>
  );
}
