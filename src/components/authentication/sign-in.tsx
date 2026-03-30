'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { AuthTabs } from './auth-tabs';
import { SocialButton } from './social-button';
import { cn } from "@/lib/utils";

export function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Proceed with sign in
      console.log('Sign In Data:', formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };


  return (
    <div className="w-full">
      <div className="mb-4 text-center sm:text-left">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Welcome back</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">Start your experience with Recura by signing in</p>
      </div>

      <AuthTabs />

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors w-5 h-5" />
            <Input
                type="email"
                id="email"
                name="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                className={cn("pl-12 py-6 rounded-2xl", errors.email && "border-red-500")}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-2 font-bold">{errors.email}</p>}
          </div>
        </div>

        <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Password</label>
            <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors w-5 h-5" />
                <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    className={cn("pl-12 py-6 rounded-2xl", errors.password && "border-red-500")}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-2 font-bold">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="rounded border-gray-300 dark:border-white/20 dark:bg-white/5 text-purple-600 focus:ring-purple-500 dark:focus:ring-offset-gray-900 w-3.5 h-3.5 cursor-pointer" />
                <label htmlFor="remember" className="text-xs text-gray-600 dark:text-gray-300 cursor-pointer user-select-none">Remember me</label>
            </div>
            <Link href="/forgot-password" title="Recover your account" className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-all">
                Forgot Password?
            </Link>
        </div>

        <Button type="submit" variant="brand" className="w-full py-6 text-lg rounded-xl shadow-lg shadow-purple-600/20 dark:shadow-purple-900/40 mt-4">
          Sign In
        </Button>

        <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-white dark:bg-[#0D0518] px-4 text-gray-500 dark:text-gray-400 font-black">Or continue with</span>
            </div>
        </div>

        <div className="flex justify-center gap-4">
            <SocialButton label="Google" />
            <SocialButton label="Apple" />
            <SocialButton label="GitHub" />
        </div>

        <div className="mt-6 text-center px-4">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="text-purple-600 hover:text-purple-500 transition-colors underline decoration-purple-600/30 underline-offset-4">
                    Sign Up Free
                </Link>
            </p>
        </div>
      </form>
    </div>
  );
}
