'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

function AppHeader() {
  const { data: session } = useSession();

  return (
    <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Aplikasi Saya
      </Link>
      <nav>
        {session ? (
          // Jika ada sesi (user login), tampilkan tautan Logout
          <Link href="/signout" className="ml-4 hover:underline">
            Keluar
          </Link>
        ) : (
          // Jika tidak ada sesi (user belum login), tampilkan tautan Login
          <Link href="/signin" className="ml-4 hover:underline">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default AppHeader;