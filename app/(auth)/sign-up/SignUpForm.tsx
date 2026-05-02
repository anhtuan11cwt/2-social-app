"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type SignUpValues, signUpSchema } from "@/app/schemas/signUpSchema";

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpValues) => {
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Đã xảy ra lỗi");
        return;
      }

      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      router.push("/");
      router.refresh();
    } catch {
      setError("Lỗi mạng");
    }
  };

  return (
    <div className="bg-dark-2 shadow-xl p-8 border border-dark-3 rounded-2xl">
      <h1 className="mb-6 font-bold text-white text-2xl text-center">
        Tạo Tài Khoản
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("name")}
            className="bg-dark-3 p-3 border border-dark-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-white placeholder:text-gray-400"
            placeholder="Họ và Tên"
          />
          {errors.name && (
            <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("username")}
            className="bg-dark-3 p-3 border border-dark-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-white placeholder:text-gray-400"
            placeholder="Tên người dùng"
          />
          {errors.username && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register("email")}
            className="bg-dark-3 p-3 border border-dark-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-white placeholder:text-gray-400"
            placeholder="Email"
            type="email"
          />
          {errors.email && (
            <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <input
            {...register("password")}
            className="bg-dark-3 p-3 pr-12 border border-dark-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-white placeholder:text-gray-400"
            placeholder="Mật khẩu"
            type={showPassword ? "text" : "password"}
          />
          <button
            className="top-1/2 right-3 absolute text-gray-400 hover:text-white transition-colors -translate-y-1/2 transform"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          className="bg-primary hover:bg-primary-hover disabled:opacity-50 p-3 rounded-lg w-full font-semibold text-white transition disabled:cursor-not-allowed"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Đang tạo..." : "Đăng Ký"}
        </button>
      </form>

      <p className="mt-4 text-gray-400 text-sm text-center">
        Đã có tài khoản?{" "}
        <Link className="text-primary hover:underline" href="/sign-in">
          Đăng Nhập
        </Link>
      </p>
    </div>
  );
}
