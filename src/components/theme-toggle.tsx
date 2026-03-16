"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative rounded-xl w-10 h-10 overflow-hidden bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors">
        <Sun className="h-5 w-5 transition-all absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[150%] scale-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className="relative rounded-xl w-10 h-10 overflow-hidden bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
    >
      <Sun className="h-5 w-5 transition-all absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 dark:-translate-y-[150%] dark:scale-0" />
      <Moon className="h-5 w-5 transition-all absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[150%] scale-0 dark:-translate-y-1/2 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
