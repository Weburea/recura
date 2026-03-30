"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import { DocContent } from "@/modules/documentation/components/DocContent"
import { ComponentPreview } from "@/modules/documentation/components/ComponentPreview"
import { 
  CreditCard, 
  RotateCw, 
  Zap, 
  TrendingUp, 
  Cpu
} from "lucide-react"
import { cn } from "@/lib/utils"

// Helper: SVG Design Patterns
const DesignPattern = ({ type, className }: { type: string; className?: string }) => {
  switch (type) {
    case "waves":
      return (
        <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M0 80 C 30 20 60 40 100 80 Z" fill="currentColor" fillOpacity="0.08" />
        </svg>
      )
    case "mesh":
      return (
        <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="meshPatternDoc" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#meshPatternDoc)" />
        </svg>
      )
    case "multi-waves":
      return (
        <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" fillOpacity="0.2" />
          <path d="M0 80 C 30 20 60 40 100 80 Z" fill="currentColor" fillOpacity="0.1" />
          <path d="M0 60 C 40 10 50 50 100 60 Z" fill="currentColor" fillOpacity="0.05" />
        </svg>
      )
    case "cross":
      return (
        <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 L 100 100 M 100 0 L 0 100" stroke="currentColor" strokeWidth="20" strokeOpacity="0.05" fill="none" />
        </svg>
      )
    case "aurora":
      return (
        <div className={cn(className, "opacity-30 blur-3xl relative h-full w-full overflow-hidden")}>
          <div className="absolute top-0 -left-1/4 w-full h-full bg-cyan-400/30 rounded-full" />
          <div className="absolute bottom-0 -right-1/4 w-full h-full bg-purple-400/30 rounded-full" />
        </div>
      )
    default:
      return null
  }
}

