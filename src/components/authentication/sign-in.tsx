'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { AuthTabs } from './auth-tabs';
import { SocialButton } from './social-button';

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

  const inputClasses = "w-full px-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-gray-800 placeholder:text-gray-400 pl-12 shadow-sm";
  const iconClasses = "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5";

  return (
    <div className="w-full">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-600">Start your experience with Recura by signing in or signing up</p>
      </div>

      <AuthTabs />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 ml-1">Email</label>
          <div className="relative">
            <Mail className={iconClasses} />
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${inputClasses} ${errors.email ? 'border-red-500 focus:border-red-500/50 focus:ring-red-500/20' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 ml-2">{errors.email}</p>}
          </div>
        </div>

        <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 ml-1">Password</label>
            <div className="relative">
                <Lock className={iconClasses} />
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`${inputClasses} ${errors.password ? 'border-red-500 focus:border-red-500/50 focus:ring-red-500/20' : ''}`}
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
            {errors.password && <p className="text-red-500 text-sm mt-1 ml-2">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer" />
                <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer user-select-none">Remember me</label>
            </div>
            <Link href="/forgot-password" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                Forgot Password?
            </Link>
        </div>

        <Button type="submit" variant="brand" className="w-full py-6 text-lg rounded-xl shadow-lg shadow-purple-200 mt-4">
          Sign In
        </Button>

        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">Or continue with</span>
            </div>
        </div>

        <div className="flex justify-center gap-4">
            <SocialButton label="Google" />
            <SocialButton label="Apple" />
            <SocialButton label="GitHub" />
        </div>
      </form>
    </div>
  );
}
