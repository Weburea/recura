"use client"

import { useState } from "react"
import { 
  Camera, 
  MapPin, 
  Globe, 
  ShieldCheck, 
  Clock, 
  Key, 
  Smartphone, 
  Laptop, 
  CheckCircle2,
  Trash2,
  ChevronRight,
  Eye,
  EyeOff,
  UserCog,
  Shield,
  Briefcase,
  AlertTriangle,
  Mail,
  Users,
  Search
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
// Use your standard status modal if available
import { StatusModal, StatusType } from "@/components/dashboard/shared/modals/status-modal"

export function AdminProfileForm() {
  const [showStatus, setShowStatus] = useState(false)
  const [statusType, setStatusType] = useState<StatusType>("success")
  const [statusTitle, setStatusTitle] = useState("")
  const [statusMessage, setStatusMessage] = useState("")

  // Security Toggles State
  const [securitySettings, setSecuritySettings] = useState({
    billing: true,
    viewData: true,
    analytics: true,
    inviteMembers: true,
    apiAccess: true
  })

  // Custom Dropdown States
  const [selectedRole, setSelectedRole] = useState("Founder")
  const [isRoleOpen, setIsRoleOpen] = useState(false)
  const roles = ["Founder", "CEO", "Manager", "Developer", "Designer"]

  const [selectedTimezone, setSelectedTimezone] = useState("America/New_York")
  const [isTimezoneOpen, setIsTimezoneOpen] = useState(false)
  const timezones = ["Africa/Lagos", "America/New_York", "Europe/London", "Asia/Tokyo"]

  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const languages = ["English", "French", "Spanish", "German"]

  // Password Visibility State
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [activeSessions, setActiveSessions] = useState([
    { browser: "Chrome - Windows", location: "Lagos, Nigeria", time: "5 minutes ago", icon: Laptop, isActive: true },
    { browser: "Safari - iPhone", location: "Abuja", time: "Yesterday", icon: Smartphone, isActive: false },
    { browser: "Chrome - MacBook", location: "London", time: "2 days ago", icon: Laptop, isActive: false }
  ])

  // Profile Image State
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const handleSave = () => {
    setStatusType("success")
    setStatusTitle("Profile Updated")
    setStatusMessage("Your personal account settings have been successfully updated.")
    setShowStatus(true)
  }

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setStatusType("success")
    setStatusTitle("Password Updated")
    setStatusMessage("Your password has been successfully changed.")
    setShowStatus(true)
  }

  const handleLogoutAll = () => {
    setActiveSessions([])
    setStatusType("success")
    setStatusTitle("Sessions Terminated")
    setStatusMessage("All other active sessions have been securely logged out.")
    setShowStatus(true)
  }

  const toggleSecurity = (key: keyof typeof securitySettings) => {
    setSecuritySettings(prev => ({ ...prev, [key]: !prev[key] }))
    setStatusType("success")
    setStatusTitle("Security Setting Updated")
    setStatusMessage("Your login security preferences have been successfully saved.")
    setShowStatus(true)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProfileImage(imageUrl)
      setStatusType("success")
      setStatusTitle("Photo Uploaded")
      setStatusMessage("Your profile picture has been successfully updated.")
      setShowStatus(true)
    }
  }

  return (
    <div className="space-y-6 md:space-y-8 pb-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Admin Profile
          </h2>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1">Manage your personal account settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column (Profile & Personal Info) */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          
          {/* Profile Overview */}
          <div className="bg-white dark:bg-[#150a2e] p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
                Profile Overview
              </h3>
              <div className="relative">
                {/* Removed Edit Profile button per feedback */}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-28 h-28 rounded-full bg-purple-100 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden shrink-0 group">
                  {profileImage ? (
                    <Image src={profileImage} alt="Profile" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-3xl font-black">
                      AU
                    </div>
                  )}
                  <button className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm cursor-pointer">
                    <Camera className="w-8 h-8 text-white" />
                  </button>
                </div>
                <label className="px-4 py-1.5 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 dark:bg-white/10 dark:hover:bg-white dark:bg-[#150a2e]/10 dark:bg-white dark:bg-[#150a2e]/10 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/20 rounded-lg text-xs font-bold transition-colors w-full shadow-sm cursor-pointer text-center relative overflow-hidden">
                  <span>Upload Photo</span>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleImageUpload} />
                </label>
              </div>

              {/* Basic Info */}
              <div className="flex-1 space-y-5 w-full">
                <div>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Admin User</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-purple-50 text-purple-700 text-[11px] font-black border border-purple-100 uppercase tracking-widest">
                      <Shield className="w-3 h-3" /> Owner
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                    <span className="font-medium text-slate-600 dark:text-slate-300">admin@recura.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Briefcase className="w-4 h-4 text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                    <span className="font-medium text-slate-600 dark:text-slate-300">Recura Inc.</span>
                  </div>
                </div>
              </div>

              {/* Status & Verification */}
              <div className="flex-1 w-full bg-slate-50 dark:bg-white/5 dark:bg-white dark:bg-[#150a2e]/50 p-5 rounded-2xl border border-slate-100 dark:border-white/10">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-white/10">
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Account Status:</span>
                  <span className="flex items-center gap-1.5 text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                  </span>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Last Login:</span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Today at 10:43 AM
                  </span>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">Profile Completion: <span className="text-slate-900 dark:text-white">80%</span></span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-white/10 dark:bg-white dark:bg-[#150a2e]/10 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[80%] rounded-full relative">
                      <div className="absolute inset-0 bg-white dark:bg-[#150a2e]/20 w-full h-full animate-[shimmer_2s_infinite] -translate-x-full" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 flex justify-end">
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-black transition-colors border border-emerald-100 shadow-sm cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white dark:bg-[#150a2e] p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 tracking-tight">
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5 sm:space-y-2 md:col-span-2">
                <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight sm:tracking-normal ml-1">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Admin User"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border bg-white dark:bg-[#150a2e] focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm sm:text-base text-slate-900 dark:text-white font-medium border-gray-200 dark:border-white/10 focus:border-purple-600"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2 md:col-span-2">
                <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight sm:tracking-normal ml-1">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="admin@recura.com"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border bg-white dark:bg-[#150a2e] focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm sm:text-base text-slate-900 dark:text-white font-medium border-gray-200 dark:border-white/10 focus:border-purple-600"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2 md:col-span-2">
                <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight sm:tracking-normal ml-1">Phone</label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 py-3 rounded-l-xl border border-r-0 border-gray-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 dark:bg-white dark:bg-[#150a2e]/5 text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium text-sm">
                    +1
                  </span>
                  <input 
                    type="text" 
                    placeholder="XXX-XX-XXXX"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-r-xl border bg-white dark:bg-[#150a2e] focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm sm:text-base text-slate-900 dark:text-white font-medium border-gray-200 dark:border-white/10 focus:border-purple-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2 relative">
                 <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight sm:tracking-normal ml-1">Job Title</label>
                 <button 
                   onClick={() => setIsRoleOpen(!isRoleOpen)}
                   className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-purple-600 bg-white dark:bg-[#150a2e] text-sm sm:text-base text-slate-900 dark:text-white font-medium flex items-center justify-between group h-[40px] sm:h-[48px]"
                 >
                    <span className="truncate">{selectedRole}</span>
                    <ChevronRight className={cn("w-4 h-4 text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 transition-transform shrink-0", isRoleOpen ? "rotate-90" : "")} />
                 </button>
                 {isRoleOpen && (
                   <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white dark:bg-[#150a2e] border border-gray-100 dark:border-white/10 rounded-xl shadow-xl z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                      {roles.map((role) => (
                        <button
                          key={role}
                          onClick={() => {
                            setSelectedRole(role);
                            setIsRoleOpen(false);
                          }}
                          className={cn(
                            "w-full px-4 py-2.5 text-left text-sm font-medium transition-colors hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-white/5 dark:hover:bg-white dark:bg-[#150a2e]/5 dark:bg-white dark:bg-[#150a2e]/5",
                            selectedRole === role ? "text-purple-600 bg-purple-50/50" : "text-slate-600 dark:text-slate-300"
                          )}
                        >
                          {role}
                        </button>
                      ))}
                   </div>
                 )}
              </div>

              <div className="space-y-1.5 sm:space-y-2 relative">
                 <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight sm:tracking-normal ml-1">Timezone</label>
                 <button 
                   onClick={() => setIsTimezoneOpen(!isTimezoneOpen)}
                   className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-purple-600 bg-white dark:bg-[#150a2e] text-sm sm:text-base text-slate-900 dark:text-white font-medium flex items-center justify-between group h-[40px] sm:h-[48px]"
                 >
                    <div className="flex items-center gap-2 truncate">
                      <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 shrink-0" />
                      <span className="truncate">{selectedTimezone}</span>
                    </div>
                    <ChevronRight className={cn("w-4 h-4 text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 transition-transform shrink-0", isTimezoneOpen ? "rotate-90" : "")} />
                 </button>
                 {isTimezoneOpen && (
                   <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white dark:bg-[#150a2e] border border-gray-100 dark:border-white/10 rounded-xl shadow-xl z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                      {timezones.map((tz) => (
                        <button
                          key={tz}
                          onClick={() => {
                            setSelectedTimezone(tz);
                            setIsTimezoneOpen(false);
                          }}
                          className={cn(
                            "w-full px-4 py-2.5 text-left text-sm font-medium transition-colors hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-white/5 dark:hover:bg-white dark:bg-[#150a2e]/5 dark:bg-white dark:bg-[#150a2e]/5",
                            selectedTimezone === tz ? "text-purple-600 bg-purple-50/50" : "text-slate-600 dark:text-slate-300"
                          )}
                        >
                          {tz}
                        </button>
                      ))}
                   </div>
                 )}
              </div>

              <div className="space-y-1.5 sm:space-y-2 relative md:col-span-2">
                 <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight sm:tracking-normal ml-1 flex items-center gap-2">Language</label>
                 <button 
                   onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                   className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-purple-600 bg-white dark:bg-[#150a2e] text-sm sm:text-base text-slate-900 dark:text-white font-medium flex items-center justify-between group h-[40px] sm:h-[48px]"
                 >
                    <div className="flex items-center gap-2 truncate">
                      <Globe className="w-4 h-4 text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 shrink-0" />
                      <span className="truncate">{selectedLanguage}</span>
                    </div>
                    <ChevronRight className={cn("w-4 h-4 text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 transition-transform shrink-0", isLanguageOpen ? "rotate-90" : "")} />
                 </button>
                 {isLanguageOpen && (
                   <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white dark:bg-[#150a2e] border border-gray-100 dark:border-white/10 rounded-xl shadow-xl z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setSelectedLanguage(lang);
                            setIsLanguageOpen(false);
                          }}
                          className={cn(
                            "w-full px-4 py-2.5 text-left text-sm font-medium transition-colors hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-white/5 dark:hover:bg-white dark:bg-[#150a2e]/5 dark:bg-white dark:bg-[#150a2e]/5",
                            selectedLanguage === lang ? "text-purple-600 bg-purple-50/50" : "text-slate-600 dark:text-slate-300"
                          )}
                        >
                          {lang}
                        </button>
                      ))}
                   </div>
                 )}
              </div>

            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/10">
               <Link href="/dashboard/settings/notifications" className="text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-2">
                 Manage Notification Preferences <ChevronRight className="w-4 h-4" />
               </Link>
            </div>
            
          </div>
          
           {/* Login Security (Toggles) */}
          <div className="bg-white dark:bg-[#150a2e] p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 dark:bg-white/5 dark:bg-white dark:bg-[#150a2e]/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
            
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 tracking-tight">
              Login Security
            </h3>

            <div className="space-y-2">
              {[
                { id: "billing", label: "Billing Management", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
                { id: "viewData", label: "View Customer Data", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
                { id: "analytics", label: "Ivied Analytics", icon: Search, color: "text-purple-500", bg: "bg-purple-50" },
                { id: "inviteMembers", label: "Invite & Manage Members", icon: UserCog, color: "text-orange-500", bg: "bg-orange-50" },
                { id: "apiAccess", label: "API Access", icon: Key, color: "text-slate-700 dark:text-slate-300", bg: "bg-slate-100 dark:bg-white/10 dark:bg-white dark:bg-[#150a2e]/10" }
              ].map((item) => {
                // @ts-expect-error - Dynamic key access
                const isEnabled = securitySettings[item.id]
                return (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-white/5 dark:hover:bg-white dark:bg-[#150a2e]/5 transition-colors bg-white dark:bg-[#150a2e]">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", item.bg, item.color)}>
                        {item.id === "viewData" ? <Eye className="w-4 h-4" /> : <item.icon className="w-4 h-4" />}
                      </div>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.label}</span>
                    </div>
                    
                    <button 
                      // @ts-expect-error - Dynamic key access
                      onClick={() => toggleSecurity(item.id)}
                      className={cn(
                        "w-12 h-6 rounded-full transition-all relative flex items-center px-1 cursor-pointer border",
                        isEnabled ? "bg-purple-600 border-purple-600" : "bg-slate-100 dark:bg-white/10 dark:bg-white dark:bg-[#150a2e]/10 border-slate-200 dark:border-white/20"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 bg-white dark:bg-[#150a2e] rounded-full shadow-sm transition-all duration-300",
                        isEnabled ? "translate-x-6" : "translate-x-0"
                      )} />
                    </button>
                  </div>
                )
              })}
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/10">
               <Link href="/dashboard/settings/notifications" className="text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-2">
                 Manage Notification Preferences <ChevronRight className="w-4 h-4" />
               </Link>
            </div>
          </div>
          
        </div>

        {/* Right Column (Security & Auth) */}
        <div className="lg:col-span-1 space-y-6 lg:space-y-8">
          
          {/* Security & Authentication */}
          <div className="bg-white dark:bg-[#150a2e] p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-2xl -z-10" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 tracking-tight">
              Security & Authentication
            </h3>

            <form onSubmit={handleUpdatePassword} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Current Password</label>
                <div className="relative group">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                  <input 
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    required
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-white/20 bg-slate-50 dark:bg-white/5 focus:bg-white dark:bg-[#150a2e] focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all font-medium text-slate-900 dark:text-white shadow-sm text-sm"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-300 transition-colors p-1"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">New Password</label>
                <div className="relative group">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                  <input 
                    type={showNewPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    required
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-white/20 bg-slate-50 dark:bg-white/5 focus:bg-white dark:bg-[#150a2e] focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all font-medium text-slate-900 dark:text-white shadow-sm text-sm"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-300 transition-colors p-1"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Confirm New Password</label>
                <div className="relative group">
                  <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    required
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-white/20 bg-slate-50 dark:bg-white/5 focus:bg-white dark:bg-[#150a2e] focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all font-medium text-slate-900 dark:text-white shadow-sm text-sm"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-300 transition-colors p-1"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-white/10 mt-6">
                <button
                  type="button"
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-slate-100 dark:bg-white/10 dark:bg-white dark:bg-[#150a2e]/10 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 opacity-70" /> Enable 2FA
                </button>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-white dark:bg-[#150a2e] border border-slate-200 dark:border-white/20 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-white/5 dark:hover:bg-white dark:bg-[#150a2e]/5 dark:bg-white dark:bg-[#150a2e]/5 hover:border-slate-300 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>

          {/* Active Sessions */}
          <div className="bg-white dark:bg-[#150a2e] p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 tracking-tight">
              Active Sessions
            </h3>

            <div className="space-y-4">
              {activeSessions.map((session, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 dark:bg-white dark:bg-[#150a2e]/30 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-white/5 dark:hover:bg-white dark:bg-[#150a2e]/5 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#150a2e] border border-slate-200 dark:border-white/20 flex items-center justify-center shrink-0">
                    <session.icon className="w-5 h-5 text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{session.browser}</h4>
                      <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 whitespace-nowrap">{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 truncate">{session.location}</span>
                      {session.isActive && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-wider">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {activeSessions.length === 0 && (
                <div className="text-center py-6 text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium bg-slate-50 dark:bg-white/5 dark:bg-white dark:bg-[#150a2e]/50 rounded-xl border border-dashed border-slate-200 dark:border-white/20">
                  No other active sessions.
                </div>
              )}
            </div>

            <button 
              onClick={handleLogoutAll}
              disabled={activeSessions.length === 0}
              className="w-full mt-6 py-3 px-4 bg-slate-50 dark:bg-white/5 dark:bg-white dark:bg-[#150a2e]/5 hover:bg-purple-50 text-slate-700 dark:text-slate-300 hover:text-purple-600 border border-slate-200 dark:border-white/20 hover:border-purple-200 rounded-xl text-sm font-bold transition-all shadow-sm cursor-pointer border-dashed disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Log Out All Sessions
            </button>
          </div>

          {/* Danger Zone */}
          <div className="bg-rose-50/30 p-6 md:p-8 rounded-2xl border border-rose-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <h3 className="text-lg font-bold text-rose-700 tracking-tight">
                Danger Zone
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-rose-100 bg-white dark:bg-[#150a2e]">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Transfer Workspace Ownership</span>
                </div>
                <button 
                  onClick={() => {
                    setStatusType("success")
                    setStatusTitle("Workspace Transfer Initiated")
                    setStatusMessage("Instructions to transfer ownership have been sent to your email.")
                    setShowStatus(true)
                  }}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-white/10 dark:bg-white dark:bg-[#150a2e]/10 hover:bg-slate-200 text-slate-600 dark:text-slate-300 rounded-lg text-[11px] font-bold transition-colors"
                >
                  Transfer
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-rose-100 bg-white dark:bg-[#150a2e]">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-4 h-4 text-rose-500" />
                  <span className="text-sm font-bold text-rose-600">Delete Account</span>
                </div>
                <button 
                  onClick={() => {
                    setStatusType("error")
                    setStatusTitle("Account Deletion Initiated")
                    setStatusMessage("This action is irreversible. Check your email to confirm deletion.")
                    setShowStatus(true)
                  }}
                  className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg text-[11px] font-bold transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <StatusModal 
        isOpen={showStatus}
        onClose={() => setShowStatus(false)}
        type={statusType}
        title={statusTitle}
        message={statusMessage}
      />
    </div>
  )
}
