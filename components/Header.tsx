"use client";

import { UserCircle2, LogOut } from "lucide-react";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const [showPopup, setShowPopup] = useState(false);
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/signin' });
  };

  return (
    <header className="h-20 flex items-center justify-between px-6 md:px-8 bg-transparent relative">
      {/* Logo and Title */}
      <div className="flex items-center">
        <Image
          src="/Logo.png"
          alt="Healthify Logo"
          width={100}
          height={100}
          className="object-contain"
        />
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      </div>
      
      <div className="relative">
        <button 
          aria-label="User Profile"
          onClick={() => setShowPopup(!showPopup)}
          className="hover:bg-gray-100 rounded-full p-2 transition-colors"
        >
          <UserCircle2 className="h-10 w-10 text-gray-700" />
        </button>

        {/* Popup */}
        {showPopup && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowPopup(false)}
            />
            
            {/* Popup content */}
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              <div className="p-4 border-b border-gray-100">
                <p className="font-medium text-gray-900">{session?.user?.name}</p>
                <p className="text-sm text-gray-500">{session?.user?.email}</p>
                <p className="text-sm text-blue-600 font-medium">
                  {(session?.user as any)?.roleName || 'User'}
                </p>
              </div>
              
              <div className="p-2">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}