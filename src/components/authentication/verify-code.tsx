'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, KeyRound, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';

export function VerifyCode() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1); // Only allow 1 char
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length < 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/reset-password');
    }, 1500);
  };

  return (
    <div className="w-full">
      <div className="mb-6 text-center sm:text-left">
        <Link 
            href="/forgot-password" 
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-purple-600 uppercase tracking-widest mb-4 transition-all"
        >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Link>
        <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/10 flex items-center justify-center">
                <KeyRound className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-widest uppercase">Verification</h1>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-bold max-w-sm">Enter the 6-digit cryptographic code sent to your email.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">One-Time Recovery Code</label>
          <div className="flex justify-between gap-2 sm:gap-4">
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={cn(
                  "w-full aspect-square text-center text-xl font-black rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/10 dark:bg-white/5 text-slate-900 dark:text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all shadow-sm",
                  error && "border-red-500 dark:border-red-500/30"
                )}
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2 ml-2">{error}</p>}
        </div>

        <Button 
            type="submit" 
            variant="brand" 
            disabled={isLoading}
            className="w-full py-6 text-sm font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-purple-600/20 dark:shadow-purple-900/40 mt-4"
        >
            <span className="relative z-10 flex items-center justify-center gap-3">
                {isLoading ? 'Verifying...' : 'Authorize Recovery'}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
            </span>
        </Button>

        <div className="flex flex-col items-center gap-4 pt-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Didn&apos;t receive the code?{" "}
                {timer > 0 ? (
                    <span className="text-slate-400 font-medium">In {timer}s</span>
                ) : (
                    <button 
                        type="button" 
                        onClick={() => setTimer(59)}
                        className="text-purple-600 hover:text-purple-500 transition-colors font-black underline decoration-purple-600/30 underline-offset-4"
                    >
                        Resend Code
                    </button>
                )}
            </p>
        </div>
      </form>
    </div>
  );
}
