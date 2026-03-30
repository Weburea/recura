"use client"

import * as React from "react"
import { 
  Building2, 
  Palette, 
  CreditCard, 
  Users, 
  Bell,
  Code2,
  Layers,
  Info,
  CheckCircle2,
  Copy,
  Check
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ComparisonSlider } from "../../components/ComparisonSlider"

const SubNavMockItem = ({ icon: Icon, label, active, theme }: { icon: React.ElementType, label: string, active?: boolean, theme: 'light' | 'dark' }) => (
  <div className={cn(
    "flex items-center gap-4 px-5 py-3 rounded-2xl transition-all font-bold text-[11px] tracking-tight w-full",
    active 
      ? (theme === 'light' ? "bg-purple-50 text-purple-600 shadow-sm" : "bg-purple-500/20 text-purple-400") 
      : (theme === 'light' ? "text-slate-400" : "text-slate-500")
  )}>
    <Icon className="w-4 h-4" />
    {label}
  </div>
)

export function SubNavigationDoc() {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`const subNavItems = [
  { icon: Building2, label: "Profile Settings", href: "/dashboard/settings" },
  { icon: Palette, label: "Appearance", href: "/dashboard/settings/appearance" },
  { icon: CreditCard, label: "Subscription", href: "/dashboard/settings/billing" },
  { icon: Users, label: "Team Members", href: "/dashboard/settings/team" },
  { icon: Bell, label: "Notifications", href: "/dashboard/settings/notifications" }
];`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const subNavItems = [
    { icon: Building2, label: "Profile Settings", active: true },
    { icon: Palette, label: "Appearance", active: false },
    { icon: CreditCard, label: "Subscription", active: false },
    { icon: Users, label: "Team Members", active: false },
    { icon: Bell, label: "Notifications", active: false }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Technical Specification Table */}
      <section className="space-y-8">
        <div className="bg-white dark:bg-[#150a2e] rounded-[3rem] border border-slate-100 dark:border-white/10 overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none">
          <div className="px-6 py-8 md:px-10 md:py-10 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/30 dark:bg-white/[0.02]">
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Interface parameters</h4>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider">Core configuration constants</p>
            </div>
            <div className="px-5 py-2.5 rounded-xl bg-purple-600 text-[10px] font-bold text-white shadow-lg shadow-purple-600/20">
               Latest v2.0
            </div>
          </div>
          <div className="overflow-x-auto overflow-y-hidden custom-scrollbar">
             <table className="w-full text-left border-collapse">
                <thead>
                   <tr className="bg-slate-50/50 dark:bg-white/[0.01]">
                      <th className="px-6 py-5 md:px-10 md:py-6 text-xs font-semibold text-slate-500 border-b border-slate-100 dark:border-white/5 whitespace-nowrap">Property</th>
                      <th className="px-6 py-5 md:px-10 md:py-6 text-xs font-semibold text-slate-500 border-b border-slate-100 dark:border-white/5 whitespace-nowrap">Definition</th>
                      <th className="px-6 py-5 md:px-10 md:py-6 text-xs font-semibold text-slate-500 border-b border-slate-100 dark:border-white/5 whitespace-nowrap">Direct implementation</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                   {[
                      { prop: "Fixed width", val: "250px", impl: ["w-[250px]", "flex-shrink-0"] },
                      { prop: "Sticky behavior", val: "Top (80px)", impl: ["sticky top-20", "max-h-screen"] },
                      { prop: "Theme logic", val: "SSR-Safe", impl: ["mounted-hook", "resolvedTheme"] },
                      { prop: "Active pattern", val: "Exact", impl: ["pathname === href", "usePathname"] },
                      { prop: "Responsive", value: "Horizontal", impl: ["overflow-x-auto", "md:flex-col"] }
                   ].map((row, i) => (
                      <tr key={i} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-all duration-300">
                         <td className="px-6 py-5 md:px-10 md:py-6 text-sm font-medium text-slate-900 dark:text-white tracking-tight whitespace-nowrap">{row.prop}</td>
                         <td className="px-6 py-5 md:px-10 md:py-6 whitespace-nowrap">
                            <code className="text-xs px-3 py-1 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg font-bold shadow-sm">
                               {row.val}
                            </code>
                         </td>
                         <td className="px-6 py-5 md:px-10 md:py-6 text-[10px] font-medium flex gap-3 flex-wrap">
                          {row.impl.map((tag, j) => (
                            <span key={j} className="text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 px-3 py-1 rounded-full transition-colors group-hover:border-purple-600/30 group-hover:text-purple-600">
                               {tag}
                            </span>
                          ))}
                       </td>
                    </tr>
                  ))}
               </tbody>
             </table>
          </div>
        </div>
      </section>

      {/* 2. Visual Comparison Slider */}
      <section className="space-y-8">
        <ComparisonSlider 
          title="Sub-navigation interface"
          description="A consistent design pattern for deep-level configuration modules like Workspace Settings."
          height="450px"
          action={{
            label: "View Live Settings",
            href: "/dashboard/settings"
          }}
          lightLayer={
            <div className="w-64 bg-white border border-slate-100 rounded-[2rem] flex flex-col p-4 shadow-xl">
               <div className="flex flex-col gap-1">
                  {subNavItems.map((item, i) => (
                    <SubNavMockItem key={i} {...item} theme="light" />
                  ))}
               </div>
            </div>
          }
          darkLayer={
            <div className="w-64 bg-[#150a2e] border border-white/5 rounded-[2rem] flex flex-col p-4 shadow-xl">
               <div className="flex flex-col gap-1">
                  {subNavItems.map((item, i) => (
                    <SubNavMockItem key={i} {...item} theme="dark" />
                  ))}
               </div>
            </div>
          }
        />
      </section>

      {/* 3. Real Implementation Code Workspace */}
      <section className="space-y-12">
        <div className="space-y-4">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shadow-xl shadow-slate-900/10">
                 <Code2 className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Technical reference</h4>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Production ready sub-navigation structure</p>
              </div>
           </div>
        </div>

        <div className="rounded-[3rem] bg-[#0A0D14] border border-white/5 shadow-2xl overflow-hidden relative group">
           <div className="px-4 py-3 md:px-8 md:py-6 bg-white/[0.03] border-b border-white/5 flex items-center justify-between gap-3 md:gap-4">
              <div className="flex gap-2 md:gap-3 shrink-0">
                 <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#FF5F56]" />
                 <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#FFBD2E]" />
                 <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="text-[10px] md:text-[13px] font-medium text-slate-400 flex items-center gap-2 truncate flex-1 justify-center px-2">
                 <Info className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400 shrink-0 hidden sm:block" />
                 <span className="truncate text-center">src/components/dashboard/settings/settings-sidebar.tsx</span>
              </div>
              <button 
                onClick={handleCopy}
                className="shrink-0 flex items-center gap-1.5 px-2 py-1 md:px-3 md:py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors text-[10px] md:text-xs font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
           </div>
           <div className="p-8 overflow-hidden">
              <pre className="text-[13px] font-medium text-slate-400 leading-relaxed custom-scrollbar max-h-[400px] overflow-y-auto pr-4">
{`import { Building2, Palette, CreditCard } from "lucide-react"

const SettingsSidebar = () => {
  const pathname = usePathname();
  
  const subNavItems = [
    { icon: Building2, label: "Profile Settings", href: "/dashboard/settings" },
    { icon: Palette, label: "Appearance", href: "/dashboard/settings/appearance" },
    { icon: CreditCard, label: "Subscription", href: "/dashboard/settings/billing" }
  ];

  return (
    <aside className="w-64 sticky top-20 h-fit bg-white dark:bg-[#150a2e]">
      <nav className="flex flex-col gap-1 p-2">
        {subNavItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href}
            className={cn(
               "flex items-center gap-3 px-4 py-3 rounded-xl",
               pathname === item.href ? "bg-purple-600 text-white" : "text-slate-500"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};`}
              </pre>
           </div>
        </div>
      </section>

      {/* 4. Behavior Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="p-10 rounded-[2.5rem] bg-emerald-50 dark:bg-white/[0.02] border border-emerald-100/50 dark:border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center shadow-lg">
               <Layers className="w-6 h-6 text-emerald-600" />
            </div>
            <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Context alignment</h4>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed tracking-tight">
               Sub-navigation bars are context-aware and align vertically on desktop, shifting to a horizontal scrollable strip on mobile devices.
            </p>
         </div>
         <div className="p-10 rounded-[2.5rem] bg-slate-900 border border-white/5 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shadow-lg">
               <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <h4 className="text-xl font-black text-white tracking-tight leading-none">Performance tip</h4>
            <p className="text-sm font-medium text-slate-400 leading-relaxed tracking-tight">
               Use the <code className="bg-white/10 px-1 rounded">usePathname</code> hook directly within the sub-nav component to ensure real-time active state updates without parent re-renders.
            </p>
         </div>
      </div>
    </div>
  )
}
