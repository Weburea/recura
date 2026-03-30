"use client"

import * as React from "react"
import { DocContent } from "@/modules/documentation/components/DocContent"
import { 
  Search, 
  Copy, 
  Check, 
  Home, 
  Settings, 
  Users, 
  Bell, 
  Mail, 
  Calendar, 
  Folder, 
  File, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Minus, 
  Info, 
  AlertTriangle, 
  HelpCircle,
  ChevronRight, 
  ChevronLeft, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  ArrowLeft, 
  ExternalLink, 
  Menu, 
  MoreVertical, 
  MoreHorizontal,
  BarChart3, 
  PieChart, 
  LineChart, 
  Activity, 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Wallet, 
  CreditCard, 
  DollarSign,
  Layout as LayoutIcon, 
  Sidebar as SidebarIcon, 
  Columns, 
  Grid, 
  Maximize2, 
  Minimize2, 
  Layers, 
  Box, 
  Monitor, 
  Tablet, 
  Smartphone,
  Lock, 
  Unlock, 
  Shield, 
  ShieldCheck, 
  Key, 
  Eye, 
  EyeOff, 
  Fingerprint, 
  UserCheck,
  MessageSquare, 
  Phone, 
  Send, 
  Share2, 
  Link as LinkIcon, 
  Globe,
  Rocket,
  Compass,
  Code2,
  Square,
  MousePointer2,
  SquareStack,
  Palette,
  Briefcase,
  Star,
  Cloud,
  Cpu,
  Database,
  Terminal,
  Hash,
  Filter,
  Image as ImageIcon,
  Video,
  Music,
  Map,
  Navigation,
  Clock,
  Watch,
  Timer
} from "lucide-react"
import { cn } from "@/lib/utils"

