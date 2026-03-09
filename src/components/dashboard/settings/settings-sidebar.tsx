"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Building2, 
  Palette, 
  CreditCard, 
  Users, 
  Bell
} from "lucide-react"
import { cn } from "@/lib/utils"

const settingsNav = [
  { icon: Building2, label: "Workspace", href: "/dashboard/settings" },
  { icon: Palette, label: "Branding", href: "/dashboard/settings/branding" },
  { icon: CreditCard, label: "Payment Settings", href: "/dashboard/settings/payments" },
  { icon: Users, label: "Team Members", href: "/dashboard/settings/team" },
  { icon: Bell, label: "Notifications", href: "/dashboard/settings/notifications" },
]

export function SettingsSidebar() {
  const pathname = usePathname()

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-4 px-2 tracking-tight">Plan Distribution</h2>
      
      <nav className="space-y-1">
        {settingsNav.map((item) => {
          // Exact match for the base settings page, or exact match for subpages
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group font-bold text-[15px] tracking-tight",
                isActive 
                  ? "bg-purple-50 text-purple-600" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn(
                "w-[22px] h-[22px]",
              )} />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
