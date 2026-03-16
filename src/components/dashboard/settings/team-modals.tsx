"use client"

import { X, Mail, Shield, UserPlus, Trash2, Power, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface TeamModalsProps {
  activeModal: 'invite' | 'create-role' | 'edit-member' | 'save-confirm' | null
  onClose: () => void
  onSave?: () => void
}

export function TeamModals({ activeModal, onClose, onSave }: TeamModalsProps) {
  if (!activeModal) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-white dark:bg-[#150a2e] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize tracking-tight">
            {activeModal === 'invite' && 'Invite New Member'}
            {activeModal === 'create-role' && 'Create New Role'}
            {activeModal === 'edit-member' && 'Edit Member Permissions'}
            {activeModal === 'save-confirm' && 'Confirm Changes'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-white/5 dark:hover:bg-white dark:bg-[#150a2e]/5 dark:bg-white dark:bg-[#150a2e]/5 rounded-xl transition-colors">
            <X className="w-5 h-5 text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {activeModal === 'invite' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-800 dark:text-slate-200">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <input 
                    type="email" 
                    placeholder="colleague@business.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-600/5 transition-all text-slate-900 dark:text-white font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-800 dark:text-slate-200">Select Role</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-purple-600 transition-all text-slate-900 dark:text-white font-medium appearance-none bg-white dark:bg-[#150a2e]">
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Support</option>
                  <option>Viewer</option>
                </select>
              </div>
            </div>
          )}

          {activeModal === 'create-role' && (
            <div className="space-y-6 text-left">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-800 dark:text-slate-200">Role Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Finance Admin"
                  className="dashboard-form-input font-bold"
                />
              </div>
              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Permissions</p>
                <div className="grid grid-cols-2 gap-3">
                  {['View Dashboard', 'Manage Billing', 'Edit Profile', 'Invite Users', 'Export Data', 'Manage API'].map(perm => (
                    <label key={perm} className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-white/5 dark:hover:bg-white dark:bg-[#150a2e]/5 dark:bg-white dark:bg-[#150a2e]/5 cursor-pointer group transition-all relative">
                      <div className="relative flex items-center justify-center">
                        <input type="checkbox" className="peer appearance-none w-5 h-5 rounded-full border-2 border-slate-200 dark:border-white/20 checked:border-purple-600 checked:bg-purple-600 transition-all cursor-pointer" />
                        <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all duration-300 pointer-events-none stroke-[4px]" />
                      </div>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:text-white transition-colors">{perm}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeModal === 'edit-member' && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Manage Member Permissions</h4>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1">Select the actions this user can perform</p>
              </div>
              <div className="grid grid-cols-1 gap-4 pt-4">
                <button className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-white/5 dark:hover:bg-white dark:bg-[#150a2e]/5 dark:bg-white dark:bg-[#150a2e]/5 transition-colors text-left group">
                  <div className="flex items-center gap-3">
                    <UserPlus className="w-5 h-5 text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 group-hover:text-purple-600" />
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Change Role</p>
                      <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">Currently: Admin</p>
                    </div>
                  </div>
                  <X className="w-4 h-4 text-slate-300 rotate-45" />
                </button>
                <button className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-white/5 dark:hover:bg-white dark:bg-[#150a2e]/5 dark:bg-white dark:bg-[#150a2e]/5 transition-colors text-left group">
                  <div className="flex items-center gap-3">
                    <Power className="w-5 h-5 text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 group-hover:text-amber-600" />
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Deactivate</p>
                      <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">Suspend access temporarily</p>
                    </div>
                  </div>
                </button>
                <button className="flex items-center justify-between p-4 rounded-2xl border border-red-50 hover:bg-red-50/50 transition-colors text-left group">
                  <div className="flex items-center gap-3">
                    <Trash2 className="w-5 h-5 text-red-300 group-hover:text-red-500" />
                    <div>
                      <p className="text-sm font-bold text-red-600">Remove from Workspace</p>
                      <p className="text-[10px] font-medium text-red-400">Permanently delete user</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {activeModal === 'save-confirm' && (
            <div className="text-center py-6 space-y-6">
              <div className="relative mx-auto w-24 h-24">
                <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
                <div className="relative w-full h-full rounded-[2rem] bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-inner">
                  <Shield className="w-10 h-10 text-emerald-500 animate-siri-float" />
                </div>
              </div>
              <div className="max-w-[280px] mx-auto">
                <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Save Changes?</h4>
                <p className="text-[13px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-2 leading-relaxed">
                  Are you sure you want to update the team configuration? This might affect billing and user access.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 dark:bg-white/5 dark:bg-white dark:bg-[#150a2e]/50 border-t border-gray-100 dark:border-white/10 flex items-center gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#150a2e] text-slate-600 dark:text-slate-300 font-bold text-sm tracking-tight hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={activeModal === 'save-confirm' || activeModal === 'invite' || activeModal === 'create-role' || activeModal === 'edit-member' ? onSave : onClose}
            className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-bold text-sm tracking-tight hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/20"
          >
            {activeModal === 'invite' && 'Send Invite'}
            {activeModal === 'create-role' && 'Create Role'}
            {activeModal === 'edit-member' && 'Apply Changes'}
            {activeModal === 'save-confirm' && 'Confirm & Save'}
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes siri-float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        .animate-siri-float { animation: siri-float 3s ease-in-out infinite; }
      `}</style>
    </div>
  )
}
