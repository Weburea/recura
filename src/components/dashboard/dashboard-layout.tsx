"use client"

import * as React from "react"
import { Sidebar } from "./sidebar"
import { TopBar } from "./top-bar"
import { DashboardFooter } from "./footer"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-[#F8F9FC] dark:bg-transparent">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="lg:pl-[250px] flex flex-col min-h-screen">
        <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
        <DashboardFooter />
      </div>
    </div>
  )
}
