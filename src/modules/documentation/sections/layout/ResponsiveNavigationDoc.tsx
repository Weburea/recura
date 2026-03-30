"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Tablet, 
  Smartphone, 
  Monitor, 
  Info, 
  Copy, 
  Check, 
  Globe, 
  RotateCw,
  ExternalLink,
  ShieldCheck,
  Zap,
  MousePointer2,
  Maximize2
} from "lucide-react"
import { cn } from "@/lib/utils"

type ViewportMode = "desktop" | "tablet" | "mobile"
type PageContent = "home" | "dashboard"

export function ResponsiveNavigationDoc() {
  const [viewport, setViewport] = React.useState<ViewportMode>("desktop")
  const [page, setPage] = React.useState<PageContent>("dashboard")
  const [key, setKey] = React.useState(0) // For refreshing iframes
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(`// Master responsive layout orchestration
export const ViewportSimulator = ({ mode, url }) => {
  const scales = { mobile: 0.4, tablet: 0.7, desktop: 1 };
  return (
    <div style={{ transform: \`scale(\${scales[mode]})\` }}>
      <iframe src={url} className="w-full h-full border-none" />
    </div>
  );
};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const routes = {
    home: "/?sim=true",
    dashboard: "/dashboard?sim=true"
  }

  const refreshSimulator = () => setKey(prev => prev + 1)

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
           <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              Live Simulation
           </div>
           <div className="w-[4px] h-[4px] rounded-full bg-slate-300 dark:bg-white/10" />
           <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              v2.0 Refined
           </div>
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Responsive behavior</h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed max-w-3xl">
           Test our adaptive grid and fluid navigation system in real-time. Use the simulator below to interact with actual platform pages across different hardware viewports.
        </p>
      </div>

      {/* 2. Live Device Simulator Hub */}
      <section className="space-y-10 group/sim">
        <div className="bg-white dark:bg-[#0a0514] rounded-[3.5rem] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden transition-all duration-700">
          {/* Simulator Toolbar */}
          <div className="px-8 py-6 border-b border-slate-100 dark:border-white/5 flex flex-col lg:flex-row items-center justify-between gap-6 bg-slate-50/50 dark:bg-white/[0.02]">
             {/* Left: Viewport Toggles */}
             <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                {[
                  { id: "desktop", icon: Monitor, label: "Desktop" },
                  { id: "tablet", icon: Tablet, label: "Tablet" },
                  { id: "mobile", icon: Smartphone, label: "Mobile" }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setViewport(mode.id as ViewportMode)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all",
                      viewport === mode.id 
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30" 
                        : "text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5"
                    )}
                  >
                    <mode.icon className={cn("w-4 h-4", viewport === mode.id ? "animate-pulse" : "")} />
                    <span>{mode.label}</span>
                  </button>
                ))}
             </div>

             {/* Center: Fake URL Bar */}
             <div className="hidden xl:flex items-center gap-4 px-6 py-2.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex-1 max-w-md mx-6 group/url">
                <Globe className="w-4 h-4 text-slate-400 group-hover/url:text-purple-600 transition-colors" />
                <span className="text-[11px] font-black text-slate-400 tracking-wider lowercase truncate select-none">
                   recura.app{routes[page]}
                </span>
                <button 
                  onClick={refreshSimulator}
                  className="ml-auto p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  title="Reload Simulation"
                >
                   <RotateCw className="w-3.5 h-3.5 text-slate-400" />
                </button>
             </div>

             {/* Right: Page Switcher */}
             <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                   {[
                     { id: "home", label: "Home" },
                     { id: "dashboard", label: "Stats" }
                   ].map((p) => (
                     <button
                       key={p.id}
                       onClick={() => setPage(p.id as PageContent)}
                       className={cn(
                         "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                         page === p.id 
                           ? "bg-white dark:bg-white/10 text-purple-600 dark:text-purple-400 shadow-sm border border-slate-200/50 dark:border-white/10" 
                           : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                       )}
                     >
                       {p.label}
                     </button>
                   ))}
                </div>
                <Link 
                   href={page === 'home' ? "/" : "/dashboard"} 
                   target="_blank"
                   className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-purple-600 transition-colors border border-slate-200 dark:border-white/10"
                   title="Open in new tab"
                >
                   <ExternalLink className="w-4 h-4" />
                </Link>
             </div>
          </div>

          {/* Simulation Stage */}
          <div className="p-4 md:p-12 lg:p-20 flex items-center justify-center bg-slate-50 dark:bg-[#080312] min-h-[900px] relative overflow-hidden transition-all duration-500">
             {/* Dynamic Light Background Animation */}
             <div className={cn(
               "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-tr from-purple-500/10 via-transparent to-emerald-500/10 blur-[150px] transition-all duration-1000",
               viewport === 'mobile' ? "scale-50 rotate-45" : "scale-100 rotate-0"
             )} />

             <div className="flex items-center justify-center w-full h-full z-10">
                {/* Desktop Shell (Refined Proportions) */}
                {viewport === 'desktop' && (
                   <div className="w-full max-w-7xl animate-in zoom-in-95 fade-in duration-700 drop-shadow-2xl">
                      <div className="rounded-[2.5rem] border-8 border-slate-900/10 dark:border-white/5 overflow-hidden shadow-[0_50px_100px_-12px_rgba(0,0,0,0.4)] bg-white dark:bg-[#150a2e] relative group/browser">
                         {/* Browser Header (Mac Style Refined) */}
                         <div className="h-14 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111] flex items-center px-6 justify-between">
                            <div className="flex gap-2">
                               <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] shadow-inner" />
                               <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] shadow-inner" />
                               <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] shadow-inner" />
                            </div>
                            <div className="flex-1 max-w-xl mx-12 px-5 py-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-400 text-center tracking-tight flex items-center justify-center gap-3">
                               <Globe className="w-3.5 h-3.5 text-slate-300" />
                               <span>recura.app{routes[page]}</span>
                            </div>
                            <div className="flex items-center gap-6 text-slate-400 dark:text-white/20">
                               <Maximize2 className="w-4 h-4 opacity-0 group-hover/browser:opacity-100 transition-opacity" />
                               <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-white/10" />
                            </div>
                         </div>
                         {/* Actual Live Frame (Increased Vertical Context) */}
                         <div className="h-[750px] w-full bg-white relative">
                            <iframe 
                              key={key}
                              src={routes[page]} 
                              className="w-full h-full border-none shadow-inner"
                            />
                         </div>
                      </div>
                   </div>
                )}

                {/* Tablet Shell (Increased Width and Refined Bezel) */}
                {viewport === 'tablet' && (
                   <div className="w-[1050px] h-[1200px] animate-in slide-in-from-bottom-5 fade-in duration-700 transform scale-[0.65] origin-center">
                      <div className="w-full h-full rounded-[4.5rem] border-[22px] border-slate-900 dark:border-[#222] overflow-hidden shadow-[0_80px_120px_-20px_rgba(0,0,0,0.5)] relative bg-slate-950 ring-4 ring-slate-900/10 transition-all duration-500">
                         {/* Power / Volume Controls */}
                         <div className="absolute top-40 right-[-24px] w-[2px] h-24 bg-slate-800 dark:bg-[#333] rounded-l-md" />
                         <div className="absolute top-1/2 left-[-24px] -translate-y-12 w-[2px] h-20 bg-slate-800 dark:bg-[#333] rounded-r-md" />
                         
                         {/* Live Frame (Simulating High PPI) */}
                         <div className="w-full h-full bg-white overflow-hidden relative">
                            <iframe 
                               key={key}
                               src={routes[page]} 
                               className="w-full h-full border-none absolute top-0 left-0"
                               style={{ width: "100%", height: "100%" }} 
                            />
                         </div>

                         {/* Home Indicator (Refined) */}
                         <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-44 h-1.5 rounded-full bg-black/10 dark:bg-white/15 mix-blend-difference z-30" />
                      </div>
                   </div>
                )}

                {/* Mobile Shell (Dynamic Island Redesign) */}
                {viewport === 'mobile' && (
                   <div className="w-[410px] h-[860px] animate-in slide-in-from-bottom-10 fade-in duration-700 transform scale-[0.9] drop-shadow-3xl">
                      <div className="w-full h-full rounded-[4.5rem] border-[16px] border-slate-900 dark:border-[#1a1a1a] overflow-hidden shadow-[0_60px_100px_-15px_rgba(0,0,0,0.6)] relative bg-black ring-[10px] ring-white/[0.03]">
                         {/* Side Buttons (Hardware Detail) */}
                         <div className="absolute top-28 left-[-16px] w-[2px] h-12 bg-slate-800 rounded-r-md" />
                         <div className="absolute top-44 left-[-16px] w-[2px] h-12 bg-slate-800 rounded-r-md" />
                         <div className="absolute top-36 right-[-16px] w-[2px] h-24 bg-slate-800 rounded-l-md" />

                         {/* Dynamic Island (The "Pill" Notch) */}
                         <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7.5 bg-black rounded-full z-30 flex items-center justify-center p-2.5 shadow-2xl transition-all hover:w-32 group/island">
                            <div className="w-full h-full flex items-center justify-between">
                               <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-white/5 mix-blend-difference" />
                               <div className="w-1.5 h-1.5 rounded-full bg-slate-800 mr-2" />
                            </div>
                         </div>

                         {/* Actual Live Frame */}
                         <div className="w-full h-full bg-white overflow-hidden relative">
                            <iframe 
                               key={key}
                               src={routes[page]} 
                               className="w-[375px] h-[812px] border-none absolute top-0 left-0"
                               style={{ width: "100%", height: "100%" }} 
                            />
                         </div>

                         {/* Home Indicator (Refined) */}
                         <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-32 h-1.5 rounded-full bg-black/10 dark:bg-white/15 mix-blend-difference z-30" />
                      </div>
                   </div>
                )}
             </div>
          </div>
        </div>
      </section>

      {/* 3. Implementation Best Practices */}
      <section className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { 
               title: "Breakpoint Sync", 
               desc: "All components utilize the standard Tailwind breakpoint system (sm: 640px, md: 768px, lg: 1024px) to ensure absolute visual parity.",
               icon: Zap,
               color: "emerald"
             },
             { 
               title: "Safe-area Integrity", 
               desc: "Headers and footers are injected with 'env(safe-area-inset-*' variables to ensure hardware compatibility with notches.",
               icon: ShieldCheck,
               color: "purple"
             },
             { 
               title: "Touch Parity", 
               desc: "Interactive targets maintain a minimum 44px hitbox on touch devices, regardless of visual scaling or screen density.",
               icon: MousePointer2,
               color: "blue"
             }
           ].map((item, i) => (
             <div key={i} className="group p-8 rounded-[3rem] bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/10 space-y-4 hover:border-purple-500/30 transition-all shadow-sm">
                <div className={cn(
                   "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110",
                   item.color === 'emerald' && "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20",
                   item.color === 'purple' && "bg-purple-50 text-purple-600 dark:bg-purple-500/20",
                   item.color === 'blue' && "bg-blue-50 text-blue-600 dark:bg-blue-500/20",
                )}>
                   <item.icon className="w-6 h-6" />
                </div>
                <h6 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest leading-none">{item.title}</h6>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed tracking-tight">{item.desc}</p>
             </div>
           ))}
        </div>

        {/* Technical Reference Code Block */}
        <div className="rounded-[3rem] bg-[#0A0D14] border border-white/5 shadow-2xl overflow-hidden relative group">
           <div className="px-4 py-3 md:px-8 md:py-6 bg-white/[0.03] border-b border-white/5 flex items-center justify-between gap-3 md:gap-4">
              <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                 <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                 <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="text-[13px] font-medium text-slate-400 flex items-center gap-2 truncate flex-1 justify-center px-2">
                 <Info className="w-4 h-4 text-emerald-400 shrink-0" />
                 <span>src/lib/responsive.tsx</span>
              </div>
              <button 
                onClick={handleCopy}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors text-xs font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
           </div>
           <div className="p-8 overflow-hidden">
              <pre className="text-[13px] font-medium text-slate-400 leading-relaxed custom-scrollbar max-h-[400px] overflow-y-auto pr-4">
{`// Implementation of hardware safe-areas & breakpoint triggers
export function ResponsiveBridge({ children }) {
  const [viewport, setViewport] = useState('desktop');

  return (
    <div className={cn(
      "min-h-screen transition-all duration-500",
      "lg:p-8",                    // Desktop padding
      "md:p-4",                    // Tablet padding
      "p-0 pb-safe",              // Mobile safe-area
      viewport === 'mobile' ? "bg-slate-50" : "bg-white"
    )}>
      {children}
    </div>
  );
}`}
              </pre>
           </div>
        </div>
      </section>
    </div>
  )
}
