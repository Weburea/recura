"use client"

import * as React from "react"
import { X, CheckCircle2, AlertCircle, ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CreateSubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
}

const plans = ["Basic Plan", "Premium Plan", "Enterprise Package"]

export function CreateSubscriptionModal({ isOpen, onClose }: CreateSubscriptionModalProps) {
  const [formData, setFormData] = React.useState({
    customerName: "",
    email: "",
    plan: "Basic Plan",
    billingCycle: "Monthly",
    amount: "",
  })

  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Handle click outside to close dropdown
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (!isOpen) return null

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.customerName) newErrors.customerName = "Customer name is required"
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }
    if (!formData.amount) newErrors.amount = "Amount is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
    
    setTimeout(() => {
      setIsSuccess(false)
      onClose()
      setFormData({
        customerName: "",
        email: "",
        plan: "Basic Plan",
        billingCycle: "Monthly",
        amount: "",
      })
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#150a2e] rounded-3xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-900/30 overflow-hidden transform transition-all border border-slate-50 dark:border-white/10">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-50 dark:border-white/5 flex items-center justify-between bg-white dark:bg-[#150a2e]/50">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Create Subscription</h3>
            <p className="text-sm font-bold text-slate-400 dark:text-slate-500">Add a new customer to a plan</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-400 dark:text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8">
          {isSuccess ? (
            <div className="py-12 flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500 dark:text-emerald-400 mb-2 border border-emerald-100 dark:border-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white">Subscription Created!</h4>
              <p className="text-slate-500 dark:text-slate-400 font-bold max-w-[280px]">The new subscription has been successfully added to the system.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {/* Customer Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Customer Name</label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    placeholder="Enter full name"
                    className={cn(
                      "w-full px-5 py-3.5 rounded-2xl border bg-slate-50/50 dark:bg-white/5 text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:placeholder-slate-600",
                      errors.customerName 
                        ? "border-rose-200 dark:border-rose-500/30 bg-rose-50/30 dark:bg-rose-500/5 text-rose-900 dark:text-rose-400" 
                        : "border-slate-100 dark:border-white/5 text-slate-900 dark:text-white"
                    )}
                  />
                  {errors.customerName && (
                    <p className="text-xs font-bold text-rose-500 flex items-center gap-1 ml-1">
                      <AlertCircle className="w-3 h-3" /> {errors.customerName}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="customer@example.com"
                    className={cn(
                      "w-full px-5 py-3.5 rounded-2xl border bg-slate-50/50 dark:bg-white/5 text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:placeholder-slate-600",
                      errors.email 
                        ? "border-rose-200 dark:border-rose-500/30 bg-rose-50/30 dark:bg-rose-500/5 text-rose-900 dark:text-rose-400" 
                        : "border-slate-100 dark:border-white/5 text-slate-900 dark:text-white"
                    )}
                  />
                  {errors.email && (
                    <p className="text-xs font-bold text-rose-500 flex items-center gap-1 ml-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Plan Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 relative" ref={dropdownRef}>
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Select Plan</label>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={cn(
                        "w-full px-5 py-3.5 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 text-sm font-bold text-slate-900 dark:text-white text-left flex items-center justify-between transition-all hover:bg-slate-100/50 dark:hover:bg-white/10",
                        isDropdownOpen && "ring-2 ring-purple-500/20 border-purple-200 dark:border-purple-500/50"
                      )}
                    >
                      {formData.plan}
                      <ChevronDown className={cn("w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform", isDropdownOpen && "rotate-180")} />
                    </button>

                    {/* Custom Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white dark:bg-[#1e103c] border border-slate-100 dark:border-white/10 rounded-2xl shadow-xl shadow-purple-500/10 dark:shadow-purple-900/40 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                        {plans.map((plan) => (
                          <button
                            key={plan}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, plan })
                              setIsDropdownOpen(false)
                            }}
                            className={cn(
                              "w-full px-5 py-3 text-sm font-bold text-left flex items-center justify-between transition-colors",
                              formData.plan === plan 
                                ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10" 
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                            )}
                          >
                            {plan}
                            {formData.plan === plan && <Check className="w-4 h-4" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Amount ($)</label>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      placeholder="0.00"
                      className={cn(
                        "w-full px-5 py-3.5 rounded-2xl border bg-slate-50/50 dark:bg-white/5 text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:placeholder-slate-600",
                        errors.amount 
                          ? "border-rose-200 dark:border-rose-500/30 bg-rose-50/30 dark:bg-rose-500/5 text-rose-900 dark:text-rose-400" 
                          : "border-slate-100 dark:border-white/5 text-slate-900 dark:text-white"
                      )}
                    />
                  </div>
                </div>

                {/* Billing Cycle */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Billing Cycle</label>
                  <div className="flex gap-4">
                    {["Monthly", "Yearly"].map((cycle) => (
                      <button
                        key={cycle}
                        type="button"
                        onClick={() => setFormData({...formData, billingCycle: cycle})}
                        className={cn(
                          "flex-1 py-3.5 rounded-2xl text-sm font-bold border transition-all",
                          formData.billingCycle === cycle 
                            ? "bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/30 text-purple-600 dark:text-purple-400" 
                            : "bg-slate-50/50 dark:bg-white/5 border-slate-100 dark:border-white/5 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
                        )}
                      >
                        {cycle}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 rounded-2xl text-sm font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] py-4 btn-primary rounded-2xl shadow-xl shadow-purple-500/20 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating...
                    </div>
                  ) : "Create Subscription"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
