import { NotificationsSettingsForm } from "@/components/dashboard/settings/notifications-settings-form"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm font-bold text-purple-600 mb-2">
        <Link href="/dashboard/settings" className="hover:underline">Settings</Link>
        <ChevronRight className="w-4 h-4 text-slate-400" />
        <span className="text-slate-400">Notifications</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Notifications & Alerts</h1>
        <p className="text-slate-500 font-medium mt-1">Manage how and when you receive notifications</p>
      </div>

      <NotificationsSettingsForm />
    </div>
  )
}
