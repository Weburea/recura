import { DocContent } from "@/modules/documentation/components/DocContent"
import { ComponentPreview } from "@/modules/documentation/components/ComponentPreview"
import { Terminal, Code, Sparkles, Rocket } from "lucide-react"

export default function GettingStartedDoc() {
  return (
    <DocContent 
      title="Getting Started" 
      description="Learn how to integrate Recura&apos;s design system into your development workflow."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Rocket, title: "Installation", desc: "Install our core package and its dependencies via npm or yarn." },
          { icon: Sparkles, title: "Configuration", desc: "Set up your Tailwind config and theme provider for full dark mode support." },
          { icon: Code, title: "Usage", desc: "Start importing components and building beautiful dashboard layouts." }
        ].map((item) => (
          <div key={item.title} className="p-8 rounded-3xl bg-white dark:bg-[#150a2e] border border-gray-100 dark:border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center text-purple-600">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Quick Setup</h2>
        <ComponentPreview
          title="Terminal Installation"
          description="Run the following command in your terminal to get started."
          code={`npm install @recura/ui lucide-react clsx tailwind-merge`}
        >
          <div className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-900 text-white font-mono text-sm">
            <Terminal className="w-4 h-4 text-purple-400" />
            <span>npm install @recura/ui lucide-react</span>
          </div>
        </ComponentPreview>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Basic Usage</h2>
        <ComponentPreview
          description="Import and use components directly in your React pages."
          code={`import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <Button variant="primary">
      Hello Recura
    </Button>
  )
}`}
        >
          <div className="p-8 rounded-2xl bg-white dark:bg-white/5 border border-dashed border-gray-300 dark:border-white/10 text-center">
            <p className="text-slate-400 text-sm font-medium mb-4 italic">Component preview will appear here</p>
            <button className="bg-purple-600 text-white font-bold px-6 py-2.5 rounded-xl">Hello Recura</button>
          </div>
        </ComponentPreview>
      </section>
    </DocContent>
  )
}
