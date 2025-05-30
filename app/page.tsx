'use client';

import { useSession } from 'next-auth/react';
import AppHeader from '../components/AppHeader';
import LogoutButton from '../components/LogoutButton';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function HomePage() {
  const { data: session, status } = useSession();
  console.log('Session Data:', session); 

  // Tampilkan pesan loading saat sesi sedang dimuat
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Memuat sesi pengguna...</p>
      </div>
    );
  }

  // Tampilkan pesan dan tautan login jika pengguna belum terautentikasi
  if (status === 'unauthenticated') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <AppHeader /> {/* Header akan menampilkan tautan Login di sini */}
        <div className="text-center mt-8 bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Anda Belum Login</h1>
          <p className="text-lg text-gray-700 mb-6">Silakan login untuk mengakses fitur aplikasi.</p>
          <Link href="/signin" className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out">
            Pergi ke Halaman Login
          </Link>
        </div>
      </div>
    );
  }

  // Tampilkan konten halaman jika pengguna sudah terautentikasi
  return (
    <div className="min-h-screen bg-gray-100">
      <AppHeader /> {/* Header akan menampilkan tautan Logout di sini */}
      <main className="p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Selamat Datang di Aplikasi Saya!
        </h1>

        {/* Tampilkan informasi pengguna jika ada sesi */}
        {session?.user && (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto text-center">
            <Navbar currentRole={(session.user as any).roleName} />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Informasi Pengguna:</h2>
            <p className="text-lg text-gray-700 mb-2">
              Nama: **{session.user.name}**
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Email: **{session.user.email}**
            </p>
            {/* Mengakses roleName dari sesi, pastikan `session.user` di-cast ke `any` jika TypeScript mengeluh */}
            <p className="text-xl font-bold text-indigo-600 mb-6">
              Role: **{(session.user as any).roleName || 'Tidak Diketahui'}**
            </p>
            <LogoutButton /> {/* Tombol Logout */}
          </div>
        )}

        <p className="mt-10 text-center text-gray-600">
          Ini adalah halaman utama Anda yang hanya dapat diakses oleh pengguna yang sudah login.
        </p>
      </main>
    </div>
  );
}