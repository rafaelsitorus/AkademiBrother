'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/signin' }); 
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
    >
      Logout
    </button>
  );
}