"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SegmentedControlProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  label?: string
  className?: string
}

const SegmentedControl = ({ options, value, onChange, label, className }: SegmentedControlProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">{label}</label>}
      <div className="flex bg-slate-100/80 dark:bg-white/5 rounded-2xl p-1.5 w-full">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "flex-1 px-4 py-3 rounded-xl text-sm transition-all focus:outline-none whitespace-nowrap",
              value === option 
                ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white font-black shadow-sm" 
                : "text-slate-500 dark:text-slate-400 font-bold hover:text-slate-700 dark:hover:text-slate-200"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export { SegmentedControl }
