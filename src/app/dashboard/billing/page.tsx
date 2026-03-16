"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatsCard } from "@/components/dashboard/stats-card"
import { BillingTable } from "@/components/dashboard/billing/billing-table"
import { 
  DollarSign, 
  Users, 
  RefreshCcw 
} from "lucide-react"

export default function BillingPage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-8 pb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Billing & Invoices</h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold tracking-tight text-lg">Manage invoices and track payments</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            title="Total Revenue"
            value="$1,139.95"
            trend="+12.5%"
            trendType="up"
            icon={DollarSign}
            iconColor="text-emerald-600 dark:text-emerald-400"
            iconBg="bg-emerald-50 dark:bg-emerald-500/20"
          />
          <StatsCard
            title="Pending Payments"
            value="$189.98"
            trend="+8.5%"
            trendType="up"
            icon={Users}
            iconColor="text-blue-600 dark:text-blue-400"
            iconBg="bg-blue-50 dark:bg-blue-500/20"
          />
          <StatsCard
            title="Total Invoices"
            value="8"
            trend="+2 this week"
            trendType="up"
            icon={RefreshCcw}
            iconColor="text-cyan-600 dark:text-cyan-400"
            iconBg="bg-cyan-50 dark:bg-cyan-500/20"
          />
        </div>

        {/* Billing Table */}
        <BillingTable />
      </div>
    </DashboardLayout>
  )
}
