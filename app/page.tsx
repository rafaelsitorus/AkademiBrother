'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      // Redirect to landing page if not authenticated
      router.push('/landing');
    } else if (status === 'authenticated') {
      // Redirect based on role if authenticated
      const role = (session?.user as any)?.roleName;

      if (role === 'Governance') {
        router.push('/governance');
      } else if (role === 'Insurance') {
        router.push('/insurance');
      } else {
        // Default fallback
        router.push('/governance');
      }
    }
  }, [status, session, router]);

  // Show loading state while checking authentication or redirecting
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-700">
          {status === 'loading' ? 'Loading...' : 'Redirecting...'}
        </p>
      </div>
    </div>
  );
}