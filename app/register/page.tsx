// app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [roleName, setRoleName] = useState('User'); // Default role
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/register', { // Memanggil API registrasi kustom Anda
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, roleName }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registrasi berhasil! Silakan login.');
        router.push('/signin'); // Redirect ke halaman login
      } else {
        setError(data.message || 'Registrasi gagal. Silakan coba lagi.');
      }
    } catch (err) {
      setError('Terjadi kesalahan jaringan atau server.');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Register form */}
      <div className="bg-white p-8 sm:p-10 w-full max-w-md flex flex-col justify-center">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-white/30 rounded-md"></div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-8 text-gray-900">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="nameexample"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Role
            </label>
            <select
              id="role"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            >
              <option value="Hospital">Hospital</option>
              <option value="Governance">Governance</option>
              <option value="Insurance">Insurance</option>
            </select>
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
            Sign Up
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-emerald-600 hover:text-emerald-500"
          >
            Sign in
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