"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CustomerTable } from "@/components/dashboard/customers/customer-table"

export default function CustomersPage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1">Customers Management</h1>
          <p className="text-sm md:text-base text-slate-500 font-bold">List of all customers that are subscribed to the platform</p>
        </div>

        <CustomerTable />
      </div>
    </DashboardLayout>
  )
}
