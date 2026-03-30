import { DocContent } from "@/modules/documentation/components/DocContent"
import { Button } from "@/components/ui/button"
import { 
  Rocket, 
  Code2, 
  Palette, 
  ArrowRight,
  Zap,
  Shield,
  Component,
  Users,
  Layout as LayoutIcon,
  Globe,
  Lock,
  Cpu,
  MousePointer2
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function DocumentationHome() {
  return (
    <DocContent 
      title="Architecture & Design OS" 
      description="The official guide to the Recura design system, component architecture, and enterprise-grade developer resources."
    >
      {/* 1. Premium Hero Section */}
      <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 border border-white/10 shadow-2xl mb-16 group">
        {/* Animated Background Layers */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/20 blur-[150px] rounded-full -mr-64 -mt-64 group-hover:bg-purple-600/30 transition-colors duration-1000" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full -ml-32 -mb-32" />
        
        <div className="relative z-10 p-10 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-10">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 border border-white/5 backdrop-blur-xl">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Platform OS v2.4.0</span>
             </div>
             
             <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.95]">
                  The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-emerald-400">Blueprint</span> for SaaS Excellence
                </h1>
                <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-lg">
                  Recura provides a unified infrastructure for building scalable, high-performance dashboards with zero friction.
                </p>
             </div>

             <div className="flex flex-wrap gap-6 pt-4">
                <Link href="/dashboard/documentation/getting-started">
                  <Button className="bg-white text-slate-900 hover:bg-slate-50 font-black px-10 py-8 rounded-[2rem] shadow-xl shadow-white/5 border-none transition-all hover:translate-y-[-4px] active:translate-y-0 group/btn h-auto">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-3 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/dashboard/documentation/guide">
                  <Button className="bg-white/5 text-white border border-white/10 hover:bg-white/10 font-black px-10 py-8 rounded-[2rem] transition-all hover:translate-y-[-4px] active:translate-y-0 backdrop-blur-md h-auto">
                    Technical Guide
                  </Button>
                </Link>
             </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-6 relative">
             <div className="space-y-6 pt-12">
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl hover:bg-white/[0.08] transition-all cursor-default group/card">
                   <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform">
                      <Cpu className="w-6 h-6 text-purple-400" />
                   </div>
                   <h4 className="text-white font-bold text-lg">Server Core</h4>
                   <p className="text-xs text-slate-500 font-medium mt-1">Next.js 16 App Router</p>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl hover:bg-white/[0.08] transition-all cursor-default group/card translate-x-4">
                   <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform">
                      <Palette className="w-6 h-6 text-emerald-400" />
                   </div>
                   <h4 className="text-white font-bold text-lg">Design System</h4>
                   <p className="text-xs text-slate-500 font-medium mt-1">Tailwind 4.0 Engine</p>
                </div>
             </div>
             <div className="space-y-6">
                <div className="p-8 rounded-[2.5rem] bg-indigo-600 border border-indigo-400 shadow-2xl shadow-indigo-600/40 hover:scale-[1.02] transition-all cursor-default group/card">
                   <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                      <Lock className="w-6 h-6 text-white" />
                   </div>
                   <h4 className="text-white font-bold text-lg">Identity Hub</h4>
                   <p className="text-xs text-indigo-200/60 font-medium mt-1">Role-based Auth Layer</p>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl hover:bg-white/[0.08] transition-all cursor-default group/card">
                   <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform">
                      <Code2 className="w-6 h-6 text-amber-400" />
                   </div>
                   <h4 className="text-white font-bold text-lg">Developer API</h4>
                   <p className="text-xs text-slate-500 font-medium mt-1">Typed Module System</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 2. Platform Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {[
          {
            title: "Quick Start",
            description: "Deploy the full stack in under 5 minutes with our automated installation protocol.",
            icon: Rocket,
            color: "text-purple-500",
            bg: "bg-purple-500/5",
            href: "/dashboard/documentation/getting-started"
          },
          {
            title: "Component Library",
            description: "Browse 80+ modular components with live interaction, API refs, and accessibility defaults.",
            icon: Component,
            color: "text-indigo-500",
            bg: "bg-indigo-500/5",
            href: "/dashboard/documentation/components/buttons"
          },
          {
            title: "Global Icons",
            description: "The complete Recura icon set with searchable registry and one-click copy support.",
            icon: MousePointer2,
            color: "text-emerald-500",
            bg: "bg-emerald-500/5",
            href: "/dashboard/documentation/components/icons"
          }
        ].map((card) => (
          <Link key={card.title} href={card.href} className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full flex flex-col bg-white dark:bg-[#150a2e] p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/10 shadow-sm transition-all duration-500 hover:shadow-2xl hover:translate-y-[-8px]">
              <div className={cn("w-14 h-14 rounded-2xl mb-8 flex items-center justify-center border dark:border-white/10 shadow-inner", card.bg)}>
                <card.icon className={cn("w-7 h-7", card.color)} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">{card.title}</h3>
              <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
                {card.description}
              </p>
              <div className="mt-auto flex items-center text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-purple-600 transition-colors">
                View section
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 3. Architectural Values */}
      <section className="bg-slate-50 dark:bg-white/[0.02] rounded-[3.5rem] p-12 md:p-20 border border-slate-100 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="flex flex-col md:flex-row items-start lg:items-end justify-between gap-12 mb-20 relative z-10">
          <div className="max-w-xl space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-purple-600 flex items-center justify-center shadow-xl shadow-purple-600/20">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Enterprise Principles</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Recura isn't just about UI; it's a structural philosophy built for long-term scalability and developer ergonomics.
            </p>
          </div>
          <div className="flex gap-4 min-w-[300px]">
             <div className="flex-1 p-8 rounded-[2.5rem] bg-white dark:bg-[#0D0518] border border-gray-100 dark:border-white/10 text-center shadow-xl shadow-slate-200/50 dark:shadow-none">
                <span className="block text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">100%</span>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Modular</span>
             </div>
             <div className="flex-1 p-8 rounded-[2.5rem] bg-white dark:bg-[#0D0518] border border-gray-100 dark:border-white/10 text-center shadow-xl shadow-slate-200/50 dark:shadow-none">
                <span className="block text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">98.5</span>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Performance</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
          {[
            { title: "Atomic Structure", desc: "Every component is built following modular design principles for maximum reusability and testing safety.", icon: LayoutIcon },
            { title: "Semantic & Accessible", desc: "Fully ARIA-compliant primitives and standardized keyboard interactions across the entire platform.", icon: Users },
            { title: "Strongly Typed", desc: "First-class TypeScript integration providing IntelliSense and safe prop-drilling for every module.", icon: Code2 }
          ].map((item) => (
            <div key={item.title} className="space-y-8 group/item">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center shadow-md border border-slate-100 dark:border-white/10 group-hover/item:scale-110 transition-transform">
                <item.icon className="w-7 h-7 text-slate-400 dark:text-slate-500" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">{item.title}</h3>
                <p className="text-base text-slate-500 dark:text-slate-400 font-medium tracking-tight leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DocContent>
  )
}
