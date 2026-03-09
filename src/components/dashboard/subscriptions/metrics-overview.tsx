"use client"

import * as React from "react"
import { TrendingUp, Users, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string
  icon: React.ElementType
  iconColor: string
  iconBg: string
}

function MetricCard({ title, value, icon: Icon, iconColor, iconBg }: MetricCardProps) {
  return (
    <div className="dashboard-card bg-white border border-slate-100 rounded-[24px] p-6 lg:p-8 flex items-start justify-between shadow-sm">
      <div className="space-y-3">
        <p className="text-slate-500 font-bold text-xs tracking-widest uppercase">{title}</p>
        <h3 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">{value}</h3>
      </div>
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-slate-50", iconBg)}>
        <Icon className={cn("w-5 h-5", iconColor)} strokeWidth={2.5} />
      </div>
    </div>
  )
}

export function MetricsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Total Active MRR"
        value="$45,231"
        icon={TrendingUp}
        iconColor="text-emerald-500"
        iconBg="bg-emerald-50"
      />
      <MetricCard
        title="Total Active Customers"
        value="2,847"
        icon={Users}
        iconColor="text-blue-500"
        iconBg="bg-blue-50"
      />
      <MetricCard
        title="Average Churn Rate"
        value="12%"
        icon={AlertTriangle}
        iconColor="text-orange-500"
        iconBg="bg-orange-50"
      />
    </div>
  )
}
