import * as React from "react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center gap-3 cursor-pointer group w-fit">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            className={cn(
              "peer h-5 w-5 cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white transition-all checked:bg-purple-600 checked:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 dark:border-white/10 dark:bg-white/5 dark:checked:bg-purple-500",
              className
            )}
            ref={ref}
            {...props}
          />
          <svg
            className="absolute left-1 top-1 h-3 w-3 stroke-white fill-none opacity-0 peer-checked:opacity-100 transition-opacity"
            viewBox="0 0 24 24"
            strokeWidth="4"
            stroke="currentColor"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
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
Checkbox.displayName = "Checkbox"

export { Checkbox }
