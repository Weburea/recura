"use client"

import * as React from "react"
import { DocContent } from "@/modules/documentation/components/DocContent"
import { ComponentPreview } from "@/modules/documentation/components/ComponentPreview"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Radio } from "@/components/ui/radio"
import { Range } from "@/components/ui/range"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { Button } from "@/components/ui/button"
import { 
  Mail, 
  User, 
  CheckCircle2, 
  AlertCircle,
  Package,
  ArrowRight
} from "lucide-react"

export default function FormsDoc() {
  const [selectValue, setSelectValue] = React.useState("Premium Plan")
  const [switchValue, setSwitchValue] = React.useState(true)
  const [segmentedValue, setSegmentedValue] = React.useState("Monthly")
  const [radioValue, setRadioValue] = React.useState("option1")
  const [rangeValue, setRangeValue] = React.useState(58)

  // Full Form State
  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    plan: "Standard",
    notifications: true,
    description: "",
    priority: 50
  })

  return (
    <DocContent 
      title="Forms" 
      description="A high-performance collection of form components designed for modern SaaS applications, ranging from basic text fields to complex interactive controls."
    >
      {/* Basic Inputs */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Core Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ComponentPreview
            title="Text & Email"
            description="Fields with prefix icon support and validation feedback."
            code={`<Input placeholder="Full Name" prefix={<User />} />
<Input type="email" placeholder="Email" prefix={<Mail />} />`}
          >
            <div className="w-full space-y-4">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                <Input placeholder="Alex Johnson" className="pl-12 py-6 rounded-2xl" />
              </div>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                <Input type="email" placeholder="alex@example.com" className="pl-12 py-6 rounded-2xl" />
              </div>
            </div>
          </ComponentPreview>

          <ComponentPreview
            title="Textarea"
            description="Premium multi-line input for long-form content."
            code={`<Textarea placeholder="Describe your project..." />`}
          >
            <div className="w-full">
              <Textarea placeholder="Enter detailed project description..." className="rounded-2xl" />
            </div>
          </ComponentPreview>
        </div>
      </section>

      {/* Selection Components */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Selection & Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ComponentPreview
            title="Custom Select & Segmented"
            description="Elegant alternatives to native select elements."
          >
            <div className="w-full space-y-6 h-[250px]">
              <Select 
                label="Choose a Plan"
                options={["Free Tier", "Standard Plan", "Enterprise"]}
                value={selectValue}
                onChange={setSelectValue}
              />
              <SegmentedControl 
                label="Billing Cycle"
                options={["Monthly", "Quarterly", "Yearly"]}
                value={segmentedValue}
                onChange={setSegmentedValue}
              />
            </div>
          </ComponentPreview>

          <ComponentPreview
            title="Toggles & States"
            description="Interactive switches and radio buttons."
          >
            <div className="space-y-6 w-full pt-2">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">Real-time Sync</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">WebSocket Support</span>
                </div>
                <Switch checked={switchValue} onChange={setSwitchValue} />
              </div>
              <div className="flex gap-6">
                <Radio 
                  label="Standard" 
                  name="type" 
                  checked={radioValue === "option1"} 
                  onChange={() => setRadioValue("option1")} 
                />
                <Radio 
                  label="High Priority" 
                  name="type" 
                  checked={radioValue === "option2"} 
                  onChange={() => setRadioValue("option2")} 
                />
              </div>
            </div>
          </ComponentPreview>
        </div>
      </section>

      {/* Advanced Inputs */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Advanced Controls</h2>
        <ComponentPreview
          title="Interactive Range Slider"
          description="A specialized component for ranges, percentages, or intensity levels."
          code={`<Range 
  label="Proration Logic" 
  value={58} 
  minLabel="Conservative" 
  maxLabel="Aggressive" 
  showValue 
/>`}
        >
          <div className="w-full max-w-xl p-8 rounded-[32px] bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm">
            <Range 
              label="Proration Logic"
              min="0"
              max="100"
              value={rangeValue}
              onChange={(e) => setRangeValue(parseInt(e.target.value))}
              minLabel="Conservative"
              maxLabel="Aggressive"
              showValue
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Full Form Template */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600/10 flex items-center justify-center">
            <Package className="w-4 h-4 text-purple-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Full Form Template</h2>
        </div>
        
        <ComponentPreview
          title="Account Submission Template"
          description="A complete, production-ready form example combining multiple UI components."
        >
          <div className="w-full max-w-2xl mx-auto bg-white dark:bg-[#150a2e] rounded-[40px] border border-gray-100 dark:border-white/10 p-10 shadow-2xl shadow-slate-900/5">
            <div className="mb-10">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Project Configuration</h3>
              <p className="text-sm text-slate-500 font-bold">Complete the details below to initialize your workspace.</p>
            </div>

            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Workspace Name</label>
                  <Input 
                    placeholder="Recura HQ" 
                    className="py-6 rounded-2xl" 
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Admin Email</label>
                  <Input 
                    placeholder="admin@recura.com" 
                    className="py-6 rounded-2xl" 
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
                <Select 
                  label="Infrastructure Tier"
                  options={["Standard Cloud", "Premium Cluster", "Dedicated Private"]}
                  value={formState.plan}
                  onChange={(val) => setFormState({...formState, plan: val})}
                />
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 h-[58px]">
                   <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Auto-Billing</span>
                   <Switch 
                     checked={formState.notifications} 
                     onChange={(val) => setFormState({...formState, notifications: val})} 
                   />
                </div>
              </div>

              <Range 
                label="Provisioning Priority"
                minLabel="Eco"
                maxLabel="High Performance"
                value={formState.priority}
                onChange={(e) => setFormState({...formState, priority: parseInt(e.target.value)})}
                showValue
              />

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Additional Notes</label>
                <Textarea 
                  placeholder="Any specific routing requirements..." 
                  className="rounded-2xl h-32"
                  value={formState.description}
                  onChange={(e) => setFormState({...formState, description: e.target.value})}
                />
              </div>

              <div className="pt-6 border-t border-slate-50 dark:border-white/5 flex flex-col sm:flex-row gap-4">
                <Button variant="primary" className="flex-1 py-7 rounded-2xl text-base font-black uppercase tracking-widest shadow-xl shadow-purple-600/20">
                  Initialize Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="dashboard-outline" className="sm:w-32 py-7 rounded-2xl text-base font-black uppercase tracking-widest">
                  Reset
                </Button>
              </div>
            </form>
          </div>
        </ComponentPreview>
      </section>

      {/* Validation States */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Validation Layout</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ComponentPreview
            title="Error Feedback"
            description="Clear indicators for failed validation requirements."
          >
            <div className="w-full space-y-4">
              <div className="space-y-2">
                <Input 
                  defaultValue="invalid-email" 
                  className="border-red-500 py-6 rounded-2xl" 
                />
                <p className="flex items-center gap-1.5 text-red-500 text-[10px] font-black uppercase tracking-wider ml-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Invalid email format detected
                </p>
              </div>
            </div>
          </ComponentPreview>

          <ComponentPreview
            title="Success States"
            description="Visual confirmation of verified input values."
          >
            <div className="w-full space-y-4">
              <div className="space-y-2">
                <Input 
                  defaultValue="recura-team" 
                  className="border-emerald-500 py-6 rounded-2xl" 
                />
                <p className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-black uppercase tracking-wider ml-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Username is available
                </p>
              </div>
            </div>
          </ComponentPreview>
        </div>
      </section>
    </DocContent>
  )
}
