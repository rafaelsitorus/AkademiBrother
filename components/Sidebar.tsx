// components/Sidebar.tsx

"use client"

import { Home, BarChart2, Settings, LifeBuoy, Scroll } from "lucide-react"
// import { useState } from "react" // Tidak diperlukan lagi
import { cn } from "@/lib/utils"
import Link from "next/link"
// import { usePathname } from 'next/navigation'; // Tidak diperlukan lagi

const navItems = [
  { icon: Home, label: "Home", href: "/insurance" },
  { icon: BarChart2, label: "Analytics", href: "/insurance/fraud" },
  { icon: Scroll, label: "Form", href: "/insurance/form" },
]

export default function Sidebar() {
  // Anda bisa menghapus useState atau usePathname jika tidak ada bagian lain dari komponen
  // yang bergantung pada status aktifnya.
  // Jika Anda hanya ingin memastikan tidak ada tombol yang aktif secara default,
  // cukup hapus kondisi dari className.

  return (
    <aside className="
      w-16 bg-[#00A79D] text-white flex flex-col items-center py-6 space-y-10 rounded-3xl shadow-lg
      h-[500px]
      my-auto
      overflow-y-auto
    ">
      <div className="flex flex-col items-center space-y-8 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "p-3 rounded-lg transition-colors duration-200 ease-in-out",
              "hover:bg-white/10" 
            )}
            aria-label={item.label}
          >
            <item.icon className="h-7 w-7" />
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center space-y-6">
        <button
          className="p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 ease-in-out"
          aria-label="Settings"
        >
          <Settings className="h-7 w-7" />
        </button>
        <button
          className="p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 ease-in-out"
          aria-label="Help"
        >
          <LifeBuoy className="h-7 w-7" />
        </button>
      </div>
    </aside>
  )
}