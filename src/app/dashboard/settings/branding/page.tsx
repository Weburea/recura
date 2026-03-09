import { BrandingSettingsForm } from "@/components/dashboard/settings/branding-settings-form"

export default function BrandingSettingsPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="dashboard-title text-3xl font-black text-slate-900 tracking-tight">Branding Settings</h1>
        <p className="dashboard-subtitle mt-2 text-slate-500 font-medium">Manage how your company appears across the platform</p>
      </div>

      <BrandingSettingsForm />
    </div>
  )
}
