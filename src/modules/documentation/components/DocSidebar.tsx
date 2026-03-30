"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { documentationNav } from "../data/navigation"

export function DocSidebar() {
  const pathname = usePathname()
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
    "Components": true,
    "Layout & Navigation": true
  })

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  return (
    <div className="w-full lg:w-64 flex flex-col gap-6 sticky top-8">
      <div className="bg-white dark:bg-[#150a2e] rounded-2xl border border-gray-100 dark:border-white/10 p-5 overflow-hidden shadow-sm shadow-slate-200/50 dark:shadow-none">
        <div className="flex items-center gap-3 mb-8 px-1">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Docs</h2>
        </div>
        
        <nav className="space-y-6">
          {documentationNav.map((section) => (
            <div key={section.title} className="space-y-1">
              <button
                onClick={() => section.collapsible && toggleSection(section.title)}
                className={cn(
                  "w-full flex items-center justify-between px-2 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 transition-colors",
                  section.collapsible && "hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer"
                )}
              >
                <span>{section.title}</span>
                {section.collapsible && (
                  <div className="w-4 h-4 rounded-md bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/10">
                    {openSections[section.title] ? <ChevronDown className="w-2.5 h-2.5" /> : <ChevronRight className="w-2.5 h-2.5" />}
                  </div>
                )}
              </button>

              {(!section.collapsible || openSections[section.title]) && (
                <div className="space-y-1 mt-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group font-bold text-[13px] tracking-tight relative",
                          isActive 
                            ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20" 
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                        )}
                      >
                        <div className={cn(
                          "w-5 h-5 flex items-center justify-center shrink-0",
                          isActive ? "text-white" : "text-slate-400 dark:text-slate-500 group-hover:text-purple-600 dark:group-hover:text-purple-400"
                        )}>
                          <item.icon className="w-4 h-4" />
                        </div>
                        {item.label}
                        {isActive && (
                          <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        )}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Developer Helper Card */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-purple-500/20">
        <h3 className="font-bold mb-2">Need help?</h3>
        <p className="text-sm text-purple-100 mb-4 tracking-tight leading-relaxed">
          Check out our developer guide for advanced integration patterns.
        </p>
        <Link 
          href="/dashboard/documentation/guide"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
        >
          View Guide
        </Link>
      </div>
    </div>
  )
}
