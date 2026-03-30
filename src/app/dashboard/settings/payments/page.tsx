import { PaymentSettingsForm } from "@/components/dashboard/settings/payment-settings-form";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Payment Settings - Recura",
  description: "Manage your payment gateway and billing configurations",
};

export default function PaymentsPage() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">
        <span>Settings</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900 dark:text-white">Payment Settings</span>
      </div>

      <div className="dashboard-card overflow-hidden">
        <div className="px-10 py-8 border-b border-gray-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Payment Settings</h2>
          <p className="text-slate-400 dark:text-slate-500 font-medium text-sm mt-1">Manage your payment gateways, card designs, and billing preferences</p>
        </div>
        
        <div className="p-10">
          <PaymentSettingsForm />
        </div>
      </div>
    </div>
  );
}
