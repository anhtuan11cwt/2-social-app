"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type SignInValues, signInSchema } from "@/app/schemas/signInSchema";

export default function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInValues) => {
    setError("");

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email hoặc mật khẩu không hợp lệ");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="bg-dark-2 shadow-xl p-8 border border-dark-3 rounded-2xl">
      <h1 className="mb-6 font-bold text-white text-2xl text-center">
        Chào Mừng Trở Lại
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
          {isSubmitting ? "Đang đăng nhập..." : "Đăng Nhập"}
        </button>
      </form>

      <p className="mt-4 text-gray-400 text-sm text-center">
        Chưa có tài khoản?{" "}
        <Link className="text-primary hover:underline" href="/sign-up">
          Đăng Ký
        </Link>
      </p>
    </div>
  );
}
