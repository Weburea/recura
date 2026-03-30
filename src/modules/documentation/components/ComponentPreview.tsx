"use client"

import * as React from "react"
import { Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ComponentPreviewProps {
  title?: string
  description?: string
  children: React.ReactNode
  code?: string
  className?: string
}

export function ComponentPreview({ title, description, children, code, className }: ComponentPreviewProps) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = () => {
    if (code) {
      navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className={cn("group space-y-4", className)}>
      {(title || description) && (
        <div className="space-y-1">
          {title && <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h3>}
          {description && <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight leading-relaxed">{description}</p>}
        </div>
      )}
      
      <div className="bg-white dark:bg-[#150a2e] rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden shadow-sm">
        {/* Preview Area */}
        <div className="p-4 sm:p-10 flex items-center justify-center bg-slate-50/50 dark:bg-white/2 border-bottom border-gray-100 dark:border-white/10 min-h-[200px]">
          {children}
        </div>
        
        {/* Code Area */}
        {code && (
          <div className="relative">
            <div className="absolute right-4 top-4 z-10">
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg bg-slate-900/50 hover:bg-slate-900/80 text-white/70 hover:text-white transition-all backdrop-blur-sm"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <pre className="p-6 overflow-x-auto bg-[#0D0518] text-purple-100 text-sm font-mono leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
