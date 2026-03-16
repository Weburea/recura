"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const yearData: Record<string, number[]> = {
  "2026": [40, 55, 70, 85, 80, 60, 90, 85, 65, 95, 85, 75],
  "2025": [30, 45, 60, 75, 70, 50, 80, 75, 55, 90, 80, 65],
  "2024": [45, 60, 50, 65, 80, 75, 60, 70, 85, 75, 60, 55],
  "2023": [20, 35, 50, 45, 60, 55, 40, 50, 65, 55, 40, 35]
}

export function RevenueChart() {
  const [selectedYear, setSelectedYear] = React.useState("2026")
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
  const data = yearData[selectedYear] || yearData["2024"]
  
  return (
    <div className="dashboard-card lg:col-span-2 flex flex-col min-h-[480px] overflow-hidden">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="dashboard-title">Revenue Overview</h3>
          <p className="dashboard-subtitle">Monthly revenue for {selectedYear}</p>
        </div>
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="dashboard-button-secondary"
          >
            {selectedYear}
            <ChevronDown className={cn("w-4 h-4 transition-transform", isDropdownOpen && "rotate-180")} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#150a2e] border border-slate-100 dark:border-white/10 rounded-2xl shadow-xl z-30 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {Object.keys(yearData).sort().reverse().map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(year)
                    setIsDropdownOpen(false)
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm font-bold transition-colors hover:bg-purple-50 dark:hover:bg-purple-500/10",
                    selectedYear === year ? "text-purple-600 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-500/20" : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-x-auto no-scrollbar pb-2 group/scroll pt-12">
        <div className="flex items-end justify-between gap-3 md:gap-5 px-2 min-w-[600px] md:min-w-0 h-full">
          {data.map((height, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-6 group h-full justify-end">
            <div className="relative w-full flex flex-col justify-end h-full min-h-[1px]">
               {/* Background bar track */}
               <div className="absolute inset-0 bg-slate-50/50 dark:bg-white/5 rounded-lg w-full" />
               
               {/* Actual data bar */}
              <div 
                className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-lg transition-all duration-500 ease-out group-hover:from-purple-500 group-hover:to-purple-300 relative cursor-pointer shadow-sm z-10"
                style={{ height: `${height}%` }}
              >
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 whitespace-nowrap z-20 pointer-events-none shadow-2xl">
                  ${(height * 1234).toLocaleString()}
                </div>
              </div>
            </div>
            <span className="text-[10px] md:text-xs font-bold text-slate-400 group-hover:text-purple-600 transition-colors whitespace-nowrap">
              {months[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}
