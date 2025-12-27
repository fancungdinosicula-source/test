import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center
                 bg-gradient-to-b from-yellow-100 via-yellow-200 to-yellow-100
                 text-red-900 overflow-hidden"
    >
      {/* 🌟 Viền ánh kim nền */}
      <div className="absolute inset-0 pointer-events-none
          bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.35),transparent_60%)]" />

      {/* 👑 KHUNG CHIẾU CHỈ HOÀNG GIA */}
      <div className="relative max-w-3xl w-full px-6">
        {/* Viền ngoài vàng */}
        <div className="absolute inset-0 rounded-[2.5rem]
            bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600
            shadow-[0_0_50px_rgba(255,215,0,0.7)]" />

        {/* Viền đỏ */}
        <div className="absolute inset-[8px] rounded-[2.1rem]
            bg-gradient-to-br from-red-900 via-red-800 to-red-900" />

        {/* Nội dung */}
        <div
          className="relative rounded-[1.8rem] px-10 py-14 text-center
                     bg-gradient-to-b from-yellow-50 via-yellow-100 to-yellow-50
                     border-4 border-yellow-500 shadow-2xl"
        >
          {/* 🐉 Rồng trái – phải */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-4xl opacity-40">
            🐉
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl opacity-40">
            🐉
          </div>

          {/* 👑 Logo */}
          <div className="flex justify-center mb-6">
  <div
    className="relative w-28 h-28 rounded-full
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
</div>


          {/* 👑 Tiêu đề */}
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-4
                       tracking-wider drop-shadow-lg
                       font-[Cinzel]"
          >
            👑 Triều Đại Vô Lý 👑
          </h1>

          <p className="italic text-red-700 mb-10">
            Ngự trị kho báu – ban chỉ giao thương – định đoạt thiên hạ
          </p>

          {/* 🔱 Divider */}
          <div className="h-1 w-40 mx-auto mb-10 rounded-full
              bg-gradient-to-r from-red-700 via-yellow-500 to-red-700" />

          {/* 🔗 Menu */}
          <div className="flex flex-wrap gap-6 text-lg font-semibold justify-center">
            <Link
              href="/shop"
              className="px-6 py-3 rounded-full border-2 border-yellow-600
                         bg-white/70
                         hover:bg-yellow-200 hover:scale-105
                         transition-all shadow-md"
            >
              🐉 Triều Kho Báu
            </Link>

            <Link
              href="/cart"
              className="px-6 py-3 rounded-full border-2 border-yellow-600
                         bg-white/70
                         hover:bg-yellow-200 hover:scale-105
                         transition-all shadow-md"
            >
              🛒 Giỏ Hàng
            </Link>

            <Link
              href="/admin"
              className="px-6 py-3 rounded-full border-2 border-yellow-600
                         bg-white/70
                         hover:bg-yellow-200 hover:scale-105
                         transition-all shadow-md"
            >
              📜 Ngự Thư Phòng
            </Link>
          </div>
        </div>
      </div>

      {/* 🟥 Footer hoàng gia */}
      <div className="mt-16 h-3 w-full bg-gradient-to-r from-red-700 via-yellow-500 to-red-700" />
    </main>
  );
}
