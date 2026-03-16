"use client"

import * as React from "react"
import { 
  UserPlus, 
  DollarSign, 
  AlertTriangle, 
  UserMinus,
  RefreshCw
} from "lucide-react"

const activities = [
  {
    icon: UserPlus,
    title: "New subscription",
    description: "Sarah Johnson subscribed to Premium",
    time: "5 minutes ago",
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-50 dark:bg-blue-500/20"
  },
  {
    icon: DollarSign,
    title: "Payment received",
    description: "$299.00 from Enterprise Corp",
    time: "23 minutes ago",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-50 dark:bg-emerald-500/20"
  },
  {
    icon: AlertTriangle,
    title: "Low inventory alert",
    description: "Premium Plan License stock is low",
    time: "1 hour ago",
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-50 dark:bg-amber-500/20"
  },
  {
    icon: UserMinus,
    title: "Subscription cancelled",
    description: "Michael Brown cancelled Basic Plan",
    time: "2 hours ago",
    iconColor: "text-rose-600 dark:text-rose-400",
    iconBg: "bg-rose-50 dark:bg-rose-500/20"
  },
  {
    icon: DollarSign,
    title: "Payment received",
    description: "$149.00 from Tech Startup Inc",
    time: "3 hours ago",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    iconBg: "bg-cyan-50 dark:bg-cyan-500/20"
  },
  {
    icon: RefreshCw,
    title: "Subscription renewed",
    description: "Emma Wilson renewed Enterprise Plan",
    time: "4 hours ago",
    iconColor: "text-teal-600 dark:text-teal-400",
    iconBg: "bg-teal-50 dark:bg-teal-500/20"
  }
]

export function RecentActivity() {
  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="dashboard-title text-lg md:text-xl">Recent Activity</h3>
        <button className="text-sm font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline cursor-pointer">
          View All
        </button>
      </div>

      <div className="space-y-6">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-start gap-4 group">
            <div className={`p-2 rounded-xl transition-transform group-hover:scale-110 ${activity.iconBg}`}>
              <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white leading-none mb-1">
                {activity.title}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mb-1">
                {activity.description}
              </p>
              <p className="text-[10px] text-slate-400 font-medium">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
