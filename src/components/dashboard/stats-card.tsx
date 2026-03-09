"use client"

import * as React from "react"
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string
  trend: string
  trendType: "up" | "down"
  icon: LucideIcon
  iconColor: string
  iconBg: string
  trendContext?: string
}

export function StatsCard({ 
  title, 
  value, 
  trend, 
  trendType, 
  icon: Icon,
  iconColor,
  iconBg,
  trendContext = "vs last month"
}: StatsCardProps) {
  return (
    <div className="dashboard-card dashboard-card-hover">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="dashboard-label">{title}</p>
          <h3 className="dashboard-value">{value}</h3>
        </div>
        <div className={cn("dashboard-icon-box", iconBg)}>
          <Icon className={cn("w-6 h-6", iconColor)} />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className={cn(
          "dashboard-badge",
          trendType === "up" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
        )}>
          {trendType === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend}
        </div>
        <span className="text-xs font-bold text-slate-400">{trendContext}</span>
      </div>
    </div>
  )
}
