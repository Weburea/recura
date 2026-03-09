"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  ChevronDown, 
  Plus, 
  Bell, 
  Globe, 
  CheckCircle2, 
  Edit2, 
  RotateCcw,
  Zap,
  Apple
} from "lucide-react"
import { cn } from "@/lib/utils"
import { StatusModal, StatusType } from "@/components/dashboard/shared/status-modal"

type Tab = "gateway" | "customization" | "billing" | "transactions" | "invoices" | "webhooks"

interface OverviewCardProps {
  type: string
  count: string
  gradient: string
  icon: string | React.ReactNode
  number: string
  holder: string
  expiry: string
  active: boolean
  isDark?: boolean
}

interface ToggleControlProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  active: boolean
  onToggle: () => void
}

const DesignPattern = ({ type, className }: { type: string; className?: string }) => {
  switch (type) {
    case "waves":
      return (
        <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M0 80 C 30 20 60 40 100 80 Z" fill="currentColor" fillOpacity="0.08" />
        </svg>
      )
    case "mesh":
      return (
        <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="meshPattern" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#meshPattern)" />
        </svg>
      )
    case "circles":
      return (
        <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="90" cy="10" r="30" fill="currentColor" fillOpacity="0.1" />
          <circle cx="10" cy="90" r="40" fill="currentColor" fillOpacity="0.05" />
          <circle cx="50" cy="50" r="20" fill="currentColor" fillOpacity="0.05" />
        </svg>
      )
    case "abstract":
      return (
        <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 Q 50 100 100 0 Z" fill="currentColor" fillOpacity="0.1" />
          <path d="M0 100 Q 50 0 100 100 Z" fill="currentColor" fillOpacity="0.05" />
        </svg>
      )
    case "aurora":
      return (
        <div className={cn(className, "opacity-30 blur-3xl select-none relative h-full w-full overflow-hidden")}>
          <div className="absolute top-0 -left-1/4 w-full h-full bg-cyan-400/30 rounded-full" />
          <div className="absolute bottom-0 -right-1/4 w-full h-full bg-purple-400/30 rounded-full" />
        </div>
      )
    case "multi-waves":
      return (
        <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" fillOpacity="0.2" />
          <path d="M0 80 C 30 20 60 40 100 80 Z" fill="currentColor" fillOpacity="0.1" />
          <path d="M0 60 C 40 10 50 50 100 60 Z" fill="currentColor" fillOpacity="0.05" />
        </svg>
      )
    case "cross":
      return (
        <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 L 100 100 M 100 0 L 0 100" stroke="currentColor" strokeWidth="20" strokeOpacity="0.05" fill="none" />
          <path d="M -10 50 L 110 50" stroke="currentColor" strokeWidth="10" strokeOpacity="0.03" fill="none" />
        </svg>
      )
    default:
      return null
  }
}

