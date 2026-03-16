"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, Check, Save } from "lucide-react"
import { StatusModal, StatusType } from "@/components/dashboard/shared/modals/status-modal"

export function CompanyProfileForm() {
  const [formData, setFormData] = useState({
    companyName: "Business Owner Inc.",
    industry: "Saas & Software",
    email: "contact@business.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Street, Suite 100, New York, NY 10001",
    website: "www.business.com",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<StatusType>("success")
  const [modalTitle, setModalTitle] = useState("")
  const [modalMessage, setModalMessage] = useState("")
  
  const [isIndustryOpen, setIsIndustryOpen] = useState(false)
  const industryRef = useRef<HTMLDivElement>(null)
  const industryOptions = ["Saas & Software", "E-commerce", "Finance", "Retail", "Other"]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (industryRef.current && !industryRef.current.contains(event.target as Node)) {
        setIsIndustryOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (formData.phone && !/^[+\d\s()-]+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format"
    }

    if (!formData.website.trim()) {
      newErrors.website = "Website is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleIndustryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      industry: value
    }))
    setIsIndustryOpen(false)
    if (errors.industry) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.industry
        return newErrors
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Strict validation: Website is mandatory to trigger the Red Alert
    if (!formData.website.trim()) {
      setModalType("error")
      setModalTitle("Validation Failed")
      setModalMessage("The Website field is mandatory. Please provide a valid URL to continue.")
      setShowModal(true)
      setErrors(prev => ({ ...prev, website: "Website is required" }))
      return
    }

    if (validateForm()) {
      console.log("Form submitted successfully:", formData)
      setModalType("success")
      setModalTitle("Profile Updated")
      setModalMessage("Your company information has been successfully updated and saved.")
      setShowModal(true)
    } else {
       console.log("Form has errors", errors)
       setModalType("error")
       setModalTitle("Update Failed")
       setModalMessage("Please check the form for errors and try again.")
       setShowModal(true)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Name */}
        <div className="space-y-2">
          <label htmlFor="companyName" className="text-sm font-bold text-slate-800">
            Company Name
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleChange}
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-slate-900",
              errors.companyName ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-purple-600"
            )}
            placeholder="Enter company name"
          />
          {errors.companyName && <p className="text-xs text-red-500">{errors.companyName}</p>}
        </div>

        {/* Industry */}
        <div className="space-y-2" ref={industryRef}>
          <label htmlFor="industry" className="text-sm font-bold text-slate-800">
            Industry
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsIndustryOpen(!isIndustryOpen)}
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-slate-900 flex items-center justify-between",
                isIndustryOpen ? "border-purple-600 ring-2 ring-purple-600/20" : "border-gray-200"
              )}
            >
              <span className="truncate">{formData.industry}</span>
              <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-200", isIndustryOpen ? "rotate-180" : "")} />
            </button>
            
            {/* Dropdown Menu */}
            <div className={cn(
              "absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-purple-900/5 py-2 transition-all duration-200 transform origin-top left-0",
              isIndustryOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            )}>
              {industryOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleIndustryChange(option)}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between",
                    formData.industry === option ? "bg-purple-50 text-purple-700 font-bold" : "text-slate-700 hover:bg-slate-50 font-medium"
                  )}
                >
                  {option}
                  {formData.industry === option && <Check className="w-4 h-4 text-purple-600" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="email" className="text-sm font-bold text-slate-800">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-slate-900",
              errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-purple-600"
            )}
            placeholder="Enter business email"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>

        {/* Phone No */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="phone" className="text-sm font-bold text-slate-800">
            Phone No
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-slate-900",
              errors.phone ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-purple-600"
            )}
            placeholder="+1 (555) 000-0000"
          />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
        </div>

        {/* Address */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="address" className="text-sm font-bold text-slate-800">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all text-slate-900"
            placeholder="Enter full address"
          />
        </div>

        {/* Website */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="website" className="text-sm font-bold text-slate-800">
            Website
          </label>
          <input
            id="website"
            name="website"
            type="text"
            value={formData.website}
            onChange={handleChange}
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-slate-900",
              errors.website ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-purple-600"
            )}
            placeholder="www.example.com"
          />
          {errors.website && <p className="text-xs text-red-500">{errors.website}</p>}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-sm tracking-wide hover:bg-purple-700 transition-colors shadow-sm"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
      <StatusModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={modalType}
        title={modalTitle}
        message={modalMessage}
      />
    </form>
  )
}
