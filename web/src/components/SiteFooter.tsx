export default function SiteFooter() {
  return (
    <footer className="border-t mt-16 bg-gradient-to-r from-[#fdf6e3] via-[#e0d7c6] to-[#fdf6e3] text-indigo-900 shadow-inner">
      <div className="container mx-auto max-w-6xl px-4 py-8 text-center space-y-4">
        <p className="italic text-base">“Lịch sử không được viết lại, nhưng có thể được vẽ lại.”</p>
        <p className="text-sm text-indigo-700">
          © {new Date().getFullYear()} Absurd Dynasty — Một triều đại siêu thực dành cho kẻ mộng mơ.
        </p>

        {/* Thông tin liên hệ chia 3 cột, chữ to hơn */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-indigo-800">
          <div>
            <p className="font-semibold text-lg">Email</p>
            <a
              href="mailto:tanthuyhoangcuoigaubaccuc@gmail.com"
              className="underline hover:text-indigo-900 text-base"
            >
              tanthuyhoangcuoigaubaccuc@gmail.com
            </a>
          </div>
          <div>
            <p className="font-semibold text-lg">Điện thoại</p>
            <a href="tel:0936366767" className="underline hover:text-indigo-900 text-base">
              0936366767
            </a>
          </div>
          <div>
            <p className="font-semibold text-lg">Địa chỉ</p>
            <p className="text-base">Hoàng cung Ảo Mộng, Phố Cổ Kinh Thành, Tây Ninh</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
