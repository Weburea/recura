"use client"

import * as React from "react"
import { Users } from "lucide-react"

const plans = [
  {
    name: "Basic Plan",
    value: "$124,563",
    users: "1,200",
  },
  {
    name: "Premium Plan",
    value: "$124,563",
    users: "1,131",
  },
  {
    name: "Enterprise Package",
    value: "$34,093",
    users: "797",
  },
  {
    name: "Business Plane",
    value: "$14,563",
    users: "118",
  },
]

export function PlanOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Subscription Plan Overview</h3>
        <button className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer">
          Manage Plans
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className="dashboard-card bg-white border border-slate-100 rounded-xl p-8 space-y-4">
            <p className="text-slate-500 font-bold text-sm tracking-tight">{plan.name}</p>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{plan.value}</h3>
            <div className="flex items-center gap-2 text-cyan-400">
              <Users className="w-4 h-4" />
              <span className="text-xs font-bold">{plan.users} Users</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
