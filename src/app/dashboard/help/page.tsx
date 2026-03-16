import { HelpCenterContent } from "@/components/dashboard/help/help-center"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function HelpCenterPage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto w-full p-4 md:p-8">
        <HelpCenterContent />
      </div>
    </DashboardLayout>
  )
}
