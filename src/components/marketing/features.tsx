import { Layers, Shield, Zap, Globe, BarChart3, Users } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Gain instant insights into your business performance with our advanced dashboard and reporting tools.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Your data is protected by enterprise-level encryption and compliance with international security standards.",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    icon: Globe,
    title: "Global Payments",
    description: "Accept payments from anywhere in the world with support for 135+ currencies and local payment methods.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: Zap,
    title: "Smart Automation",
    description: "Automate repetitive tasks like invoicing, reminders, and reconciliation to save hours every week.",
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    icon: Layers,
    title: "Seamless Integration",
    description: "Connect with your favorite tools including Slack, QuickBooks, Salesforce, and 50+ other integrations.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Invite your team, set permissions, and collaborate on financial data in real-time without friction.",
    gradient: "from-indigo-500 to-purple-500"
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-dark relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Everything you need to <span className="text-gradient">scale faster</span>
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            A comprehensive suite of tools designed to help you manage every aspect of your business finances from a single, intuitive platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              
              <p className="text-muted leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500 rounded-2xl`} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
