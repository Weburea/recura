"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { MetricsOverview } from "@/components/dashboard/subscriptions/metrics-overview"
import { SubscriptionTable } from "@/components/dashboard/subscriptions/subscription-table"
import { PlanOverview } from "@/components/dashboard/subscriptions/plan-overview"
import { CreateSubscriptionModal } from "@/components/dashboard/shared/create-subscription-modal"
import { Plus } from "lucide-react"

export default function SubscriptionsPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <h1 className="dashboard-title text-3xl font-black text-slate-900 tracking-tight">Subscriptions Management</h1>
            <p className="text-sm font-bold text-slate-400 mt-2">Manage subscription plans and customer subscriptions</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-sm tracking-wide hover:bg-purple-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Create Subscription
          </button>
        </div>

        {/* Metrics Grid */}
        <MetricsOverview />

        {/* Subscription Table */}
        <SubscriptionTable />

        {/* Plan Overview */}
        <PlanOverview />

        {/* Create Subscription Modal */}
        <CreateSubscriptionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    </DashboardLayout>
  )
}
