import { SettingsSidebar } from "@/components/dashboard/settings/settings-sidebar"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8 pb-10">
        <div>
          <h1 className="dashboard-title text-3xl font-black text-slate-900 dark:text-white tracking-tight">Settings</h1>
          <p className="text-slate-400 mt-1 font-medium">Manage your account and business settings</p>
        </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <aside className="w-full lg:w-64 shrink-0">
          <SettingsSidebar />
        </aside>
        
        <main className="flex-1 w-full min-w-0">
          {children}
        </main>
      </div>
      </div>
    </DashboardLayout>
  )
}
