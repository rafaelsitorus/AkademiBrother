'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AppHeader from '../components/AppHeader';
import LogoutButton from '../components/LogoutButton';
import Navbar from '../components/Navbar';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Redirect to signin page if user is not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  // Show loading state while checking authentication or redirecting
  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Redirecting to login...</p>
      </div>
    );
  }

  // Only authenticated users will see this content
  return (
    <div className="min-h-screen bg-gray-100">
      <AppHeader />
      <main className="p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Welcome to Healthify!
        </h1>

        {/* User information */}
        {session?.user && (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto text-center">
            <Navbar currentRole={(session.user as any).roleName} />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Information:</h2>
            <p className="text-lg text-gray-700 mb-2">
              Name: <span className="font-semibold">{session.user.name}</span>
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Email: <span className="font-semibold">{session.user.email}</span>
            </p>
            <p className="text-xl font-bold text-indigo-600 mb-6">
              Role: <span className="font-semibold">{(session.user as any).roleName || 'Unknown'}</span>
            </p>
            <LogoutButton />
          </div>
        )}

        <p className="mt-10 text-center text-gray-600">
          This page is only accessible to authenticated users.
        </p>
      </main>
    </div>
  );
}