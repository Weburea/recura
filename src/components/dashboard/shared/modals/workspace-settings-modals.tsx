"use client"

import {
  X,
  ChevronRight,
  ShieldCheck,
  Users,
  Layout,
  Settings2,
  Plus,
  Trash2,
  Search,
  MessageSquare
} from "lucide-react"
import NextImage from "next/image"
import { cn } from "@/lib/utils"

export type SettingsModalType = 'profile' | 'users' | 'security' | 'billing' | 'roles'

interface WorkspaceSettingsModalsProps {
  type: SettingsModalType | null
  isOpen: boolean
  onClose: () => void
  onSave: () => void

  // Data props (passed from parent state)
  profileData?: any
  setProfileData?: (data: any) => void
  profileErrors?: any

  selectedIndustry?: string
  setSelectedIndustry?: (industry: string) => void
  isIndustryOpen?: boolean
  setIsIndustryOpen?: (open: boolean) => void

  users?: any[]
  // setUsers?: (users: any[]) => void // Removed: Unused
  deleteUser?: (id: number) => void

  activeSessions?: any[]
  revokeSession?: (id: number) => void

  twoFactorEnabled?: boolean
  toggle2FA?: () => void

  activeProvider?: string
  setActiveProvider?: (provider: any) => void
  providersConfig?: any
  toggleProvider?: (provider: string) => void

  isAddingMember?: boolean
  setIsAddingMember?: (adding: boolean) => void
  newMember?: any
  setNewMember?: (member: any) => void

  editingUser?: any
  setEditingUser?: (user: any) => void

  userFilter?: 'active' | 'inactive'
  setUserFilter?: (filter: 'active' | 'inactive') => void

  // isCreatingRole?: boolean // Removed: Unused
  // setIsCreatingRole?: (creating: boolean) => void // Removed: Unused
  // newRoleData?: any // Removed: Unused
  // setNewRoleData?: (data: any) => void // Removed: Unused

  isCreatingProvider?: boolean
  setIsCreatingProvider?: (creating: boolean) => void
}

