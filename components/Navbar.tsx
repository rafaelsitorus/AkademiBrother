'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Untuk menandai tautan aktif

interface DashboardNavProps {
  currentRole: 'Hospital' | 'Governance' | 'Insurance';
}

export default function DashboardNav({ currentRole }: DashboardNavProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Hospital Dashboard', href: '/hospital', roles: ['Hospital'] },
    { name: 'Governance Dashboard', href: '/governance', roles: ['Governance'] },
    { name: 'Insurance Dashboard', href: '/insurance', roles: ['Insurance'] },
    { name: 'User Dashboard', href: '/user', roles: ['User'] },
    // Anda bisa menambahkan tautan lain di sini
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Navigasi Dashboard</h2>
      <nav>
        <ul>
          {navItems.map((item) => {
            // Tampilkan tautan hanya jika role saat ini memiliki akses ke dashboard tersebut
            if (item.roles.includes(currentRole)) {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} className="mb-3">
                  <Link href={item.href} className={`block py-2 px-4 rounded-md transition duration-200 ${
                    isActive ? 'bg-blue-600 font-semibold' : 'hover:bg-gray-700'
                  }`}>
                    {item.name}
                  </Link>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </nav>
      {/* Tambahkan bagian lain dari sidebar jika perlu */}
    </aside>
  );
}