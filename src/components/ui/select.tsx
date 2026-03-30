"use client"

import * as React from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface SelectProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  label?: string
}

const Select = ({ options, value, onChange, placeholder = "Select an option", className, label }: SelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className={cn("space-y-2 relative w-full", className)} ref={containerRef}>
      {label && <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-5 py-3.5 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 text-sm font-bold text-slate-900 dark:text-white text-left flex items-center justify-between transition-all hover:bg-slate-100/50 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/20",
          isOpen && "ring-2 ring-purple-500/20 border-purple-200 dark:border-purple-500/50"
        )}
      >
        <span className={cn(!value && "text-slate-400 dark:text-slate-600")}>{value || placeholder}</span>
        <ChevronDown className={cn("w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white dark:bg-[#1e103c] border border-slate-100 dark:border-white/10 rounded-2xl shadow-xl shadow-purple-500/10 dark:shadow-purple-900/40 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
              className={cn(
                "w-full px-5 py-3 text-sm font-bold text-left flex items-center justify-between transition-colors",
                value === option 
                  ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              {option}
              {value === option && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { Select }
