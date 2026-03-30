"use client"

import { cn } from "@/lib/utils"

interface DocContentProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function DocContent({ title, description, children, className }: DocContentProps) {
  return (
    <div className={cn("space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500", className)}>
      <header className="space-y-3">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium tracking-tight max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </header>
      
      <div className="space-y-12">
        {children}
      </div>
    </div>
  )
}
