import { DocContent } from "@/modules/documentation/components/DocContent"
import { Button } from "@/components/ui/button"
import { 
  AppWindow, 
  Code2, 
  Cpu, 
  Globe, 
  Layers, 
  Layout, 
  Rocket, 
  Shield, 
  Terminal,
  ArrowRight,
  Database,
  Monitor,
  Box
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function DeveloperGuide() {
  const modules = [
    { title: "Analytics Engine", path: "/analytics", desc: "High-fidelity charting and data visualization suite.", icon: Monitor, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Financial Hub", path: "/payments /billing", desc: "Core transaction infrastructure and subscription logic.", icon: Shield, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Core Workspace", path: "/settings /customers", desc: "User preferences, team management, and identity control.", icon: Layout, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Design System", path: "/documentation", desc: "Interactive UI primitive registry and developer guide.", icon: Box, color: "text-amber-500", bg: "bg-amber-500/10" }
  ]

  return (
    <DocContent 
      title="Developer Schematic" 
      description="The definitive technical guide to the Recura platform&apos;s architectural blueprint and modular design philosophy."
    >
      <div className="space-y-20 pb-24">
        
        {/* 1. Architectural Pillars */}
        <section className="relative overflow-hidden rounded-[3rem] bg-slate-900 border border-white/10 p-12 md:p-20 shadow-2xl">
           <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 blur-[100px] -mr-48 -mt-48" />
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                 <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 shadow-xl">
                    <Cpu className="w-8 h-8 text-purple-400" />
                 </div>
                 <div className="space-y-4">
                    <h2 className="text-4xl font-black text-white tracking-tighter leading-none">System Architecture</h2>
                    <p className="text-xl text-slate-400 font-medium leading-relaxed">
                       Recura uses a strictly decoupled architecture, separating <span className="text-purple-400">Physical Routing</span> from <span className="text-indigo-400">Business Domain Logic</span> with extreme type-safety.
                    </p>
                 </div>
                 <div className="flex flex-wrap gap-4">
                    {['Next.js 15+', 'Tailwind v4', 'React 19 Hooks', 'Strict TypeScript'].map(pill => (
                      <span key={pill} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-slate-300 uppercase tracking-widest">{pill}</span>
                    ))}
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="flex justify-between items-center mb-6">
                       <span className="text-[10px] font-black text-slate-300 tracking-[0.2em] uppercase">Tech Schematic</span>
                       <div className="flex gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <div className="w-2 h-2 rounded-full bg-yellow-500" />
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                       </div>
                    </div>
                    <pre className="text-xs font-mono text-purple-300 leading-relaxed overflow-x-auto">
{`src/
├── app/          # (Physical Layouts)
│   └── dashboard/
│       ├── layout.tsx
│       └── page.tsx
├── modules/      # (Business Logic API)
│   └── docs/
│       ├── components/
│       └── data/
└── components/   # (Shared UI Tree)`}
                    </pre>
                 </div>
              </div>
           </div>
        </section>

        {/* 2. Page Physical Schematic */}
        <section className="space-y-10">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-600/20">
                 <AppWindow className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-1">
                 <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Logical Platform Hubs</h2>
                 <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">The module-by-module breadboard of the Recura ecosystem</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {modules.map((mod) => (
                <div key={mod.title} className="group p-10 rounded-[3rem] bg-white dark:bg-[#150a2e] border border-gray-100 dark:border-white/10 hover:shadow-2xl hover:translate-y-[-8px] transition-all duration-500 relative overflow-hidden">
                   <div className={cn("absolute top-0 right-0 w-32 h-32 blur-3xl opacity-5 group-hover:opacity-10 transition-opacity", mod.bg.replace('/10', ''))} />
                   <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border dark:border-white/10 shadow-inner group-hover:scale-110 transition-transform", mod.bg)}>
                      <mod.icon className={cn("w-7 h-7", mod.color)} />
                   </div>
                   <div className="space-y-4">
                      <div className="space-y-1">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{mod.path}</span>
                         <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{mod.title}</h3>
                      </div>
                      <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                         {mod.desc}
                      </p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* 3. High-Fidelity Standards */}
        <section className="bg-slate-50 dark:bg-[#0D0518]/50 rounded-[4rem] p-12 md:p-20 border border-slate-100 dark:border-white/5">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1 space-y-8">
                 <div className="w-16 h-16 rounded-3xl bg-slate-900 flex items-center justify-center shadow-xl">
                    <Rocket className="w-8 h-8 text-blue-400" />
                 </div>
                 <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.95]">
                    The high-fidelity <span className="text-blue-500">Standard</span>
                 </h2>
                 <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    We don&apos;t build MVP-grade components. Every primitive must manifest as a premium, interactive, and responsive asset.
                 </p>
                 <Button className="dashboard-action-btn dashboard-action-btn-primary h-auto py-4 px-8 rounded-2xl text-base shadow-xl">
                    View Component API
                    <ArrowRight className="w-4 h-4 ml-2" />
                 </Button>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                 {[
                   { title: "SVG Infrastructure", desc: "Prioritize SVG-driven patterns and backgrounds over static assets for infinite scaling.", icon: Layers },
                   { title: "HSL Balancing", desc: "Use high-contrast HSL color pairs to ensure visual impact across dark/light transitions.", icon: Globe },
                   { title: "Zero Hydration Lag", desc: "Leverage Next.js Server Components for data fetching to minimize the client bundle.", icon: Terminal },
                   { title: "Atomic Animation", desc: "Standardize micro-interactions using Framer Motion and custom CSS cubic-beziers.", icon: Code2 }
                 ].map(std => (
                   <div key={std.title} className="p-8 rounded-[2.5rem] bg-white dark:bg-[#150a2e] border border-gray-100 dark:border-white/10 space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/10 shadow-sm">
                         <std.icon className="w-5 h-5 text-slate-400" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{std.title}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{std.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* 4. Support Schematic */}
        <section className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden group shadow-2xl">
           <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10 group-hover:opacity-20 transition-opacity" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl space-y-6">
                 <h2 className="text-4xl font-black tracking-tighter leading-tight">Need a structural audit?</h2>
                 <p className="text-xl text-indigo-100 font-medium leading-relaxed">
                    Our architectural review process ensures your custom modules meet the Recura high-fidelity and performance benchmarks.
                 </p>
              </div>
              <div className="shrink-0 space-y-4 text-center">
                 <Button className="bg-white text-indigo-600 hover:bg-slate-50 font-black px-12 py-8 rounded-[2rem] text-lg shadow-2xl transition-all hover:scale-105 active:scale-95 border-none h-auto">
                    Submit Project Overview
                 </Button>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200/60">Response in &lt; 24 hours</p>
              </div>
           </div>
        </section>

      </div>
    </DocContent>
  )
}
