export default function AdminPage() {
  return (
    <main className="py-12 px-4 max-w-6xl mx-auto bg-gradient-to-b from-yellow-100 via-yellow-200 to-yellow-100 min-h-screen text-red-900">
      {/* Long án */}
      <section className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-extrabold tracking-wide drop-shadow-md">
          🏯 Ngự Thư Phòng
        </h1>
        <p className="mt-3 text-red-700 italic text-lg">
          “Nơi tấu chương hội tụ – tranh định vận mệnh triều đình”
        </p>
      </section>

      {/* Thẻ tổng quan triều chính */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="rounded-xl border-2 border-yellow-600 bg-white/80 p-6 shadow-md hover:shadow-lg transition">
          <h3 className="font-semibold text-lg">🎨 Kho Tranh</h3>
          <p className="text-3xl font-bold mt-2 text-red-900">35</p>
          <p className="text-sm text-red-700 mt-1">
            Tranh cổ & dị sử đang trưng bày
          </p>
        </div>

        <div className="rounded-xl border-2 border-yellow-600 bg-white/80 p-6 shadow-md hover:shadow-lg transition">
          <h3 className="font-semibold text-lg">👘 Trang Phục Cổ</h3>
          <p className="text-3xl font-bold mt-2 text-red-900">15</p>
          <p className="text-sm text-red-700 mt-1">
            Y phục triều đại & cổ phong
          </p>
        </div>

        <div className="rounded-xl border-2 border-yellow-600 bg-white/80 p-6 shadow-md hover:shadow-lg transition">
          <h3 className="font-semibold text-lg">📦 Tấu Đơn</h3>
          <p className="text-3xl font-bold mt-2 text-red-900">0</p>
          <p className="text-sm text-red-700 mt-1">
            Đơn hàng chờ hoàng thượng phê duyệt
          </p>
        </div>
      </section>

      {/* Khu hành chính */}
      <section className="rounded-2xl border-2 border-yellow-600 bg-white/90 p-8 shadow-lg">
        <h2 className="text-4xl font-extrabold mb-8 tracking-wide drop-shadow-md font-[Cinzel]">
          📜 Tấu Sớ Hành Chính
        </h2>

        <ul className="space-y-3 text-red-800">
          <li>• CRUD tranh cổ, tranh long – hổ – phượng – dị sử</li>
          <li>• Quản lý trang phục cổ & mô tả chất liệu</li>
          <li>• Duyệt / hủy / hoàn đơn hàng</li>
          <li>• Ghi chú đơn bằng “ngự phê”</li>
        </ul>

        <p className="mt-6 text-sm text-red-700 italic">
          Hiện tại triều đình đang trong giai đoạn kiến thiết.
          Các chức năng sẽ được triệu tập dần.
        </p>
      </section>

      {/* Trang trí hoa văn rồng phượng dưới cùng */}
      <div className="mt-12 h-3 w-full bg-gradient-to-r from-red-700 via-yellow-500 to-red-700"></div>
    </main>
  );
}
