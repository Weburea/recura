"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PaymentTable } from "@/components/dashboard/payments/payment-table"
import { StatsCard } from "@/components/dashboard/stats-card"
import { 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Clock 
} from "lucide-react"
import { PaymentCard } from "@/components/dashboard/payments/payment-card"

export default function PaymentsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8 pb-10">
        
        {/* Header section */}
        <div>
          <h1 className="dashboard-title text-3xl font-black text-slate-900 tracking-tight">Payments & Transactions</h1>
          <p className="dashboard-subtitle mt-2">Monitor payments and payment methods</p>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatsCard 
            title="Total Revenue"
            value="$1,509.95"
            trend="+12.5%"
            trendType="up"
            icon={DollarSign}
            iconColor="text-purple-600"
            iconBg="bg-purple-50"
          />
          <StatsCard 
            title="Approved"
            value="5"
            trend="+2"
            trendType="up"
            icon={CheckCircle2}
            iconColor="text-emerald-500"
            iconBg="bg-emerald-50"
          />
          <StatsCard 
            title="Failed"
            value="2"
            trend="+1"
            trendType="down"
            icon={XCircle}
            iconColor="text-rose-500"
            iconBg="bg-rose-50"
          />
          <StatsCard 
            title="Pending"
            value="1"
            trend="0%"
            trendType="up"
            icon={Clock}
            iconColor="text-orange-500"
            iconBg="bg-orange-50"
          />
        </div>

        {/* Payment Methods Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Payment Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PaymentCard 
              type="credit-card"
              cardNumber="**** **** **** 2345"
              cardHolder="Noman Manzoor"
              expiryDate="02/30"
              activeCustomers={4}
            />
            <PaymentCard 
              type="apple-pay"
              cardNumber="**** **** **** 8899"
              cardHolder="Marisa Robertson"
              expiryDate="09/25"
              activeCustomers={2}
            />
            <PaymentCard 
              type="bank-transfer"
              cardNumber="**** **** **** 5544"
              cardHolder="Recura Business"
              expiryDate="--/--"
              activeCustomers={2}
            />
          </div>
        </div>

        {/* Main Payment Table Section */}
        <PaymentTable />
        
      </div>
    </DashboardLayout>
  )
}

