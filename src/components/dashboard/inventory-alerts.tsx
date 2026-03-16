"use client"

import * as React from "react"
import { AlertCircle } from "lucide-react"

const alerts = [
  {
    id: "SKU-001",
    name: "Premium Plan License",
    left: 5,
    min: 10
  },
  {
    id: "SKU-045",
    name: "Enterprise Package",
    left: 3,
    min: 8
  },
  {
    id: "SKU-023",
    name: "Starter Kit Bundle",
    left: 7,
    min: 15
  }
]

export function InventoryAlerts() {
  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="dashboard-title">Low Inventory Alerts</h3>
        <button className="text-sm font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline cursor-pointer">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className="flex items-center justify-between p-5 rounded-2xl bg-[#F3E8FF]/30 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 transition-all hover:bg-[#F3E8FF]/50 dark:hover:bg-purple-500/20 cursor-pointer group"
          >
            <div className="flex items-center gap-5">
              <div className="dashboard-icon-box bg-white dark:bg-transparent border border-purple-100 dark:border-white/10 text-purple-600 dark:text-purple-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-base font-extrabold text-slate-900 dark:text-white">{alert.name}</p>
                <p className="text-sm font-medium text-slate-400 dark:text-slate-500">{alert.id}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-base font-extrabold text-purple-600 dark:text-purple-400">{alert.left} left</p>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500">Min: {alert.min}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
