'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function SignOutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Opsional: Redirect jika user ternyata belum login
  // Atau jika user sudah logout dan kembali ke halaman ini
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/signin'); // Arahkan ke halaman login jika tidak ada sesi
    }
  }, [status, router]);

  const handleSignOut = async () => {
    // Memanggil fungsi signOut dari NextAuth.js
    // `callbackUrl` akan mengarahkan pengguna ke halaman yang ditentukan setelah proses selesai.
    await signOut({ callbackUrl: '/signin' }); // Arahkan ke halaman login setelah logout
  };

  // Tampilkan loading state
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Memuat status sesi...</p>
      </div>
    );
  }

  // Tampilkan UI ketika user sudah login (siap untuk logout)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Anda yakin ingin keluar?</h1>
        {session?.user?.name && (
          <p className="text-gray-700 mb-6">Halo, **{session.user.name}**.</p>
        )}
        <button
          onClick={handleSignOut}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Ya, Keluar
        </button>
        <Link href="/" className="mt-4 block text-indigo-600 hover:text-indigo-500">
          Tidak, Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}