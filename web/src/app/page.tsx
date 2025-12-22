import Link from "next/link";

export default function HomePage() {
  return (
    <main
      className="py-10 min-h-screen flex flex-col items-center justify-center text-center text-yellow-50"
    >
      <div className="bg-black/60 p-10 rounded-xl shadow-2xl max-w-2xl">
        <h1 className="text-3xl font-extrabold mb-6 tracking-wide">
          Chào mừng đến Triều đại vô lý
        </h1>
        <div className="flex gap-6 underline text-lg">
          <Link href="/shop">Triều Kho Báu</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/admin">Ngự Thư Phòng</Link>
        </div>
      </div>
    </main>
  );
}
