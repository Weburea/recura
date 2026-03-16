"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Building2,
  ChevronRight,
  ShieldCheck,
  Users,
  Bell,
  Layout,
  Download,
  Settings2,
  CheckCircle2,
  X,
  Loader2,
  Plus,
  AlertCircle,
} from 'lucide-react';
import NextImage from "next/image"
import * as htmlToImage from 'html-to-image'
import { StatusModal, StatusType } from "@/components/dashboard/shared/modals/status-modal"

interface User {
  id: number;
  name: string;
  role: string;
  img: string;
  active: boolean;
}

export function WorkspaceOverview() {
  // Navigation State
  const [activeModal, setActiveModal] = useState<'profile' | 'users' | 'security' | 'billing' | 'roles' | null>(null);

  // Billing & Proration State
  const [autobilling, setAutobilling] = useState(true);
  const [prorationRange, setProrationRange] = useState(70);

  // PDF Download State
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isPreviewingPDF, setIsPreviewingPDF] = useState(false);
  const [invoiceData, setInvoiceData] = useState({ id: '', date: '' });

  // Feedback & Status State
  const [showStatus, setShowStatus] = useState(false);
  const [statusType, setStatusType] = useState<StatusType>("success");
  const [statusTitle, setStatusTitle] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // Security & Billing Config State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [activeProvider, setActiveProvider] = useState<'stripe' | 'flutterwave' | 'paystack' | 'paypal'>('stripe');
  const [providersConfig, setProvidersConfig] = useState<Record<string, { enabled: boolean; apiKey: string; secretKey?: string }>>({
    stripe: { enabled: true, apiKey: 'sk_live_••••••••••••••••' },
    flutterwave: { enabled: false, apiKey: '' },
    paystack: { enabled: false, apiKey: '' },
    paypal: { enabled: false, apiKey: '' },
  });

  const isAutobillingEnabled = Object.values(providersConfig).some(p => p.enabled);

  // User Management State
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Admin User', role: 'Owner', img: '/images/dashboard/9 1.png', active: true },
    { id: 2, name: 'Sarah Wilson', role: 'Admin', img: '/images/dashboard/11 1.png', active: true },
    { id: 3, name: 'John Doe', role: 'Editor', img: '/images/dashboard/24 1.png', active: true },
    { id: 4, name: 'Emily Chen', role: 'Manager', img: '/images/dashboard/59 1.png', active: false },
    { id: 5, name: 'Alex Rivera', role: 'Developer', img: '/images/dashboard/60 1.png', active: false },
    { id: 6, name: 'Mark Zuckerberg', role: 'CEO', img: '/images/dashboard/61 1.png', active: true },
  ]);
  const [userFilter, setUserFilter] = useState<'active' | 'inactive'>('active');
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', role: '' });
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Creation State
  const [isCreatingProvider, setIsCreatingProvider] = useState(false);
  const [isCreatingRole, setIsCreatingRole] = useState(false);
  const [newRoleData, setNewRoleData] = useState({ name: '', description: '' });

  // Industry State
  const industries = ["SaaS & Software", "E-commerce", "Fintech", "Healthcare", "Education"];
  const [selectedIndustry, setSelectedIndustry] = useState("SaaS & Software");
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);

  const [activeSessions, setActiveSessions] = useState([
    { id: 1, name: 'Chrome on macOS', ip: '192.168.1.1' },
    { id: 2, name: 'Safari on iPhone', ip: '10.0.0.5' },
  ]);

  // Company Profile State
  const [profileData, setProfileData] = useState({
    name: 'Business Owner Inc.',
    email: 'contact@business.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Street, Suite 100, New York, NY 10001',
    website: 'www.business.com'
  });
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});

  // Handlers
  const handleSave = () => {
    // Validation for Company Profile
    if (activeModal === 'profile') {
      const newErrors: Record<string, string> = {};
      
      if (!profileData.name.trim()) newErrors.name = "Company name is required";
      if (!profileData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!profileData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^[+\d\s()-]+$/.test(profileData.phone)) {
        newErrors.phone = "Invalid phone format";
      }
      if (!profileData.address.trim()) newErrors.address = "Address is required";
      if (!profileData.website.trim()) newErrors.website = "Website is required";

      if (Object.keys(newErrors).length > 0) {
        setProfileErrors(newErrors);
        setStatusType("error");
        setStatusTitle("Validation Failed");
        setStatusMessage("Please correct the errors in the form before saving.");
        setShowStatus(true);
        return;
      }
      setProfileErrors({});
    }

    // Dynamic messaging based on current active modal
    let successTitle = "Changes Saved";
    let successMessage = "Your workspace settings have been updated successfully.";

    if (activeModal === 'users') {
      successTitle = "Team Updated";
      successMessage = "Team member configuration has been saved successfully.";
    } else if (activeModal === 'roles') {
      successTitle = "Roles Updated";
      successMessage = "Workspace roles and permissions have been updated.";
    } else if (activeModal === 'security') {
      successTitle = "Security Updated";
      successMessage = "Workspace security protocols have been reinforced.";
    } else if (activeModal === 'billing') {
      successTitle = "Billing Updated";
      successMessage = "Payment provider and billing controls updated.";
    }

    setStatusType("success");
    setStatusTitle(successTitle);
    setStatusMessage(successMessage);
    setShowStatus(true);
    setActiveModal(null);
    setEditingUser(null);
  };

  const handleDownload = () => {
    setInvoiceData({
      id: `#BS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: new Date().toLocaleDateString()
    });
    setIsPreviewingPDF(true);
  };

  const executeDownload = async () => {
    const element = document.getElementById('invoice-content');
    if (!element) return;

    setIsDownloading(true);
    setDownloadProgress(30);

    try {
      // html-to-image is much better with modern CSS (oklch, lab, etc.)
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        style: {
          borderRadius: '0px',
          transform: 'scale(1)',
          boxShadow: 'none',
        },
        filter: (node: HTMLElement) => {
          // Exclude the footer actions (buttons)
          return !node.classList?.contains('no-export');
        }
      });
      
      setDownloadProgress(70);
      
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `Recura-Invoice-${invoiceData.id || 'SUMMARY'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadProgress(100);
      setTimeout(() => {
        setIsDownloading(false);
        setIsPreviewingPDF(false);
        setStatusType("success");
        setStatusTitle("Image Saved");
        setStatusMessage("Your billing summary snippet has been saved as a high-quality PNG image.");
        setShowStatus(true);
      }, 500);
    } catch (error) {
      console.error("Export failed:", error);
      setIsDownloading(false);
      setStatusType("error");
      setStatusTitle("Export Failed");
      setStatusMessage("Failed to generate the image snippet. Modern CSS features may be conflicting.");
      setShowStatus(true);
    }
  };

  const toggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  const toggleProvider = (provider: string) => {
    setProvidersConfig(prev => {
      const isCurrentlyEnabled = prev[provider].enabled;
      // If we are enabling one, disable all others
      if (!isCurrentlyEnabled) {
        const newConfig = { ...prev };
        Object.keys(newConfig).forEach(key => {
          newConfig[key] = { ...newConfig[key], enabled: key === provider };
        });
        return newConfig;
      } else {
        // Just disable it
        return {
          ...prev,
          [provider]: { ...prev[provider], enabled: false }
        };
      }
    });
  };

  const revokeSession = (id: number) => {
    setActiveSessions(prev => prev.filter(s => s.id !== id));
    setStatusType("success");
    setStatusTitle("Session Revoked");
    setStatusMessage("The selected session has been successfully logged out.");
    setShowStatus(true);
  };

  const deleteUser = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    handleSave();
  };

  return (
    <div className="space-y-6 md:space-y-8 pb-10">
      {/* Top Grid - Main management cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Company Details Card */}
        <div className="bg-white dark:bg-[#150a2e] rounded-2xl border border-gray-100 dark:border-white/10 p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10">
              <Building2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">Company Details</h3>
          </div>
          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Industry</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{selectedIndustry}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Phone No</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Website</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white tracking-tight">{profileData.website}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Address</span>
              <span className="text-[10px] font-bold text-slate-900 dark:text-white text-right leading-tight max-w-[140px]">
                {profileData.address}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-white/5">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Members</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">8 members</span>
            </div>
          </div>
          <button 
            onClick={() => setActiveModal('profile')}
            className="w-full mt-6 py-2.5 rounded-xl bg-purple-600 text-white border border-gray-100 font-bold text-sm tracking-tight hover:bg-purple-700 transition-colors"
          >
            Manage
          </button>
        </div>

        {/* Billing & Payments Card */}
        <div className="bg-white dark:bg-[#150a2e] rounded-2xl border border-gray-100 dark:border-white/10 p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10">
                <Layout className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">Billing & Payments</h3>
            </div>
          </div>
          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white capitalize">{activeProvider}</h4>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full animate-pulse",
                    providersConfig[activeProvider].enabled ? "bg-emerald-500" : "bg-slate-300"
                  )} />
                  <span className={cn(
                    "text-[10px] font-bold tracking-tight",
                    providersConfig[activeProvider].enabled ? "text-emerald-600" : "text-slate-400 dark:text-slate-500"
                  )}>
                    {providersConfig[activeProvider].enabled ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Autobilling</span>
              <div className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg",
                isAutobillingEnabled ? "bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400" : "bg-slate-100 dark:bg-white/10 text-slate-400 dark:text-slate-500"
              )}>
                {isAutobillingEnabled ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Enabled
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3.5 h-3.5" />
                    Disabled
                  </>
                )}
              </div>
            </div>
            <div className="pt-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">$12,378.25</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 ml-2">revenue</span>
            </div>
          </div>
          <button 
            onClick={() => setActiveModal('billing')}
            className="w-full mt-6 py-2.5 rounded-xl border border-gray-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-bold text-sm tracking-tight hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            Manage
          </button>
        </div>

        {/* Security Card */}
        <div className="bg-white dark:bg-[#150a2e] rounded-2xl border border-gray-100 dark:border-white/10 p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10">
              <ShieldCheck className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">Security</h3>
          </div>
          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">2FA:</span>
              <span className={cn(
                "px-3 py-1 text-xs font-bold rounded-lg",
                twoFactorEnabled ? "bg-purple-50 text-purple-600" : "bg-slate-100 text-slate-400"
              )}>
                {twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900">{activeSessions.length} Session{activeSessions.length !== 1 ? 's' : ''} Active</span>
                <span className="text-[10px] font-medium text-slate-400 leading-none">Last: {activeSessions[0]?.ip || 'None'}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setActiveModal('security')}
            className="w-full mt-6 py-2.5 rounded-xl border border-gray-100 bg-slate-50 text-slate-900 font-bold text-sm tracking-tight hover:bg-slate-100 transition-colors"
          >
            Manage
          </button>
        </div>

        {/* Users & Permissions Card */}
        <div className="bg-white dark:bg-[#150a2e] rounded-2xl border border-gray-100 dark:border-white/10 p-6 flex flex-col h-full lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10">
              <Users className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">Users & Permissions</h3>
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-black text-slate-900 dark:text-white">{users.filter(u => u.active).length} Active Users</h4>
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-1">{users.filter(u => !u.active).length} Inactive</p>
          </div>
          <div className="flex items-center gap-2 mt-6">
            <div className="flex -space-x-2">
              {users.slice(0, 3).map((user) => (
                <NextImage key={user.id} src={user.img} width={32} height={32} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#150a2e] object-cover" alt={user.name} />
              ))}
              {users.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 border-2 border-white dark:border-[#150a2e] flex items-center justify-center text-[10px] font-black text-slate-400 dark:text-slate-500">+{users.length - 3}</div>
              )}
            </div>
          <button 
              onClick={() => setActiveModal('roles')}
              className="flex-1 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-sm tracking-tight hover:bg-purple-700 transition-colors"
            >
              Manage
            </button>
          </div>
        </div>

        {/* Team Roles Card */}
        <div className="bg-white dark:bg-[#150a2e] rounded-2xl border border-gray-100 dark:border-white/10 p-6 flex flex-col h-full lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10">
              <ShieldCheck className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">Team Roles</h3>
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <h4 className="text-xl font-black text-slate-900 dark:text-white">4 Admins</h4>
              <span className="text-slate-400 dark:text-slate-500 font-medium">/</span>
              <span className="text-lg font-bold text-slate-500 dark:text-slate-400">2 Mgrs</span>
            </div>
          </div>
          <div className="mt-6">
             <button 
                onClick={() => setActiveModal('users')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-bold text-sm tracking-tight hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              >
              Permission Groups
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications Card */}
        <div className="bg-white dark:bg-[#150a2e] rounded-2xl border border-gray-100 dark:border-white/10 p-6 flex flex-col h-full lg:col-span-1">
           <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10">
              <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
          </div>
          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900 dark:text-white underline underline-offset-4 decoration-purple-600/30">System Alerts</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center">
                 <Settings2 className="w-4 h-4 text-slate-400 dark:text-slate-500" />
               </div>
               <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">Active Channels</span>
               <div className="flex -space-x-1 ml-auto">
                 <div className="w-4 h-4 rounded-full bg-emerald-400 border border-white dark:border-[#150a2e]" />
                 <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-white/20 border border-white dark:border-[#150a2e]" />
               </div>
            </div>
          </div>
        </div>

      </div>

      {/* Activity Logs & Billing Preview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Activity Logs */}
        <div className="lg:col-span-3 bg-white dark:bg-[#150a2e] rounded-2xl border border-gray-100 dark:border-white/10 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Activity Logs</h3>
            <button className="text-purple-600 dark:text-purple-400 text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[ 
              { type: 'error', title: 'Payment failed for Invoice #INV-00342', time: '5 min ago', details: '192.168.1.1 0' },
              { type: 'success', title: 'Payment succeeded - Acme Inc. ($549.00)', time: '30 mins', details: '192.168.1.112' },
              { type: 'error', title: 'Payment failed for Invoice #INV-00341', time: '1 hour ago', details: '192.168.1.17' },
            ].map((log, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-slate-50 dark:border-white/5 group hover:border-gray-100 dark:hover:border-white/10 transition-all">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                  log.type === 'error' ? "bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20 text-red-500" : "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-500"
                )}>
                  {log.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{log.title}</h4>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 whitespace-nowrap">{log.time}</span>
                  </div>
                  <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 tracking-wide uppercase">{log.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Preview */}
        <div className="lg:col-span-1 bg-white dark:bg-[#150a2e] rounded-2xl border border-gray-100 dark:border-white/10 p-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">Billing Preview</h3>
          <div className="bg-slate-50/50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 p-5 space-y-6">
            <div className="flex justify-between items-start">
               <div>
                 <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Invoice #INV-00342</p>
                 <h4 className="text-xs font-black text-slate-900 dark:text-white mt-1">Acme Inc.</h4>
                 <p className="text-[8px] font-medium text-slate-400 dark:text-slate-500 mt-0.5">123 Street Inc.</p>
               </div>
               <div className="flex items-center gap-1.5 grayscale opacity-50 dark:opacity-40">
                 <div className="w-4 h-4 bg-purple-600 rounded-sm" />
                 <span className="text-[10px] font-black text-slate-900 dark:text-white">Recura</span>
               </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-[8px] font-bold text-slate-900 dark:text-white pb-1 border-b border-gray-200 dark:border-white/10 uppercase">
                <span>Services</span>
                <span>Total</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-900 dark:text-slate-200">Invoice</span>
                <span className="text-[10px] font-bold text-slate-900 dark:text-slate-200">$120.00</span>
              </div>
            </div>

            <div className="pt-2 space-y-1.5 border-t border-gray-200 dark:border-white/10">
              <div className="flex justify-between text-[9px] font-medium text-slate-400 dark:text-slate-500">
                <span>Subtotal (7.5%)</span>
                <span className="text-slate-900 dark:text-white font-bold">$120.00</span>
              </div>
              <div className="flex justify-between text-[9px] font-medium text-slate-400 dark:text-slate-500">
                <span>Tax (8.5%)</span>
                <span className="text-slate-900 dark:text-white font-bold">$9.00</span>
              </div>
              <div className="flex justify-between text-xs font-black text-slate-900 dark:text-white pt-1">
                <span>Total</span>
                <span>$129.00 USD</span>
              </div>
            </div>

            <div className="relative">
              <button 
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs tracking-tight hover:bg-purple-700 transition-colors mt-2 flex items-center justify-center gap-2 disabled:opacity-50 overflow-hidden relative"
              >
                {isDownloading ? (
                  <>
                    <div 
                      className="absolute left-0 top-0 h-full bg-purple-700/50 transition-all duration-300"
                      style={{ width: `${downloadProgress}%` }}
                    />
                    <Loader2 className="w-3.5 h-3.5 animate-spin relative z-10" />
                    <span className="relative z-10">Generating {downloadProgress}%</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Save as Image</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Providers & Billing Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Payment Providers */}
        <div className="bg-white dark:bg-[#150a2e] rounded-2xl border border-gray-100 dark:border-white/10 p-8">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-8">Payment Providers</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['stripe', 'flutterwave', 'paystack', 'paypal'].map((key) => {
                const config = providersConfig[key];
                return (
                  <div 
                    key={key} 
                    className={cn(
                      "p-3 rounded-xl border-dotted flex flex-row items-center justify-between gap-3 group transition-all cursor-pointer",
                      config.enabled 
                        ? "border-2 border-purple-600 bg-purple-50/5 dark:bg-purple-500/5" 
                        : "border border-purple-200 dark:border-purple-500/30 hover:border-purple-400 dark:hover:border-purple-500"
                    )}
                    onClick={() => toggleProvider(key)}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white dark:bg-white/10 border border-gray-100 dark:border-white/10 flex items-center justify-center font-bold text-[8px] uppercase shrink-0 dark:text-white">
                        {key[0]}
                      </div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white capitalize truncate">{key}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        config.enabled ? "bg-purple-600 animate-pulse" : "bg-slate-300 dark:bg-white/20"
                      )} />
                      <span className={cn(
                        "text-[10px] font-bold whitespace-nowrap",
                        config.enabled ? "text-purple-600 dark:text-purple-400" : "text-slate-400 dark:text-slate-500"
                      )}>
                        {config.enabled ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Billing Controls */}
        <div className="bg-white dark:bg-[#150a2e] rounded-2xl border border-gray-100 dark:border-white/10 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Billing Controls</h3>
              <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Manage automation and proration settings</p>
            </div>
            <button 
              onClick={() => setAutobilling(!autobilling)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative flex items-center px-1",
                autobilling ? "bg-purple-600" : "bg-slate-200 dark:bg-white/10"
              )}
            >
              <div className={cn(
                "w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200",
                autobilling ? "translate-x-6" : "translate-x-0"
              )} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Proration Logic</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-gray-100 rounded-lg">
                <AlertCircle className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <span className="text-xs font-black text-slate-600 dark:text-slate-400">{prorationRange}%</span>
              </div>
            </div>
            <div className="space-y-4">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={prorationRange}
                onChange={(e) => setProrationRange(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-600" 
              />
              <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                <span>Conservative</span>
                <span>Aggressive</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Layout className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-bold text-slate-900">Invoice Numbering</span>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-100 bg-slate-50 text-slate-900 text-xs font-bold">
                #INV-0001
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between bg-white dark:bg-[#150a2e] border border-gray-100 dark:border-white/10 rounded-2xl p-4 shadow-xl shadow-slate-900/[0.02]">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-bold">
          <CheckCircle2 className="w-4 h-4" />
          Saved
        </div>
        <button 
          onClick={handleSave}
          className="px-10 py-3 rounded-xl bg-purple-600 text-white font-black text-sm tracking-tight hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/30"
        >
          Save Changes
        </button>
      </div>

      {/* Management Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setActiveModal(null)} />
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#150a2e] rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-100 dark:border-white/10">
            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize tracking-tight">
                {activeModal === 'profile' ? 'Company Profile' : activeModal === 'users' ? 'User Management' : activeModal === 'roles' ? 'Team Roles' : activeModal === 'security' ? 'Security Settings' : 'Payment Settings'}
              </h3>
              <button onClick={() => { setActiveModal(null); setEditingUser(null); }} className="p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors">
                 <X className="w-5 h-5 text-slate-400 dark:text-slate-500" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto">
              {/* Profile Modal */}
              {activeModal === 'profile' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1.5 sm:space-y-2">
                       <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight sm:tracking-normal">Company Name</label>
                       <input 
                         type="text" 
                         value={profileData.name} 
                         onChange={(e) => setProfileData({...profileData, name: e.target.value})}
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
                         onClick={() => setIsIndustryOpen(!isIndustryOpen)}
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
                                  setSelectedIndustry(ind);
                                  setIsIndustryOpen(false);
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
                    <div className="col-span-2 space-y-1.5 sm:space-y-2">
                       <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight sm:tracking-normal">Email</label>
                       <input 
                         type="email" 
                         value={profileData.email} 
                         onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                         className={cn(
                           "w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm sm:text-base text-slate-900 dark:text-white font-medium",
                           profileErrors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-white/10 focus:border-purple-600 dark:focus:border-purple-500"
                         )}
                         placeholder="email@example.com"
                       />
                       {profileErrors.email && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{profileErrors.email}</p>}
                    </div>
                    <div className="col-span-2 space-y-1.5 sm:space-y-2">
                       <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight sm:tracking-normal">Phone No</label>
                       <input 
                         type="tel" 
                         value={profileData.phone} 
                         onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                         className={cn(
                           "w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm sm:text-base text-slate-900 dark:text-white font-medium",
                           profileErrors.phone ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-white/10 focus:border-purple-600 dark:focus:border-purple-500"
                         )}
                         placeholder="+1 (555) 000-0000"
                       />
                       {profileErrors.phone && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{profileErrors.phone}</p>}
                    </div>
                    <div className="col-span-2 space-y-1.5 sm:space-y-2">
                       <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight sm:tracking-normal">Address</label>
                       <textarea 
                         rows={2} 
                         value={profileData.address} 
                         onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                         className={cn(
                           "w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm sm:text-base text-slate-900 dark:text-white font-medium resize-none",
                           profileErrors.address ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-white/10 focus:border-purple-600 dark:focus:border-purple-500"
                         )}
                         placeholder="Enter company address"
                       />
                       {profileErrors.address && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{profileErrors.address}</p>}
                    </div>
                    <div className="col-span-2 space-y-1.5 sm:space-y-2">
                       <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight sm:tracking-normal">Website</label>
                       <input 
                         type="text" 
                         value={profileData.website} 
                         onChange={(e) => setProfileData({...profileData, website: e.target.value})}
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
              {activeModal === 'users' && (
                <div className="space-y-6">
                   {isAddingMember ? (
                     <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                        <button onClick={() => setIsAddingMember(false)} className="text-purple-600 text-sm font-bold flex items-center gap-2">
                           <ChevronRight className="w-4 h-4 rotate-180" /> Back to List
                        </button>
                        <div className="space-y-4">
                           <div className="space-y-2">
                              <label className="text-sm font-bold text-slate-800 dark:text-slate-200">Full Name</label>
                              <input 
                                type="text" 
                                placeholder="Enter member name"
                                value={newMember.name}
                                onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 bg-white dark:bg-white/5 text-slate-900 dark:text-white font-medium" 
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-sm font-bold text-slate-800 dark:text-slate-200">Role / Designation</label>
                              <input 
                                type="text" 
                                placeholder="e.g. Designer, Developer"
                                value={newMember.role}
                                onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 bg-white dark:bg-white/5 text-slate-900 dark:text-white font-medium" 
                              />
                           </div>
                           <div className="pt-2">
                              <button 
                                onClick={() => {
                                  setIsAddingMember(false);
                                  handleSave();
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
                        <button onClick={() => setEditingUser(null)} className="text-purple-600 text-sm font-bold flex items-center gap-2">
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
                              <button onClick={() => setEditingUser(null)} className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-black text-sm tracking-tight hover:bg-purple-700 transition-all">
                                Update User
                              </button>
                           </div>
                        </div>
                     </div>
                   ) : (
                     <>
                        <div className="flex items-center gap-4 pb-2">
                           <button 
                             onClick={() => setUserFilter('active')}
                             className={cn(
                               "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                               userFilter === 'active' ? "bg-purple-600 text-white" : "text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5"
                             )}
                           >
                             Active
                           </button>
                           <button 
                             onClick={() => setUserFilter('inactive')}
                             className={cn(
                               "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                               userFilter === 'inactive' ? "bg-purple-600 text-white" : "text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5"
                             )}
                           >
                             Inactive
                           </button>
                        </div>
                        <div className="space-y-3">
                           {users.filter(u => userFilter === 'active' ? u.active : !u.active).map((user) => (
                              <div key={user.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 group">
                                 <div className="flex items-center gap-4">
                                    <NextImage src={user.img} width={40} height={40} className="w-10 h-10 rounded-xl object-cover border border-white dark:border-[#150a2e] shadow-sm" alt={user.name} />
                                    <div>
                                       <h4 className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</h4>
                                       <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">{user.role}</p>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                      onClick={() => setEditingUser(user)}
                                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-colors"
                                    >
                                       Update
                                    </button>
                                    <button 
                                      onClick={() => deleteUser(user.id)}
                                      className="p-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors text-rose-500"
                                    >
                                       <X className="w-4 h-4" />
                                    </button>
                                 </div>
                              </div>
                           ))}
                           {users.filter(u => userFilter === 'active' ? u.active : !u.active).length === 0 && (
                             <div className="py-8 text-center bg-slate-50 dark:bg-white/5 border border-dashed border-gray-100 dark:border-white/10 rounded-2xl">
                               <p className="text-xs font-medium text-slate-400 dark:text-slate-500">No {userFilter} users found.</p>
                             </div>
                           )}
                        </div>
                        <button 
                          onClick={() => setIsAddingMember(true)}
                          className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-white/10 text-slate-400 dark:text-slate-500 font-bold hover:border-purple-600 dark:hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all flex items-center justify-center gap-2"
                        >
                           <Plus className="w-4 h-4" />
                           Add New Team Member
                        </button>
                     </>
                   )}
                </div>
              )}

              {/* Roles Modal (Team Roles) */}
              {activeModal === 'roles' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {['Admin', 'Manager', 'Editor', 'Viewer', 'Developer', 'Designer'].map((role) => (
                      <div key={role} className="p-4 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-purple-600/20 dark:hover:border-purple-500/20 hover:bg-purple-50/10 dark:hover:bg-purple-500/5 transition-all group">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{role}</span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-50 dark:bg-white/10 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest group-hover:bg-purple-600 group-hover:text-white transition-colors">Default</span>
                        </div>
                        <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 leading-tight">Define standard permissions for {role.toLowerCase()} level access.</p>
                      </div>
                    ))}
                  </div>
                  {isCreatingRole ? (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                       <button onClick={() => setIsCreatingRole(false)} className="text-purple-600 text-sm font-bold flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 rotate-180" /> Back to List
                       </button>
                       <div className="space-y-4">
                          <div className="space-y-2">
                             <label className="text-sm font-bold text-slate-800">Role Name</label>
                             <input 
                               type="text" 
                               value={newRoleData.name}
                               onChange={(e) => setNewRoleData(prev => ({ ...prev, name: e.target.value }))}
                               placeholder="e.g. Moderator"
                               className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-600 text-slate-900 font-medium" 
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-sm font-bold text-slate-800">Description</label>
                             <textarea 
                               value={newRoleData.description}
                               onChange={(e) => setNewRoleData(prev => ({ ...prev, description: e.target.value }))}
                               placeholder="What can this role do?"
                               className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-600 text-slate-900 font-medium min-h-[100px]" 
                             />
                          </div>
                          <div className="pt-2">
                             <button 
                               onClick={() => {
                                 setIsCreatingRole(false);
                                 handleSave();
                               }}
                               className="w-full py-4 rounded-xl bg-slate-900 text-white font-black text-sm tracking-tight hover:bg-slate-800 transition-all"
                             >
                               Create Role
                             </button>
                          </div>
                       </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsCreatingRole(true)}
                      className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-200 text-slate-400 font-bold hover:border-purple-600 hover:text-purple-600 transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Create New Role
                    </button>
                  )}
                </div>
              )}


              {/* Security Modal */}
              {activeModal === 'security' && (
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
                          twoFactorEnabled ? "bg-purple-600" : "bg-slate-200"
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
                                 onClick={() => revokeSession(session.id)}
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

              {/* Payment Settings Modal */}
              {activeModal === 'billing' && (
                 <div className="space-y-8 py-4">
                    {isCreatingProvider ? (
                       <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                          <button onClick={() => setIsCreatingProvider(false)} className="text-purple-600 text-sm font-bold flex items-center gap-2">
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
                                 setIsCreatingProvider(false);
                                 handleSave();
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
                                 onClick={() => setActiveProvider(p as 'stripe' | 'flutterwave' | 'paystack' | 'paypal')}
                                 className={cn(
                                   "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                                   activeProvider === p ? "bg-white dark:bg-white/10 text-purple-600 dark:text-purple-400 shadow-sm" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
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
                                    onClick={() => toggleProvider(activeProvider)}
                                    className={cn(
                                      "w-12 h-6 rounded-full transition-colors relative flex items-center px-1",
                                      providersConfig[activeProvider].enabled ? "bg-purple-600" : "bg-slate-200 dark:bg-white/10"
                                    )}
                                 >
                                   <div className={cn(
                                     "w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200",
                                     providersConfig[activeProvider].enabled ? "translate-x-6" : "translate-x-0"
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
                                <button onClick={handleSave} className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white/10 text-white dark:text-slate-200 font-black text-sm tracking-tight hover:bg-slate-800 dark:hover:bg-white/20 transition-all mt-4 border border-transparent dark:border-white/10">
                                   Update {activeProvider.charAt(0).toUpperCase() + activeProvider.slice(1)} Credentials
                                </button>

                                <button 
                                   onClick={() => setIsCreatingProvider(true)}
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
                onClick={() => { setActiveModal(null); setEditingUser(null); }}
                className="px-6 py-2.5 rounded-xl text-slate-400 dark:text-slate-500 font-bold hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-8 py-2.5 rounded-xl bg-purple-600 text-white font-black text-sm tracking-tight hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <StatusModal 
        isOpen={showStatus}
        onClose={() => setShowStatus(false)}
        type={statusType}
        title={statusTitle}
        message={statusMessage}
      />

      {/* Billing Preview Modal (Invoice Style) */}
      {isPreviewingPDF && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 print:p-0 print:block">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md print:hidden" onClick={() => setIsPreviewingPDF(false)} />
          
          <div id="invoice-content" className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden print:shadow-none print:rounded-none print:max-w-none print:w-full print:h-full flex flex-col animate-in zoom-in-95 duration-300">
            {/* Modal Header with Gradient */}
            <div className="p-10 bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-between print:hidden">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-xl">
                  <Download className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">Billing Summary Preview</h3>
                  <p className="text-sm font-medium text-purple-100/80">Review your workspace financials</p>
                </div>
              </div>
              <button 
                onClick={() => setIsPreviewingPDF(false)}
                className="p-3 hover:bg-white/10 rounded-2xl transition-colors group"
              >
                <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Printable Content */}
            <div className="p-10 overflow-y-auto print:overflow-visible flex-1">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <div className="mb-6">
                    <NextImage 
                      src="/logo_dark.svg" 
                      alt="Recura Logo" 
                      width={140} 
                      height={30} 
                      className="h-9 w-auto object-contain"
                      priority
                    />
                  </div>
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-widest leading-relaxed">
                    Workspace Billing Summary<br />
                    Generated: {invoiceData.date}<br />
                    ID: {invoiceData.id}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">Company Details</div>
                  <div className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                    Business Owner Inc.<br />
                    {selectedIndustry}<br />
                    8 Active Members<br />
                    +1 (555) 123-4567<br />
                    www.business.com<br />
                    <span className="text-[10px] dark:text-slate-500">123 Business Street, Suite 100, New York, NY 10001</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Revenue</div>
                  <div className="text-3xl font-black text-slate-900">$12,378.25</div>
                </div>
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Active Provider</div>
                  <div className="text-xl font-black text-slate-900 capitalize">{activeProvider}</div>
                  <div className="text-[10px] font-bold text-purple-600 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Connected
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Active Controls</h4>
                <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Autobilling</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{isAutobillingEnabled ? 'Enabled' : 'Disabled'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-slate-500">Proration Logic</span>
                    <span className="text-xs font-bold text-slate-900">{prorationRange}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-slate-500">2FA Security</span>
                    <span className="text-xs font-bold text-slate-900">{twoFactorEnabled ? 'Secure' : 'Unprotected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-slate-500">Active Sessions</span>
                    <span className="text-xs font-bold text-slate-900">{activeSessions.length}</span>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-dashed border-slate-200 text-center">
                <p className="text-[10px] font-medium text-slate-400 tracking-tight">
                  This summary is an automated report of your workspace configuration and current billing metrics.<br />
                  © 2026 Recura Platforms Inc.
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-8 bg-slate-50 dark:bg-white/5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between print:hidden no-export">
              <button 
                onClick={() => setIsPreviewingPDF(false)}
                className="px-8 py-3 rounded-2xl text-slate-500 font-bold text-sm tracking-tight hover:bg-slate-100 transition-colors"
              >
                Close Preview
              </button>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={executeDownload}
                  disabled={isDownloading}
                  className="px-12 py-3 rounded-2xl bg-purple-600 text-white font-black text-sm tracking-tight hover:bg-purple-700 transition-all shadow-xl shadow-purple-600/30 flex items-center gap-2 disabled:opacity-50"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Save as Image
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <style jsx global>{`
            @media print {
              body * {
                visibility: hidden;
              }
              #invoice-content, #invoice-content * {
                visibility: visible;
              }
              #invoice-content {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                margin: 0;
                padding: 40px;
              }
              .print\\:hidden {
                display: none !important;
              }
            }
          `}</style>
        </div>
      )}

    </div>
  )
}
