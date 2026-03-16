"use client"

import { useState } from "react"
import { Search, MessageCircle, PhoneCall, Mail, ChevronDown, FileText, PlayCircle, BookOpen, ExternalLink, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { LiveChatWidget } from "./live-chat-widget"

export function HelpCenterContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const faqs = [
    {
      question: "How do I invite team members to my workspace?",
      answer: "You can invite team members by navigating to Settings > Team. Click the 'Invite Member' button in the top right, enter their email address, and assign them a role. They will receive an email invitation to join your workspace."
    },
    {
      question: "Where can I find my API keys?",
      answer: "API keys are located in Settings > Developer > API Access. We recommend creating separate API keys for your development and production environments. Never share your secret keys publicly."
    },
    {
      question: "How do I upgrade my billing plan?",
      answer: "Go to Settings > Billing and click 'Manage Subscription'. You can compare plans, select the one that fits your needs, and update your payment method directly from that page."
    },
    {
      question: "Can I customize the checkout experience for my customers?",
      answer: "Yes. Navigate to Settings > Branding to upload your logo, choose brand colors, and customize the checkout page appearance to match your company's aesthetic perfectly."
    },
    {
      question: "How do I export my customer data?",
      answer: "In the Customers tab, click the 'Export' button in the top right corner of the table. You can choose to export all records or filter them first, and select CSV or Excel format."
    }
  ]

  const resources = [
    { title: "Getting Started Guide", icon: BookOpen, desc: "Everything you need to set up your account.", link: "#" },
    { title: "Video Tutorials", icon: PlayCircle, desc: "Step-by-step visual walkthroughs.", link: "#" },
    { title: "API Reference", icon: FileText, desc: "Detailed documentation for developers.", link: "#" },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header Section */}
      <div className="relative overflow-hidden bg-white dark:bg-[#150a2e] border border-slate-100 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-sm text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 opacity-60" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2 opacity-60" />
        
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-100/50 mb-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-xs font-bold text-purple-700 tracking-wide uppercase">Support Center</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How can we help you today?
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto font-medium">
            Search our knowledge base or browse categories below to find exactly what you need.
          </p>

          <div className="relative max-w-xl mx-auto mt-8">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for articles, guides, or questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-medium text-slate-900 dark:text-white shadow-xl shadow-slate-200/20 dark:shadow-none text-base"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-bold transition-colors shadow-sm">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Contact & Resources */}
        <div className="space-y-8">
          
          {/* Contact Options */}
          <div className="bg-white dark:bg-[#150a2e] p-6 rounded-3xl border border-slate-100 dark:border-white/10 shadow-sm relative overflow-hidden group hover:border-purple-100 dark:hover:border-purple-500/30 transition-colors">
             <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-2xl -z-10 translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-150 duration-500 opacity-60 dark:opacity-20" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 tracking-tight">
              Need immediate help?
            </h3>
            
            <div className="space-y-4">
              <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="w-full flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-slate-100 dark:border-white/5 hover:border-purple-200 dark:hover:border-purple-500/30 hover:shadow-md transition-all group/card text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 group-hover/card:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover/card:text-purple-600 dark:group-hover/card:text-purple-400 transition-colors">Live Chat</h4>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Available 24/7 for Pro users</p>
                </div>
              </button>
              
              <Link href="#" className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-slate-100 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all group/card">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover/card:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors">Email Support</h4>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Average response: 2 hours</p>
                </div>
              </Link>

              <Link href="#" className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-slate-100 dark:border-white/5 hover:border-emerald-200 dark:hover:border-emerald-500/30 hover:shadow-md transition-all group/card">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover/card:scale-110 transition-transform">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover/card:text-emerald-600 dark:group-hover/card:text-emerald-400 transition-colors">Schedule a Call</h4>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Book 1-on-1 onboarding</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Quick Resources */}
          <div className="bg-white dark:bg-[#150a2e] p-6 rounded-3xl border border-slate-100 dark:border-white/10 shadow-sm">
             <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 tracking-tight">
              Learning Resources
            </h3>
            <div className="space-y-2">
              {resources.map((item, i) => (
                <Link key={i} href={item.link} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                    <div>
                      <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{item.title}</h4>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column - FAQs */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#150a2e] p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-white/10 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Frequently Asked Questions
              </h3>
              <Link href="#" className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors">
                View all FAQs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index
                return (
                  <div 
                    key={index} 
                    className={cn(
                      "border rounded-2xl transition-all duration-200 overflow-hidden",
                      isOpen ? "border-purple-200 dark:border-purple-500/30 bg-purple-50/30 dark:bg-purple-500/10 shadow-sm" : "border-slate-200 dark:border-white/10 bg-white dark:bg-transparent hover:border-slate-300 dark:hover:border-white/20"
                    )}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex items-center justify-between w-full p-5 text-left focus:outline-none"
                    >
                      <span className={cn(
                        "font-bold text-[15px] pr-4 transition-colors",
                        isOpen ? "text-purple-900 dark:text-purple-300" : "text-slate-700 dark:text-slate-300"
                      )}>
                        {faq.question}
                      </span>
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors",
                        isOpen ? "bg-purple-200 dark:bg-purple-500/30 text-purple-700 dark:text-purple-300" : "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                      )}>
                        <ChevronDown className={cn(
                          "w-4 h-4 transition-transform duration-300",
                          isOpen ? "rotate-180" : ""
                        )} />
                      </div>
                    </button>
                    
                    <div 
                      className={cn(
                        "grid transition-all duration-300 ease-in-out",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 pb-5 pt-0 text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed border-t border-purple-100/50 dark:border-purple-500/20 mt-2 pt-4">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            <button className="sm:hidden w-full mt-6 py-3 px-4 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-bold transition-all text-center">
              View all FAQs
            </button>

          </div>
        </div>
      </div>

      <LiveChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Floating Action Button */}
      <div 
        className={cn(
          "fixed bottom-6 right-6 z-50 transition-all duration-300 transform",
          isChatOpen ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
        )}
      >
        <button 
          onClick={() => setIsChatOpen(true)}
          className="flex items-center justify-center w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  )
}
