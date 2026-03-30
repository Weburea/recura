'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Eye, EyeOff, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';

export function ResetPassword() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        router.push('/sign-in?reset=success');
      }, 1500);
    }
  };

  const getStrength = () => {
    if (!formData.password) return 0;
    let s = 0;
    if (formData.password.length >= 8) s++;
    if (/[A-Z]/.test(formData.password)) s++;
    if (/[0-9]/.test(formData.password)) s++;
    if (/[^A-Za-z0-9]/.test(formData.password)) s++;
    return s;
  };

  const strength = getStrength();

  return (
    <div className="w-full">
      <div className="mb-6 text-center sm:text-left">
        <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-widest uppercase">Reset Password</h1>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-bold max-w-sm">Identity verified. Please set a new, unique password for your account.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
            <div className="flex justify-between items-end mb-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">New Password</label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={cn(
                            "w-4 h-1 rounded-full transition-all duration-500",
                            strength >= i ? (strength <= 2 ? "bg-amber-500" : "bg-emerald-500") : "bg-slate-200 dark:bg-white/10"
                        )} />
                    ))}
                </div>
            </div>
            <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors w-5 h-5" />
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create strong password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={cn(
                        "pl-12 py-7 rounded-3xl border-slate-200 dark:border-white/10 dark:bg-white/5 font-bold text-slate-900 dark:text-white",
                        errors.password && "border-red-500 dark:border-red-500/50"
                    )}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>
            {errors.password && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2 ml-2">{errors.password}</p>}
        </div>

        <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Confirm New Password</label>
            <div className="relative group">
                <ShieldAlert className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors w-5 h-5" />
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={cn(
                        "pl-12 py-7 rounded-3xl border-slate-200 dark:border-white/10 dark:bg-white/5 font-bold text-slate-900 dark:text-white",
                        errors.confirmPassword && "border-red-500 dark:border-red-500/50"
                    )}
                />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2 ml-2">{errors.confirmPassword}</p>}
        </div>

        <Button 
            type="submit" 
            variant="brand" 
            disabled={isLoading}
            className="w-full py-6 text-sm font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-purple-600/20 dark:shadow-purple-900/40 mt-4"
        >
            <span className="relative z-10">{isLoading ? 'Updating...' : 'Finalize Encryption'}</span>
        </Button>
      </form>
    </div>
  );
}
