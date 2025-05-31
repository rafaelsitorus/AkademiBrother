'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Untuk Next.js App Router
import { useEffect } from 'react';
import AppHeader from '../components/AppHeader';
import LogoutButton from '../components/LogoutButton';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      const role = (session?.user as any)?.roleName;

      if (role === 'Governance') {
        router.push('/governance/');
      } else if (role === 'Insurance') {
        router.push('/insurance/');
      }
    }
  }, [status, session, router]);

  // Loading state
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Memuat sesi pengguna...</p>
      </div>
    );
  }

  // Unauthenticated state
  if (status === 'unauthenticated') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <AppHeader />
        <div className="text-center mt-8 bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Anda Belum Login</h1>
          <p className="text-lg text-gray-700 mb-6">Silakan login untuk mengakses fitur aplikasi.</p>
          <Link
            href="/signin"
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Pergi ke Halaman Login
          </Link>
        </div>
      </div>
    );
  }

  // Optional fallback UI while redirect is happening
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg text-gray-700">Mengalihkan ke halaman utama Anda...</p>
    </div>
  );
}