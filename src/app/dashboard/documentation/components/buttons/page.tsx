"use client"

import * as React from "react"
import { DocContent } from "@/modules/documentation/components/DocContent"
import { ComponentPreview } from "@/modules/documentation/components/ComponentPreview"
import { Button } from "@/components/ui/button"
import { 
  Loader2, 
  Plus, 
  ArrowRight, 
  Download, 
  Trash2, 
  Settings, 
  Star,
  ListFilter,
  Printer,
  FileSpreadsheet
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function ButtonsDoc() {
  return (
    <DocContent 
      title="Buttons" 
      description="A high-performance button component with multiple variants for marketing, dashboard, and utility actions. Built with accessibility and visual excellence in mind."
    >
      {/* Marketing Variants */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600/10 flex items-center justify-center">
            <Star className="w-4 h-4 text-purple-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Marketing Variants</h2>
        </div>
        <ComponentPreview
          title="Conversion-Focused Buttons"
          description="High-impact buttons designed for landing pages and calls to action."
          code={`<Button variant="brand">Start Free Trial</Button>
<Button variant="outline-brand">Request Demo</Button>`}
        >
          <div className="flex flex-wrap gap-4">
            <Button variant="brand">Start your free trial</Button>
            <Button variant="outline-brand">Request Demo</Button>
          </div>
        </ComponentPreview>
      </section>

      {/* Dashboard Variants */}
      <section className="space-y-12">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center">
            <Settings className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Dashboard Variants</h2>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <ComponentPreview
            title="Action Buttons"
            description="Standard buttons used within the dashboard for primary, secondary, and destructive actions."
            code={`<Button variant="primary">Create Project</Button>
<Button variant="dashboard">Save Changes</Button>
<Button variant="dashboard-outline">Cancel</Button>
<Button variant="destructive">Delete Account</Button>`}
          >
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">
                <Plus className="w-4 h-4 mr-2" />
                Create New
              </Button>
              <Button variant="dashboard">Save Changes</Button>
              <Button variant="dashboard-outline">Cancel</Button>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </ComponentPreview>

          <ComponentPreview
            title="Ghost & Utility"
            description="Subtle buttons for less-prominent actions or navigation."
            code={`<Button variant="ghost">View Details</Button>
<Button variant="link">Terms of Service</Button>`}
          >
            <div className="flex flex-wrap gap-4">
              <Button variant="ghost">View Details</Button>
              <Button variant="link">Read Documentation</Button>
            </div>
          </ComponentPreview>
        </div>
      </section>

      {/* Sizes & Shapes */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600/10 flex items-center justify-center">
            <Plus className="w-4 h-4 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Sizes & Icon Buttons</h2>
        </div>
        <ComponentPreview
          title="Component Sizing"
          description="Available in various sizes to fit different layout requirements."
          code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large Action</Button>
<Button size="icon"><Settings /></Button>`}
        >
          <div className="flex flex-wrap items-center gap-6">
            <Button size="sm" variant="primary">Small Button</Button>
            <Button variant="primary">Default Size</Button>
            <Button size="lg" variant="primary">Large Action</Button>
            <div className="flex gap-2">
              <Button size="icon" variant="dashboard-outline">
                <Settings className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="primary">
                <Plus className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="dashboard">
                <Download className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Dashboard Specific Patterns */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-pink-600/10 flex items-center justify-center">
            <ListFilter className="w-4 h-4 text-pink-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Revealing Dashboard Actions</h2>
        </div>
        
        <ComponentPreview
          title="Action Reveal Pattern"
          description="A common dashboard pattern for table views where secondary actions are revealed via a toggle. (Click the filter icon to see effect)"
        >
          <DashboardActionsExample />
        </ComponentPreview>
      </section>

      {/* Interactive States */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Interactive States</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Loading State</span>
            <div className="p-8 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center">
              <Button disabled variant="primary">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing
              </Button>
            </div>
          </div>
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Disabled State</span>
            <div className="p-8 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center">
              <Button disabled variant="dashboard">Disabled</Button>
            </div>
          </div>
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">With Content</span>
            <div className="p-8 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center">
              <Button variant="outline-brand">
                Explore Features
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </DocContent>
  )
}

function DashboardActionsExample() {
  const [showActions, setShowActions] = React.useState(false)

  return (
    <div className="p-12 rounded-[32px] bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center gap-4 min-h-[160px]">
      <div className="flex items-center gap-3">
        <Button 
          size="icon"
          onClick={() => setShowActions(!showActions)}
          variant={showActions ? "primary" : "dashboard-outline"}
          className="rounded-2xl shadow-sm"
        >
          <ListFilter className="w-5 h-5" />
        </Button>
        
        <div className={cn(
          "flex items-center gap-3 transition-all duration-500 ease-out origin-left",
          showActions ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-4 scale-95 pointer-events-none w-0 overflow-hidden"
        )}>
          <Button variant="dashboard-outline" className="rounded-xl px-4 py-2 border-slate-200 dark:border-white/10">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button variant="dashboard" className="rounded-xl px-4 py-2">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Convert to Sheets
          </Button>
        </div>
      </div>

      {!showActions && (
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse ml-4">
          Click to reveal actions
        </p>
      )}
    </div>
  )
}
