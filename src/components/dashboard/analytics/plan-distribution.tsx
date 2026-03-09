"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PlanData {
  name: string
  percentage: number
  subscribers: string
  revenue: string
}

const plans: PlanData[] = [
  {
    name: "Basic Plan",
    percentage: 35,
    subscribers: "1245",
    revenue: "$24,890"
  },
  {
    name: "Premium Plan",
    percentage: 51,
    subscribers: "1456",
    revenue: "$72,780"
  },
  {
    name: "Enterprise Plan",
    percentage: 14,
    subscribers: "146",
    revenue: "$145,854"
  }
]

export function PlanDistribution() {
  return (
    <div className="dashboard-card flex flex-col h-full">
      <div className="mb-6">
        <h3 className="dashboard-title text-base md:text-lg">Plan Distribution</h3>
      </div>
      
      <div className="flex flex-col space-y-6 flex-1 justify-between">
        {plans.map((plan, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-700">{plan.name}</span>
              <span className="text-slate-900">{plan.percentage}%</span>
            </div>
            
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-1000 ease-out",
                  plan.name === "Premium Plan" ? "bg-purple-600" : "bg-purple-400"
                )}
                style={{ width: `${plan.percentage}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span>{plan.subscribers} subscribers</span>
              <span>{plan.revenue}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
