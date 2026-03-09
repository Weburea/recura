"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface GrowthData {
  month: string
  newSubscriptions: number
  growth: number
  trend: "up" | "down"
}

const data: GrowthData[] = [
  { month: "Jul 2024", newSubscriptions: 389, growth: 0, trend: "up" },
  { month: "Aug 2024", newSubscriptions: 367, growth: -5.7, trend: "down" },
  { month: "Sep 2024", newSubscriptions: 412, growth: 12.3, trend: "up" },
  { month: "Oct 2024", newSubscriptions: 445, growth: 7.4, trend: "up" },
]

export function SubscriptionGrowth() {
  return (
    <div className="dashboard-card h-full">
      <h3 className="dashboard-title text-base md:text-lg mb-6">Subscription Growth</h3>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between items-center p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
            <div>
              <p className="font-bold text-slate-900 text-sm">{item.month}</p>
              <p className="font-bold text-slate-400 text-xs mt-0.5">New subscriptions</p>
            </div>
            <div className="text-right">
              <p className="font-extrabold text-slate-900 text-lg md:text-xl tracking-tight">{item.newSubscriptions}</p>
              {item.growth !== 0 && (
                <p className={cn(
                  "font-bold text-[10px] md:text-xs",
                  item.trend === "up" ? "text-emerald-500" : "text-rose-500"
                )}>
                  {item.trend === "up" ? "+" : ""}{item.growth}%
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
