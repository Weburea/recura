"use client"

import * as React from "react"
import { DocContent } from "@/modules/documentation/components/DocContent"
import { ComponentPreview } from "@/modules/documentation/components/ComponentPreview"
import { 
  BarChart3, 
  Activity, 
  TrendingUp, 
  Zap, 
  Cpu,
  Database,
  Layout,
  MousePointer2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { AnalyticsRevenueChart } from "@/components/dashboard/analytics/analytics-revenue-chart"

export default function ChartsAnalyticsDocPage() {
  // Mock data for individual primitive previews
  const barData = [40, 65, 80, 55, 90, 75]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  const linePoints = "M 0,150 L 200,80 L 400,120 L 600,40 L 800,90 L 1000,20"

  return (
    <DocContent 
      title="Charts & Analytics" 
      description="Recura&apos;s data visualization system leverages custom SVG and CSS-based components for high-performance, responsive charting."
    >
      {/* 1. Technical Overview Hero */}
      <div className="relative p-12 md:p-20 rounded-[3.5rem] bg-slate-900 border border-white/10 overflow-hidden shadow-2xl mb-16 group">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[130px] rounded-full -mr-48 -mt-48 transition-colors duration-1000 group-hover:bg-purple-600/20" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <div className="space-y-8 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-5">
              <div className="w-16 h-16 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-600/20 shrink-0">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tighter leading-none">Visualization OS</h1>
                <p className="text-base sm:text-lg text-slate-400 font-medium">Custom-built performance-first charting architecture.</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center sm:justify-start gap-4">
               {[
                 { label: "Zero-Dependency SVGs", color: "text-purple-400" },
                 { label: "HSL-Balanced", color: "text-blue-400" },
                 { label: "Responsive Viewboards", color: "text-emerald-400" }
               ].map((tag) => (
                 <span key={tag.label} className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.15em] text-white">
                    <span className={cn("inline-block w-1.5 h-1.5 rounded-full mr-2", tag.color.replace('text', 'bg'))} />
                    {tag.label}
                 </span>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:w-1/3">
             {[
               { icon: Zap, title: "Rendering", value: "Hardware accelerated CSS animations", color: "purple" },
               { icon: Database, title: "Data Handling", value: "Normalized HSL arrays", color: "blue" },
               { icon: Layout, title: "UX Logic", value: "Dynamic z-index tooltips", color: "emerald" },
               { icon: Activity, title: "Interactive", value: "Real-time state transitions", color: "amber" }
             ].map((card) => (
               <div key={card.title} className="p-6 rounded-[2rem] bg-white/5 border border-white/5 backdrop-blur-md space-y-3 hover:bg-white/[0.08] transition-colors group/card">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover/card:scale-110",
                    card.color === 'purple' && "bg-purple-500/20 text-purple-400",
                    card.color === 'blue' && "bg-blue-500/20 text-blue-400",
                    card.color === 'emerald' && "bg-emerald-500/20 text-emerald-400",
                    card.color === 'amber' && "bg-amber-500/20 text-amber-400"
                  )}>
                     <card.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{card.title}</h4>
                     <p className="text-xs font-bold text-white leading-tight">{card.value}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* 2. Individual Primitives */}
      <section className="space-y-12 mb-20">
         <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-[1.5rem] bg-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-500/20">
              <Zap className="w-6 h-6 text-white" />
           </div>
           <div className="space-y-1">
             <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Chart Primitives</h2>
             <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Atomic visualization components for complex dashboards.</p>
           </div>
        </div>

        <div className="flex flex-col gap-12">
           {/* Column Chart Primitive */}
           <ComponentPreview
             title="Column Chart"
             description="Reactive bar visualization with gradient fills and hover tooltip logic."
             code={`<div className="flex items-end justify-center gap-6 h-[300px] sm:h-[400px]">
  {data.map((val) => (
    <div 
      className="w-12 md:w-20 bg-gradient-to-t from-purple-600 to-purple-400 rounded-2xl"
      style={{ height: \`\${val}%\` }}
    />
  ))}
</div>`}
           >
              <div className="flex items-end justify-center gap-6 h-[300px] sm:h-[400px] px-6 sm:px-10 pb-8 sm:pb-12 pt-12 sm:pt-16">
                {barData.map((val, i) => (
                  <div key={i} className="flex flex-col items-center gap-4 group h-full justify-end">
                    <div className="relative w-12 md:w-20 flex flex-col justify-end h-full">
                       <div className="absolute inset-0 bg-slate-50 dark:bg-white/5 rounded-2xl w-full" />
                       <div 
                        className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-2xl group-hover:from-purple-500 group-hover:to-purple-300 transition-all z-10"
                        style={{ height: `${val}%` }}
                       />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{months[i]}</span>
                  </div>
                ))}
              </div>
           </ComponentPreview>

           {/* Line Chart Primitive */}
           <ComponentPreview
             title="Line Chart"
             description="SVG path visualization with area gradients and interaction nodes."
             code={`<svg viewBox="0 0 1000 300" className="w-full h-[200px] sm:h-[400px]">
  <path d={linePath} fill="url(#grad)" />
  <path d={linePath} stroke="#7c3aed" />
</svg>`}
           >
              <div className="relative h-[200px] sm:h-[400px] flex items-end pt-16">
                <svg viewBox="0 0 1000 300" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="doc-line-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={`${linePoints} L 1000 300 L 0 300 Z`} fill="url(#doc-line-gradient)" />
                  <path d={linePoints} fill="none" stroke="#7c3aed" strokeWidth="6" strokeLinecap="round" />
                  {[0, 200, 400, 600, 800, 1000].map((x, i) => (
                    <circle key={i} cx={x} cy={[150, 80, 120, 40, 90, 20][i]} r="8" fill="white" stroke="#7c3aed" strokeWidth="4" />
                  ))}
                </svg>
              </div>
           </ComponentPreview>

           {/* Pie Chart Primitive */}
           <ComponentPreview
             title="Pie Chart"
             description="Conic-gradient donut visualizer with HSL balancing."
             code={`<div 
  className="w-48 h-48 rounded-full"
  style={{ background: \`conic-gradient(\${stops})\` }}
/>`}
           >
              <div className="flex items-center justify-center py-12 sm:py-16">
                 <div 
                  className="w-56 h-56 sm:w-80 sm:h-80 rounded-full shadow-2xl relative shrink-0 transition-transform duration-500 hover:scale-[1.05]"
                  style={{ background: 'conic-gradient(#7c3aed 0% 40%, #a855f7 40% 70%, #db2777 70% 100%)' }}
                 >
                   <div className="absolute inset-[25%] bg-white dark:bg-[#150a2e] rounded-full flex flex-col items-center justify-center border border-slate-100 dark:border-white/5">
                      <span className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">Total</span>
                      <span className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">100%</span>
                   </div>
                 </div>
              </div>
           </ComponentPreview>

           {/* KPI Chart Primitive */}
           <ComponentPreview
             title="KPI Metrics"
             description="Numeric performance indicators with trend tracking and state balancing."
             code={`<div className="dashboard-card bg-slate-50 p-6">
  <p className="label">Total Volume</p>
  <h3 className="value">$561K</h3>
</div>`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16 px-8">
                 <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 space-y-6 flex flex-col justify-center">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Total Volume</p>
                    <h3 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">$561K</h3>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black w-fit">
                       <TrendingUp className="w-4 h-4" />
                       +23.5%
                    </div>
                 </div>
                 <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 space-y-6 flex flex-col justify-center">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Max Peak</p>
                    <h3 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter text-indigo-600 dark:text-indigo-400">$95K</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">October 2026</p>
                 </div>
              </div>
           </ComponentPreview>
        </div>
      </section>

      {/* 3. Full Template: Revenue Overview */}
      <section className="space-y-10 pt-16 border-t border-slate-100 dark:border-white/5">
         <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-600/20">
              <Layout className="w-6 h-6 text-white" />
           </div>
           <div className="space-y-1">
             <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Revenue Overview</h2>
             <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">The complex controller template for multi-context visualization.</p>
           </div>
        </div>

        <div className="p-10 rounded-[3rem] bg-indigo-50/50 dark:bg-white/[0.02] border border-indigo-100 dark:border-white/5 flex flex-col md:flex-row items-center gap-10">
           <div className="w-20 h-20 rounded-[2rem] bg-indigo-600 flex items-center justify-center shrink-0 shadow-xl shadow-indigo-600/20">
              <MousePointer2 className="w-8 h-8 text-white" />
           </div>
           <div className="flex-1 space-y-4">
              <div className="space-y-1">
                 <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Design Concept</h3>
                 <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Unified controller for disparate data structures.</p>
              </div>
              <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                 Rather than building four separate viewers, the <code className="bg-indigo-100 dark:bg-white/5 px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-400 font-black">AnalyticsRevenueChart</code> component acts as a higher-order controller, mapping a single HSL dataset to multiple SVG and CSS primitives dynamically.
              </p>
           </div>
           <div className="flex gap-4">
              <div className="flex flex-col items-center">
                 <span className="text-[10px] font-black text-slate-400 uppercase mb-2">Responsiveness</span>
                 <div className="flex gap-1.5 px-4 py-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
                    <Cpu className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-black">Fluid</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="mt-12 rounded-[3.5rem] border border-slate-100 dark:border-white/10 bg-white dark:bg-[#0D0518] shadow-2xl overflow-hidden p-8 md:p-12">
           <div className="mb-8 border-b border-slate-50 dark:border-white/5 pb-8">
              <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest block mb-4">Live Implementation</span>
              <p className="text-sm font-medium text-slate-500 max-w-xl">This component is exported as <code className="text-slate-900 dark:text-white">@/components/dashboard/analytics/analytics-revenue-chart</code> and is ready to mount with any numeric array.</p>
           </div>
           
           <div className="scale-90 lg:scale-100 origin-top transform-gpu">
              <AnalyticsRevenueChart />
           </div>
        </div>

        <div className="bg-[#0D0518] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl mt-8">
           <div className="px-10 py-6 border-b border-white/5 flex items-center justify-between">
             <div className="flex items-center gap-4">
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/40" />
                 <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                 <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
               </div>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] ml-4">Revenue Chart Controller interface</span>
             </div>
             <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 uppercase tracking-widest">TypeScript Ready</span>
           </div>
           <div className="p-10">
<pre className="text-sm font-mono text-blue-400/80 leading-relaxed scrollbar-none overflow-x-auto">
{`// Higher-Order Visualization Architecture
<AnalyticsRevenueChart 
  title="Resource Overview"
  data={monthlyNumericArray} // Array<number> [12]
  type="Column Chart"        // Default view: 'Column', 'Line', 'Pie', 'KPI'
  accentColor="#7c3aed"      // Optional: Custom HSL/HEX primary token
  isInteractive={true}        // Enables tooltips and year switching
/>`}
</pre>
           </div>
        </div>
      </section>
    </DocContent>
  )
}
