"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatsCard } from "@/components/dashboard/stats-card"
import { AnalyticsRevenueChart } from "@/components/dashboard/analytics/analytics-revenue-chart"
import { PlanDistribution } from "@/components/dashboard/analytics/plan-distribution"
import { SubscriptionGrowth } from "@/components/dashboard/analytics/subscription-growth"
import { InventoryUsage } from "@/components/dashboard/analytics/inventory-usage"
import { 
  TrendingUp, 
  UserMinus, 
  DollarSign, 
  LineChart 
} from "lucide-react"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8 pb-10">
        
        {/* Header section */}
        <div>
          <h1 className="dashboard-title text-3xl font-black text-slate-900 tracking-tight">Reports & Analytics</h1>
          <p className="dashboard-subtitle mt-2">Data-driven insights for your business</p>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatsCard 
            title="Annual Revenue"
            value="$561K"
            trend="+23.5%"
            trendType="up"
            icon={LineChart}
            iconColor="text-emerald-500"
            iconBg="bg-emerald-50"
            trendContext="YoY"
          />
          <StatsCard 
            title="Growth Rate"
            value="18.4%"
            trend="+5.2%"
            trendType="up"
            icon={TrendingUp}
            iconColor="text-blue-500"
            iconBg="bg-blue-50"
            trendContext="vs last quarter"
          />
          <StatsCard 
            title="Churn Rate"
            value="3.2%"
            trend="-1.1%"
            trendType="down"
            icon={UserMinus}
            iconColor="text-orange-500"
            iconBg="bg-orange-50"
            trendContext="improvement"
          />
          <StatsCard 
            title="Avg. LTV"
            value="$1,847"
            trend="+12.3%"
            trendType="up"
            icon={DollarSign}
            iconColor="text-emerald-500"
            iconBg="bg-emerald-50"
            trendContext="increase"
          />
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Revenue Chart spans 2 columns */}
          <AnalyticsRevenueChart />
          
          {/* Plan Distribution spans 1 column */}
          <PlanDistribution />
        </div>

        {/* Secondary Info Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <SubscriptionGrowth />
          <InventoryUsage />
        </div>

      </div>
    </DashboardLayout>
  )
}
