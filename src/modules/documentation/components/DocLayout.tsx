import { DocSidebar } from "./DocSidebar"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

interface DocLayoutProps {
  children: React.ReactNode
}

export function DocLayout({ children }: DocLayoutProps) {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8 pb-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <aside className="w-full lg:w-64 shrink-0">
            <DocSidebar />
          </aside>
          
          <main className="flex-1 w-full min-w-0">
            {children}
          </main>
        </div>
      </div>
    </DashboardLayout>
  )
}
