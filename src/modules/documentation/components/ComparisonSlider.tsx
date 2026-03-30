"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface ComparisonSliderProps {
  title: string
  description: string
  lightLayer: React.ReactNode
  darkLayer: React.ReactNode
  lightLabel?: string
  darkLabel?: string
  action?: {
    label: string
    href: string
  } | React.ReactNode
  height?: string
}

export function ComparisonSlider({ 
  title, 
  description, 
  lightLayer, 
  darkLayer, 
  lightLabel = "Crystal Light", 
  darkLabel = "Deep Dark",
  action,
  height = "250px"
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = React.useState(50)
  const sliderRef = React.useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX
    const position = ((x - rect.left) / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, position)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h4>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-2xl">{description}</p>
        </div>
        
        {action && typeof action === 'object' && 'href' in action && (
          <Link 
            href={action.href}
            className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black uppercase tracking-widest transition-all hover:translate-y-[-2px] shadow-lg shadow-purple-600/20 group"
          >
            {action.label} <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        )}
      </div>

      <div 
        ref={sliderRef}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        className="relative w-full rounded-[2.5rem] overflow-hidden cursor-ew-resize border border-slate-200 dark:border-white/5 shadow-xl select-none bg-slate-100 dark:bg-[#080312] group/slider"
        style={{ height }}
      >
        {/* Labels */}
        <div className="absolute top-6 left-8 z-30 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-widest pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          {darkLabel}
        </div>
        <div className="absolute top-6 right-8 z-30 px-3 py-1.5 rounded-lg bg-slate-900/10 backdrop-blur-md border border-slate-900/10 text-[10px] font-black text-slate-600 uppercase tracking-widest pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          {lightLabel}
        </div>

        {/* Light Layer (Clipped from left) */}
        <div 
          className="absolute inset-0 bg-slate-50 flex items-center justify-center transition-none pointer-events-none overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          {lightLayer}
        </div>

        {/* Dark Layer (Clipped) */}
        <div 
          className="absolute inset-0 bg-[#080312] flex items-center justify-center overflow-hidden transition-none pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          {darkLayer}
        </div>

        {/* Action Link (If provided as ReactNode) */}
        {action && React.isValidElement(action) && (
          <div className="absolute bottom-8 right-8 z-30 pointer-events-auto">
             {action}
          </div>
        )}

        {/* Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-purple-600 z-20 shadow-[0_0_20px_rgba(124,58,237,0.5)] pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-purple-600 rounded-full border-2 border-white dark:border-[#080312] flex items-center justify-center shadow-2xl transition-transform hover:scale-110">
              <div className="flex gap-1">
                 <div className="w-0.5 h-2 bg-white/40 rounded-full" />
                 <div className="w-0.5 h-2 bg-white/40 rounded-full" />
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
