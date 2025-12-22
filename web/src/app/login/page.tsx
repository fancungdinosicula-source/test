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
    <main
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fdf6e3] via-[#e0d7c6] to-[#fdf6e3] bg-fixed bg-cover bg-center text-indigo-900"
      style={{
        backgroundImage:
          "(rgba(253,246,227,0.85), rgba(224,215,198,0.85))",
      }}
    >
      <div className="w-full max-w-md bg-white/80 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">Đăng nhập</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 w-full border rounded-md h-10 px-3 focus:ring-2 focus:ring-indigo-400"
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
            <label className="block text-sm font-medium">Mật khẩu</label>
            <input
              type="password"
              className="mt-1 w-full border rounded-md h-10 px-3 focus:ring-2 focus:ring-indigo-400"
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
            className="h-10 w-full rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          {serverMsg && <p className="text-sm mt-2 text-center">{serverMsg}</p>}
        </form>
      </div>
    </main>
  );
}
