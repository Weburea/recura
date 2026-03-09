import { PaymentSettingsForm } from "@/components/dashboard/settings/payment-settings-form";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Payment Settings - Recura",
  description: "Manage your payment gateway and billing configurations",
};

export default function PaymentsPage() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
        <span>Settings</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900">Payment Settings</span>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 h-full overflow-hidden shadow-sm shadow-slate-200/50">
        <div className="px-10 py-8 border-b border-gray-50 bg-white/50 backdrop-blur-sm">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Payment Settings</h2>
          <p className="text-slate-400 font-medium text-sm mt-1">Manage your payment gateways, card designs, and billing preferences</p>
        </div>
        
        <div className="p-10">
          <PaymentSettingsForm />
        </div>
      </div>
    </div>
  );
}
