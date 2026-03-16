"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatsCard } from "@/components/dashboard/stats-card"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { InventoryAlerts } from "@/components/dashboard/inventory-alerts"
import { 
  Users, 
  RefreshCcw, 
  AlertTriangle,
  DollarSign
} from "lucide-react"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">Welcome back, Business Owner</h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold">Here&apos;s what&apos;s happening with your business today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Revenue"
            value="$124,563"
            trend="+12.5%"
            trendType="up"
            icon={DollarSign}
            iconColor="text-emerald-600 dark:text-emerald-400"
            iconBg="bg-emerald-50 dark:bg-emerald-500/20"
          />
          <StatsCard
            title="Active Subscriptions"
            value="2,847"
            trend="+8.5%"
            trendType="up"
            icon={Users}
            iconColor="text-blue-600 dark:text-blue-400"
            iconBg="bg-blue-50 dark:bg-blue-500/20"
          />
          <StatsCard
            title="Monthly Recurring Revenue"
            value="$45,231"
            trend="+15.3%"
            trendType="up"
            icon={RefreshCcw}
            iconColor="text-cyan-600 dark:text-cyan-400"
            iconBg="bg-cyan-50 dark:bg-cyan-500/20"
          />
          <StatsCard
            title="Low Inventory Alerts"
            value="12"
            trend="-3 items"
            trendType="down"
            icon={AlertTriangle}
            iconColor="text-rose-600 dark:text-rose-400"
            iconBg="bg-rose-50 dark:bg-rose-500/20"
          />
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RevenueChart />
          <RecentActivity />
        </div>

        {/* Bottom Section */}
        <InventoryAlerts />
      </div>
    </DashboardLayout>
  )
}
