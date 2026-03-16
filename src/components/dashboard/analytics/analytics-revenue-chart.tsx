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

export function AnalyticsRevenueChart() {
  const [selectedYear, setSelectedYear] = React.useState("2026")
  const [selectedChartType, setSelectedChartType] = React.useState("Column Chart")
  const [isYearDropdownOpen, setIsYearDropdownOpen] = React.useState(false)
  const [isChartDropdownOpen, setIsChartDropdownOpen] = React.useState(false)
  
  const chartTypes = ["Column Chart", "Line Chart", "Pie Chart", "KPI Chart"]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
  const data = yearData[selectedYear] || yearData["2026"]

  // Handlers
  const totalRevenue = data.reduce((a, b) => a + b, 0)
  const avgRevenue = Math.round(totalRevenue / data.length)
  const maxRevenue = Math.max(...data)
  const minRevenue = Math.min(...data)

  // Pie chart calculation (simple proportions)
  const colors = ["#7c3aed", "#a855f7", "#c026d3", "#db2777", "#e11d48", "#ea580c", "#ca8a04", "#65a30d", "#059669", "#0891b2", "#0284c7", "#4f46e5"]
  const conicStops = data.reduce((acc, val, i) => {
    const start = acc.cumulativePercent
    const percent = totalRevenue > 0 ? (val / totalRevenue) * 100 : 0
    const end = start + percent
    acc.stops.push(`${colors[i]} ${start}% ${end}%`)
    acc.cumulativePercent = end
    return acc
  }, { stops: [] as string[], cumulativePercent: 0 }).stops.join(", ")

  // Line chart SVG path calculation
  const getLinePath = () => {
    // Assuming width 1000, height 300 for SVG viewbox
    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * 1000
      const y = 300 - (val / 100) * 300
      return `${x},${y}`
    }).join(" L")
    return `M ${points}`
  }
  
  return (
    <div className="dashboard-card lg:col-span-2 flex flex-col min-h-[480px] overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10">
        <div>
          <h3 className="dashboard-title">Revenue Overview</h3>
          <p className="dashboard-subtitle">Monthly revenue for {selectedYear}</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto relative">
          {/* Year Dropdown */}
          <div className="relative flex-1 md:flex-none">
            <button 
              onClick={() => {
                setIsYearDropdownOpen(!isYearDropdownOpen)
                setIsChartDropdownOpen(false)
              }}
              className="dashboard-button-secondary w-full justify-between px-3 md:px-5 text-xs sm:text-sm"
            >
              {selectedYear}
              <ChevronDown className={cn("w-4 h-4 transition-transform shrink-0 ml-1", isYearDropdownOpen && "rotate-180")} />
            </button>
            
            {isYearDropdownOpen && (
              <div className="absolute right-0 mt-2 w-full md:w-32 bg-white dark:bg-[#150a2e] border border-slate-100 dark:border-white/10 rounded-2xl shadow-xl shadow-purple-900/5 dark:shadow-purple-900/30 z-30 py-2 overflow-hidden">
                {Object.keys(yearData).sort().reverse().map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year)
                      setIsYearDropdownOpen(false)
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-xs sm:text-sm font-bold transition-colors hover:bg-purple-50 dark:hover:bg-white/5",
                      selectedYear === year ? "text-purple-600 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-500/20" : "text-slate-600 dark:text-slate-300"
                    )}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Chart Type Dropdown */}
          <div className="relative flex-1 md:flex-none">
            <button 
              onClick={() => {
                setIsChartDropdownOpen(!isChartDropdownOpen)
                setIsYearDropdownOpen(false)
              }}
              className="dashboard-button-secondary w-full justify-between md:min-w-[140px] px-3 md:px-5 text-xs sm:text-sm"
            >
              <span className="truncate">{selectedChartType}</span>
              <ChevronDown className={cn("w-4 h-4 transition-transform shrink-0 ml-1", isChartDropdownOpen && "rotate-180")} />
            </button>
            
            {isChartDropdownOpen && (
              <div className="absolute right-0 mt-2 w-full md:w-40 bg-white dark:bg-[#150a2e] border border-slate-100 dark:border-white/10 rounded-2xl shadow-xl shadow-purple-900/5 dark:shadow-purple-900/30 z-30 py-2 overflow-hidden">
                {chartTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedChartType(type)
                      setIsChartDropdownOpen(false)
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-xs sm:text-sm font-bold transition-colors hover:bg-purple-50 dark:hover:bg-white/5",
                      selectedChartType === type ? "text-purple-600 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-500/20" : "text-slate-600 dark:text-slate-300"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedChartType === "Column Chart" && (
        <div className="flex-1 overflow-x-auto no-scrollbar pb-2 group/scroll pt-12">
          <div className="flex items-end justify-between gap-3 md:gap-5 px-2 min-w-[600px] md:min-w-0 h-full">
            {data.map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-6 group h-full justify-end">
              <div className="relative w-full flex flex-col justify-end h-full min-h-[1px]">
                <div className="absolute inset-0 bg-slate-50/50 dark:bg-white/5 rounded-lg w-full" />
                <div 
                  className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-lg transition-all duration-500 ease-out group-hover:from-purple-500 group-hover:to-purple-300 relative cursor-pointer shadow-sm z-10"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 whitespace-nowrap z-20 pointer-events-none shadow-2xl">
                    ${(height * 1234).toLocaleString()}
                  </div>
                </div>
              </div>
              <span className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors whitespace-nowrap">
                {months[i]}
              </span>
            </div>
          ))}
          </div>
        </div>
      )}

      {selectedChartType === "Line Chart" && (
        <div className="flex-1 flex flex-col pt-12 relative w-full h-full min-h-[250px]">
          <div className="absolute inset-0 px-6 pb-8 top-12 flex items-end">
            <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path 
                d={`${getLinePath()} L 1000 300 L 0 300 Z`}
                fill="url(#line-gradient)"
                className="transition-all duration-500"
              />
              <path 
                d={getLinePath()} 
                fill="none" 
                stroke="#7c3aed" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="drop-shadow-md transition-all duration-500"
              />
              {data.map((val, i) => (
                <circle 
                  key={i}
                  cx={(i / (data.length - 1)) * 1000} 
                  cy={300 - (val / 100) * 300} 
                  r="6" 
                  fill="white" 
                  stroke="#7c3aed" 
                  strokeWidth="3"
                  className="transition-all duration-500 hover:r-8 cursor-pointer"
                >
                  <title>${(val * 1234).toLocaleString()}</title>
                </circle>
              ))}
            </svg>
          </div>
          <div className="mt-auto flex justify-between px-6 pt-4 border-t border-slate-50 dark:border-white/5">
            {months.map((month, i) => (
              <span key={i} className="text-[10px] md:text-xs font-bold text-slate-400 whitespace-nowrap">
                {month}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedChartType === "Pie Chart" && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-20 w-full max-w-4xl mx-auto pl-0 md:pl-10">
            <div 
              className="w-64 h-64 md:w-80 md:h-80 rounded-full shadow-2xl relative shrink-0 transition-all duration-1000 transform hover:scale-105"
              style={{ background: `conic-gradient(${conicStops})` }}
            >
              {/* Inner circle for donut chart effect */}
              <div className="absolute inset-[20%] bg-white dark:bg-[#150a2e] rounded-full flex flex-col items-center justify-center shadow-inner">
                 <span className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Total</span>
                 <span className="text-2xl font-black text-slate-900 dark:text-white">${(totalRevenue * 1234).toLocaleString()}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 w-full max-w-sm">
               {months.map((month, i) => (
                 <div key={i} className="flex items-center gap-2 group cursor-default">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i] }} />
                     <span className="text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{month}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}

      {selectedChartType === "KPI Chart" && (
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 p-4 md:pt-10">
          <div className="dashboard-card bg-slate-50/50 dark:bg-white/5 border-none p-4 md:p-6 w-full flex flex-col justify-center min-w-0">
            <p className="dashboard-label text-xs sm:text-[10px] md:text-xs">Total Volume</p>
            <h3 className="dashboard-value text-3xl sm:text-2xl lg:text-3xl xl:text-4xl truncate" title={`$${(totalRevenue * 1234).toLocaleString()}`}>
              ${(totalRevenue * 1234).toLocaleString()}
            </h3>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-2 truncate">Sum of {selectedYear}</p>
          </div>
          <div className="dashboard-card bg-slate-50/50 dark:bg-white/5 border-none p-4 md:p-6 w-full flex flex-col justify-center min-w-0">
            <p className="dashboard-label text-xs sm:text-[10px] md:text-xs">Monthly Average</p>
            <h3 className="dashboard-value text-3xl sm:text-2xl lg:text-3xl xl:text-4xl truncate" title={`$${(avgRevenue * 1234).toLocaleString()}`}>
              ${(avgRevenue * 1234).toLocaleString()}
            </h3>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-2 truncate">Mean over 12 months</p>
          </div>
          <div className="dashboard-card bg-slate-50/50 dark:bg-white/5 border-none p-4 md:p-6 w-full flex flex-col justify-center min-w-0">
            <p className="dashboard-label text-xs sm:text-[10px] md:text-xs">Max Month</p>
            <h3 className="dashboard-value text-3xl sm:text-2xl lg:text-3xl xl:text-4xl text-emerald-600 dark:text-emerald-400 truncate" title={`$${(maxRevenue * 1234).toLocaleString()}`}>
              ${(maxRevenue * 1234).toLocaleString()}
            </h3>
            <p className="text-xs font-bold text-emerald-600/60 mt-2 truncate">Peak performance</p>
          </div>
           <div className="dashboard-card bg-slate-50/50 dark:bg-white/5 border-none p-4 md:p-6 w-full flex flex-col justify-center min-w-0">
            <p className="dashboard-label text-xs sm:text-[10px] md:text-xs">Min Month</p>
            <h3 className="dashboard-value text-3xl sm:text-2xl lg:text-3xl xl:text-4xl text-rose-600 dark:text-rose-400 truncate" title={`$${(minRevenue * 1234).toLocaleString()}`}>
              ${(minRevenue * 1234).toLocaleString()}
            </h3>
            <p className="text-xs font-bold text-rose-600/60 mt-2 truncate">Lowest baseline</p>
          </div>
        </div>
      )}
    </div>
  )
}
