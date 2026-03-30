import { DocContent } from "@/modules/documentation/components/DocContent"
import { ComponentPreview } from "@/modules/documentation/components/ComponentPreview"
import { Terminal, Code, Rocket, FileText, Cpu, Zap, Palette, CreditCard, PieChart, Download, Settings, Cloud, Lightbulb } from "lucide-react"

export default function InstallationGuideDoc() {
  return (
    <DocContent 
      title="Installation Guide" 
      description="Everything you need to know about getting Recura up and running on your local machine and preparing for production."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Cpu, title: "Node.js", desc: "Version 18 or higher is required for optimal performance and compatibility." },
          { icon: Zap, title: "Next.js 16", desc: "Leveraging the latest App Router features for speed and scalability." },
          { icon: Palette, title: "Tailwind CSS 4", desc: "Modern, utility-first styling system for rapid UI development." }
        ].map((item) => (
          <div key={item.title} className="p-6 rounded-3xl bg-white dark:bg-[#150a2e] border border-gray-100 dark:border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center text-purple-600">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <section className="space-y-6 pt-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
          <Download className="w-6 h-6 text-purple-500" />
        Getting Started
        </h2>
        
        <div className="space-y-4">
          <div className="p-6 rounded-2xl border border-gray-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Step 1 — Extract Files</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">After purchase, unzip the project folder to your desired location.</p>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 text-white font-mono text-xs w-fit">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>recura.zip → recura/</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-gray-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Step 2 — Open Project</h3>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 text-white font-mono text-xs w-fit">
              <Terminal className="w-4 h-4 text-green-400" />
              <span>cd recura</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-gray-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Step 3 — Install Dependencies</h3>
            <ComponentPreview
              code="npm install"
              description="Install all required packages from package.json."
            >
              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 text-white font-mono text-sm">
                <Terminal className="w-4 h-4 text-purple-400" />
                <span>npm install</span>
              </div>
            </ComponentPreview>
          </div>

          <div className="p-6 rounded-2xl border border-gray-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Step 4 — Run Development Server</h3>
            <ComponentPreview
              code="npm run dev"
              description="Start the local development server at http://localhost:4000."
            >
              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 text-white font-mono text-sm">
                <Terminal className="w-4 h-4 text-purple-400" />
                <span>npm run dev</span>
              </div>
            </ComponentPreview>
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
          <Rocket className="w-6 h-6 text-orange-500" />
          Production Build
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl border border-gray-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Build Application</h3>
            <div className="p-3 rounded-xl bg-slate-900 text-white font-mono text-xs flex items-center gap-2">
              <span className="text-purple-400">$</span> npm run build
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-gray-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Start Production</h3>
            <div className="p-3 rounded-xl bg-slate-900 text-white font-mono text-xs flex items-center gap-2">
              <span className="text-purple-400">$</span> npm start
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
          <Settings className="w-6 h-6 text-blue-500" />
          Environment Setup
        </h2>
        <div className="p-8 rounded-[2.5rem] border border-indigo-100 dark:border-white/5 bg-indigo-50/30 dark:bg-white/[0.02] space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-[10px] mb-1">Architecture Note</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Create a <code className="px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 font-bold">.env.local</code> file in your root based on the provided template to enable secure API synchronization.</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-sm space-y-1">
            <p className="text-slate-400"># Application</p>
            <p>NEXT_PUBLIC_APP_NAME=Recura</p>
            <p>NEXT_PUBLIC_API_URL=http://localhost:4000/api</p>
            <p className="pt-2 text-slate-400"># Payments (Optional)</p>
            <p>STRIPE_KEY=your_key_here</p>
            <p>PAYSTACK_KEY=your_key_here</p>
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
          <Code className="w-6 h-6 text-emerald-500" />
          Project Structure
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[
              { path: "src/app/", desc: "Next.js App Router & Routes" },
              { path: "src/components/", desc: "Global reusable UI components" },
              { path: "src/modules/", desc: "Feature-based scalable modules" },
              { path: "src/lib/", desc: "Helpers, utilities & configs" },
              { path: "src/styles/", desc: "Tailwind & global CSS styles" }
            ].map((item) => (
              <div key={item.path} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/5">
                <code className="text-purple-600 dark:text-purple-400 font-bold text-sm">{item.path}</code>
                <span className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</span>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-3xl bg-slate-900 text-slate-300 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Code className="w-24 h-24" />
            </div>
            <pre className="relative z-10">
{`recura/
├── src/
│   ├── app/
│   ├── components/
│   ├── modules/
│   ├── lib/
│   └── styles/
├── public/
├── .env.example
├── README.md
└── package.json`}
            </pre>
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Features Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Palette, title: "Styling System", desc: "Tailwind CSS 4 + Utility-first approach." },
            { icon: CreditCard, title: "Payment Ready", desc: "Stripe and Paystack integrations built-in." },
            { icon: PieChart, title: "Analytics", desc: "Powered by Recharts for data visualization." },
            { icon: Cloud, title: "Deployment", desc: "Vercel, Netlify, or any Node.js server." }
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-purple-500/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center text-purple-600">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 p-8 rounded-[2.5rem] bg-gradient-to-br from-purple-600 to-indigo-700 text-white space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Who is Recura for?</h2>
        </div>
        <p className="text-purple-100 font-medium leading-relaxed">
          Designed for SaaS founders, agencies, and developers who want to skip the boring boilerplate and focus on building their product.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          {["SaaS Platforms", "Agencies", "Startups", "Developers"].map((item) => (
            <div key={item} className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-center text-sm font-bold">
              {item}
            </div>
          ))}
        </div>
      </section>
    </DocContent>
  )
}
