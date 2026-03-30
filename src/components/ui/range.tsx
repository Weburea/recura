"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface RangeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  minLabel?: string
  maxLabel?: string
  showValue?: boolean
  unit?: string
}

const Range = React.forwardRef<HTMLInputElement, RangeProps>(
  ({ className, label, minLabel, maxLabel, showValue, unit = "%", value, ...props }, ref) => {
    return (
      <div className="space-y-4 w-full">
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && <span className="text-sm font-bold text-slate-900 dark:text-white">{label}</span>}
            {showValue && (
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg">
                <span className="text-xs font-black text-slate-600 dark:text-slate-400">
                  {value}{unit}
                </span>
              </div>
            )}
          </div>
        )}
        <div className="space-y-3">
          <input
            type="range"
            className={cn(
              "w-full h-2 bg-slate-100 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-600 transition-all focus:outline-none focus:ring-2 focus:ring-purple-600/20",
              className
            )}
            ref={ref}
            value={value}
            {...props}
          />
          {(minLabel || maxLabel) && (
            <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
              <span>{minLabel}</span>
              <span>{maxLabel}</span>
            </div>
          )}
        </div>
      </div>
    )
  }
)
Range.displayName = "Range"

export { Range }
