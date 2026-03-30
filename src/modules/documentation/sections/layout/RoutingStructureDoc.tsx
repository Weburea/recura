"use client"

import * as React from "react"
import { 
  Layout, 
  Settings, 
  Rocket, 
  Copy, 
  Check, 
  FolderTree, 
  FileCode,
  FolderOpen,
  FileJson,
  Database,
  Shield,
  Globe,
  ChevronRight,
  Monitor
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TreeItemProps {
  name: string
  type: 'folder' | 'file' | 'group' | 'dynamic'
  children?: TreeItemProps[]
  description?: string
  initialOpen?: boolean
  depth?: number
}

function TreeItem({ name, type, children, description, initialOpen = false, depth = 0 }: TreeItemProps) {
  const [isOpen, setIsOpen] = React.useState(initialOpen)

  const getIcon = () => {
    if (type === 'folder') return isOpen ? <FolderOpen className="w-4 h-4 text-purple-500" /> : <FolderTree className="w-4 h-4 text-purple-400" />
    if (type === 'group') return <Shield className="w-4 h-4 text-slate-400/60" />
    if (type === 'dynamic') return <Database className="w-4 h-4 text-emerald-400" />
    if (name.includes('layout')) return <Layout className="w-4 h-4 text-blue-500" />
    return <FileCode className="w-4 h-4 text-slate-400" />
  }

  return (
    <div className="space-y-1">
      <div 
        className={cn(
          "group flex items-center gap-3 py-2 px-3 rounded-xl transition-all cursor-pointer",
          "hover:bg-slate-100/50 dark:hover:bg-white/[0.03]",
          depth === 0 && "font-bold text-slate-900 dark:text-white"
        )}
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm group-hover:scale-110 transition-transform">
            {getIcon()}
          </div>
          <span className={cn(
            "text-[13px] truncate",
            type === 'group' && "text-slate-400 font-medium italic",
            type === 'dynamic' && "text-emerald-500 font-bold",
            type === 'folder' && "text-slate-700 dark:text-slate-300 font-bold"
          )}>
            {name}
          </span>
          {description && (
            <span className="hidden md:inline text-[10px] font-medium text-slate-400/60 ml-2 truncate">
              {description}
            </span>
          )}
        </div>
        {children && (
          <ChevronRight className={cn(
            "w-3.5 h-3.5 text-slate-300 transition-transform",
            isOpen && "rotate-90"
          )} />
        )}
      </div>
      {isOpen && children && (
        <div className="space-y-1 animate-in slide-in-from-left-2 duration-300">
          {children.map((child, i) => (
            <TreeItem key={i} {...child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function RoutingStructureDoc() {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`app/
├── (auth)/              # Route group for authentication
│   ├── sign-in/
│   ├── sign-up/
│   └── forgot-password/
├── dashboard/           # Authenticated platform root
│   ├── layout.tsx       # Persistent shell & navigation
│   ├── page.tsx         # Performance stats overview
│   ├── settings/        # Module configuration hub
│   └── documentation/   # Design system components
└── privacy-policy/      # Legal & compliance terms`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const projectTree: TreeItemProps[] = [
    {
      name: "src",
      type: "folder",
      initialOpen: true,
      children: [
        {
          name: "app",
          type: "folder",
          initialOpen: true,
          children: [
            {
              name: "(auth)",
              type: "group",
              description: "URL-invisible route group",
              children: [
                { name: "sign-in", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
                { name: "sign-up", type: "folder", children: [{ name: "page.tsx", type: "file" }] }
              ]
            },
            {
              name: "dashboard",
              type: "folder",
              initialOpen: true,
              description: "Main product hub",
              children: [
                { name: "layout.tsx", type: "file", description: "Global dashboard shell" },
                { name: "page.tsx", type: "file", description: "Stats & overview" },
                {
                  name: "settings",
                  type: "folder",
                  children: [
                    { name: "layout.tsx", type: "file" },
                    { name: "profile", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
                    { name: "team", type: "folder", children: [{ name: "page.tsx", type: "file" }] }
                  ]
                },
                {
                  name: "documentation",
                  type: "folder",
                  children: [
                    { name: "page.tsx", type: "file" },
                    {
                      name: "layout",
                      type: "folder",
                      children: [{ name: "[slug]", type: "dynamic", children: [{ name: "page.tsx", type: "file" }] }]
                    }
                  ]
                }
              ]
            },
            { name: "terms-of-service", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
            { name: "layout.tsx", type: "file", description: "Root HTML & global providers" },
            { name: "globals.css", type: "file" }
          ]
        },
        { name: "components", type: "folder" },
        { name: "modules", type: "folder" }
      ]
    },
    { name: "next.config.ts", type: "file", description: "Framework orchestration" },
    { name: "tsconfig.json", type: "file", description: "Typescript build rules" },
    { name: "tailwind.config.ts", type: "file", description: "Branding tokens" }
  ]

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Section */}
      <div className="space-y-4">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Architectural structure</h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed max-w-3xl">
          Recura utilizes the Next.js App Router for highly modular, nested routing, leveraging <code className="text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 px-2 py-0.5 rounded-lg text-sm">Server Components</code> to optimize performance.
        </p>
      </div>

      {/* 2. Project Tree Section */}
      <section className="space-y-8">
        <div className="bg-white dark:bg-[#150a2e] rounded-[3rem] border border-slate-100 dark:border-white/10 overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none relative">
          <div className="px-6 py-8 md:px-10 md:py-10 border-b border-slate-100 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/30 dark:bg-white/[0.02]">
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Project filesystem</h4>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider">Live architectural tree of the platform</p>
            </div>
            <button 
              onClick={handleCopy}
              className="shrink-0 flex items-center justify-center gap-1.5 px-6 py-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-600 dark:hover:border-purple-500 transition-all text-xs font-bold shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Tree Copied" : "Copy Path Structure"}
            </button>
          </div>
          
          <div className="p-4 md:p-8">
             <div className="p-6 md:p-10 rounded-[2rem] bg-slate-50/50 dark:bg-[#0D0518]/50 border border-slate-100 dark:border-white/5">
                {projectTree.map((item, i) => (
                  <TreeItem key={i} {...item} />
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 3. Routing Manifest */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center shadow-xl shadow-purple-600/20">
              <Globe className="w-6 h-6 text-white" />
           </div>
           <div className="space-y-1">
             <h4 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Routing manifest</h4>
             <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Public and internal route map</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { path: "/", title: "Public Front", desc: "Landing & Marketing", color: "purple" },
             { path: "/auth", title: "Identity", desc: "Sign-in / Sign-up", color: "blue" },
             { path: "/dashboard", title: "Enterprise", desc: "Main product hub", color: "emerald" },
             { path: "/settings", title: "Configuration", desc: "Preferences engine", color: "rose" }
           ].map((route, i) => (
             <div key={i} className="group p-8 rounded-3xl bg-white dark:bg-[#150a2e] border border-slate-100 dark:border-white/10 hover:shadow-xl transition-all hover:translate-y-[-4px] overflow-hidden relative">
                <div className={cn(
                  "absolute top-0 right-0 w-24 h-24 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity",
                  route.color === 'purple' && "bg-purple-600",
                  route.color === 'blue' && "bg-blue-600",
                  route.color === 'emerald' && "bg-emerald-600",
                  route.color === 'rose' && "bg-rose-600"
                )} />
                <code className="text-[10px] font-black text-slate-400 group-hover:text-purple-500 transition-colors block mb-4 tracking-widest">{route.path}</code>
                <h5 className="text-lg font-black text-slate-900 dark:text-white tracking-tight mb-1">{route.title}</h5>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{route.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* 4. Technical Blueprint */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shadow-xl shadow-slate-900/10">
              <Settings className="w-6 h-6 text-blue-400" />
           </div>
           <div className="space-y-1">
             <h4 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Technical blueprint</h4>
             <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Core framework configurations</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { 
               file: "next.config.ts", 
               title: "Framework Control", 
               icon: Rocket,
               desc: "Defines asset optimization, image loaders, and server-side headers for the platform."
             },
             { 
               file: "tsconfig.json", 
               title: "Type Safety", 
               icon: Shield,
               desc: "Orchestrates path aliases (@/*) and ensures strict type checking across the module system."
             },
             { 
               file: "package.json", 
               title: "Dependency Graph", 
               icon: FileJson,
               desc: "Manages all third-party libraries, from React 19 to the documentation's Lucide icon set."
             }
           ].map((config, i) => (
             <div key={i} className="p-10 rounded-[2.5rem] bg-indigo-50 dark:bg-white/[0.02] border border-indigo-100/50 dark:border-white/5 space-y-4 shadow-sm hover:shadow-lg hover:border-blue-200/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center shadow-md">
                   <config.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="space-y-2">
                   <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{config.file}</span>
                   <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">{config.title}</h4>
                   <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed tracking-tight">{config.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* 5. Pattern Documentation */}
      <div className="p-8 md:p-12 rounded-[3.5rem] bg-slate-900 border border-white/10 shadow-2xl overflow-hidden relative group">
         <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 blur-[120px] -mr-48 -mt-48" />
         <div className="flex flex-col lg:flex-row lg:items-center gap-12 relative z-10">
            <div className="lg:w-1/2 space-y-6">
               <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center shadow-xl border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  <Monitor className="w-8 h-8 text-purple-400" />
               </div>
               <div className="space-y-4">
                  <h4 className="text-3xl font-black text-white tracking-tighter leading-none">App-centric routing</h4>
                  <p className="text-lg font-medium text-slate-400 leading-relaxed">
                    By leveraging <code className="bg-white/10 px-2 rounded text-purple-400">Layout Overlays</code>, Recura provides instant transitions between platform segments without reloading shared navigational states.
                  </p>
               </div>
               <div className="flex flex-wrap gap-4 pt-4">
                  {['Route Groups', 'Dynamic Segments', 'Client Components', 'Parallel Routes'].map((tag) => (
                    <span key={tag} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                       {tag}
                    </span>
                  ))}
               </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { title: "Groups", char: "( )", desc: "Organize folders without affecting URLs" },
                 { title: "Dynamics", char: "[ ]", desc: "Handle user-specific data segments" },
                 { title: "Shared", char: "layout", desc: "Maintain state across navigations" },
                 { title: "Endpoints", char: "page", desc: "Terminal visual entry points" }
               ].map((pattern, i) => (
                 <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors group/card">
                    <span className="text-2xl font-black text-purple-400/50 mb-2 block font-mono">{pattern.char}</span>
                    <h6 className="text-sm font-bold text-white mb-1">{pattern.title}</h6>
                    <p className="text-xs text-slate-500 font-medium leading-tight">{pattern.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  )
}
