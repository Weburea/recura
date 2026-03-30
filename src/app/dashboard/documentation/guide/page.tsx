import { DocContent } from "@/modules/documentation/components/DocContent"
import { Button } from "@/components/ui/button"
import { 
  Terminal, 
  Code2, 
  Cpu, 
  Key, 
  Copy,
  ChevronRight,
  Sparkles,
  ArrowRight
} from "lucide-react"

export default function DeveloperGuide() {
  return (
    <DocContent 
      title="Developer Guide" 
      description="In-depth technical guide for integrating and extending the Recura platform."
    >
      <div className="space-y-12 pb-16">
        {/* Intro Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Cpu className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">System Architecture</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-6">
            Recura is built on a modular architecture designed for high performance and strict type safety. We use Next.js 15+ for the frontend and a robust backend API for data persistence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Frontend Stack</h3>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Next.js (App Router)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Tailwind CSS v4
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Framer Motion for animations
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Backend Tech</h3>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  RESTful API Design
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  JWT Authentication
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  PostgreSQL Persistence
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Authentication Section */}
        <section className="bg-white dark:bg-[#150a2e] p-8 rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
              <Key className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Authentication</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-6">
            All API requests must include a Bearer token in the Authorization header. You can generate API keys from the <span className="text-purple-600 dark:text-purple-400 font-bold">Settings &gt; Security</span> page.
          </p>
          <div className="bg-[#0f0720] rounded-xl p-5 border border-white/10 relative group">
            <button className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all opacity-0 group-hover:opacity-100">
              <Copy className="w-4 h-4" />
            </button>
            <pre className="text-xs md:text-sm font-mono text-purple-300 overflow-x-auto leading-relaxed">
{`curl -X GET "https://api.recura.io/v1/user" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
            </pre>
          </div>
        </section>

        {/* Integration Patterns */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20">
              <Sparkles className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Integration Patterns</h2>
          </div>
          <div className="space-y-4">
            {[
              { title: "Webhook Events", desc: "Listen for real-time updates on payments, subscriptions, and team changes.", icon: Terminal },
              { title: "SDK Usage", desc: "Use our official React SDK to accelerate your frontend development.", icon: Code2 },
              { title: "Custom Modules", desc: "Extend the dashboard by injecting custom modules into the layout.", icon: ChevronRight }
            ].map((pattern) => (
              <div key={pattern.title} className="flex items-center gap-6 p-6 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer group border border-transparent hover:border-slate-100 dark:hover:border-white/10">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center shadow-sm border border-slate-100 dark:border-white/10 group-hover:scale-110 transition-transform">
                  <pattern.icon className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-white">{pattern.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{pattern.desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </section>

        {/* Support CTA */}
        <section className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-10 text-white text-center shadow-xl shadow-purple-500/20">
          <h2 className="text-3xl font-black mb-4 tracking-tight">Need technical support?</h2>
          <p className="text-purple-100 font-medium mb-8 max-w-lg mx-auto leading-relaxed">
            Our engineering team is available for deep-dive technical sessions to help you get the most out of Recura.
          </p>
          <Button className="bg-white text-purple-600 hover:bg-slate-50 font-black px-8 py-6 rounded-2xl shadow-xl transition-all border-none">
            Contact Engineering
          </Button>
        </section>
      </div>
    </DocContent>
  )
}
