import { DocContent } from "@/modules/documentation/components/DocContent"
import { Palette, Type, Layers, Box, Compass, Laptop, Sun, Moon } from "lucide-react"
import React from "react"

export default function DesignSystemDoc() {

  return (
    <DocContent 
      title="Design Foundations" 
      description="The Recura design system is built on a modular foundation of consistent scaling, high-contrast typography, and curated color palettes."
    >
      {/* 1. Color Palette */}
      <section className="space-y-10 group">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center shadow-xl shadow-purple-600/20">
              <Palette className="w-6 h-6 text-white" />
           </div>
           <div className="space-y-1">
             <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Color ecosystem</h2>
             <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Curated HSL-balanced branding tokens</p>
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Recura Purple", class: "bg-purple-600", hex: "#7C3AED", status: "Brand Primary" },
            { name: "Deep Indigo", class: "bg-indigo-600", hex: "#4F46E5", status: "Secondary" },
            { name: "Void Dark", class: "bg-[#0D0518]", hex: "#0D0518", status: "App Background" },
            { name: "Pure White", class: "bg-white", hex: "#FFFFFF", status: "Interface Base" },
            { name: "Vibrant Success", class: "bg-emerald-500", hex: "#10B981", status: "Positive State" },
            { name: "Recura Rose", class: "bg-rose-500", hex: "#F43F5E", status: "Error State" },
            { name: "Amber Gold", class: "bg-amber-500", hex: "#F59E0B", status: "Warning State" },
            { name: "Azure Info", class: "bg-blue-500", hex: "#3B82F6", status: "System Info" }
          ].map((color) => (
            <div key={color.name} className="group/card space-y-4">
              <div className={`h-32 rounded-[2.5rem] ${color.class} border border-slate-200 dark:border-white/10 shadow-lg relative overflow-hidden transition-transform duration-500 hover:scale-[1.02] active:scale-[0.98]`}>
                 <div className="absolute inset-0 bg-white opacity-0 group-hover/card:opacity-10 transition-opacity" />
              </div>
              <div className="px-2">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{color.status}</div>
                <h4 className="text-base font-black text-slate-900 dark:text-white tracking-tight">{color.name}</h4>
                <p className="text-xs font-mono text-slate-400 font-bold uppercase mt-1">{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Typography - Redesigned for Premium Look */}
      <section className="space-y-10 pt-16 border-t border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-600/20">
              <Type className="w-6 h-6 text-white" />
           </div>
           <div className="space-y-1">
             <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Typography scales</h2>
             <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Inter & Outfit modular font architecture</p>
           </div>
        </div>

        <div className="space-y-8">
           {[
             { label: "Heading 1 / Giant", family: "Outfit", weight: "Black", size: "text-5xl md:text-7xl", tracking: "tracking-tighter", preview: "Building the future of SaaS" },
             { label: "Heading 2 / Display", family: "Outfit", weight: "Bold", size: "text-3xl md:text-5xl", tracking: "tracking-tight", preview: "Consistent Design System Architecture" },
             { label: "Lead / Medium", family: "Inter", weight: "Medium", size: "text-xl", tracking: "tracking-tight", preview: "Designed for high-performance dashboards and enterprise applications that require absolute clarity." },
             { label: "Body / Technical", family: "Inter", weight: "Medium", size: "text-base", tracking: "tracking-tight", preview: "Atomic components are the building blocks of a maintainable UI system. Every element here is rigorously tested for accessibility and scale." }
           ].map((type, i) => (
             <div key={i} className="group/type p-8 md:p-12 rounded-[3.5rem] bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 hover:border-indigo-500/30 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-slate-200/50 dark:border-white/5 pb-6">
                   <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 text-[10px] font-black text-indigo-600 uppercase tracking-widest">{type.label}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{type.family} / {type.weight}</span>
                   </div>
                   <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                      <span>{type.size.split(' ').pop()}</span>
                      <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-white/10" />
                      <span>{type.tracking}</span>
                   </div>
                </div>
                <div className={`${type.size} ${type.tracking} font-black text-slate-900 dark:text-white leading-[1.1]`}>
                   {type.preview}
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* 3. Elevation & Shadows - Redesigned as 3D-style depth cards */}
      <section className="space-y-10 pt-16 border-t border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-600/20">
              <Layers className="w-6 h-6 text-white" />
           </div>
           <div className="space-y-1">
             <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Spatial depth</h2>
             <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Elevation layers and shadow optics</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
          {[
            { name: "Small", class: "shadow-sm border-slate-100 dark:border-white/5", desc: "Low-profile interactive elements like input fields and simple buttons." },
            { name: "Medium", class: "shadow-2xl shadow-slate-200/50 dark:shadow-none border-slate-200/50 dark:border-white/10 scale-105 z-10", desc: "Standard component shells including cards, sidebars, and navigation headers." },
            { name: "High", class: "shadow-2xl shadow-purple-500/20 dark:shadow-purple-900/40 border-purple-100 dark:border-purple-500/20", desc: "Floaters, modals, and critical notifications requiring distinct visual priority." }
          ].map((item, i) => (
            <div key={i} className="group/depth space-y-6">
               <div className={`aspect-square rounded-[3rem] bg-white dark:bg-[#0D0518] border flex flex-col items-center justify-center p-12 transition-all duration-500 hover:-translate-y-4 hover:rotate-2 ${item.class}`}>
                  <Box className="w-16 h-16 text-slate-100 dark:text-white/5 mb-6 group-hover/depth:text-purple-500/10 transition-colors" />
                  <div className="text-center">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Elevation L{i+1}</span>
                     <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{item.name}</h4>
                  </div>
               </div>
               <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed text-center px-4">
                  {item.desc}
               </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Practical Grid Overlay */}
      <section className="mt-20 p-12 md:p-20 rounded-[4rem] bg-slate-900 border border-white/10 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[130px] rounded-full" />
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
               <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/10">
                  <Compass className="w-8 h-8 text-purple-400" />
               </div>
               <div className="space-y-4">
                  <h2 className="text-4xl font-black text-white tracking-tighter leading-none">Modular system rules</h2>
                  <p className="text-lg font-medium text-slate-400 leading-relaxed">
                    By strictly adhering to these design tokens, Recura maintains a professional visual logic across every pixel of the application.
                  </p>
               </div>
               <div className="flex gap-4">
                  <button className="px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-all">Download Design Pack</button>
                  <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all">Read Spec</button>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               {[
                 { icon: Laptop, text: "Responsive first" },
                 { icon: Moon, text: "Native Dark Mode" },
                 { icon: Sun, text: "Vibrant Lighting" },
                 { icon: Layers, text: "Z-index Hierarchy" }
               ].map((rule, i) => (
                 <div key={i} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center gap-4 hover:bg-white/10 transition-all">
                    <rule.icon className="w-8 h-8 text-slate-500" />
                    <span className="text-xs font-bold text-white tracking-tight uppercase">{rule.text}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </DocContent>
  )
}
