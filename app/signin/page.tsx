// app/signin/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const [identifier, setIdentifier] = useState(""); // Untuk username atau email
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Memanggil fungsi signIn dengan Credentials Provider
    const result = await signIn("credentials", {
      redirect: false, // Penting: Jangan redirect otomatis, tangani sendiri
      identifier, // Mengirim identifier (username atau email)
      password,
    });

    if (result?.error) {
      // Tangani error dari NextAuth.js
      setError(result.error);
    } else if (result?.ok) {
      router.push("/"); // Redirect ke halaman utama setelah login berhasil
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Sign in form */}
      <div className="bg-white p-8 sm:p-10 w-full max-w-md flex flex-col justify-center">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-white/30 rounded-md"></div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-8 text-gray-900">
          Log in
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="identifier"
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link
                href="/reset-password"
                className="font-medium text-emerald-600 hover:text-emerald-500"
              >
                Reset Password?
              </Link>
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-xl">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/register"
            className="font-medium text-emerald-600 hover:text-emerald-500"
          >
            Register
          </Link>
        </p>
      </div>

      {/* Right side - Background/Image area */}
      <div className="flex-1 bg-gradient-to-br from-emerald-100 to-cyan-100 hidden md:block">
        {/* You can add background image or pattern here */}
      </div>
    </div>
  );
}