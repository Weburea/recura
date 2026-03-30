'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, ArrowLeft, ShieldCheck } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/verify-code');
    }, 1500);
  };

  return (
    <div className="w-full">
      <div className="mb-6 text-center sm:text-left">
        <Link 
            href="/sign-in" 
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-purple-600 uppercase tracking-widest mb-4 transition-all"
        >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </Link>
        <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-widest uppercase">Recover Access</h1>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-bold max-w-sm">Enter your email for high-security verification.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Secure Email Address</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors w-5 h-5" />
            <Input
                type="email"
                id="email"
                name="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                }}
                className={cn(
                    "pl-12 py-7 rounded-3xl border-slate-200 dark:border-white/10 dark:bg-white/5 font-bold text-slate-900 dark:text-white",
                    error && "border-red-500 dark:border-red-500/50"
                )}
            />
          </div>
          {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2 ml-2">{error}</p>}
        </div>

        <Button 
            type="submit" 
            variant="brand" 
            disabled={isLoading}
            className="w-full py-6 text-sm font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-purple-600/20 dark:shadow-purple-900/40 relative overflow-hidden group/btn"
        >
            <span className="relative z-10">{isLoading ? 'Processing...' : 'Send Recovery Code'}</span>
            {!isLoading && <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500" />}
        </Button>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 mt-6">
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
                <span className="text-purple-600 font-black uppercase mr-1">Security Note:</span> 
                Our codes are encrypted and expire in 15 minutes.
            </p>
        </div>
      </form>
    </div>
  );
}
