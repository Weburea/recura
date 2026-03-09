"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings, 
  FileText,
  Package,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Subscriptions", href: "/dashboard/subscriptions" },
  { icon: Users, label: "Customers", href: "/dashboard/customers" },
  { icon: CreditCard, label: "Billing & Invoice", href: "/dashboard/billing" },
  { icon: Package, label: "Payments", href: "/dashboard/payments" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn(
      "w-[250px] h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative w-24 h-24">
            <Image 
              src="/images/landing/logo.png" 
              alt="Recura Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
        <button 
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-2 rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-200 group",
                isActive 
                  ? "bg-purple-50 text-purple-600 shadow-sm shadow-purple-100" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-purple-600" : "text-slate-400 group-hover:text-slate-600"
              )} />
              <span className="font-bold text-sm tracking-tight">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-6 mt-auto border-t border-gray-50 bg-slate-50/50">
        <div className="flex items-center gap-4 p-2 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 overflow-hidden shrink-0 shadow-sm">
            <div className="w-full h-full flex items-center justify-center bg-purple-600 text-white font-bold text-sm">
              AU
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">Admin User</p>
            <p className="text-xs font-bold text-slate-400 truncate tracking-tight">admin@business.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