export function WorkspaceSettingsModals({
  type,
  isOpen,
  onClose,
  onSave,
  profileData,
  setProfileData,
  profileErrors = {},
  selectedIndustry,
  setSelectedIndustry,
  isIndustryOpen,
  setIsIndustryOpen,
  users = [],
  // setUsers, // Removed: Unused
  deleteUser,
  activeSessions = [],
  revokeSession,
  twoFactorEnabled,
  toggle2FA,
  activeProvider,
  setActiveProvider,
  providersConfig,
  toggleProvider,
  isAddingMember,
  setIsAddingMember,
  newMember,
  setNewMember,
  editingUser,
  setEditingUser,
  userFilter,
  setUserFilter,
  // isCreatingRole, // Removed: Unused
  // setIsCreatingRole, // Removed: Unused
  // newRoleData, // Removed: Unused
  // setNewRoleData, // Removed: Unused
  isCreatingProvider,
  setIsCreatingProvider
}: WorkspaceSettingsModalsProps) {
  if (!isOpen || !type) return null

  const industries = ["SaaS & Software", "E-commerce", "Fintech", "Healthcare", "Education"]

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#150a2e] rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-100 dark:border-white/10 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize tracking-tight">
            {type === 'profile' ? 'Company Profile' : type === 'users' ? 'User Management' : type === 'roles' ? 'Team Roles' : type === 'security' ? 'Security Settings' : 'Payment Settings'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors">
             <X className="w-5 h-5 text-slate-400 dark:text-slate-500" />
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          {/* Profile Modal */}
          {type === 'profile' && profileData && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5 sm:space-y-2">
                   <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight sm:tracking-normal">Company Name</label>
                   <input 
                     type="text" 
                     value={profileData.name} 
                     onChange={(e) => setProfileData?.({...profileData, name: e.target.value})}
                     className={cn(
                       "w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm sm:text-base text-slate-900 dark:text-white font-medium",
                       profileErrors.name ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-white/10 focus:border-purple-600 dark:focus:border-purple-500"
                     )}
                     placeholder="Company Name"
                   />
                   {profileErrors.name && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{profileErrors.name}</p>}
                </div>
                <div className="space-y-1.5 sm:space-y-2 relative">
                   <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-[0.05em]">Industry</label>
                   <button 
                     onClick={() => setIsIndustryOpen?.(!isIndustryOpen)}
                     className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 bg-white dark:bg-white/5 text-sm sm:text-base text-slate-900 dark:text-white font-medium flex items-center justify-between group h-[40px] sm:h-[48px] hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                   >
                      <span className="truncate">{selectedIndustry}</span>
                      <ChevronRight className={cn("w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform shrink-0", isIndustryOpen ? "rotate-90 text-purple-600" : "")} />
                   </button>
                   {isIndustryOpen && (
                     <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white dark:bg-[#1e143d] border border-gray-100 dark:border-white/10 rounded-xl shadow-xl z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                        {industries.map((ind) => (
                          <button
                            key={ind}
                            onClick={() => {
                              setSelectedIndustry?.(ind);
                              setIsIndustryOpen?.(false);
                            }}
                            className={cn(
                              "w-full px-4 py-2.5 text-left text-sm font-medium transition-colors hover:bg-slate-50 dark:hover:bg-white/5",
                              selectedIndustry === ind ? "text-purple-600 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-500/10" : "text-slate-600 dark:text-slate-300"
                            )}
                          >
                            {ind}
                          </button>
                        ))}
                     </div>
                   )}
                </div>
                <div className="sm:col-span-2 space-y-1.5 sm:space-y-2">
                   <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight sm:tracking-normal">Email</label>
                   <input 
                     type="email" 
                     value={profileData.email} 
                     onChange={(e) => setProfileData?.({...profileData, email: e.target.value})}
                     className={cn(
                       "w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm sm:text-base text-slate-900 dark:text-white font-medium",
                       profileErrors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-white/10 focus:border-purple-600 dark:focus:border-purple-500"
                     )}
                     placeholder="email@example.com"
                   />
                   {profileErrors.email && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{profileErrors.email}</p>}
                </div>
                <div className="sm:col-span-2 space-y-1.5 sm:space-y-2">
                   <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight sm:tracking-normal">Phone No</label>
                   <input 
                     type="tel" 
                     value={profileData.phone} 
                     onChange={(e) => setProfileData?.({...profileData, phone: e.target.value})}
                     className={cn(
                       "w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm sm:text-base text-slate-900 dark:text-white font-medium",
                       profileErrors.phone ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-white/10 focus:border-purple-600 dark:focus:border-purple-500"
                     )}
                     placeholder="+1 (555) 000-0000"
                   />
                   {profileErrors.phone && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{profileErrors.phone}</p>}
                </div>
                <div className="sm:col-span-2 space-y-1.5 sm:space-y-2">
                   <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight sm:tracking-normal">Address</label>
                   <textarea 
                     rows={2} 
                     value={profileData.address} 
                     onChange={(e) => setProfileData?.({...profileData, address: e.target.value})}
                     className={cn(
                       "w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm sm:text-base text-slate-900 dark:text-white font-medium resize-none",
                       profileErrors.address ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-white/10 focus:border-purple-600 dark:focus:border-purple-500"
                     )}
                     placeholder="Enter company address"
                   />
                   {profileErrors.address && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{profileErrors.address}</p>}
                </div>
                <div className="sm:col-span-2 space-y-1.5 sm:space-y-2">
                   <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight sm:tracking-normal">Website</label>
                   <input 
                     type="text" 
                     value={profileData.website} 
                     onChange={(e) => setProfileData?.({...profileData, website: e.target.value})}
                     className={cn(
                       "w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm sm:text-base text-slate-900 dark:text-white font-medium",
                       profileErrors.website ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-white/10 focus:border-purple-600 dark:focus:border-purple-500"
                     )}
                     placeholder="www.example.com"
                   />
                   {profileErrors.website && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{profileErrors.website}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Users Modal */}
          {type === 'users' && (
            <div className="space-y-6">
               {isAddingMember ? (
                  <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                     <button onClick={() => setIsAddingMember?.(false)} className="text-purple-600 text-sm font-bold flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 rotate-180" /> Back to List
                     </button>
                     <div className="space-y-4">
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-800 dark:text-slate-200">Full Name</label>
                           <input 
                             type="text" 
                             placeholder="Enter member name"
                             value={newMember?.name}
                             onChange={(e) => setNewMember?.({...newMember, name: e.target.value})}
                             className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 bg-white dark:bg-white/5 text-slate-900 dark:text-white font-medium" 
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-800 dark:text-slate-200">Role / Designation</label>
                           <input 
                             type="text" 
                             placeholder="e.g. Designer, Developer"
                             value={newMember?.role}
                             onChange={(e) => setNewMember?.({...newMember, role: e.target.value})}
                             className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 bg-white dark:bg-white/5 text-slate-900 dark:text-white font-medium" 
                           />
                        </div>
                        <div className="pt-2">
                           <button 
                             onClick={() => {
                               setIsAddingMember?.(false);
                               onSave();
                             }}
                             className="w-full py-3 rounded-xl bg-purple-600 text-white font-black text-sm tracking-tight hover:bg-purple-700 transition-all"
                           >
                             Add Team Member
                           </button>
                        </div>
                     </div>
                  </div>
               ) : editingUser ? (
                  <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                     <button onClick={() => setEditingUser?.(null)} className="text-purple-600 text-sm font-bold flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 rotate-180" /> Back to List
                     </button>
                     <div className="space-y-4">
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-800 dark:text-slate-200">Full Name</label>
                           <input type="text" defaultValue={editingUser?.name} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 bg-white dark:bg-white/5 text-slate-900 dark:text-white font-medium" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-800 dark:text-slate-200">Role / Designation</label>
                           <input type="text" defaultValue={editingUser?.role} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 bg-white dark:bg-white/5 text-slate-900 dark:text-white font-medium" />
                        </div>
                        <div className="flex items-center gap-4 pt-2">
                           <button onClick={() => setEditingUser?.(null)} className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-black text-sm tracking-tight hover:bg-purple-700 transition-all">
                             Update User
                           </button>
                        </div>
                     </div>
                  </div>
               ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Search members..."
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 focus:border-purple-200 focus:ring-4 focus:ring-purple-600/5 transition-all text-sm font-medium"
                      />
                    </div>
                    <button 
                      onClick={() => setIsAddingMember?.(true)}
                      className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-purple-600 text-white font-bold text-xs tracking-tight hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20 whitespace-nowrap"
                    >
                      <Plus className="w-4 h-4" />
                      Add New Member
                    </button>
                  </div>

                  {/* Users Filter Tabs */}
                  <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-white/5 rounded-2xl w-fit">
                    <button 
                      onClick={() => setUserFilter?.('active')}
                      className={cn(
                        "px-6 py-2 rounded-xl text-xs font-bold transition-all",
                        userFilter === 'active' ? "bg-white dark:bg-white/10 text-purple-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      Active
                    </button>
                    <button 
                      onClick={() => setUserFilter?.('inactive')}
                      className={cn(
                        "px-6 py-2 rounded-xl text-xs font-bold transition-all",
                        userFilter === 'inactive' ? "bg-white dark:bg-white/10 text-purple-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      Inactive
                    </button>
                  </div>

                  {/* Users List */}
                  <div className="space-y-3">
                    {users.filter(u => userFilter === 'active' ? u.active : !u.active).map((user: any) => (
                      <div key={user.id} className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-50 dark:border-white/5 group shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm relative">
                            <NextImage src={user.img} width={48} height={48} className="w-full h-full object-cover" alt={user.name} />
                            <div className={cn(
                              "absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-[#150a2e]",
                              user.active ? "bg-emerald-500" : "bg-slate-300"
                            )} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</h4>
                              <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[9px] font-black uppercase tracking-widest">{user.role}</span>
                            </div>
                            <p className="text-[10px] font-medium text-slate-400 lowercase tracking-tight">{user.name.split(' ')[0].toLowerCase()}@recura.com</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setEditingUser?.(user)}
                            className="p-2 text-slate-300 hover:text-purple-600 transition-colors"
                          >
                            <Settings2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteUser?.(user.id)}
                            className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
               )}
            </div>
          )}

          {/* Roles Modal */}
          {type === 'roles' && (
            <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Super Admin', permissions: 'Full Access', count: 2, icon: ShieldCheck, color: 'text-purple-600 bg-purple-50' },
                    { title: 'Team Manager', permissions: 'User Mgmt, Billing', count: 4, icon: Users, color: 'text-blue-600 bg-blue-50' },
                    { title: 'Support Agent', permissions: 'Read Only', count: 8, icon: MessageSquare, color: 'text-emerald-600 bg-emerald-50' },
                    { title: 'Custom Role', permissions: 'Limited Access', count: 1, icon: Plus, color: 'text-slate-400 bg-slate-50' },
                  ].map((role, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 group hover:border-purple-200 transition-all cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", role.color)}>
                          <role.icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{role.count} Users</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{role.title}</h4>
                      <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        {role.permissions}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/10">
                  <button 
                    onClick={() => {
                      // Fallback for documentation preview if prop not passed
                      console.log("Create role clicked");
                    }}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-purple-600 text-white font-black text-sm tracking-tight hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/30"
                  >
                    <Plus className="w-5 h-5" />
                    Create New Role
                  </button>
                </div>
              </div>
            )}

          {/* Security Modal */}
          {type === 'security' && (
            <div className="space-y-8 py-4">
               <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Two-Factor Authentication</h4>
                        <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Security enhanced via SMS or Authenticator app</p>
                     </div>
                  </div>
                  <button 
                    onClick={toggle2FA}
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative flex items-center px-1",
                      twoFactorEnabled ? "bg-purple-600" : "bg-slate-200 dark:bg-white/10"
                    )}
                  >
                     <div className={cn(
                       "w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200",
                       twoFactorEnabled ? "translate-x-6" : "translate-x-0"
                     )} />
                  </button>
               </div>
               
               <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center">
                           <ShieldCheck className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                        </div>
                        <div>
                           <h4 className="text-sm font-bold text-slate-900 dark:text-white">Workspace Session Timeout</h4>
                           <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Automatic logout after inactivity period</p>
                        </div>
                     </div>
                     <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white text-xs font-bold">
                        30 Mins
                        <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                     </button>
                  </div>
               </div>
               <div className="space-y-4">
                   <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-2">Active Sessions</h4>
                    <div className="space-y-2">
                     {activeSessions.map(session => (
                        <div key={session.id} className="p-4 rounded-2xl border border-gray-100 dark:border-white/10 flex items-center justify-between bg-white dark:bg-white/5 hover:border-gray-200 dark:hover:border-white/20 transition-all">
                           <div className="flex items-center gap-3">
                              <Layout className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                              <div>
                                 <p className="text-sm font-bold text-slate-900 dark:text-white">{session.name}</p>
                                 <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">{session.ip} • Active Now</p>
                              </div>
                           </div>
                           <button 
                             onClick={() => revokeSession?.(session.id)}
                             className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest px-3 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                           >
                             Revoke
                           </button>
                        </div>
                     ))}
                  </div>
                </div>
             </div>
          )}

          {/* Billing Modal */}
          {type === 'billing' && providersConfig && (activeProvider) && (
             <div className="space-y-8 py-4">
                {isCreatingProvider ? (
                   <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <button onClick={() => setIsCreatingProvider?.(false)} className="text-purple-600 text-sm font-bold flex items-center gap-2">
                         <ChevronRight className="w-4 h-4 rotate-180" /> Back to Providers
                      </button>
                      <div className="space-y-4">
                         <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight">Gateway Name</label>
                            <input type="text" placeholder="e.g. Stripe, PayPal" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 bg-white dark:bg-white/5 text-slate-900 dark:text-white font-medium" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight">Live API Key</label>
                            <input type="password" placeholder="sk_live_••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 bg-white dark:bg-white/5 text-slate-900 dark:text-white font-medium" />
                         </div>
                         <button 
                           onClick={() => {
                             setIsCreatingProvider?.(false);
                             onSave();
                           }}
                           className="w-full py-4 rounded-xl bg-purple-600 text-white font-black text-sm tracking-tight hover:bg-purple-700 transition-all mt-2"
                         >
                            Connect Gateway
                         </button>
                      </div>
                   </div>
                ) : (
                   <div className="space-y-6">
                      <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-white/5 rounded-2xl">
                         {['stripe', 'flutterwave', 'paystack', 'paypal'].map((p) => (
                           <button 
                             key={p}
                             onClick={() => setActiveProvider?.(p as any)}
                             className={cn(
                               "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                               activeProvider === p ? "bg-white dark:bg-white/10 text-purple-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                             )}
                           >
                             {p}
                           </button>
                         ))}
                      </div>

                      <div className="space-y-6">
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10">
                                  <Settings2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                               </div>
                               <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white capitalize">{activeProvider} Configuration</h4>
                                  <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Configure your payment gateway credentials</p>
                               </div>
                            </div>
                             <button 
                                onClick={() => toggleProvider?.(activeProvider || '')}
                                className={cn(
                                  "w-12 h-6 rounded-full transition-colors relative flex items-center px-1",
                                  providersConfig[activeProvider || '']?.enabled ? "bg-purple-600" : "bg-slate-200 dark:bg-white/10"
                                )}
                             >
                               <div className={cn(
                                 "w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200",
                                 providersConfig[activeProvider || '']?.enabled ? "translate-x-6" : "translate-x-0"
                               )} />
                            </button>
                         </div>

                         <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-white/10">
                            <div className="space-y-2">
                               <label className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight">
                                  {activeProvider === 'paypal' ? 'PayPal Client ID' : 'Live API Key'}
                                </label>
                               <input 
                                  type="password" 
                                  placeholder={activeProvider === 'paypal' ? 'Enter Client ID' : 'sk_live_••••••••••••••••'}
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 bg-white dark:bg-white/5 text-slate-900 dark:text-white font-medium" 
                                />
                            </div>
                            {activeProvider === 'paypal' && (
                              <div className="space-y-2">
                                 <label className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight">Secret Key</label>
                                 <input 
                                    type="password" 
                                    placeholder="Enter Secret Key"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 bg-white dark:bg-white/5 text-slate-900 dark:text-white font-medium" 
                                 />
                              </div>
                            )}
                            {activeProvider !== 'paypal' && (
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight">Webhook Secret</label>
                                <input type="text" defaultValue="whsec_••••••••••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 bg-white dark:bg-white/5 text-slate-900 dark:text-white font-mono text-sm" />
                              </div>
                            )}
                            <button onClick={onSave} className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white/10 text-white dark:text-slate-200 font-black text-sm tracking-tight hover:bg-slate-800 dark:hover:bg-white/20 transition-all mt-4 border border-transparent dark:border-white/10">
                               Update {activeProvider?.charAt(0).toUpperCase() || ''}{activeProvider?.slice(1) || ''} Credentials
                            </button>

                            <button 
                               onClick={() => setIsCreatingProvider?.(true)}
                               className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-white/10 text-slate-400 dark:text-slate-500 font-bold hover:border-purple-600 hover:text-purple-600 transition-all flex items-center justify-center gap-2 mt-4"
                            >
                               <Plus className="w-4 h-4" />
                               Add New Payment Method
                            </button>
                         </div>
                      </div>
                   </div>
                )}
             </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-slate-400 dark:text-slate-500 font-bold hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onSave}
            className="px-8 py-2.5 rounded-xl bg-purple-600 text-white font-black text-sm tracking-tight hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
