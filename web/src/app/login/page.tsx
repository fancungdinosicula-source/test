"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginValues } from "@/app/features/auth/schemas";
import { useState } from "react";

export default function LoginPage() {
  const [serverMsg, setServerMsg] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), mode: "onChange" });

  async function onSubmit(values: LoginValues) {
    setServerMsg(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      const data = await res.json();
      setServerMsg(data?.message ?? "Đăng nhập thất bại");
      return;
    }
    setServerMsg("Đăng nhập thành công (mock)");
  }

  return (
    <main className="min-h-screen flex flex-col justify-center bg-gradient-to-b from-yellow-100 via-yellow-200 to-yellow-100 text-red-900">
      <div className="w-full max-w-md mx-auto bg-white/80 border-2 border-yellow-600 rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-extrabold mb-8 tracking-wide drop-shadow-md font-[Cinzel]">
          Đăng nhập Triều đình
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-red-800">Email</label>
            <input
              type="email"
              className="mt-1 w-full border-2 border-yellow-600 rounded-md h-10 px-3 focus:ring-2 focus:ring-yellow-500"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
              disabled={isSubmitting}
              placeholder="ban@example.com"
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-red-800">Mật khẩu</label>
            <input
              type="password"
              className="mt-1 w-full border-2 border-yellow-600 rounded-md h-10 px-3 focus:ring-2 focus:ring-yellow-500"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password")}
              disabled={isSubmitting}
              placeholder="••••••"
            />
            {errors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="h-11 w-full rounded-md bg-red-700 text-yellow-100 font-semibold hover:bg-red-800 transition-colors shadow-md"
          >
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          {serverMsg && (
            <p className="text-sm mt-2 text-center text-red-700">{serverMsg}</p>
          )}
        </form>
      </div>

      {/* Hoa văn rồng phượng dưới cùng (đã sửa: không dùng absolute, luôn nằm cuối trang) */}
      <div className="mt-12 h-3 w-full bg-gradient-to-r from-red-700 via-yellow-500 to-red-700" />
    </main>
  );
}
