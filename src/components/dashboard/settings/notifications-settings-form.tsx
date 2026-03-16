"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Bell,
  Mail,
  Smartphone,
  MessageSquare,
  Slack,
  Search,
  ChevronRight,
  Plus,
  Clock,
  MoreVertical,
  CheckCircle2,
  ShieldCheck,
  Eye,
  Info,
  CircleDashed,
  Moon,
  ChevronDown,
  Hash,
  Terminal,
  ExternalLink,
  Check
} from 'lucide-react';
import { StatusModal, StatusType } from "@/components/dashboard/shared/modals/status-modal"
import { InvoiceModal } from "@/components/dashboard/shared/modals/invoice-modal"
import { billingInvoices } from "@/components/dashboard/billing/mock-data"

type Priority = 'Critical' | 'Important' | 'Informational' | 'Marketing';

interface NotificationCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  priority?: Priority;
  channels: {
    email: boolean;
    inApp: boolean;
    sms: boolean;
    slack: boolean;
  };
  settings?: {
    bypassQuietHours: boolean;
    includeContext: boolean;
  };
}

const CustomCheckbox = ({ checked, onChange, color = "bg-purple-600" }: { checked: boolean, onChange: () => void, color?: string }) => {
  return (
    <div 
      onClick={onChange}
      className={cn(
        "w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center cursor-pointer select-none",
        checked 
          ? cn("scale-110 shadow-lg shadow-purple-200 border-transparent", color)
          : "border-slate-200 dark:border-white/20 bg-white dark:bg-[#150a2e] hover:border-purple-300"
      )}
    >
      <div className={cn(
        "transition-all duration-300 transform flex items-center justify-center",
        checked ? "scale-100 opacity-100 rotate-0" : "scale-50 opacity-0 -rotate-45"
      )}>
        <Check className="w-3 h-3 text-white stroke-[5px]" />
      </div>
    </div>
  );
};

interface NotificationGroup {
  name: string;
  notifications: NotificationCategory[];
  gradient: string;
  accent: string;
}

const initialGroups: NotificationGroup[] = [
  {
    name: "Payment Alerts",
    gradient: "from-purple-500/10 to-indigo-500/5",
    accent: "bg-purple-600",
    notifications: [
      { id: "payment_received", name: "Payment Received", icon: MessageSquare, priority: "Important", channels: { email: true, inApp: true, sms: true, slack: true } },
      { id: "payment_failed", name: "Payment Failed", icon: CircleDashed, priority: "Critical", channels: { email: true, inApp: false, sms: false, slack: false } },
      { id: "refund_issued", name: "Refund Issued", icon: CircleDashed, priority: "Critical", channels: { email: true, inApp: false, sms: false, slack: false } },
    ]
  },
  {
    name: "Subscription Events",
    gradient: "from-blue-500/10 to-indigo-500/5",
    accent: "bg-blue-600",
    notifications: [
      { id: "new_subscription", name: "New Subscription", icon: CircleDashed, priority: "Important", channels: { email: true, inApp: true, sms: true, slack: true } },
      { id: "subscription_cancelled", name: "Subscription Cancelled", icon: CircleDashed, priority: "Important", channels: { email: true, inApp: false, sms: false, slack: false } },
      { id: "trial_ending", name: "Trial Ending", icon: CircleDashed, priority: "Informational", channels: { email: true, inApp: false, sms: false, slack: false } },
    ]
  },
  {
    name: "Business Alerts",
    gradient: "from-emerald-500/10 to-teal-500/5",
    accent: "bg-emerald-600",
    notifications: [
      { id: "low_inventory", name: "Low Inventory", icon: CircleDashed, priority: "Important", channels: { email: true, inApp: true, sms: true, slack: true } },
      { id: "fraud_detection", name: "Fraud Detection", icon: CircleDashed, priority: "Critical", channels: { email: true, inApp: false, sms: false, slack: false } },
    ]
  },
  {
    name: "Reports & Insights",
    gradient: "from-amber-500/10 to-orange-500/5",
    accent: "bg-amber-600",
    notifications: [
      { id: "weekly_summary", name: "Weekly Summary", icon: Clock, channels: { email: true, inApp: false, sms: false, slack: false }, settings: { bypassQuietHours: false, includeContext: true } },
      { id: "monthly_reports", name: "Monthly Reports", icon: Clock, channels: { email: true, inApp: false, sms: false, slack: false }, settings: { bypassQuietHours: false, includeContext: true } },
    ]
  }
];

