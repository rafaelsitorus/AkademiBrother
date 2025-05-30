'use client';

import { useSession } from 'next-auth/react';
// Pastikan path import komponen-komponen ini sudah benar
// Karena Anda berada di app/(dashboard)/hospital/, Anda perlu naik 3 level
import AppHeader from '../../components/AppHeader';
import LogoutButton from '../../components/LogoutButton';
import Navbar from '../../components/Navbar';

export default function HospitalDashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Memuat dashboard...</p>
      </div>
    );
  }

  // Penting: Di sini, jika `middleware.ts` tidak ada, ini adalah satu-satunya
  // tempat Anda memvalidasi role. Ini tidak aman untuk produksi!
  // Anda harus login dan memiliki role 'Hospital' agar bisa melihat ini.
  if (status === 'unauthenticated' || !session || (session.user as any)?.roleName !== 'Hospital') {
    // Alihkan ke halaman login jika belum login
    // Atau ke halaman unauthorized jika role tidak sesuai
    // Karena tidak ada middleware, kita bisa melakukan redirect di client-side
    // Namun, perlu diingat, ini tidak aman karena halaman tetap dirender di server sebelum redirect.
    // Paling baik adalah menggunakan middleware.
    // Untuk saat ini, kita tampilkan pesan error saja.
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700">
        <p className="text-xl">Akses ditolak. Anda tidak memiliki izin Hospital atau belum login.</p>
        <p className="text-lg mt-4"><a href="/signin" className="text-blue-600 hover:underline">Login</a></p>
      </div>
    );
  }

  // Jika kode mencapai titik ini, `session` dan `session.user` dijamin ada
  // dan `roleName` adalah 'Hospital'.
  const currentRole = (session.user as any).roleName as 'Hospital'; // Casting untuk memastikan tipe

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AppHeader />
      <div className="flex flex-1">
        <Navbar currentRole={currentRole} />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Rumah Sakit</h1>
          <p className="text-lg text-gray-700 mb-4">
            Selamat datang, **{session.user.name || session.user.email}**!
            Ini adalah dashboard khusus untuk role **Hospital**.
          </p>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Pasien & Fasilitas</h2>
            <p>Informasi detail tentang pasien, jadwal, dan pengelolaan fasilitas rumah sakit.</p>
          </div>
          <div className="mt-8">
            <LogoutButton />
          </div>
        </main>
      </div>
    </div>
  );
}