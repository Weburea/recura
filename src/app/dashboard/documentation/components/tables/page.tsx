"use client"

import * as React from "react"
import { DocContent } from "@/modules/documentation/components/DocContent"
import { ComponentPreview } from "@/modules/documentation/components/ComponentPreview"
import { 
  MoreHorizontal, 
  Search, 
  ListFilter, 
  Printer, 
  FileSpreadsheet, 
  Download,
  FileText,
  Users,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  Shield,
  UserCog,
  UserMinus,
  Trash2,
  Layout
} from "lucide-react"
import { cn } from "@/lib/utils"

function FullSubscriptionTemplate() {
  const [activeTab, setActiveTab ] = React.useState("All")
  const [showActions, setShowActions] = React.useState(false)
  const [openId, setOpenId] = React.useState<number | null>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenId(null)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])
  
  const subscriptions = [
    { id: 1, name: "Mark Luck", plan: "Enterprise Corp", status: "Active", cycle: "$299.00/mo" },
    { id: 2, name: "Sarah Johnson", plan: "Trial Plan", status: "Trial", cycle: "$0.00/mo" },
    { id: 3, name: "Michael Brown", plan: "Basic Plan", status: "Paused", cycle: "$99.00/mo" }
  ]

  const filtered = activeTab === "All" ? subscriptions : subscriptions.filter(s => s.status === activeTab)

  return (
    <div className="dashboard-card bg-white dark:bg-[#150a2e] border border-slate-100 dark:border-white/10 rounded-[24px] p-0 overflow-hidden shadow-sm w-full min-h-[450px]">
      <div className="p-8 pb-4">
        {/* ... (no changes to header) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Subscription List</h3>
          
          <div className="flex items-center gap-3 justify-end">
            <button 
              onClick={() => setShowActions(!showActions)}
              className={cn(
                "w-11 h-11 rounded-2xl border flex items-center justify-center transition-all cursor-pointer shadow-sm",
                showActions 
                ? "bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-600/10 dark:shadow-purple-900/30" 
                : "bg-white dark:bg-[#150a2e] border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
              )}
            >
              <ListFilter className="w-5 h-5" />
            </button>
            
            <div className={cn(
              "flex items-center gap-3 transition-all duration-300 origin-right",
              showActions ? "opacity-100 translate-x-0 w-auto" : "opacity-0 translate-x-4 w-0 overflow-hidden"
            )}>
              <button className="dashboard-action-btn dashboard-action-btn-secondary">
                <Printer className="w-4 h-4" /> Print
              </button>
              <button className="dashboard-action-btn dashboard-action-btn-primary">
                <FileSpreadsheet className="w-4 h-4" /> Convert to Sheets
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["All", "Active", "Paused", "Canceled"].map((label) => (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                activeTab === label 
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/10 dark:shadow-purple-900/40" 
                  : "bg-transparent text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-600 dark:hover:text-white"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="table-container pt-2">
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-header-cell w-12"><input type="checkbox" className="checkbox-custom" /></th>
              <th className="table-header-cell">Customer</th>
              <th className="table-header-cell">Plan</th>
              <th className="table-header-cell">Status</th>
              <th className="table-header-cell">Billing Cycle</th>
              <th className="table-header-cell text-right pr-8">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-white/5">
            {filtered.map((sub) => (
              <tr key={sub.id} className="table-row-hover">
                <td className="table-data-cell"><input type="checkbox" className="checkbox-custom" /></td>
                <td className="table-data-cell font-bold text-slate-900 dark:text-white">{sub.name}</td>
                <td className="table-data-cell font-bold text-slate-600 dark:text-slate-300">{sub.plan}</td>
                <td className="table-data-cell">
                  <span className={cn("status-badge", sub.status === "Active" ? "status-badge-active" : sub.status === "Trial" ? "status-badge-trial" : "status-badge-paused")}>
                    {sub.status}
                  </span>
                </td>
                <td className="table-data-cell font-bold text-slate-900 dark:text-white">{sub.cycle}</td>
                <td className="table-data-cell text-right pr-8 relative">
                  <button 
                    onClick={() => setOpenId(openId === sub.id ? null : sub.id)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg text-slate-400 transition-colors"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>

                  {openId === sub.id && (
                    <div ref={menuRef} className="absolute right-8 top-full z-50 w-48 bg-white dark:bg-[#150a2e] border border-slate-100 dark:border-white/10 rounded-2xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      {['View Details', 'Edit Subscription', 'Pause', 'Cancel'].map((act) => (
                        <button key={act} className="w-full flex items-center px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                          {act}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Subscription Pagination */}
      <div className="p-8 border-t border-slate-50 dark:border-white/5 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <button className="pagination-btn">
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={cn(
                "pagination-page-btn",
                page === 1 && "pagination-page-btn-active"
              )}
            >
              {page}
            </button>
          ))}
          <button className="pagination-btn">
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function RecentTransactionsTemplate() {
  const [openId, setOpenId] = React.useState<number | null>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenId(null)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const transactions = [
    { id: 1, customer: "Alex Johnson", amount: "$124.00", status: "Approved" },
    { id: 2, customer: "Sarah Miller", amount: "$50.00", status: "Failed" },
    { id: 3, customer: "Mike Ross", amount: "$89.99", status: "Pending" }
  ]

  return (
    <div className="dashboard-card overflow-hidden !p-0 bg-white dark:bg-[#150a2e] border border-slate-100 dark:border-white/10 rounded-[24px] min-h-[380px]">
      <div className="px-8 py-6 border-b border-gray-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
         <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">Recent Transactions</h3>
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Track and manage customer payments</p>
         </div>
         <button className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-sm hover:opacity-90 transition-all shadow-lg shadow-slate-900/10 flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" /> Export CSV
         </button>
      </div>
      <div className="overflow-x-auto">
         <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-white/2">
              <tr>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/30 dark:hover:bg-white/2 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-xs font-black text-slate-600 dark:text-slate-400">
                        {tx.customer[0]}
                      </div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{tx.customer}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-black text-slate-900 dark:text-white">{tx.amount}</td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                      tx.status === "Approved" ? "bg-emerald-50 text-emerald-600" :
                      tx.status === "Failed" ? "bg-rose-50 text-rose-600" : "bg-orange-50 text-orange-600"
                    )}>
                      {tx.status}
                    </span>
                  </td>
                <td className="px-8 py-6 text-right relative">
                  <button 
                    onClick={() => setOpenId(openId === tx.id ? null : tx.id)}
                    className="text-purple-600 dark:text-purple-400 text-xs font-black hover:underline uppercase tracking-widest transition-all"
                  >
                    {openId === tx.id ? 'Close' : 'View'}
                  </button>

                  {openId === tx.id && (
                    <div ref={menuRef} className="absolute right-8 top-full z-50 w-48 bg-white dark:bg-[#150a2e] border border-slate-100 dark:border-white/10 rounded-2xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 text-left">
                        {['Transaction Details', 'Email Invoice', 'Refund'].map((act) => (
                          <button key={act} className="w-full flex items-center px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                            {act}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
         </table>
      </div>

      {/* Transaction Pagination */}
      <div className="px-8 py-5 bg-slate-50/50 dark:bg-white/5 border-t border-gray-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 text-center sm:text-left">
          Showing <span className="text-slate-900 dark:text-white">1</span> to <span className="text-slate-900 dark:text-white">6</span> of <span className="text-slate-900 dark:text-white">14</span> results
        </p>
        <div className="flex items-center justify-center gap-2">
          <button className="p-2 rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 hover:text-purple-600 transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map(page => (
              <button
                key={page}
                className={cn(
                  "w-9 h-9 rounded-xl text-xs font-black transition-all",
                  page === 1 
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30" 
                    : "bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/10 text-slate-400 dark:text-slate-500 hover:text-purple-600"
                )}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="p-2 rounded-xl border border-gray-100 bg-white text-slate-400 hover:text-purple-600 transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function SimpleDropdown({ 
  value, 
  onChange, 
  options, 
  icon: Icon 
}: { 
  value: string, 
  onChange: (val: string) => void, 
  options: string[], 
  icon?: React.ElementType 
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all text-sm font-bold min-w-[140px] justify-between group border",
          isOpen 
            ? "bg-white dark:bg-[#150a2e] border-purple-200 dark:border-purple-900/50 ring-4 ring-purple-600/5 text-slate-900 dark:text-white" 
            : "bg-slate-50 dark:bg-white/5 border-transparent hover:border-slate-200 dark:hover:border-white/20 text-slate-600 dark:text-slate-400"
        )}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className={cn("w-4 h-4", isOpen ? "text-purple-600" : "text-slate-400")} />}
          <span>{value}</span>
        </div>
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen ? "rotate-180 text-purple-600" : "text-slate-300")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-[180px] bg-white dark:bg-[#150a2e] border border-slate-100 dark:border-white/10 rounded-2xl shadow-2xl shadow-purple-600/10 z-[100] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt)
                setIsOpen(false)
              }}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold transition-colors",
                value === opt 
                  ? "text-purple-600 bg-purple-50/50 dark:bg-purple-900/20" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"
              )}
            >
              {opt}
              {value === opt && <Check className="w-4 h-4 text-purple-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function TeamMembersTemplate() {
  const [search, setSearch] = React.useState("")
  const [role, setRole] = React.useState("All Roles")
  const [status, setStatus] = React.useState("All Status")
  const [openId, setOpenId] = React.useState<number | null>(null)
  const [rowsPerPage, setRowsPerPage ] = React.useState(10)
  const [isRowsOpen, setIsRowsOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const rowsRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenId(null)
      if (rowsRef.current && !rowsRef.current.contains(e.target as Node)) setIsRowsOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])
  const members = [
    { id: 1, name: "Admin User", email: "admin@business.com", role: "Owners", status: "Active", lastActive: "Online" },
    { id: 2, name: "Sarah Johnson", email: "sarah@business.com", role: "Admin", status: "Active", lastActive: "5 min ago" },
    { id: 3, name: "Michael Brown", email: "michael@business.com", role: "Management", status: "Active", lastActive: "2 hours ago" },
    { id: 4, name: "Emma Wilson", email: "emma@business.com", role: "Support", status: "Pending", lastActive: "Pending" },
    { id: 5, name: "John Doe", email: "john@business.com", role: "Support", status: "Inactive", lastActive: "2 days ago" },
  ]

  const filtered = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())
    const matchesRole = role === "All Roles" || m.role === role
    const matchesStatus = status === "All Status" || m.status === status
    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="dashboard-card bg-white dark:bg-[#150a2e] border border-slate-100 dark:border-white/10 rounded-[24px] p-0 shadow-sm w-full min-h-[500px]">
      {/* Table Filters */}
      <div className="p-6 border-b border-gray-50 dark:border-white/5 flex flex-wrap items-center justify-between gap-6 bg-white dark:bg-[#150a2e] relative z-40">
        <div className="relative flex-1 md:max-w-xl min-w-[280px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-transparent focus:border-purple-200 focus:ring-4 focus:ring-purple-600/5 transition-all text-sm font-medium outline-none"
          />
        </div>
        <div className="flex items-center gap-4">
          <SimpleDropdown 
            value={role} 
            onChange={setRole} 
            options={["All Roles", "Owners", "Admin", "Management", "Support"]} 
            icon={Users}
          />
          <SimpleDropdown 
            value={status} 
            onChange={setStatus} 
            options={["All Status", "Active", "Pending", "Inactive"]} 
            icon={ListFilter}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-white/2">
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Member</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Role</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Last Active</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-white/5">
            {filtered.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50/50 dark:hover:bg-white/2 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-xs font-black text-slate-600 dark:text-slate-400">
                      {member.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{member.name}</p>
                      <p className="text-[10px] font-medium text-slate-400 tracking-tight">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight",
                    member.role === 'Owners' ? "bg-purple-600 text-white" :
                    member.role === 'Admin' ? "bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400" :
                    member.role === 'Management' ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400" : "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400"
                  )}>
                    {member.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <div className={cn("w-1.5 h-1.5 rounded-full", member.status === 'Active' ? "bg-emerald-500 animate-pulse" : member.status === 'Pending' ? "bg-orange-500" : "bg-slate-400")} />
                    <span className={cn("text-[10px] font-bold", member.status === 'Active' ? "text-emerald-600" : member.status === 'Pending' ? "text-orange-600" : "text-slate-400")}>
                      {member.status === 'Pending' ? 'Pending Invite' : member.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-slate-400 dark:text-slate-500">{member.lastActive}</span>
                </td>
                <td className="px-6 py-4 text-center relative">
                  <button 
                    onClick={() => setOpenId(openId === member.id ? null : member.id)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all"
                  >
                    <MoreHorizontal className="w-5 h-5 text-slate-400" />
                  </button>

                  {openId === member.id && (
                    <div ref={menuRef} className="absolute right-6 top-full z-[100] w-48 bg-white dark:bg-[#150a2e] border border-slate-100 dark:border-white/10 rounded-2xl shadow-2xl shadow-purple-600/10 py-2 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                      {[
                        { label: 'Change Role', icon: Shield, color: 'text-slate-600 dark:text-slate-400' },
                        { label: 'Edit Member', icon: UserCog, color: 'text-slate-600 dark:text-slate-400' },
                        { label: 'Deactivate', icon: UserMinus, color: 'text-slate-600 dark:text-slate-400' },
                        { label: 'Remove', icon: Trash2, color: 'text-rose-500', isDestructive: true },
                      ].map((act) => (
                        <button 
                          key={act.label} 
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold transition-all",
                            act.isDestructive 
                              ? "text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20" 
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"
                          )}
                        >
                          <act.icon className={cn("w-4 h-4", act.isDestructive ? "text-rose-600" : act.color)} />
                          {act.label}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-6 border-t border-gray-50 dark:border-white/5 bg-slate-50 dark:bg-white/2 flex items-center justify-between relative z-30">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rows per page:</span>
          <div className="relative" ref={rowsRef}>
            <button 
              onClick={() => setIsRowsOpen(!isRowsOpen)}
              className={cn(
                "px-3 py-1.5 rounded-lg bg-white dark:bg-[#150a2e] border text-[10px] font-black flex items-center gap-2 transition-all hover:bg-slate-50 dark:hover:bg-white/5",
                isRowsOpen ? "border-purple-300 ring-4 ring-purple-600/5" : "border-slate-200 dark:border-white/10"
              )}
            >
              {rowsPerPage} <ChevronDown className={cn("w-3 h-3 text-slate-400 transition-transform", isRowsOpen && "rotate-180")} />
            </button>
            {isRowsOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-20 bg-white dark:bg-[#150a2e] border border-slate-100 dark:border-white/10 rounded-xl shadow-2xl shadow-purple-600/10 py-1 z-[100] animate-in fade-in slide-in-from-bottom-2 duration-200">
                {[10, 20, 50].map(val => (
                  <button 
                    key={val} 
                    onClick={() => {
                      setRowsPerPage(val)
                      setIsRowsOpen(false)
                    }} 
                    className={cn(
                      "w-full text-left px-3 py-1.5 text-[10px] font-black transition-colors",
                      rowsPerPage === val ? "text-purple-600 bg-purple-50/50 dark:bg-purple-900/20" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"
                    )}
                  >
                    {val}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-slate-400 dark:text-slate-500">{filtered.length > 0 ? `1-${Math.min(rowsPerPage, filtered.length)}` : '0'} of {filtered.length}</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#150a2e] text-slate-300 cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#150a2e] text-slate-300 cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default function TablesDoc() {
  return (
    <DocContent 
      title="Tables" 
      description="Tables display large datasets in a structured format. We use high-fidelity patterns for subscriptions, transactions, and data management."
    >
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600/10 flex items-center justify-center">
            <ListFilter className="w-4 h-4 text-purple-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Full Dashboard Template</h2>
        </div>
        
        <ComponentPreview
          title="Subscription Table Pattern"
          description="The standard Recura subscription list featuring tab-based filtering and the Action Reveal header system."
          code={`<div className="dashboard-card p-0 overflow-hidden">
  <div className="p-8 pb-4">
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-xl font-extrabold tracking-tight">Subscription List</h3>
      <div className="flex items-center gap-3">
        <ActionRevealToggle show={showActions} onToggle={() => setShowActions(!showActions)} />
        <div className={cn("flex gap-3 transition-all origin-right", !showActions && "w-0 opacity-0")}>
          <button className="dashboard-action-btn-secondary">Print</button>
          <button className="dashboard-action-btn-primary">Export</button>
        </div>
      </div>
    </div>
    <div className="flex gap-2 overflow-x-auto">
      {tabs.map(tab => <TabButton active={tab === active} />)}
    </div>
  </div>
  <table className="w-full">
     {/* Standard table structure */}
  </table>
  
  <div className="p-8 border-t flex justify-center">
    <div className="flex items-center gap-2">
      <button className="pagination-btn"><ChevronLeft className="w-4 h-4" /> Back</button>
      <button className="pagination-page-btn-active">1</button>
      <button className="pagination-page-btn">2</button>
      <button className="pagination-btn">Next <ChevronRight className="w-4 h-4" /></button>
    </div>
  </div>
</div>`}
        >
          <FullSubscriptionTemplate />
        </ComponentPreview>
      </section>

      <section className="space-y-6 pt-12">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600/10 flex items-center justify-center">
            <FileText className="w-4 h-4 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Transaction History Pattern</h2>
        </div>

        <ComponentPreview
          title="Recent Transactions"
          description="A simplified transaction list with high-contrast status badges for payment flows."
          code={`<div className="dashboard-card overflow-hidden !p-0">
  <div className="px-8 py-6 flex justify-between items-center">
    <div>
      <h3 className="text-base font-black">Recent Transactions</h3>
      <p className="text-xs font-medium text-slate-400">Manage customer payments</p>
    </div>
    <button className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-5 py-2.5 rounded-xl text-sm font-black">
      Export CSV
    </button>
  </div>
  <table className="w-full border-collapse">
    <thead className="bg-slate-50/50 dark:bg-white/2"> ... </thead>
    <tbody className="divide-y divide-gray-50 dark:divide-white/5">
      {transactions.map(tx => (
        <tr className="hover:bg-slate-50/30">
          <td className="px-8 py-6 text-sm font-bold">{tx.customer}</td>
          <td className="px-8 py-6 text-sm font-black text-right relative">
            <button onClick={() => setOpenId(tx.id)}>View</button>
            {openId === tx.id && <RowActionsMenu ref={menuRef} />}
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <div className="px-8 py-5 flex justify-between items-center sm:flex-row flex-col gap-4">
    <p className="text-xs font-bold text-slate-400">Showing 1 to 10 of 48 results</p>
    <div className="flex items-center gap-2">
      <button className="p-2 border rounded-xl"><ChevronLeft className="w-4 h-4" /></button>
      <button className="w-9 h-9 rounded-xl bg-purple-600 text-white">1</button>
      <button className="p-2 border rounded-xl"><ChevronRight className="w-4 h-4" /></button>
    </div>
  </div>
</div>`}
        >
          <RecentTransactionsTemplate />
        </ComponentPreview>
      </section>

      <section className="space-y-6 pt-12">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/10 flex items-center justify-center">
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Team Management Pattern</h2>
        </div>

        <ComponentPreview
          title="Team Members Table"
          description="A multi-filter management interface with role badges, status indicators, and relative activity tracking."
          code={`<div className="dashboard-card p-0 overflow-hidden">
  <div className="p-6 flex flex-wrap justify-between items-center bg-white dark:bg-slate-950 relative z-40">
     <div className="relative flex-1 md:max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" />
        <input className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50" />
     </div>
     <div className="flex gap-3">
       <SimpleDropdown value={role} options={["All Roles", "Owners", "Admin", "Management"]} icon={Users} />
       <SimpleDropdown value={status} options={["All Status", "Active", "Pending", "Inactive"]} icon={ListFilter} />
     </div>
  </div>
  <table className="w-full">
     <tr className="hover:bg-slate-50/50">
       <td className="px-6 py-4">
         <div className="flex items-center gap-3">
           <Avatar name={m.name} />
           <div><p className="font-bold">{m.name}</p><p className="text-[10px]">{m.email}</p></div>
         </div>
       </td>
       <td className="text-center">
         <Badge variant={m.role === 'Owners' ? 'primary' : 'secondary'}>{m.role}</Badge>
       </td>
       <td className="text-center relative">
         <RowActionMenu zIndex={100} shadow="shadow-2xl" options={['Change Role', 'Edit Member', 'Deactivate', 'Remove']} />
       </td>
     </tr>
  </table>
  <div className="p-6 bg-slate-50 flex justify-between items-center relative z-30">
    <div className="flex items-center gap-3">
       <span className="text-[10px] font-black uppercase">Rows per page:</span>
       <RowsPerPageSelector value={rowsPerPage} isOpen={isRowsOpen} onToggle={() => setIsRowsOpen(!isRowsOpen)} />
    </div>
    <div className="flex items-center gap-6">
       <span className="text-[10px] font-black uppercase">1-10 of 48</span>
       <div className="flex gap-1">
          <button className="p-1.5 border rounded-lg"><ChevronLeft className="w-4 h-4" /></button>
          <button className="p-1.5 border rounded-lg"><ChevronRight className="w-4 h-4" /></button>
       </div>
    </div>
  </div>
</div>`}
        >
          <TeamMembersTemplate />
        </ComponentPreview>
      </section>

      {/* Pagination Registry */}
      <section className="space-y-6 pt-12">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600/10 flex items-center justify-center">
            <Layout className="w-4 h-4 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Pagination Patterns</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ComponentPreview
            title="Numeric Pager"
            description="Style 1: Standard subscription-style pager with Back/Next labels."
            code={`<div className="flex items-center gap-2">
  <button className="pagination-btn">
    <ChevronLeft className="w-4 h-4" />
    Back
  </button>
  <button className="pagination-page-btn pagination-page-btn-active">1</button>
  <button className="pagination-page-btn">2</button>
  <button className="pagination-page-btn">3</button>
  <button className="pagination-btn">
    Next
    <ChevronRight className="w-4 h-4" />
  </button>
</div>`}
          >
            <div className="flex items-center gap-2">
              <button className="pagination-btn">
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button className="pagination-page-btn pagination-page-btn-active">1</button>
              <button className="pagination-page-btn">2</button>
              <button className="pagination-page-btn">3</button>
              <button className="pagination-btn">
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </ComponentPreview>

          <ComponentPreview
            title="Result Count Pager"
            description="Style 2: Transaction history style with 'Showing 1 to X of Y' detail."
            code={`<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
  <p className="text-xs font-bold text-slate-400">
    Showing <span className="text-slate-900">1</span> to <span className="text-slate-900">10</span> of <span className="text-slate-900">48</span> results
  </p>
  <div className="flex items-center gap-2">
    <button className="pagination-btn px-2"><ChevronLeft className="w-4 h-4" /></button>
    <div className="flex items-center gap-1">
      <button className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black text-xs shadow-lg">1</button>
      <button className="w-9 h-9 rounded-xl bg-white border border-gray-100 text-slate-400 text-xs font-black">2</button>
    </div>
    <button className="pagination-btn px-2"><ChevronRight className="w-4 h-4" /></button>
  </div>
</div>`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                Showing <span className="text-slate-900 dark:text-white">1</span> to <span className="text-slate-900 dark:text-white">10</span> of <span className="text-slate-900 dark:text-white">48</span> results
              </p>
              <div className="flex items-center gap-2">
                <button className="pagination-btn px-2"><ChevronLeft className="w-4 h-4" /></button>
                <div className="flex items-center gap-1">
                  <button className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black text-xs shadow-lg shadow-purple-600/20">1</button>
                  <button className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/10 text-slate-400 dark:text-slate-500 text-xs font-black">2</button>
                  <button className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/10 text-slate-400 dark:text-slate-500 text-xs font-black">3</button>
                </div>
                <button className="pagination-btn px-2"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          </ComponentPreview>
        </div>
      </section>

      <section className="space-y-6 pt-12">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-600/10 flex items-center justify-center">
            <Search className="w-4 h-4 text-amber-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Interactive Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ComponentPreview title="Header Action Reveal" description="Exact parity with SubscriptionTable toggle logic.">
             <div className="p-4 border border-slate-100 dark:border-white/5 rounded-[24px] bg-slate-50/50 dark:bg-white/2 flex justify-center">
                <div className="inline-flex items-center gap-3">
                   <button className="w-11 h-11 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/20">
                     <ListFilter className="w-5 h-5" />
                   </button>
                   <div className="flex items-center gap-2">
                     <button className="dashboard-action-btn dashboard-action-btn-secondary"><Printer className="w-4 h-4" /> Print</button>
                     <button className="dashboard-action-btn dashboard-action-btn-primary"><FileSpreadsheet className="w-4 h-4" /> Sheets</button>
                   </div>
                </div>
             </div>
          </ComponentPreview>

          <ComponentPreview title="Status Badge Library" description="Full set of standardized transaction/subscription badges.">
            <div className="flex flex-wrap gap-3">
              <span className="status-badge status-badge-active">Active</span>
              <span className="status-badge status-badge-trial">Trial</span>
              <span className="status-badge status-badge-paused">Paused</span>
              <span className="status-badge status-badge-canceled">Canceled</span>
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600">Approved</span>
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-rose-50 text-rose-600">Failed</span>
            </div>
          </ComponentPreview>
        </div>
      </section>

      <section className="space-y-6 pt-12">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-600/10 flex items-center justify-center">
            <Download className="w-4 h-4 text-orange-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Standard CSS Class Map</h2>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 scale-150 pointer-events-none">
            <FileSpreadsheet className="w-32 h-32 text-white" />
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Purpose</th>
                <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Global CSS Class</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { purpose: "Table Card Wrapper", class: "dashboard-card !p-0 overflow-hidden" },
                { purpose: "Common Header Cell", class: "table-header-cell" },
                { purpose: "Standard Data Cell", class: "table-data-cell" },
                { purpose: "Row Hover Effect", class: "table-row-hover" },
                { purpose: "Primary Action Btn", class: "dashboard-action-btn-primary" },
                { purpose: "Secondary Action Btn", class: "dashboard-action-btn-secondary" }
              ].map((row, i) => (
                <tr key={i} className="group">
                  <td className="py-4 text-xs font-bold text-slate-400 group-hover:text-white transition-colors">{row.purpose}</td>
                  <td className="py-4">
                    <code className="text-[10px] font-black text-purple-400 px-2 py-1 bg-purple-400/10 rounded-lg">{row.class}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DocContent>
  )
}
