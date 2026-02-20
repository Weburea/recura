import React from "react";
import Image from "next/image";

const Integration = () => {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-white">
      {/* Background Gradient / Glow - Adjusted for light theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-200/40 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="section-title mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Streamline Operations And Experience
            </span>
            <br />
            <span className="text-slate-900">The Benefits Of Recura Workflow</span>
          </h2>
          <p className="section-description text-gray-600 mb-8">
            Connect effortlessly with the Recura Ecosystem and other external
            apps, streamlining your workflows and unlocking endless possibilities
            for your billing processes.
          </p>
          <h3 className="text-2xl font-semibold text-[#a855f7]">
            Explore Our Integrations
          </h3>
        </div>

        {/* Desktop Arc Visualization */}
        <div className="hidden lg:block relative h-[600px] w-full max-w-[1400px] mx-auto">
          {/* Main Container for Arc */}
          <div className="relative w-full h-full">
            
            {/* --- Left Wing --- */}
            
            {/* Stripe (Top Left) */}
            <div className="absolute top-0 left-0 hover:scale-110 transition-transform duration-300 z-20 flex flex-col items-center gap-3">
              <Image
                src="/images/landing/integration/Group 1000001628.png"
                alt="Stripe"
                width={90}
                height={90}
                className="relative z-10 drop-shadow-[0_0_15px_rgba(99,91,255,0.5)]"
              />
              <span className="text-gray-500 font-medium text-sm whitespace-nowrap">Payment Sync</span>
            </div>

            {/* GitHub (Mid-High Left) */}
            <div className="absolute top-[140px] left-[11%] hover:scale-110 transition-transform duration-300 z-20 flex flex-col items-center gap-3">
              <Image
                src="/images/landing/integration/Group 1000001627.png"
                alt="GitHub"
                width={90}
                height={90}
                 className="relative z-10 drop-shadow-[0_0_15px_rgba(0,0,0,0.2)]"
              />
              <span className="text-gray-500 font-medium text-sm whitespace-nowrap">Code Tracking</span>
            </div>

            {/* Jira (Mid-Low Left) */}
            <div className="absolute top-[280px] left-[24%] hover:scale-110 transition-transform duration-300 z-20 flex flex-col items-center gap-3">
              <Image
                src="/images/landing/integration/Group 1000001626.png"
                alt="Jira"
                width={90}
                height={90}
                 className="relative z-10 drop-shadow-[0_0_15px_rgba(38,132,255,0.5)]"
              />
              <span className="text-gray-500 font-medium text-sm whitespace-nowrap">Task Sync</span>
            </div>

            {/* Monday (Low Left) */}
            <div className="absolute top-[420px] left-[33%] hover:scale-110 transition-transform duration-300 z-20 flex flex-col items-center gap-3">
              <Image
                src="/images/landing/integration/Group 1000001625.png"
                alt="Monday"
                width={90}
                height={90}
                 className="relative z-10 drop-shadow-[0_0_15px_rgba(255,204,0,0.4)]"
              />
              <span className="text-gray-500 font-medium text-sm whitespace-nowrap">Data Insights</span>
            </div>

            {/* --- Center Hub --- */}
            
            {/* Recura Logo (Center Bottom) */}
            <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 z-30 hover:scale-105 transition-transform duration-500">
              <div className="relative w-40 h-40 bg-gray-900 rounded-full flex items-center justify-center border-4 border-purple-100 shadow-[0_0_50px_rgba(168,85,247,0.3)]">
                 <Image
                    src="/images/landing/integration/Group 1000001633.png"
                    alt="Recura"
                    width={80}
                    height={80}
                    className="w-45 h-auto"
                 />
              </div>
            </div>


            {/* --- Right Wing --- */}

            {/* Red/Gold (Low Right) - "Customer Support" */}
            <div className="absolute top-[420px] right-[33%] hover:scale-110 transition-transform duration-300 z-20 flex flex-col items-center gap-3">
              <Image
                src="/images/landing/integration/Group 1000001643.png"
                alt="Customer Support"
                width={90}
                height={90}
                 className="relative z-10 drop-shadow-[0_0_15px_rgba(255,99,71,0.4)]"
              />
              <span className="text-gray-500 font-medium text-sm whitespace-nowrap">Customer Support</span>
            </div>

            {/* Slack (Mid-Low Right) - "Workflow Sync" */}
            <div className="absolute top-[280px] right-[24%] hover:scale-110 transition-transform duration-300 z-20 flex flex-col items-center gap-3">
              <Image
                src="/images/landing/integration/Group 1000001620.png"
                alt="Slack"
                width={90}
                height={90}
                 className="relative z-10 drop-shadow-[0_0_15px_rgba(74,21,75,0.5)]"
              />
              <span className="text-gray-500 font-medium text-sm whitespace-nowrap">Workflow Sync</span>
            </div>

            {/* OpenAI (Mid-High Right) - "Smart Automation" */}
            <div className="absolute top-[140px] right-[12%] hover:scale-110 transition-transform duration-300 z-20 flex flex-col items-center gap-3">
              <Image
                src="/images/landing/integration/Group 1000001622.png"
                alt="OpenAI"
                width={90}
                height={90}
                 className="relative z-10 drop-shadow-[0_0_15px_rgba(16,163,127,0.4)]"
              />
              <span className="text-gray-500 font-medium text-sm whitespace-nowrap">Smart Automation</span>
            </div>

            {/* Trello (Top Right) - "Instant Alerts" */}
            <div className="absolute top-0 right-0 hover:scale-110 transition-transform duration-300 z-20 flex flex-col items-center gap-3">
              <Image
                src="/images/landing/integration/Group 1000001624.png"
                alt="Trello"
                width={90}
                height={90}
                 className="relative z-10 drop-shadow-[0_0_15px_rgba(0,121,191,0.5)]"
              />
              <span className="text-gray-500 font-medium text-sm whitespace-nowrap">Instant Alerts</span>
            </div>

          </div>
        </div>

        {/* Mobile Grid Layout */}
        <div className="lg:hidden grid grid-cols-2 gap-6 place-items-center">
            {/* Items */}
            <MobileIntegrationItem icon="/images/landing/integration/Group 1000001628.png" label="Payment Sync" />
            <MobileIntegrationItem icon="/images/landing/integration/Group 1000001627.png" label="Code Tracking" />
            <MobileIntegrationItem icon="/images/landing/integration/Group 1000001626.png" label="Task Sync" />
            <MobileIntegrationItem icon="/images/landing/integration/Group 1000001625.png" label="Data Insights" />
            
            <div className="col-span-2 my-8">
                <div className="w-24 h-24 bg-dark erounded-full flex items-center justify-center border-4 border-purple-100 shadow-[0_0_30px_rgba(168,85,247,0.2)] mx-auto">
                    <Image src="/images/landing/integration/Group 1000001633.png" alt="Recura" width={50} height={50} className="w-12 h-auto" />
                </div>
            </div>

            <MobileIntegrationItem icon="/images/landing/integration/Group 1000001643.png" label="Customer Support" />
            <MobileIntegrationItem icon="/images/landing/integration/Group 1000001620.png" label="Workflow Sync" />
            <MobileIntegrationItem icon="/images/landing/integration/Group 1000001622.png" label="Smart Automation" />
            <MobileIntegrationItem icon="/images/landing/integration/Group 1000001624.png" label="Instant Alerts" />
        </div>
      </div>
    </section>
  );
};

const MobileIntegrationItem = ({ icon, label }: { icon: string; label: string }) => (
  <div className="flex flex-col items-center gap-2 group">
    <div className="w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-lg group-hover:border-purple-500/50 transition-colors">
      <Image src={icon} alt={label} width={40} height={40} className="w-10 h-10 object-contain" />
    </div>
    <span className="text-sm text-gray-600 font-medium">{label}</span>
  </div>
);

export default Integration;
