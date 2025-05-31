"use client"

import { Home, Stethoscope, Settings, LifeBuoy, LayoutDashboard, BarChart2, Flame} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import {useSession} from "next-auth/react"

// Define navigation items for each role
const navigationConfig = {
  "Governance": [ // Governance
    { icon: Home, label: "Home", href: "/governance" },
    { icon: Stethoscope, label: "Doctor Analytics", href: "/governance/doctor" },
    { icon: LayoutDashboard, label: "Facility Analytics", href: "/governance/facility"},
    { icon: Flame, label: "Burn Out Anaytics", href: "/governance/burnout"},
  ],
  "Insurance": [ // Insurance
    { icon: Home, label: "Home", href: "/insurance" },
    { icon: BarChart2, label: "Analytics", href: "/insurance/fraud" },
  ]
}

export default function Sidebar() {

  const {data:session} = useSession();
  // Get role ID with fallback to insurance (3)
  const roleName = session?.user.roleName

  // Get navigation items based on role ID
  const navItems = navigationConfig[roleName as keyof typeof navigationConfig]

  return (
    <aside className="
      w-16 bg-[#00A79D] text-white flex flex-col items-center py-6 space-y-10 rounded-3xl shadow-lg
      h-[775px]
      my-auto
      overflow-y-auto
    ">
      <div className="flex flex-col items-center space-y-8 flex-1">
        {navItems?.map((item) => (
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
    </aside>
  )
}