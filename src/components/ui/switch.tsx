"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

const Switch = ({ checked, onChange, disabled, className }: SwitchProps) => (
  <button 
    type="button"
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className={cn(
      "w-11 h-6 rounded-full transition-colors relative flex items-center shadow-inner cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
      checked ? "bg-purple-600" : "bg-slate-200 dark:bg-white/10",
      className
    )}
  >
    <span className={cn(
      "w-5 h-5 bg-white rounded-full shadow-md transition-transform transform absolute left-0.5",
      checked ? "translate-x-5" : "translate-x-0"
    )} />
  </button>
)

export { Switch }