export function PaymentSettingsForm() {
  const [activeTab, setActiveTab] = useState<Tab>("customization")
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<StatusType>("success")
  const [modalTitle, setModalTitle] = useState("")
  const [modalMessage, setModalMessage] = useState("")
  const [isPreviewFlipped, setIsPreviewFlipped] = useState(false)

  // Card Customization State
  const [cardDesign, setCardDesign] = useState({
    background: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)",
    pattern: "waves",
    color: "#6366f1",
    simIcon: "sim.svg",
    roundedCorners: 16,
    style: "Purple Gradient"
  })

  // Card Details State
  const [cardDetails, setCardDetails] = useState({
    holder: "Noman Manzoor",
    number: "**** **** **** 2345",
    expiry: "02/30",
    brand: "Visa"
  })

  const [gatewayControls, setGatewayControls] = useState({
    autobilling: true,
    notifications: true,
    autoCollect: true,
    instantInvoicing: false,
    retryDelay: 3,
    currency: "USD",
    taxRate: "15",
    isEditingCurrencyTax: false,
    showCurrencyDropdown: false,
    showTaxDropdown: false
  })

  // Billing Rules state
  const [billingRules, setBillingRules] = useState({
    taxCalculation: "automatic",
    invoicePrefix: "REC-",
    nextInvoiceNumber: "1024",
    billingCycle: "monthly"
  })

  const handleApplyRules = () => {
    setModalType("success")
    setModalTitle("Rules Applied")
    setModalMessage("Your billing logic and rules have been updated successfully.")
    setShowModal(true)
  }

  // Dropdown states
  const [showBrandDropdown, setShowBrandDropdown] = useState(false)
  const [showStyleDropdown, setShowStyleDropdown] = useState(false)

  // Real-time Card Preview Styles
  const getCardBackground = () => {
    return cardDesign.background || cardDesign.color
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setModalType("success")
    setModalTitle("Design Saved")
    setModalMessage("Your card customization and payment settings have been successfully updated.")
    setShowModal(true)
  }

  const handleReset = () => {
    setCardDesign({
      background: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)",
      pattern: "waves",
      color: "#6366f1",
      simIcon: "sim.svg",
      roundedCorners: 16,
      style: "Purple Gradient"
    })
  }

  return (
    <div className="space-y-8">
      {/* Page Header Actions */}
      <div className="flex items-center justify-between -mt-4 mb-2">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-50 text-purple-600 font-bold text-sm tracking-tight hover:bg-purple-100 transition-all">
            <Plus className="w-4 h-4" />
            Add New Card
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-100 bg-white text-slate-600 font-bold text-sm tracking-tight hover:border-gray-200 transition-all">
              Preview as Customer
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Payment Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OverviewCard 
          type="Credit Card"
          count="4 Active Customers"
          gradient="linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)"
          icon="/images/payment/visa.svg"
          number="**** **** **** 2345"
          holder="Noman Manzoor"
          expiry="02/30"
          active={true}
        />
        <OverviewCard 
          type="Apple Pay"
          count="2 Active Customers"
          gradient="#ffffff"
          icon={<Apple className="w-6 h-6 text-slate-900" />}
          number="**** **** **** 8899"
          holder="Marisa Robertson"
          expiry="09/25"
          active={true}
          isDark={true}
        />
        <OverviewCard 
          type="Bank Transfer"
          count="2 Active Customers"
          gradient="linear-gradient(135deg, #f97316 0%, #3b82f6 33%, #10b981 66%, #db2777 100%)"
          icon="/images/payment/bank_logo.svg"
          number="**** **** **** 5544"
          holder="Recura Business"
          expiry="--/--"
          active={true}
        />
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-100 overflow-x-auto">
        <div className="flex items-center gap-8 px-2">
          {[
            { id: "gateway", label: "Gateway Settings" },
            { id: "customization", label: "Card Customization" },
            { id: "billing", label: "Billing Rules" },
            { id: "transactions", label: "Transactions" },
            { id: "invoices", label: "Invoices" },
            { id: "webhooks", label: "Webhooks" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={cn(
                "py-4 text-[13px] font-bold tracking-tight transition-all relative whitespace-nowrap",
                activeTab === tab.id 
                  ? "text-purple-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-purple-600" 
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="pt-4">
        {activeTab === "customization" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Design Options - 4 cols */}
            <div className="lg:col-span-4 space-y-8 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm h-full">
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">Customize Payment Cards</h3>
                <p className="text-xs font-medium text-slate-400">Design how your customers see your payment cards</p>
              </div>

              <div className="space-y-8">
                {/* Visual Options */}
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                     <h4 className="text-sm font-bold text-slate-800">Design Options</h4>
                   </div>
                   
                   <div className="space-y-6">
                     {/* Gradient Styles */}
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { id: "purple-gradient", name: "Purple Gradient", class: "bg-indigo-700", pattern: "waves", bg: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)" },
                            { id: "ocean-gradient", name: "Ocean Blue", class: "bg-blue-500", pattern: "mesh", bg: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)" },
                            { id: "sunset-gradient", name: "Sunset Orange", class: "bg-orange-500", pattern: "waves", bg: "linear-gradient(135deg, #f97316 0%, #db2777 100%)" },
                            { id: "multi-wave", name: "Multi Wave", class: "bg-slate-900", pattern: "multi-waves", bg: "linear-gradient(135deg, #f97316 0%, #3b82f6 33%, #10b981 66%, #db2777 100%)" },
                            { id: "finaci-green", name: "Finaci Green", class: "bg-emerald-900", pattern: "cross", bg: "linear-gradient(135deg, #064e3b 0%, #059669 100%)" },
                            { id: "midnight-aurora", name: "Midnight Aurora", class: "bg-slate-900", pattern: "aurora", bg: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #1e293b 100%)" },
                            { id: "minimal-glass", name: "Minimalist Glass", class: "bg-slate-200", pattern: "none", bg: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%)" }
                          ].map((g) => (
                            <button 
                              key={g.id}
                              onClick={() => {
                                setCardDesign({
                                  ...cardDesign, 
                                  background: g.bg,
                                  pattern: g.pattern,
                                  style: g.name
                                });
                              }}
                               className={cn(
                                "h-8 w-8 shrink-0 rounded-lg transition-all ring-offset-2 relative overflow-hidden border border-gray-100",
                                cardDesign.style === g.name ? "ring-2 ring-purple-600 scale-[1.02]" : "hover:scale-[1.02]"
                              )}
                              style={{ background: g.bg }}
                            >
                              <div className="absolute inset-0 text-white/20">
                                <DesignPattern type={g.pattern} className="w-full h-full" />
                              </div>
                            </button>
                          ))}
                        </div>

                     {/* Card Color */}
                     <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Card Color</span>
                        <div className="flex items-center gap-2 mt-1 sm:mt-0">
                          {["#6366f1", "#8b5cf6", "#f97316", "#ef4444", "#3b82f6", "#cbd5e1"].map((c) => (
                            <button 
                              key={c}
                              onClick={() => setCardDesign({...cardDesign, color: c, background: c})}
                              style={{ backgroundColor: c }}
                              className={cn(
                                "w-6 h-6 rounded-full transition-all ring-offset-2",
                                cardDesign.color === c ? "ring-2 ring-purple-600 scale-110" : "hover:scale-105"
                              )}
                            />
                          ))}
                        </div>
                     </div>


                     <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">SIM Style Selection</span>
                          <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full uppercase">Premium</span>
                        </div>
                         <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar lg:grid lg:grid-cols-7 lg:gap-1.5">
                           {["sim.svg",  "sim 2.svg", "sim 3.svg", "sim 4.svg", "sim 5.svg", "sim 6.svg", "sim 7.svg"].map((s) => (
                             <button 
                               key={s}
                               type="button"
                               onClick={() => setCardDesign({...cardDesign, simIcon: s})}
                               className={cn(
                                "h-10 min-w-[40px] rounded-lg border-2 transition-all flex items-center justify-center overflow-hidden bg-slate-50/30",
                                cardDesign.simIcon === s ? "border-purple-600 bg-purple-50 ring-2 ring-purple-600/10" : "border-gray-100 hover:border-slate-300"
                              )}
                            >
                              <div className="w-8 h-6 relative opacity-80 group-hover:opacity-100 transition-opacity">
                                <Image src={`/images/payment/${s}`} alt="Sim" fill className="object-contain" />
                              </div>
                            </button>
                          ))}
                        </div>
                     </div>

                     {/* Rounded Corners */}
                     <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-500">Rounded Corners</span>
                          <span className="text-xs font-black text-slate-900">{cardDesign.roundedCorners}px</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <input 
                            type="range" 
                            min="0" 
                            max="30" 
                            value={cardDesign.roundedCorners}
                            onChange={(e) => setCardDesign({...cardDesign, roundedCorners: parseInt(e.target.value)})}
                            className="flex-1 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
                          />
                        </div>
                     </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Main Preview - 4 cols */}
             <div className="lg:col-span-4 space-y-8 flex flex-col items-center">
               <div 
                className={cn("w-full max-w-[340px] h-[210px] perspective-1000 cursor-pointer", isPreviewFlipped ? "flip-card-active" : "")}
                onClick={() => setIsPreviewFlipped(!isPreviewFlipped)}
               >
                  <div className="flip-card-inner">
                    {/* Front Side */}
                    <div 
                      style={{ 
                        background: getCardBackground(),
                        borderRadius: `${cardDesign.roundedCorners}px`
                      }}
                       className={cn(
                        "flip-card-front p-8 flex flex-col justify-between overflow-hidden shadow-2xl shadow-indigo-900/40 transition-colors duration-500",
                        cardDesign.style === "Minimalist Glass" ? "text-slate-900" : "text-white"
                      )}
                    >
                      {/* Background Pattern Layer */}
                      <div className="absolute inset-0 pointer-events-none">
                        <DesignPattern type={cardDesign.pattern} className="w-full h-full" />
                      </div>

                       <div className="flex justify-between items-start relative z-10 w-full">
                        <div className="w-8 h-6 relative">
                           <Image src={`/images/payment/${cardDesign.simIcon}`} alt="Chip" fill className="object-contain" />
                        </div>
                         <div className="w-24 h-10 relative -mt-1 flex justify-end items-center">
                           {cardDetails.brand === "Visa" ? (
                             <div className="w-24 h-10 relative">
                               <Image src="/images/payment/visa.svg" alt="Visa" fill className={cn("object-contain", cardDesign.style === "Minimalist Glass" ? "brightness-0" : "brightness-0 invert")} />
                             </div>
                           ) : cardDetails.brand === "Mastercard" ? (
                             <span className="text-lg font-black italic tracking-tight drop-shadow-md uppercase">Mastercard</span>
                           ) : (
                             <span className="text-[12px] font-black italic tracking-tighter drop-shadow-md uppercase text-right whitespace-nowrap">American Express</span>
                           )}
                        </div>
                      </div>

                      <div className="space-y-6 relative z-10 -mt-8">
                        <p className="text-xl font-black tracking-[0.2em]">{cardDetails.number}</p>
                        
                        <div className="flex justify-between items-end pb-2">
                          <div className="space-y-0">
                            <p className={cn("text-[8px] uppercase font-bold tracking-widest", cardDesign.style === "Minimalist Glass" ? "text-slate-900/40" : "text-white/50")}>Card Holder</p>
                            <p className="text-xs font-black">{cardDetails.holder}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                             <p className={cn("text-[8px] uppercase font-bold tracking-widest", cardDesign.style === "Minimalist Glass" ? "text-slate-900/40" : "text-white/50")}>Expiry</p>
                             <p className="text-xs font-black">{cardDetails.expiry}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div 
                      style={{ 
                        background: getCardBackground(),
                        borderRadius: `${cardDesign.roundedCorners}px`
                      }}
                       className={cn(
                        "flip-card-back p-8 flex flex-col justify-between overflow-hidden shadow-2xl shadow-indigo-900/40 transition-colors duration-500",
                        cardDesign.style === "Minimalist Glass" ? "text-slate-900" : "text-white"
                      )}
                    >
                      <div className="absolute inset-0 pointer-events-none">
                        <DesignPattern type={cardDesign.pattern} className="w-full h-full" />
                      </div>
                      
                      <div className="absolute top-8 left-0 w-full h-10 bg-slate-900 opacity-80" />
                      
                      <div className="mt-14 flex items-center gap-4 relative z-10 px-2">
                        <div className="h-10 bg-white/10 flex-1 px-4 flex items-center justify-end rounded border border-white/10">
                          <p className="text-sm font-black mono tracking-widest italic">123</p>
                        </div>
                        <div className="text-[10px] uppercase font-bold opacity-60">CVV</div>
                      </div>

                      <p className="text-[8px] leading-tight opacity-50 relative z-10 text-center px-4">
                        This card is a property of Recura. Use is subject to terms and conditions. 
                        Unauthorized use is strictly prohibited.
                      </p>
                    </div>
                  </div>

                   {/* Flip Indicator */}
                   <div className="flex justify-center gap-2 mt-6">
                     <div className={cn("w-4 h-1.5 rounded-full transition-all duration-300", !isPreviewFlipped ? "bg-purple-600 w-6" : "bg-slate-200")} />
                     <div className={cn("w-4 h-1.5 rounded-full transition-all duration-300", isPreviewFlipped ? "bg-purple-600 w-6" : "bg-slate-200")} />
                   </div>
               </div>

               {/* Section Title */}
               <div className="w-full text-left">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Card Details</h4>
               </div>

               {/* Design Options - bottom (Customer View) */}
               <div className="w-full bg-slate-50/50 rounded-2xl border border-gray-100 p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900">Customer View</h4>
                      <p className="text-[10px] font-medium text-slate-400">Previewing with current design</p>
                    </div>
                  </div>
                   <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-purple">
                     {[
                      { id: "purple-gradient", name: "Purple Gradient", bg: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)", pattern: "waves" },
                      { id: "ocean-gradient", name: "Ocean Blue", bg: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)", pattern: "mesh" },
                      { id: "sunset-gradient", name: "Sunset Orange", bg: "linear-gradient(135deg, #f97316 0%, #db2777 100%)", pattern: "waves" },
                      { id: "multi-wave", name: "Multi Wave", bg: "linear-gradient(135deg, #f97316 0%, #3b82f6 33%, #10b981 66%, #db2777 100%)", pattern: "multi-waves" },
                      { id: "finaci-green", name: "Finaci Green", bg: "linear-gradient(135deg, #064e3b 0%, #059669 100%)", pattern: "cross" },
                      { id: "minimal-glass", name: "Minimalist Glass", bg: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%)", pattern: "none" },
                    ].map((card, i) => (
                      <button 
                        key={i} 
                        onClick={() => setCardDesign({...cardDesign, background: card.bg, pattern: card.pattern, style: card.name})}
                        className={cn(
                          "min-w-[140px] h-24 rounded-2xl p-4 flex flex-col justify-between shadow-sm transition-all hover:scale-105 hover:ring-2 ring-purple-600/20 active:scale-95 relative overflow-hidden",
                          cardDesign.style === card.name ? "ring-2 ring-purple-600" : ""
                        )} 
                        style={{ background: card.bg }}
                      >
                        <div className="absolute inset-0 pointer-events-none opacity-40">
                          <DesignPattern type={card.pattern} className="w-full h-full" />
                        </div>
                        <div className="w-6 h-5 bg-white/20 rounded-md relative z-10" />
                        <div className="space-y-1 relative z-10">
                          <div className="w-full h-1 bg-white/20 rounded-full" />
                          <div className="w-2/3 h-1 bg-white/10 rounded-full" />
                        </div>
                      </button>
                    ))}
                   </div>
               </div>
            </div>

            {/* Card Form - 4 cols */}
            <form onSubmit={handleSubmit} className="lg:col-span-4 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Card Holder</label>
                  <input
                    type="text"
                    value={cardDetails.holder}
                    onChange={(e) => setCardDetails({...cardDetails, holder: e.target.value})}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-slate-50/50 focus:outline-none focus:border-purple-600 focus:bg-white text-slate-900 font-bold transition-all text-sm"
                    placeholder="Holder Name"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Card Number</label>
                  </div>
                  <input
                    type="text"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-slate-50/50 focus:outline-none focus:border-purple-600 focus:bg-white text-slate-900 font-bold transition-all text-sm"
                    placeholder="**** **** **** ****"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Expiry Date</label>
                  <input
                    type="text"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-slate-50/50 focus:outline-none focus:border-purple-600 focus:bg-white text-slate-900 font-bold transition-all text-sm h-[48px]"
                    placeholder="MM/YY"
                  />
                </div>

                <div className="space-y-2 relative">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Brand</label>
                  <button 
                    type="button" 
                    onClick={() => setShowBrandDropdown(!showBrandDropdown)}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-slate-50/50 flex items-center justify-between text-slate-900 font-bold text-sm h-[48px] hover:border-purple-200 transition-all"
                  >
                    <div className="flex items-center gap-3">
                       {cardDetails.brand === "Visa" ? (
                         <Image src="/images/payment/visa.svg" alt="Visa" width={32} height={12} className="object-contain" />
                       ) : (
                         <div className="w-8 h-4 bg-slate-200 rounded animate-pulse" />
                       )}
                       <span>{cardDetails.brand}</span>
                    </div>
                    <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", showBrandDropdown ? "rotate-180" : "")} />
                  </button>
                  {showBrandDropdown && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl border border-gray-100 shadow-xl z-20 overflow-hidden py-1">
                      {["Visa", "Mastercard", "American Express"].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => {
                            setCardDetails({...cardDetails, brand: b})
                            setShowBrandDropdown(false)
                          }}
                          className="w-full px-4 py-3 text-left text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-2 h-2 rounded-full transition-all",
                              cardDetails.brand === b ? "bg-purple-600 scale-125" : "bg-slate-200 group-hover:bg-slate-300"
                            )} />
                            <span className={cn(b === "Mastercard" ? "font-black" : "")}>{b}</span>
                          </div>
                          {b === "Visa" && <Image src="/images/payment/visa.svg" alt="" width={24} height={8} className="opacity-40" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2 relative">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Card Style</label>
                  <button 
                    type="button" 
                    onClick={() => setShowStyleDropdown(!showStyleDropdown)}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-slate-50/50 flex items-center justify-between text-slate-900 font-bold text-sm h-[48px] hover:border-purple-200 transition-all"
                  >
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded shadow-sm overflow-hidden relative" style={{ background: getCardBackground() }}>
                          <DesignPattern type={cardDesign.pattern} className="w-full h-full text-white/20" />
                        </div>
                       <span>{cardDesign.style}</span>
                    </div>
                    <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", showStyleDropdown ? "rotate-180" : "")} />
                  </button>
                  {showStyleDropdown && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl border border-gray-100 shadow-xl z-20 overflow-hidden py-1">
                      {[
                        { name: "Purple Gradient", id: "purple-gradient", bg: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)", pattern: "waves" },
                        { name: "Ocean Blue", id: "ocean-gradient", bg: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)", pattern: "mesh" },
                        { name: "Sunset Orange", id: "sunset-gradient", bg: "linear-gradient(135deg, #f97316 0%, #db2777 100%)", pattern: "waves" },
                        { name: "Minimalist Glass", id: "glass-gradient", bg: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)", pattern: "none" }
                      ].map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setCardDesign({
                              ...cardDesign, 
                              style: s.name, 
                              background: s.bg,
                              pattern: s.pattern
                            })
                            setShowStyleDropdown(false)
                          }}
                          className="w-full px-4 py-3 text-left text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3"
                        >
                          <div className="w-4 h-4 rounded shadow-sm border border-gray-100 relative overflow-hidden" style={{ background: s.bg }}>
                            <DesignPattern type={s.pattern} className="w-full h-full text-white/10" />
                          </div>
                          {s.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-6">
                 <button 
                  type="submit"
                  className="flex-1 py-4 rounded-2xl bg-purple-600 text-white font-black text-sm tracking-tight hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20"
                 >
                   Save Design
                 </button>
                 <button 
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-4 rounded-2xl bg-white border border-gray-100 text-slate-600 font-black text-sm tracking-tight hover:bg-slate-50 transition-all"
                 >
                   Reset
                 </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "gateway" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Gateway Configuration */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 p-8 space-y-8">
               <div className="space-y-1">
                 <h3 className="text-base font-black text-slate-900">Payment Gateway</h3>
                 <p className="text-xs font-medium text-slate-400">Select & Configure Gateways</p>
               </div>

               <div className="space-y-4">
                 {[
                   { id: "stripe", name: "Stripe", connected: true, logo: "S" },
                   { id: "paystack", name: "Paystack", connected: true, logo: "P" },
                   { id: "paypal", name: "PayPal", connected: true, logo: "P" },
                   { id: "flutterwave", name: "Flutterwave", connected: false, logo: "F" },
                 ].map((gw) => (
                   <div key={gw.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-purple-200 transition-all group">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-xl bg-slate-50 border border-gray-100 flex items-center justify-center font-black text-slate-600">
                          {gw.logo}
                       </div>
                       <div>
                         <h4 className="text-sm font-black text-slate-900">{gw.name}</h4>
                         {gw.connected && (
                           <div className="flex items-center gap-1.5 mt-0.5">
                             <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                             <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Connected</span>
                           </div>
                         )}
                       </div>
                     </div>
                     <button className="px-6 py-2.5 rounded-xl border border-gray-100 bg-slate-50 text-slate-900 font-bold text-xs tracking-tight hover:bg-slate-100 transition-all">
                       Configure
                     </button>
                   </div>
                 ))}
               </div>
            </div>

            {/* Gateway Controls */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 p-8 space-y-8">
               <div className="space-y-1">
                 <h3 className="text-base font-black text-slate-900">Gateway Controls</h3>
               </div>

               <div className="space-y-6">
                 <ToggleControl 
                  icon={<RotateCcw className="w-4 h-4" />}
                  title="Autobilling Retries"
                  subtitle="Retry failed payments (3 attempts)"
                  active={gatewayControls.autobilling}
                  onToggle={() => setGatewayControls({...gatewayControls, autobilling: !gatewayControls.autobilling})}
                 />
                 <ToggleControl 
                  icon={<Bell className="w-4 h-4" />}
                  title="Payment Notifications"
                  subtitle="Email customers on success/failure"
                  active={gatewayControls.notifications}
                  onToggle={() => setGatewayControls({...gatewayControls, notifications: !gatewayControls.notifications})}
                 />
                  <div className="flex flex-col pt-4 border-t border-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                          <Globe className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">Currency & Tax</h4>
                          {!gatewayControls.isEditingCurrencyTax && (
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                              {gatewayControls.currency} • {gatewayControls.taxRate}% TAX
                            </p>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => setGatewayControls({...gatewayControls, isEditingCurrencyTax: !gatewayControls.isEditingCurrencyTax})}
                        className={cn(
                          "p-2.5 rounded-xl border border-gray-100 transition-all",
                          gatewayControls.isEditingCurrencyTax ? "bg-purple-600 text-white border-purple-600" : "bg-white text-slate-400 hover:text-purple-600"
                        )}
                      >
                         <Edit2 className="w-4 h-4" />
                      </button>
                    </div>

                    {gatewayControls.isEditingCurrencyTax && (
                      <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-gray-100 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5 relative">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Currency</label>
                            <button 
                              type="button"
                              onClick={() => setGatewayControls({...gatewayControls, showCurrencyDropdown: !gatewayControls.showCurrencyDropdown})}
                              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-slate-700 flex items-center justify-between hover:border-purple-300 hover:shadow-sm transition-all"
                            >
                              <span>{gatewayControls.currency} ($)</span>
                              <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform duration-300", gatewayControls.showCurrencyDropdown && "rotate-180")} />
                            </button>
                            
                            {gatewayControls.showCurrencyDropdown && (
                              <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                {["USD", "EUR", "GBP", "NGN"].map((cur) => (
                                  <button
                                    key={cur}
                                    type="button"
                                    onClick={() => setGatewayControls({...gatewayControls, currency: cur, showCurrencyDropdown: false})}
                                    className="w-full px-5 py-3 text-left text-xs font-bold text-slate-600 hover:bg-purple-50 hover:text-purple-600 transition-colors flex items-center justify-between"
                                  >
                                    {cur}
                                    {gatewayControls.currency === cur && <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tax Rate (%)</label>
                            <div className="relative">
                              <input 
                                type="number"
                                value={gatewayControls.taxRate}
                                onChange={(e) => setGatewayControls({...gatewayControls, taxRate: e.target.value})}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs font-bold text-slate-700 outline-none focus:border-purple-600 pr-8"
                                placeholder="15"
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">%</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setGatewayControls({...gatewayControls, isEditingCurrencyTax: false})}
                          className="w-full py-2.5 rounded-lg bg-slate-900 text-white font-black text-[10px] uppercase tracking-wider hover:bg-slate-800 transition-all"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === "billing" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 p-8 space-y-8">
               <div className="space-y-1">
                 <h3 className="text-base font-black text-slate-900">Billing Logic & Rules</h3>
                 <p className="text-xs font-medium text-slate-400">Configure how you collect payments and generate invoices</p>
               </div>

               <div className="flex flex-col gap-6">
                 <div className="space-y-4 p-6 rounded-2xl bg-slate-50 border border-gray-100">
                    <h4 className="text-sm font-black text-slate-800">Auto-Collection</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-4">Enable automatic charging of customers&apos; saved payment methods on their billing date.</p>
                    <ToggleControl 
                      icon={<Zap className="w-4 h-4" />}
                      title="Instant Capture"
                      subtitle="Capture funds immediately upon checkout"
                      active={gatewayControls.autoCollect}
                      onToggle={() => setGatewayControls({...gatewayControls, autoCollect: !gatewayControls.autoCollect})}
                    />
                 </div>
                 <div className="space-y-4 p-6 rounded-2xl bg-slate-50 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-black text-slate-800">Tax Management</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed">Choose how taxes are calculated for your products.</p>
                      </div>
                      <div className="relative">
                        <button 
                          type="button"
                          onClick={() => setGatewayControls({...gatewayControls, showTaxDropdown: !gatewayControls.showTaxDropdown})}
                          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-slate-700 flex items-center gap-3 hover:border-purple-200 transition-all shadow-sm"
                        >
                          <span>{billingRules.taxCalculation === "automatic" ? "Automatic (Recura Tax)" : billingRules.taxCalculation === "manual" ? "Manual Entry" : "No Tax"}</span>
                          <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform", gatewayControls.showTaxDropdown && "rotate-180")} />
                        </button>

                        {gatewayControls.showTaxDropdown && (
                          <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            {[
                              { label: "Automatic (Recura Tax)", value: "automatic" },
                              { label: "Manual Entry", value: "manual" },
                              { label: "No Tax", value: "none" }
                            ].map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  setBillingRules({...billingRules, taxCalculation: opt.value});
                                  setGatewayControls({...gatewayControls, showTaxDropdown: false});
                                }}
                                className="w-full px-6 py-4 text-left text-xs font-bold text-slate-600 hover:bg-purple-50 hover:text-purple-600 transition-colors flex items-center justify-between border-b border-gray-50 last:border-none"
                              >
                                {opt.label}
                                {billingRules.taxCalculation === opt.value && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                 </div>
               </div>

               <div className="space-y-4 pt-4">
                  <h4 className="text-sm font-black text-slate-800">Invoicing Preferences</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Invoice Prefix</label>
                       <input 
                        type="text" 
                        value={billingRules.invoicePrefix}
                        onChange={(e) => setBillingRules({...billingRules, invoicePrefix: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-slate-50/50 text-sm font-bold text-slate-900"
                       />
                    </div>
                    <div className="space-y-2 text-center flex flex-col items-center justify-center">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Retry Pattern</label>
                       <div className="flex items-center gap-3">
                         <button onClick={() => setGatewayControls({...gatewayControls, retryDelay: Math.max(1, gatewayControls.retryDelay - 1)})} className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center hover:bg-slate-50">-</button>
                         <span className="text-sm font-black text-slate-900">{gatewayControls.retryDelay} Days</span>
                         <button onClick={() => setGatewayControls({...gatewayControls, retryDelay: gatewayControls.retryDelay + 1})} className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center hover:bg-slate-50">+</button>
                       </div>
                    </div>
                     <div className="flex items-end">
                        <button 
                          onClick={handleApplyRules}
                          className="w-full py-3.5 rounded-xl bg-purple-600 text-white font-black text-xs tracking-tight hover:bg-purple-700 hover:shadow-[0_8px_30px_rgba(147,51,234,0.3)] transition-all shadow-lg shadow-purple-600/20 uppercase active:scale-95"
                        >
                          Apply Rules
                        </button>
                     </div>
                  </div>
               </div>
            </div>

             <div className="lg:col-span-4 bg-purple-600 rounded-2xl p-10 text-white relative overflow-hidden flex flex-col justify-between border border-white/20 shadow-[0_20px_50px_rgba(139,92,246,0.3)] group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -mr-32 -mt-32 blur-[80px] opacity-40 group-hover:opacity-60 transition-opacity duration-1000" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/30 rounded-full -ml-32 -mb-32 blur-[80px] opacity-40" />
                
                {/* Subtle Refined Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                <div className="space-y-8 relative z-10">
                  <div className="w-16 h-16 rounded-[24px] bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-[inset_0_2px_10px_rgba(255,255,255,0.1)]">
                    <Zap className="w-8 h-8 text-white fill-white" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                       <h4 className="text-2xl font-black italic tracking-tighter text-white">Pro Billing Tip</h4>
                       <span className="px-2.5 py-1 rounded-full bg-white text-purple-600 text-[10px] font-black uppercase tracking-tighter shadow-sm">Pro</span>
                    </div>
                    <p className="text-[11px] text-purple-100/70 font-black uppercase tracking-[0.3em]">Strategy Guide</p>
                  </div>
                  <p className="text-base text-white leading-relaxed font-bold tracking-tight">Use &quot;Instant Capture&quot; for digital goods but manual capture for physical products to ensure stock availability before charging.</p>
                </div>

                <div className="mt-10">
                  <Link 
                    href="/dashboard/docs"
                    className="relative z-10 w-full py-5 rounded-2xl bg-white text-purple-600 font-bold text-xs uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(0,0,0,0.1)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 flex items-center justify-center"
                  >
                    Read Documentation
                  </Link>
                </div>
             </div>
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
               <div>
                  <h3 className="text-base font-black text-slate-900">Recent Transactions</h3>
                  <p className="text-xs font-medium text-slate-400">Track and manage your customer payments</p>
               </div>
               <div className="flex items-center gap-2">
                 <button className="p-2.5 rounded-xl border border-gray-100 hover:bg-slate-50 text-slate-400">
                    <RotateCcw className="w-4 h-4" />
                 </button>
                 <button className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-black text-sm">
                    Export CSV
                 </button>
               </div>
            </div>
            <div className="overflow-x-auto min-h-[400px]">
               <table className="w-full">
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                      <th className="px-8 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { name: "Alex Johnson", amount: "$124.00", status: "Success", date: "Mar 02, 2024" },
                      { name: "Sarah Miller", amount: "$50.00", status: "Failed", date: "Mar 01, 2024" },
                      { name: "Mike Ross", amount: "$89.99", status: "Pending", date: "Feb 28, 2024" },
                      { name: "John Doe", amount: "$210.00", status: "Success", date: "Feb 27, 2024" },
                    ].map((tx, i) => (
                      <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-600">
                                {tx.name[0]}
                             </div>
                             <span className="text-sm font-bold text-slate-900">{tx.name}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-sm font-black text-slate-900">{tx.amount}</td>
                        <td className="px-8 py-6">
                           <span className={cn(
                             "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                             tx.status === "Success" ? "bg-emerald-50 text-emerald-600" :
                             tx.status === "Failed" ? "bg-rose-50 text-rose-600" : "bg-orange-50 text-orange-600"
                           )}>
                              {tx.status}
                           </span>
                        </td>
                        <td className="px-8 py-6 text-xs font-bold text-slate-400">{tx.date}</td>
                        <td className="px-8 py-6 text-right">
                           <button className="text-purple-600 text-xs font-black hover:underline uppercase tracking-widest">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>
        )}

        {activeTab === "invoices" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-8">
               <div className="bg-white rounded-[32px] border border-gray-100 p-8 space-y-8 shadow-sm">
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-slate-900">Invoice Customization</h3>
                    <p className="text-xs font-medium text-slate-400">Brand your PDF receipts and invoices</p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 border border-gray-100">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Invoice Branding</h4>
                        <p className="text-[11px] text-slate-500 mt-1">Include your logo and colors</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 p-2">
                           <Image src="/images/logo_dark.svg" alt="Recura" width={40} height={20} className="w-full h-full object-contain" />
                        </div>
                        <button className="px-5 py-2.5 rounded-xl bg-white border border-gray-100 text-xs font-black text-slate-600 shadow-sm">Change</button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Template Type</label>
                         <button className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-white flex items-center justify-between text-sm font-bold text-slate-700">
                            Modern POS
                            <ChevronDown className="w-4 h-4" />
                         </button>
                       </div>
                       <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Language</label>
                         <button className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-white flex items-center justify-between text-sm font-bold text-slate-700">
                            English (US)
                            <ChevronDown className="w-4 h-4" />
                         </button>
                       </div>
                    </div>

                    <ToggleControl 
                      icon={<Bell className="w-4 h-4" />}
                      title="Auto-Email Invoices"
                      subtitle="Send PDF to customer after every charge"
                      active={true}
                      onToggle={() => {}}
                    />
                  </div>
               </div>
            </div>
            
            <div className="lg:col-span-5">
               <div className="bg-slate-900 rounded-[32px] p-8 text-white space-y-6 shadow-2xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-lg">Preview</h4>
                      <p className="text-xs text-slate-400">Live Invoice Glance</p>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">Template Active</div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 text-slate-900 space-y-6 shadow-xl transform scale-[0.9] origin-top">
                     <div className="flex justify-between items-start border-b border-dashed border-slate-200 pb-4">
                        <Image src="/images/logo_dark.svg" alt="Logo" width={60} height={30} className="object-contain" />
                        <div className="text-right">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Invoice</p>
                           <p className="text-sm font-black">#REC-1024</p>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs">
                           <span className="font-bold text-slate-400">Standard Plan</span>
                           <span className="font-black">$89.00</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                           <span className="font-bold text-slate-400">Processing Fee</span>
                           <span className="font-black">$2.50</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                           <span className="text-sm font-black text-slate-900">Total</span>
                           <span className="text-lg font-black text-purple-600">$91.50</span>
                        </div>
                     </div>
                     <div className="text-center pt-2">
                        <p className="text-[10px] font-bold text-slate-400">Thank you for your business!</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === "webhooks" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-[32px] border border-gray-100 p-10 space-y-8 shadow-sm">
               <div className="flex items-center gap-4">
                 <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                    <Globe className="w-7 h-7" />
                 </div>
                 <div>
                    <h3 className="text-lg font-black text-slate-900">Developer Webhooks</h3>
                    <p className="text-sm font-medium text-slate-400">Listen for real-time payment events</p>
                 </div>
               </div>

               <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Endpoint URL</label>
                    <div className="flex gap-2">
                       <input 
                        type="text" 
                        readOnly
                        value="https://api.yourdomain.com/webhooks/recura"
                        className="flex-1 px-4 py-3.5 rounded-xl border border-gray-100 bg-slate-50 font-mono text-xs text-slate-500"
                       />
                       <button className="px-6 py-3.5 rounded-xl bg-slate-900 text-white font-black text-xs hover:bg-slate-800 transition-all">Update</button>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Signing Secret</label>
                    <div className="flex gap-2">
                       <input 
                        type="password" 
                        readOnly
                        value="whsec_k2j8s7f9a0d1g3h5j6k7l8m9n0b2v1c"
                        className="flex-1 px-4 py-3.5 rounded-xl border border-gray-100 bg-slate-50 font-mono text-xs text-slate-500"
                       />
                       <button className="px-6 py-3.5 rounded-xl border border-gray-100 bg-white text-slate-600 font-black text-xs hover:bg-slate-50 transition-all">Reveal</button>
                    </div>
                 </div>
                
                 <div className="pt-4 space-y-4">
                    <h4 className="text-sm font-black text-slate-800">Events to send</h4>
                    <div className="grid grid-cols-2 gap-4">
                       {[
                         "payment.succeeded", "payment.failed", "invoice.created", "subscription.cancelled"
                       ].map(event => (
                         <div key={event} className="flex items-center gap-3 p-4 rounded-xl border border-gray-50 bg-slate-50/30">
                           <div className="w-4 h-4 rounded-md bg-purple-600 flex items-center justify-center">
                              <CheckCircle2 className="w-3 h-3 text-white" />
                           </div>
                           <span className="text-xs font-bold text-slate-600 font-mono">{event}</span>
                         </div>
                       ))}
                    </div>
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>

      <StatusModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={modalType}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  )
}

function OverviewCard({ 
  type, 
  count, 
  gradient, 
  icon, 
  number, 
  holder, 
  expiry, 
  active,
  isDark = false 
}: OverviewCardProps) {
  return (
    <div className="space-y-4">
      <div 
        style={{ background: gradient }}
        className={cn(
          "w-full h-[200px] rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden shadow-lg",
          isDark ? "border border-gray-100" : "text-white shadow-indigo-950/20"
        )}
      >
        <div className="flex justify-between items-start relative z-10">
          <div className="w-10 h-8 relative">
            <Image src="/images/payment/sim.svg" alt="Chip" fill className="object-contain" />
          </div>
          {typeof icon === "string" ? (
             <div className="w-14 h-8 relative">
                <Image src={icon} alt="Logo" fill className="object-contain brightness-0 invert" />
             </div>
          ) : icon}
        </div>
        
        <div className="relative z-10 space-y-4">
          <p className={cn("text-lg font-black tracking-[0.2em]", isDark ? "text-slate-900" : "")}>
            {number}
          </p>
          <div className="flex justify-between items-end">
            <div>
              <p className={cn("text-[9px] uppercase font-bold opacity-60", isDark ? "text-slate-500" : "text-white/60")}>Card Holder</p>
              <p className={cn("text-xs font-black", isDark ? "text-slate-700" : "")}>{holder}</p>
            </div>
            <div className="text-right">
              <p className={cn("text-[9px] uppercase font-bold opacity-60", isDark ? "text-slate-500" : "text-white/60")}>Expiry Date</p>
              <p className={cn("text-xs font-black", isDark ? "text-slate-700" : "")}>{expiry}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between px-1">
        <div>
          <h4 className="text-[15px] font-black text-slate-900 tracking-tight">{type}</h4>
          <p className="text-xs font-bold text-slate-400">{count}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-50 border border-gray-100 flex items-center justify-center">
          <div className={cn("w-2 h-2 rounded-full", active ? "bg-emerald-500" : "bg-slate-300")} />
        </div>
      </div>
    </div>
  )
}

function ToggleControl({ icon, title, subtitle, active, onToggle }: ToggleControlProps) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex gap-4 items-start">
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 transition-colors group-hover:bg-purple-50 group-hover:text-purple-600 shrink-0">
          {icon}
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-800">{title}</h4>
          <p className="text-[11px] font-medium text-slate-400">{subtitle}</p>
        </div>
      </div>
      <button 
        onClick={onToggle}
        className={cn(
          "w-10 h-5 rounded-full transition-all relative flex items-center px-1 shrink-0",
          active ? "bg-purple-600 shadow-md shadow-purple-200" : "bg-slate-200"
        )}
      >
        <div className={cn(
          "w-3 h-3 bg-white rounded-full transition-transform duration-200 shadow-sm",
          active ? "translate-x-5" : "translate-x-0"
        )} />
      </button>
    </div>
  )
}