const priorityStyles: Record<Priority, string> = {
  Critical: "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/30",
  Important: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-900/30",
  Informational: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30",
  Marketing: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/30",
};

export function NotificationsSettingsForm() {
  const [groups, setGroups] = useState<NotificationGroup[]>(initialGroups);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(true);
  const [digestMode, setDigestMode] = useState("Instant");
  const [expandedNotifId, setExpandedNotifId] = useState<string | null>(null);

  // Invoice Modal State
  const [showInvoice, setShowInvoice] = useState(false);
  const sampleInvoice = billingInvoices[0]; // James Davis Premium Plan

  // Status Modal State
  const [showStatus, setShowStatus] = useState(false);
  const [statusType, setStatusType] = useState<StatusType>("success");
  const [statusTitle, setStatusTitle] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const channelKeyMap: Record<string, keyof NotificationCategory['channels']> = {
    'Email': 'email',
    'In-App': 'inApp',
    'SMS': 'sms',
    'Slack': 'slack'
  };

  const handleSave = () => {
    setStatusType("success");
    setStatusTitle("Settings Saved");
    setStatusMessage("Your notification preferences have been successfully updated and are now live.");
    setShowStatus(true);
  };

  const toggleChannel = (groupIdx: number, notifIdx: number, channel: keyof NotificationCategory['channels']) => {
    const newGroups = [...groups];
    newGroups[groupIdx].notifications[notifIdx].channels[channel] = !newGroups[groupIdx].notifications[notifIdx].channels[channel];
    setGroups(newGroups);
  };

  const toggleAllInGroup = (groupIdx: number, channelName: string) => {
    const channel = channelKeyMap[channelName];
    if (!channel) return;
    const newGroups = [...groups];
    const group = newGroups[groupIdx];
    const allEnabled = group.notifications.every(n => n.channels[channel]);
    group.notifications.forEach(n => n.channels[channel] = !allEnabled);
    setGroups(newGroups);
  };

  const filteredGroups = groups.map(group => ({
    ...group,
    notifications: group.notifications.filter(n => 
      n.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group => group.notifications.length > 0);

  return (
    <div className="space-y-6 md:space-y-8 pb-10">
      {/* Header section with channel filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-slate-900/50 rounded-3xl border border-gray-100 dark:border-white/10 overflow-hidden shadow-sm">
            <div className="p-8 border-b border-gray-50 dark:border-white/5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-full border border-slate-200 dark:border-white/10 w-full sm:w-fit gap-0.5 justify-center sm:justify-start mt-4 mb-2">
                  {[
                    { id: "All", label: "All", icon: Bell },
                    { id: "Email", label: "Email", icon: Mail },
                    { id: "In-App", label: "In-App", icon: Smartphone },
                    { id: "SMS", label: "SMS", icon: MessageSquare },
                    { id: "Slack", label: "Slack", icon: Slack },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-black transition-all whitespace-nowrap cursor-pointer",
                        activeTab === tab.id
                          ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5"
                      )}
                    >
                      <tab.icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-80 lg:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-600/20 text-sm font-medium dark:text-white transition-all"
                  />
                </div>
              </div>

              {/* Table Body */}
              <div className="space-y-8">
                {filteredGroups.map((group) => (
                  <div key={group.name} className={cn("space-y-4 rounded-3xl p-6 border border-slate-50 dark:border-white/5 bg-gradient-to-br", group.gradient)}>
                    <div className="flex flex-col md:grid md:grid-cols-12 gap-4 px-2">
                      <div className="md:col-span-6 flex items-center gap-4 mb-4 md:mb-0">
                         <div className={cn("w-2 h-8 rounded-full", group.accent)} />
                         <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">{group.name}</h4>
                      </div>
                       <div className="md:col-span-6 grid grid-cols-4 gap-4 text-center">
                        {['Email', 'In-App', 'SMS', 'Slack'].map((chan) => (
                          <div key={chan} className="flex flex-col items-center">
                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">{chan}</span>
                            <CustomCheckbox 
                              checked={group.notifications.every(n => n.channels[channelKeyMap[chan] || 'email'])}
                              onChange={() => toggleAllInGroup(groups.findIndex(g => g.name === group.name), chan)}
                              color={group.accent}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {group.notifications.map((notif) => {
                        const isExpanded = expandedNotifId === notif.id;
                        const originalGroupIdx = groups.findIndex(g => g.name === group.name);
                        const originalNotifIdx = groups[originalGroupIdx].notifications.findIndex(n => n.id === notif.id);
                        return (
                          <div key={notif.id} className="space-y-2">
                            <div 
                              className={cn(
                                "flex flex-col md:grid md:grid-cols-12 gap-4 items-center p-4 rounded-[1.5rem] bg-white dark:bg-slate-900/80 transition-all group cursor-pointer border border-transparent shadow-sm",
                                isExpanded ? "shadow-xl shadow-purple-900/5 border-purple-100 dark:border-purple-900/30" : "hover:shadow-md hover:border-slate-100 dark:hover:border-white/10"
                              )}
                              onClick={() => activeTab !== 'Email' && setExpandedNotifId(isExpanded ? null : notif.id)}
                            >
                              <div className="md:col-span-6 flex items-center justify-between pr-0 md:pr-8 mb-4 md:mb-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/30 group-hover:text-purple-600 transition-all duration-300">
                                      <notif.icon className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <div className="flex flex-col">
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-black text-slate-900 dark:text-white">{notif.name}</span>
                                        {activeTab !== 'Email' && (
                                          <ChevronDown className={cn("w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform duration-300", isExpanded && "rotate-180")} />
                                        )}
                                      </div>
                                    {notif.priority && (
                                      <span className={cn(
                                        "inline-flex w-fit mt-1 px-2.5 py-0.5 rounded-lg text-[9px] font-black border uppercase tracking-wider",
                                        priorityStyles[notif.priority]
                                      )}>
                                        {notif.priority}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="md:col-span-6 grid grid-cols-4 gap-4 text-center w-full">
                                {(['email', 'inApp', 'sms', 'slack'] as const).map((chan) => (
                                  <div key={chan} className="flex justify-center" onClick={(e) => e.stopPropagation()}>
                                    <CustomCheckbox 
                                      checked={notif.channels[chan]}
                                      onChange={() => toggleChannel(originalGroupIdx, originalNotifIdx, chan)}
                                      color={group.accent}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Details Dropdown for In-App, SMS, Slack */}
                            {isExpanded && activeTab !== 'Email' && (
                              <div className={cn(
                                "mx-4 p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-2xl shadow-indigo-900/10 animate-in slide-in-from-top-4 duration-500 overflow-hidden relative"
                              )}>
                                <div className={cn("absolute inset-0 opacity-[0.03] pointer-events-none bg-gradient-to-br", group.gradient)} />
                                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10">
                                  <div className="space-y-6">
                                    <h5 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                      <Terminal className="w-3 h-3 text-purple-600" />
                                      {activeTab} Delivery Intelligence
                                    </h5>
                                    <div className="space-y-4">
                                      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:shadow-purple-900/5 transition-all group">
                                        <div className="flex items-center gap-4">
                                          <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                                            <ShieldCheck className="w-4 h-4" />
                                          </div>
                                          <span className="text-xs font-black text-slate-800 dark:text-slate-200">Bypass quiet hours</span>
                                        </div>
                                        <button 
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            const newGroups = [...groups];
                                            const originalGroup = { ...newGroups[originalGroupIdx] };
                                            const originalNotifications = [...originalGroup.notifications];
                                            const notifToUpdate = { ...originalNotifications[originalNotifIdx] };
                                            
                                            notifToUpdate.settings = { 
                                              ...(notifToUpdate.settings || { bypassQuietHours: false, includeContext: false }), 
                                              bypassQuietHours: !notifToUpdate.settings?.bypassQuietHours 
                                            };
                                            
                                            originalNotifications[originalNotifIdx] = notifToUpdate;
                                            originalGroup.notifications = originalNotifications;
                                            newGroups[originalGroupIdx] = originalGroup;
                                            setGroups(newGroups);
                                          }}
                                          className={cn(
                                            "w-10 h-5 rounded-full relative flex items-center px-1 cursor-pointer transition-all duration-300",
                                            notif.settings?.bypassQuietHours ? "bg-purple-600" : "bg-slate-200"
                                          )}
                                        >
                                          <div className={cn(
                                            "w-3 h-3 bg-white dark:bg-slate-200 rounded-full transition-transform duration-300 shadow-sm",
                                            notif.settings?.bypassQuietHours ? "translate-x-5" : "translate-x-0"
                                          )} />
                                        </button>
                                      </div>
                                      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:shadow-indigo-900/5 transition-all">
                                        <div className="flex items-center gap-4">
                                          <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                                            <Info className="w-4 h-4" />
                                          </div>
                                          <span className="text-xs font-black text-slate-800 dark:text-slate-200">Include user context</span>
                                        </div>
                                        <button 
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            const newGroups = [...groups];
                                            const originalGroup = { ...newGroups[originalGroupIdx] };
                                            const originalNotifications = [...originalGroup.notifications];
                                            const notifToUpdate = { ...originalNotifications[originalNotifIdx] };
                                            
                                            notifToUpdate.settings = { 
                                              ...(notifToUpdate.settings || { bypassQuietHours: false, includeContext: false }), 
                                              includeContext: !notifToUpdate.settings?.includeContext 
                                            };
                                            
                                            originalNotifications[originalNotifIdx] = notifToUpdate;
                                            originalGroup.notifications = originalNotifications;
                                            newGroups[originalGroupIdx] = originalGroup;
                                            setGroups(newGroups);
                                          }}
                                          className={cn(
                                            "w-10 h-5 rounded-full relative flex items-center px-1 cursor-pointer transition-all duration-300",
                                            notif.settings?.includeContext ? "bg-indigo-600" : "bg-slate-200"
                                          )}
                                        >
                                          <div className={cn(
                                            "w-3 h-3 bg-white dark:bg-slate-200 rounded-full transition-transform duration-300 shadow-sm",
                                            notif.settings?.includeContext ? "translate-x-5" : "translate-x-0"
                                          )} />
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-6">
                                    <h5 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                      <ExternalLink className="w-3 h-3 text-indigo-600" />
                                      Recipient Routing
                                    </h5>
                                    {activeTab === 'Slack' && (
                                      <div className="space-y-3">
                                        <div className="relative group">
                                          <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 group-focus-within:text-purple-600 transition-colors" />
                                          <input 
                                            type="text" 
                                            placeholder="#notifications-channel" 
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/20 rounded-2xl text-xs font-black text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 focus:bg-white dark:focus:bg-slate-800 focus:shadow-xl focus:shadow-purple-900/5 transition-all"
                                          />
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 leading-relaxed">System will post rich previews to the designated Slack channel.</p>
                                      </div>
                                    )}
                                    {activeTab === 'SMS' && (
                                      <div className="space-y-3">
                                        <div className="relative group">
                                          <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                                          <input 
                                            type="text" 
                                            placeholder="+1 (555) 000-0000" 
                                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/20 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-purple-600"
                                          />
                                        </div>
                                        <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Carrier rates may apply for international SMS notifications.</p>
                                      </div>
                                    )}
                                    {activeTab === 'In-App' && (
                                      <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 rounded-xl border border-dotted border-purple-200 bg-purple-50/20 dark:bg-purple-900/10">
                                          <Terminal className="w-4 h-4 text-purple-600" />
                                          <span className="text-[10px] font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider">WebSocket: Connected</span>
                                        </div>
                                        <button className="flex items-center gap-2 text-[10px] font-black text-purple-600 dark:text-purple-400 hover:underline">
                                          CONFIGURE WEBHOOK <ExternalLink className="w-3 h-3" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-slate-50 dark:bg-white/5 flex items-center justify-between border-t border-slate-100 dark:border-white/10">
               <div className="flex items-center gap-6">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                     <Moon className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                   </div>
                   <div className="flex flex-col">
                     <span className="text-sm font-bold text-slate-900 dark:text-white">Quiet Hours <span className="text-slate-400 dark:text-slate-500 font-medium ml-1">Auto stop</span></span>
                     <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-[11px] font-bold text-slate-600 dark:text-slate-300">
                          <Clock className="w-3 h-3" /> 10:00 PM
                        </div>
                        <span className="text-slate-300 dark:text-slate-700">—</span>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-[11px] font-bold text-slate-600 dark:text-slate-300">
                          <Clock className="w-3 h-3" /> 8:00 AM
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-[11px] font-bold text-slate-900 dark:text-white ml-2">
                          5:00 <ChevronDown className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                        </div>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 bg-white dark:bg-[#150a2e] px-3 py-2 rounded-xl border border-slate-200 dark:border-white/20">
                   <div className="w-2 h-2 rounded-full bg-emerald-500" />
                   <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Syncing with Google Cal</span>
                 </div>
                 <button 
                   onClick={() => setQuietHoursEnabled(!quietHoursEnabled)}
                   className={cn(
                     "w-12 h-6 rounded-full transition-all relative flex items-center px-1 cursor-pointer",
                     quietHoursEnabled ? "bg-purple-600" : "bg-slate-200"
                   )}
                 >
                    <div className={cn(
                      "w-4 h-4 bg-white dark:bg-slate-200 rounded-full shadow-sm transition-all duration-200",
                      quietHoursEnabled ? "translate-x-6" : "translate-x-0"
                    )} />
                 </button>
               </div>
            </div>
          </div>
        </div>

        {/* Side Panels */}
        <div className="lg:col-span-1 space-y-6">
          {/* Notification Preview */}
          <div className="dashboard-card overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 dark:text-white">Notification Preview</h3>
              <div className="relative">
                <Bell className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">1</div>
              </div>
            </div>
                        <div className="p-5 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/20 dark:bg-purple-900/10 blur-3xl rounded-full" />
               <div className="flex items-start gap-3 mb-4">
                 <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                   <CheckCircle2 className="w-4 h-4" />
                 </div>
                 <div className="flex-1">
                   <div className="flex items-center justify-between">
                     <h4 className="text-sm font-bold text-slate-900 dark:text-white">Payment Received</h4>
                     <div className="w-2 h-2 rounded-full bg-emerald-500" />
                   </div>
                   <div className="mt-4 space-y-2">
                     <div className="flex justify-between items-center text-[11px]">
                       <span className="text-slate-400 dark:text-slate-500 font-medium">Customer:</span>
                       <span className="text-slate-900 dark:text-white font-bold">John Doe</span>
                     </div>
                     <div className="flex justify-between items-center text-[11px]">
                       <span className="text-slate-400 dark:text-slate-500 font-medium">Amount:</span>
                       <span className="text-slate-900 dark:text-white font-bold">$45.00</span>
                     </div>
                     <div className="flex justify-between items-center text-[11px]">
                       <span className="text-slate-400 dark:text-slate-500 font-medium">Subscription:</span>
                       <span className="text-slate-900 dark:text-white font-bold">Pro Plan</span>
                     </div>
                   </div>
                 </div>
               </div>
               <button 
                onClick={() => setShowInvoice(true)}
                className="w-full py-2.5 bg-purple-600 text-white rounded-xl text-[11px] font-black tracking-tight hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 cursor-pointer relative z-10"
               >
                 View Invoice
               </button>
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="dashboard-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 dark:text-white">Recent Notifications</h3>
               <button className="p-2 hover:bg-slate-50 dark:hover:bg-white/10 rounded-xl transition-colors cursor-pointer">
                <MoreVertical className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </button>
            </div>
            
            <div className="space-y-4">
               {[
                  { title: "Payment Failed", meta: "$99.00 Trial Plan", time: "10 min ago", color: "text-rose-500 bg-rose-50 border-rose-100 dark:bg-rose-900/20 dark:border-rose-900/30", icon: CircleDashed },
                  { title: "New Subscription", meta: "Olivia Spencer Enterprise", time: "1 hour ago", color: "text-emerald-500 bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900/30", icon: CircleDashed },
                  { title: "Subscription Cancelled", meta: "Julia Martinez Pro Plan", time: "Yesterday", color: "text-orange-500 bg-orange-50 border-orange-100 dark:bg-orange-900/20 dark:border-orange-900/30", icon: CircleDashed },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border shrink-0", item.color)}>
                      <item.icon className="w-5 h-5" />
                    </div>
                   <div className="flex-1 min-w-0">
                     <div className="flex items-center justify-between">
                       <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{item.title}</h4>
                       <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap">{item.time}</span>
                     </div>
                     <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 truncate mt-0.5">{item.meta}</p>
                   </div>
                 </div>
               ))}
            </div>
            <div className="mt-8 pt-6 border-t border-slate-50 dark:border-white/5 space-y-3">
              <button type="button" className="w-full flex items-center justify-between group p-1 cursor-pointer">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                     <Plus className="w-4 h-4" />
                   </div>
                   <span className="text-xs font-bold text-purple-600">Create Notification Rule</span>
                </div>
                <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </button>
              <button type="button" className="w-full flex items-center justify-between group p-1 cursor-pointer">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500">
                     <Eye className="w-4 h-4" />
                   </div>
                   <span className="text-xs font-bold text-slate-900 dark:text-white">View All</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Notification Digest */}
          <div className="dashboard-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 dark:text-white">Notification Digest</h3>
              <MoreVertical className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            </div>
            
            <div className="space-y-4">
               {[
                 { label: "Instant", value: "Instant" },
                 { label: "Daily Summary", value: "Daily" },
                 { label: "Weekly Summary", value: "Weekly" }
               ].map((opt) => (
                 <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                   <div className="relative flex items-center justify-center">
                     <input 
                       type="radio" 
                       name="digest" 
                       className="sr-only" 
                       checked={digestMode === opt.value}
                       onChange={() => setDigestMode(opt.value)}
                     />
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 transition-all",
                        digestMode === opt.value ? "border-purple-600 bg-purple-600" : "border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 group-hover:border-purple-300"
                      )} />
                      {digestMode === opt.value && <div className="absolute w-1.5 h-1.5 rounded-full bg-white dark:bg-slate-200" />}
                   </div>
                    <span className={cn(
                      "text-sm font-bold transition-colors",
                      digestMode === opt.value ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"
                    )}>
                     {opt.label}
                   </span>
                 </label>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Save Action */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900/80 border border-slate-100 dark:border-white/10 rounded-2xl p-4 shadow-xl shadow-slate-900/[0.02]">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-sm font-bold">
          <CheckCircle2 className="w-4 h-4" />
          Settings current
        </div>
        <button 
          onClick={handleSave}
          className="px-10 py-3 rounded-xl bg-purple-600 text-white font-black text-sm tracking-tight hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/30 cursor-pointer"
        >
          Save Notification Preferences
        </button>
      </div>

      <StatusModal 
        isOpen={showStatus}
        onClose={() => setShowStatus(false)}
        type={statusType}
        title={statusTitle}
        message={statusMessage}
      />

      <InvoiceModal 
        isOpen={showInvoice}
        onClose={() => setShowInvoice(false)}
        invoice={sampleInvoice}
      />
    </div>
  );
}
