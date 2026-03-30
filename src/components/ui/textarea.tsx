import * as React from "react"
import { cn } from "@/lib/utils"

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600/20 focus-visible:border-purple-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-[#150a2e] dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-purple-600/20 resize-none transition-all",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