const ICON_CATEGORIES = [
  {
    name: "Essentials",
    icons: [
      { name: "Home", icon: Home },
      { name: "Settings", icon: Settings },
      { name: "Users", icon: Users },
      { name: "Bell", icon: Bell },
      { name: "Search", icon: Search },
      { name: "Mail", icon: Mail },
      { name: "Calendar", icon: Calendar },
      { name: "Folder", icon: Folder },
      { name: "File", icon: File },
      { name: "Trash2", icon: Trash2 },
      { name: "Edit3", icon: Edit3 },
      { name: "CheckCircle2", icon: CheckCircle2 },
      { name: "XCircle", icon: XCircle },
      { name: "Plus", icon: Plus },
      { name: "Minus", icon: Minus },
      { name: "Info", icon: Info },
      { name: "AlertTriangle", icon: AlertTriangle },
      { name: "HelpCircle", icon: HelpCircle }
    ]
  },
  {
    name: "Navigation",
    icons: [
      { name: "ChevronRight", icon: ChevronRight },
      { name: "ChevronLeft", icon: ChevronLeft },
      { name: "ChevronDown", icon: ChevronDown },
      { name: "ChevronUp", icon: ChevronUp },
      { name: "ArrowRight", icon: ArrowRight },
      { name: "ArrowLeft", icon: ArrowLeft },
      { name: "ExternalLink", icon: ExternalLink },
      { name: "Menu", icon: Menu },
      { name: "MoreVertical", icon: MoreVertical },
      { name: "MoreHorizontal", icon: MoreHorizontal },
      { name: "Rocket", icon: Rocket },
      { name: "Compass", icon: Compass }
    ]
  },
  {
    name: "Data & Stats",
    icons: [
      { name: "BarChart3", icon: BarChart3 },
      { name: "PieChart", icon: PieChart },
      { name: "LineChart", icon: LineChart },
      { name: "Activity", icon: Activity },
      { name: "Zap", icon: Zap },
      { name: "TrendingUp", icon: TrendingUp },
      { name: "TrendingDown", icon: TrendingDown },
      { name: "Target", icon: Target },
      { name: "Wallet", icon: Wallet },
      { name: "CreditCard", icon: CreditCard },
      { name: "DollarSign", icon: DollarSign },
      { name: "Database", icon: Database }
    ]
  },
  {
    name: "Layout & Device",
    icons: [
      { name: "Layout", icon: LayoutIcon },
      { name: "Sidebar", icon: SidebarIcon },
      { name: "Columns", icon: Columns },
      { name: "Grid", icon: Grid },
      { name: "Maximize2", icon: Maximize2 },
      { name: "Minimize2", icon: Minimize2 },
      { name: "Layers", icon: Layers },
      { name: "Box", icon: Box },
      { name: "Monitor", icon: Monitor },
      { name: "Tablet", icon: Tablet },
      { name: "Smartphone", icon: Smartphone },
      { name: "Cpu", icon: Cpu }
    ]
  },
  {
    name: "Security",
    icons: [
      { name: "Lock", icon: Lock },
      { name: "Unlock", icon: Unlock },
      { name: "Shield", icon: Shield },
      { name: "ShieldCheck", icon: ShieldCheck },
      { name: "Key", icon: Key },
      { name: "Eye", icon: Eye },
      { name: "EyeOff", icon: EyeOff },
      { name: "Fingerprint", icon: Fingerprint },
      { name: "UserCheck", icon: UserCheck }
    ]
  },
  {
    name: "Media & Web",
    icons: [
      { name: "MessageSquare", icon: MessageSquare },
      { name: "Phone", icon: Phone },
      { name: "Send", icon: Send },
      { name: "Share2", icon: Share2 },
      { name: "Link", icon: LinkIcon },
      { name: "Globe", icon: Globe },
      { name: "Image", icon: ImageIcon },
      { name: "Video", icon: Video },
      { name: "Music", icon: Music },
      { name: "Map", icon: Map },
      { name: "Navigation", icon: Navigation },
      { name: "Cloud", icon: Cloud }
    ]
  },
  {
    name: "Development",
    icons: [
      { name: "Briefcase", icon: Briefcase },
      { name: "Code2", icon: Code2 },
      { name: "Terminal", icon: Terminal },
      { name: "Hash", icon: Hash },
      { name: "Filter", icon: Filter },
      { name: "Palette", icon: Palette },
      { name: "Square", icon: Square },
      { name: "MousePointer2", icon: MousePointer2 },
      { name: "SquareStack", icon: SquareStack }
    ]
  },
  {
    name: "Time",
    icons: [
      { name: "Clock", icon: Clock },
      { name: "Watch", icon: Watch },
      { name: "Timer", icon: Timer }
    ]
  }
]