export default function PaymentsDocPage() {
  const [isPreviewFlipped, setIsPreviewFlipped] = useState(false)
  const [activePattern, setActivePattern] = useState("waves")
  const [activeBg, setActiveBg] = useState("linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)")
  const [activeSim, setActiveSim] = useState("sim.svg")
  const [roundedCorners, setRoundedCorners] = useState(24)

  const patterns = [
    { id: "waves", label: "Fluid Waves" },
    { id: "mesh", label: "Technical Mesh" },
    { id: "multi-waves", label: "Multi-Density" },
    { id: "cross", label: "Structural" },
    { id: "aurora", label: "Aurora Glow" },
    { id: "none", label: "Clean Glass" }
  ]

  const gradients = [
    { id: "purple", bg: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)", class: "bg-indigo-700" },
    { id: "ocean", bg: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)", class: "bg-blue-500" },
    { id: "sunset", bg: "linear-gradient(135deg, #f97316 0%, #db2777 100%)", class: "bg-orange-500" },
    { id: "green", bg: "linear-gradient(135deg, #064e3b 0%, #059669 100%)", class: "bg-emerald-700" }
  ]

  return (
    <DocContent 
      title="Payments UI" 
      description="Recura's financial orchestration layer provides a high-fidelity interface for payment gateways, 3D card customization, and automated billing logic."
    >
      {/* 1. 3D Interactive Card Primitive */}
      <section className="space-y-12 mb-20">
         <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-3xl bg-purple-600 flex items-center justify-center shadow-xl shadow-purple-600/20">
               <CreditCard className="w-7 h-7 text-white" />
            </div>
            <div className="space-y-1">
               <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Interactive Card Primitive</h2>
               <p className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-widest">3D Transformed UI Layer</p>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* The Primitive Preview - 7 cols */}
            <div className="lg:col-span-7">
               <ComponentPreview
                 title="3D Card Controller"
                 description="Full 3D rotation with SVG design patterns and dynamic HSL gradient mapping."
                 code={`<div className="perspective-1000">
  <div className={cn("flip-card-inner", isFlipped && "active")}>
    <CardFront design={activeDesign} />
    <CardBack design={activeDesign} />
  </div>
</div>`}
               >
                  <div className="py-12 sm:py-20 flex flex-col items-center gap-12 w-full px-4">
                     <div 
                      className={cn("w-full max-w-[460px] h-[260px] perspective-2000 cursor-pointer", isPreviewFlipped ? "flip-card-active" : "")}
                      onClick={() => setIsPreviewFlipped(!isPreviewFlipped)}
                     >
                        <div className="flip-card-inner">
                           {/* Front Side */}
                           <div 
                            className="flip-card-front p-10 shadow-2xl transition-all duration-500 overflow-hidden text-white border-0"
                            style={{ 
                              background: activeBg, 
                              borderRadius: `${roundedCorners}px`
                            }}
                           >
                              <div className="absolute inset-0 pointer-events-none">
                                <DesignPattern type={activePattern} className="w-full h-full" />
                              </div>
                              
                               <div className="flex justify-between items-start relative z-10 w-full mb-4">
                                 <div className="w-14 h-11 relative">
                                    <Image src={`/images/payment/${activeSim}`} alt="Chip" fill className="object-contain" />
                                 </div>
                                 <div className="italic font-black text-3xl tracking-tighter opacity-90 drop-shadow-sm uppercase">Visa</div>
                              </div>

                              <div className="space-y-8 relative z-10 w-full">
                                 <p className="text-2xl font-black tracking-[0.25em] drop-shadow-md whitespace-nowrap">4532 •••• •••• 2384</p>
                                 <div className="flex justify-between items-end w-full">
                                    <div className="space-y-1">
                                       <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Holder</span>
                                       <p className="text-sm font-bold tracking-tight">ALEXANDER RECURA</p>
                                    </div>
                                    <div className="text-right">
                                       <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Expiry</span>
                                       <p className="text-sm font-bold">12 / 30</p>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* Back Side */}
                           <div 
                            className="flip-card-back p-10 shadow-2xl transition-all duration-500 overflow-hidden text-white border-0"
                            style={{ 
                              background: activeBg,
                              borderRadius: `${roundedCorners}px`
                            }}
                           >
                              <div className="absolute inset-0 pointer-events-none">
                                <DesignPattern type={activePattern} className="w-full h-full" />
                              </div>
                              <div className="absolute top-10 left-0 w-full h-12 bg-slate-950/80" />
                              <div className="mt-16 flex items-center gap-4 relative z-10">
                                 <div className="flex-1 h-10 bg-white/10 rounded flex items-center justify-end px-4 border border-white/10">
                                    <span className="font-mono font-black italic tracking-widest text-sm text-white/90">123</span>
                                 </div>
                                 <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">CVV</span>
                              </div>
                              <p className="text-[8px] text-center opacity-40 leading-tight">PREVIEW ONLY – This card is a property of the Recura Design System. Restricted Use.</p>
                           </div>
                        </div>
                     </div>

                     <button 
                      onClick={() => setIsPreviewFlipped(!isPreviewFlipped)}
                      className="px-8 py-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center gap-3 text-sm font-black text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-200 transition-all shadow-xl shadow-slate-900/[0.02]"
                     >
                        <RotateCw className="w-4 h-4" />
                        FLIP CARD PREVIEW
                     </button>
                  </div>
               </ComponentPreview>
            </div>

            {/* The Customization Registry - 5 cols */}
            <div className="lg:col-span-5 space-y-6">
               <div className="dashboard-card p-10 space-y-10">
                  <div className="space-y-4">
                     <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Gradient Registry</h3>
                     <div className="grid grid-cols-4 gap-3">
                        {gradients.map((g) => (
                           <button 
                            key={g.id}
                            onClick={() => setActiveBg(g.bg)}
                            className={cn(
                              "h-12 rounded-xl transition-all border border-gray-100 dark:border-white/10 relative overflow-hidden",
                              activeBg === g.bg ? "ring-2 ring-purple-600 scale-105" : "hover:scale-105"
                            )}
                            style={{ background: g.bg }}
                           />
                        ))}
                     </div>
                  </div>

                  <div className="space-y-4">
                     <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">SVG Design Patterns</h3>
                     <div className="grid grid-cols-2 gap-3">
                        {patterns.map((p) => (
                           <button 
                            key={p.id}
                            onClick={() => setActivePattern(p.id)}
                            className={cn(
                              "p-4 rounded-2xl border text-left transition-all group",
                              activePattern === p.id 
                                ? "bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/20" 
                                : "bg-white dark:bg-white/5 border-slate-100 dark:border-white/10 text-slate-500 hover:border-purple-200"
                            )}
                           >
                              <p className="text-[10px] font-black uppercase tracking-widest">{p.label}</p>
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">SIM Style Selection</h3>
                        <span className="text-[10px] font-black text-purple-600 bg-purple-50 dark:bg-purple-900/30 px-2.5 py-1 rounded-full uppercase tracking-widest">Premium</span>
                     </div>
                     <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {["sim.svg",  "sim 2.svg", "sim 3.svg", "sim 4.svg", "sim 5.svg", "sim 6.svg", "sim 7.svg"].map((s) => (
                           <button 
                            key={s}
                            onClick={() => setActiveSim(s)}
                            className={cn(
                              "h-12 min-w-[44px] rounded-xl border-2 transition-all flex items-center justify-center overflow-hidden bg-slate-50/10 dark:bg-white/5",
                              activeSim === s ? "border-purple-600 bg-purple-50 dark:bg-purple-900/10 ring-4 ring-purple-600/5" : "border-slate-100 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10"
                            )}
                           >
                            <div className="w-8 h-6 relative opacity-80 group-hover:opacity-100">
                               <Image src={`/images/payment/${s}`} alt="Sim" fill className="object-contain" />
                            </div>
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Radius Control</h3>
                        <span className="text-xs font-black text-purple-600">{roundedCorners}px</span>
                     </div>
                     <input 
                      type="range" min="0" max="40" value={roundedCorners} 
                      onChange={(e) => setRoundedCorners(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-100 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-purple-600"
                     />
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 2. Component Inventory: Gateway Providers */}
      <section className="space-y-10 mb-20 pt-16 border-t border-slate-100 dark:border-white/5">
         <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-600/20">
               <Cpu className="w-7 h-7 text-white" />
            </div>
            <div className="space-y-1">
               <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Gateway Providers</h2>
               <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Service Integration UI</p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
               { id: "stripe", title: "Stripe", status: "Connected", color: "text-emerald-500", bg: "bg-emerald-500/10" },
               { id: "paypal", title: "PayPal", status: "Action Required", color: "text-amber-500", bg: "bg-amber-500/10" },
               { id: "paystack", title: "Paystack", status: "Disconnected", color: "text-slate-400", bg: "bg-slate-100 dark:bg-white/5" }
            ].map((gw) => (
               <div key={gw.id} className="dashboard-card p-8 flex flex-col gap-6 group hover:border-indigo-400 transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                     <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center font-black text-lg">
                        {gw.title[0]}
                     </div>
                     <div className={cn("px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest", gw.bg, gw.color)}>
                        {gw.status}
                     </div>
                  </div>
                  <div className="space-y-1">
                     <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{gw.title}</h4>
                     <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Live API Key Configuration</p>
                  </div>
                  <div className="mt-4 flex items-center text-[10px] font-black text-slate-400 group-hover:text-indigo-600 uppercase tracking-[0.2em] transition-colors">
                     Configure settings
                     <RotateCw className="w-3 h-3 ml-2 group-hover:rotate-180 transition-transform" />
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 3. Enterprise Billing Controllers */}
      <section className="space-y-10 pt-16 border-t border-slate-100 dark:border-white/5">
         <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-3xl bg-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-600/20">
               <RotateCw className="w-7 h-7 text-white" />
            </div>
            <div className="space-y-1">
               <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Billing Optimization</h2>
               <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Logic & Automation Controls</p>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Autobilling Toggle Card */}
            <div className="dashboard-card p-10 flex flex-col justify-between items-start gap-10">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[2rem] bg-indigo-500 flex items-center justify-center shadow-2xl shadow-indigo-500/20">
                     <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-1">
                     <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Autobilling Logic</h3>
                     <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Automated payment retry orchestration.</p>
                  </div>
               </div>
               
               <div className="w-full flex items-center justify-between p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Status</p>
                     <p className="text-sm font-bold text-emerald-600">Active & Recursive</p>
                  </div>
                  <div className="w-14 h-7 bg-purple-600 rounded-full flex items-center justify-end px-1 shadow-inner">
                     <div className="w-5 h-5 bg-white rounded-full shadow-lg" />
                  </div>
               </div>
            </div>

            {/* Proration Slider Card */}
            <div className="dashboard-card p-10 space-y-10">
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                     <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Proration Threshold</h3>
                     <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Manage mid-cycle upgrade accounting.</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
                     <TrendingUp className="w-6 h-6" />
                  </div>
               </div>
               
               <div className="space-y-6">
                  <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-400">
                     <span>Conservative</span>
                     <span className="text-slate-900 dark:text-white">70% Offset</span>
                     <span>Aggressive</span>
                  </div>
                  <div className="relative h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                     <div className="absolute top-0 left-0 h-full w-[70%] bg-purple-600 shadow-[0_0_15px_rgba(124,58,237,0.5)]" />
                  </div>
               </div>
            </div>
         </div>

         {/* Advanced Integration Sample */}
         <div className="bg-slate-900 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl mt-8">
            <div className="px-10 py-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/40" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] ml-4">Enterprise Payment Module</span>
              </div>
            </div>
            <div className="p-10">
<pre className="text-sm font-mono text-blue-400/80 leading-relaxed scrollbar-none overflow-x-auto">
{`// Financial Interface Orchestration
<PaymentController 
  gateway="Stripe"
  design={{
    background: "HSL(240, 100%, 50%)",
    pattern: "WaveStructural",
    radius: "24px"
  }}
  controls={{
    isAutobilling: true,
    prorationThreshold: 0.75
  }}
/>`}
</pre>
            </div>
         </div>
      </section>
    </DocContent>
  )
}
