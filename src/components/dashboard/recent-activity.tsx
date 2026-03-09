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
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50"
  },
  {
    icon: DollarSign,
    title: "Payment received",
    description: "$299.00 from Enterprise Corp",
    time: "23 minutes ago",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50"
  },
  {
    icon: AlertTriangle,
    title: "Low inventory alert",
    description: "Premium Plan License stock is low",
    time: "1 hour ago",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50"
  },
  {
    icon: UserMinus,
    title: "Subscription cancelled",
    description: "Michael Brown cancelled Basic Plan",
    time: "2 hours ago",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50"
  },
  {
    icon: DollarSign,
    title: "Payment received",
    description: "$149.00 from Tech Startup Inc",
    time: "3 hours ago",
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-50"
  },
  {
    icon: RefreshCw,
    title: "Subscription renewed",
    description: "Emma Wilson renewed Enterprise Plan",
    time: "4 hours ago",
    iconColor: "text-teal-600",
    iconBg: "bg-teal-50"
  }
]

export function RecentActivity() {
  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="dashboard-title text-lg md:text-xl">Recent Activity</h3>
        <button className="text-sm font-bold text-purple-600 hover:text-purple-700 hover:underline cursor-pointer">
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
              <p className="text-sm font-semibold text-slate-900 leading-none mb-1">
                {activity.title}
              </p>
              <p className="text-xs text-slate-500 truncate mb-1">
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
