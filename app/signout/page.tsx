'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignOutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Instantly sign out when the page loads
  useEffect(() => {
    if (status === 'authenticated') {
      // Automatically sign out without confirmation
      signOut({ callbackUrl: '/signin' });
    } else if (status === 'unauthenticated') {
      // If already logged out, redirect to signin
      router.replace('/signin');
    }
  }, [status, router]);

  // Show loading state while processing logout
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h1 className="text-xl font-medium text-gray-700">Signing out...</h1>
        <p className="text-sm text-gray-500 mt-2">Please wait while we log you out.</p>
      </div>
    </div>
  );
}