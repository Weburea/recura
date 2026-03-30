"use client"

import * as React from "react"
import { DocContent } from "@/modules/documentation/components/DocContent"
import { ComponentPreview } from "@/modules/documentation/components/ComponentPreview"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { PaymentCard } from "@/components/dashboard/payments/payment-card"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  CreditCard,
  Target,
  ShieldCheck,
  Mail
} from "lucide-react"
import { cn } from "@/lib/utils"

// Local MetricCard for preview (matches subscriptions/metrics-overview.tsx)
interface PreviewMetricCardProps {
  title: string
  value: string
  icon: React.ElementType
  iconColor: string
  iconBg: string
}

function PreviewMetricCard({ title, value, icon: Icon, iconColor, iconBg }: PreviewMetricCardProps) {
  return (
    <div className="dashboard-card bg-white dark:bg-[#150a2e] border border-slate-100 dark:border-white/10 rounded-[24px] p-6 lg:p-8 flex items-start justify-between shadow-sm w-full">
      <div className="space-y-3">
        <p className="text-slate-500 dark:text-slate-400 font-bold text-xs tracking-widest uppercase">{title}</p>
        <h3 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{value}</h3>
      </div>
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-slate-50 dark:border-white/5", iconBg)}>
        <Icon className={cn("w-5 h-5", iconColor)} strokeWidth={2.5} />
      </div>
    </div>
  )
}

interface TeamMetricCardProps {
  icon: React.ElementType
  label: string
  value: string
  color: string
  textColor?: string
}

function TeamMetricCard({ icon: Icon, label, value, color, textColor }: TeamMetricCardProps) {
  return (
    <div className="bg-white dark:bg-[#150a2e] rounded-2xl border border-gray-100 dark:border-white/10 p-5 flex items-center justify-between group hover:border-purple-100 transition-all hover:shadow-xl hover:shadow-slate-900/[0.02] w-full">
      <div className="flex items-center gap-4">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white", color, textColor)}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-tight">{label}</p>
          <p className="text-lg font-black text-slate-900 dark:text-white leading-none mt-0.5">{value}</p>
        </div>
      </div>
      <div className={cn("px-2 py-1 rounded-lg text-[10px] font-black", color === "bg-slate-100 dark:bg-white/10" ? "bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-slate-500" : color + "/10 " + (textColor || color.replace('bg-', 'text-')))}>
        {value}
      </div>
    </div>
  )
}

export default function CardsDoc() {
  return (
    <DocContent 
      title="Cards" 
      description="Cards are versatile containers used to group related information, provide quick insights, and create interactive elements within the Recura dashboard."
    >
      {/* Stats Cards Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Analytics Stats</h2>
        </div>
        <ComponentPreview
          title="Indicator Cards"
          description="Compact cards for key metrics with trend indicators and icons."
          code={`<StatsCard 
  title="Total Sales" 
  value="$128,430" 
  trend="+12.5%" 
  trendType="up" 
  icon={DollarSign} 
  iconColor="text-purple-600" 
  iconBg="bg-purple-100" 
/>`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
            <StatsCard 
              title="Total Revenue" 
              value="$128,430" 
              trend="+12.5%" 
              trendType="up" 
              icon={DollarSign} 
              iconColor="text-purple-600 dark:text-purple-400" 
              iconBg="bg-purple-100 dark:bg-purple-500/20" 
            />
            <StatsCard 
              title="Active Users" 
              value="2,842" 
              trend="-3.2%" 
              trendType="down" 
              icon={Users} 
              iconColor="text-blue-600 dark:text-blue-400" 
              iconBg="bg-blue-100 dark:bg-blue-500/20" 
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Modern Metric Cards */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center">
            <Target className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Modern Overview Cards</h2>
        </div>
        <ComponentPreview
          title="Detailed Metrics"
          description="Large-format cards with emphasis on numbers and bold icons."
          code={`// Used in Subscriptions Metrics Overview
<MetricCard
  title="Active MRR"
  value="$45,231"
  icon={BarChart3}
  iconColor="text-emerald-500"
  iconBg="bg-emerald-50"
/>`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            <PreviewMetricCard
              title="Monthly Recurring Revenue"
              value="$45,231"
              icon={BarChart3}
              iconColor="text-emerald-500 dark:text-emerald-400"
              iconBg="bg-emerald-50 dark:bg-emerald-500/20"
            />
            <PreviewMetricCard
              title="System Churn Rate"
              value="12%"
              icon={AlertTriangle}
              iconColor="text-orange-500 dark:text-orange-400"
              iconBg="bg-orange-50 dark:bg-orange-500/20"
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Interactive Payment Cards */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/10 flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Interactive Cards</h2>
        </div>
        <ComponentPreview
          title="3D Flip Payment Cards"
          description="Interactive cards that can be flipped to show sensitive or secondary information."
          code={`<PaymentCard 
  type="credit-card" 
  cardNumber="****4582" 
  cardHolder="ALEX JOHNSON" 
  expiryDate="12/26" 
/>`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            <PaymentCard 
              type="credit-card" 
              cardNumber="****4582" 
              cardHolder="ALEX JOHNSON" 
              expiryDate="12/26"
              activeCustomers={1240}
            />
            <PaymentCard 
              type="bank-transfer" 
              cardNumber="****9901" 
              cardHolder="RECURA CORP" 
              expiryDate="05/30"
              activeCustomers={842}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Team & Management Cards */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-pink-600/10 flex items-center justify-center">
            <Users className="w-4 h-4 text-pink-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Team Overview Cards</h2>
        </div>
        <ComponentPreview
          title="Team Management Metrics"
          description="Compact metrics used in team management views, featuring role-based color coding and member counts."
          code={`<TeamMetricCard 
  icon={ShieldCheck} 
  label="Admins" 
  value="2" 
  color="bg-blue-400" 
/>`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
            <TeamMetricCard 
              icon={Users} 
              label="Total Members" 
              value="14" 
              color="bg-purple-600" 
            />
            <TeamMetricCard 
              icon={ShieldCheck} 
              label="Admins" 
              value="2" 
              color="bg-blue-400" 
            />
            <TeamMetricCard 
              icon={Users} 
              label="Managers" 
              value="4" 
              color="bg-emerald-400" 
            />
            <TeamMetricCard 
              icon={Mail} 
              label="Pending Invites" 
              value="2" 
              color="bg-slate-100 dark:bg-white/10" 
              textColor="text-slate-400 dark:text-slate-500"
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Generic Card UI */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-600/10 flex items-center justify-center">
            <Activity className="w-4 h-4 text-slate-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Structural Design</h2>
        </div>
        <ComponentPreview
          title="Standard Container"
          description="A reusable structured card with flexible header, body, and footer sections."
          code={`<Card>
  <CardHeader>
    <CardTitle>Settings</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>`}
        >
          <div className="w-full max-w-md">
            <Card className="shadow-2xl shadow-purple-900/5">
              <CardHeader>
                <CardTitle>Cloud Infrastructure</CardTitle>
                <CardDescription>Monitor your server health and deployment status.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</span>
                    <span className="text-xs font-black text-emerald-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      OPERATIONAL
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 w-3/4 rounded-full" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between pt-2">
                <Button variant="ghost" size="sm" className="font-bold">View Logs</Button>
                <Button variant="primary" size="sm" className="font-bold">Manage</Button>
              </CardFooter>
            </Card>
          </div>
        </ComponentPreview>
      </section>
    </DocContent>
  )
}
