export default function SiteFooter() {
  return (
    <footer className="
      mt-20
      bg-gradient-to-b from-yellow-100 via-yellow-200 to-yellow-100
      text-red-900
      border-t-[6px] border-yellow-600
      shadow-[inset_0_6px_20px_rgba(0,0,0,0.35)]
      relative
      overflow-hidden
    ">
      
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

      <div className="container mx-auto max-w-6xl px-4 py-14 text-center space-y-8 relative z-10">

        {/* 👑 Câu ngự ngôn */}
        <p className="italic text-xl text-red-800 drop-shadow-md font-bold">
          “Lịch sử không được viết lại, nhưng có thể được vẽ lại.”
        </p>

        {/* 🐉 Hoa văn phân cách */}
        <div className="flex items-center justify-center gap-4">
          <span className="h-px w-20 bg-red-700" />
          <span className="text-yellow-600 text-xl">🐉</span>
          <span className="h-px w-20 bg-red-700" />
        </div>

        {/* 📜 Bản quyền */}
        <p className="text-sm text-red-700 font-medium">
          © {new Date().getFullYear()}{" "}
          <span className="font-serif font-bold tracking-wide">
            Absurd Dynasty
          </span>{" "}
          — Một triều đại siêu thực dành cho kẻ mộng mơ.
        </p>

        {/* 🏰 Thông tin liên hệ */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-red-800">

          <div className="space-y-2">
            <p className="font-semibold text-lg tracking-wide">📧 Ngự Thư</p>
            <a
              href="mailto:tanthuyhoangcuoigaubaccuc@gmail.com"
              className="underline hover:text-red-900 text-base"
            >
              tanthuyhoangcuoigaubaccuc@gmail.com
            </a>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-lg tracking-wide">📞 Ngự Điện</p>
            <a
              href="tel:0936366767"
              className="underline hover:text-red-900 text-base"
            >
              0936 366 767
            </a>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-lg tracking-wide">🏰 Ngự Chỉ</p>
            <p className="text-base">
              Hoàng cung Ảo Mộng<br />
              Phố Cổ Kinh Thành, Tây Ninh
            </p>
          </div>
        </div>
      </div>

      {/* 🔥 Dải long văn đáy footer */}
      <div className="h-4 bg-gradient-to-r from-red-800 via-yellow-500 to-red-800 shadow-inner" />
    </footer>
  );
}

