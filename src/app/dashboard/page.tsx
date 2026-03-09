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
          <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Welcome back, Business Owner</h1>
          <p className="text-slate-500 font-bold">Here&apos;s what&apos;s happening with your business today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Revenue"
            value="$124,563"
            trend="+12.5%"
            trendType="up"
            icon={DollarSign}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-50"
          />
          <StatsCard
            title="Active Subscriptions"
            value="2,847"
            trend="+8.5%"
            trendType="up"
            icon={Users}
            iconColor="text-blue-600"
            iconBg="bg-blue-50"
          />
          <StatsCard
            title="Monthly Recurring Revenue"
            value="$45,231"
            trend="+15.3%"
            trendType="up"
            icon={RefreshCcw}
            iconColor="text-cyan-600"
            iconBg="bg-cyan-50"
          />
          <StatsCard
            title="Low Inventory Alerts"
            value="12"
            trend="-3 items"
            trendType="down"
            icon={AlertTriangle}
            iconColor="text-rose-600"
            iconBg="bg-rose-50"
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