export default function IconsDocPage() {
  const [search, setSearch] = React.useState("")
  const [copiedIcon, setCopiedIcon] = React.useState<string | null>(null)

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(`<${name} className="w-5 h-5" />`)
    setCopiedIcon(name)
    setTimeout(() => setCopiedIcon(null), 2000)
  }

  const filteredCategories = ICON_CATEGORIES.map(cat => ({
    ...cat,
    icons: cat.icons.filter(i => 
      i.name.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.icons.length > 0)

  return (
    <DocContent 
      title="Icons Registry" 
      description="Recura utilizes the Lucide React library for its complete iconography. Browse the enterprise-curated set below."
    >
      {/* 1. Interactive Search Header */}
      <div className="relative p-10 md:p-14 rounded-[3rem] bg-slate-900 border border-white/10 overflow-hidden mb-12 group">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[130px] rounded-full -mr-32 -mt-32" />
         <div className="relative z-10 space-y-8">
            <div className="max-w-xl space-y-4">
               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest">
                  <Star className="w-3.5 h-3.5" />
                  <span>Curated Registry</span>
               </div>
               <h2 className="text-4xl font-black text-white tracking-tighter leading-none">Universal Icon set</h2>
               <p className="text-lg font-medium text-slate-400 leading-relaxed">
                  Search and browse or click any icon to copy its React component implementation.
               </p>
            </div>

            <div className="relative max-w-2xl">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
               <input 
                  type="text" 
                  placeholder="Search icons (e.g. 'home', 'user', 'arrow')..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 pl-16 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all font-medium placeholder:text-slate-600"
               />
               <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total: 100+</span>
               </div>
            </div>
         </div>
      </div>

      {/* 2. Categorized Icons Grid */}
      <div className="space-y-20 pb-20">
         {filteredCategories.map((category) => (
            <div key={category.name} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase px-2 bg-slate-50 dark:bg-white/5 rounded-lg py-1">{category.name}</h3>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{category.icons.length} Icons</span>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {category.icons.map((item) => (
                    <button 
                      key={item.name}
                      onClick={() => handleCopy(item.name)}
                      className={cn(
                        "group relative flex flex-col items-center justify-center p-8 rounded-[2.5rem] bg-white dark:bg-[#150a2e] border border-slate-100 dark:border-white/10 transition-all hover:scale-[1.05] hover:shadow-2xl hover:border-purple-600/40 cursor-pointer overflow-hidden",
                        copiedIcon === item.name && "border-emerald-500/50 bg-emerald-500/5 dark:bg-emerald-500/10"
                      )}
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors",
                        copiedIcon === item.name ? "bg-emerald-500 text-white" : "bg-slate-50 dark:bg-white/5 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400"
                      )}>
                        {copiedIcon === item.name ? <Check className="w-6 h-6 animate-in zoom-in duration-300" /> : <item.icon className="w-6 h-6" />}
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 truncate w-full text-center tracking-tight">
                        {item.name}
                      </span>

                      {/* Tooltip on Hover */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-purple-600 text-white opacity-0 group-hover:opacity-100 transition-opacity p-2">
                         <Copy className="w-5 h-5 mb-2" />
                         <span className="text-[10px] font-black uppercase tracking-widest">Copy JSX</span>
                      </div>
                    </button>
                  ))}
               </div>
            </div>
         ))}

         {filteredCategories.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
               <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4">
                  <Search className="w-10 h-10 text-slate-300" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">No icons found</h3>
               <p className="text-slate-500 max-w-sm">Try searching for generic terms like &quot;arrow&quot; or &quot;user&quot; to see available options.</p>
               <button 
                  onClick={() => setSearch("")}
                  className="px-6 py-3 rounded-2xl bg-purple-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-purple-700 transition-colors"
               >
                  Clear Search
               </button>
            </div>
         )}
      </div>

      {/* 3. Integration Tip */}
      <div className="p-12 rounded-[3.5rem] bg-gradient-to-br from-indigo-600 to-purple-800 text-white shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
         <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-12">
            <div className="lg:w-2/3 space-y-6">
               <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-500">
                  <Zap className="w-8 h-8" />
               </div>
               <div className="space-y-4">
                  <h3 className="text-3xl font-black tracking-tighter leading-none">Global availability</h3>
                  <p className="text-lg font-medium text-purple-100 leading-relaxed">
                    All icons are dynamically imported from <code className="bg-white/10 px-2 rounded">lucide-react</code>. They support standard Tailwind sizing and coloring out of the box.
                  </p>
               </div>
            </div>
            <div className="lg:w-1/3 p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 space-y-4">
               <div className="text-[10px] font-black uppercase tracking-widest text-purple-200">Installation</div>
               <pre className="text-xs font-mono text-white/80">npm install lucide-react</pre>
               <div className="text-[10px] font-black uppercase tracking-widest text-purple-200 pt-2 border-t border-white/5">Implementation</div>
               <pre className="text-xs font-mono text-blue-300">import &#123; iconName &#125; from &apos;lucide-react&apos;;</pre>
            </div>
         </div>
      </div>
    </DocContent>
  )
}
