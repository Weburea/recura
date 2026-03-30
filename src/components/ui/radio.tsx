import * as React from "react"
import { cn } from "@/lib/utils"

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center gap-3 cursor-pointer group w-fit">
        <div className="relative flex items-center">
          <input
            type="radio"
            className={cn(
              "peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-200 bg-white transition-all checked:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 dark:border-white/10 dark:bg-white/5 dark:checked:border-purple-500",
              className
            )}
            ref={ref}
            {...props}
          />
          <div className="absolute left-1.5 top-1.5 h-2 w-2 rounded-full bg-purple-600 opacity-0 peer-checked:opacity-100 transition-opacity dark:bg-purple-500" />
        </div>
        {label && (
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
            {label}
          </span>
        )}
      </label>
    )
  }
)
Radio.displayName = "Radio"

export { Radio }
