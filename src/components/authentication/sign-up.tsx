'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Check, X, User, Mail, Lock } from 'lucide-react';
import { AuthTabs } from './auth-tabs';
import { SocialButton } from './social-button';
import { cn } from "@/lib/utils";

export function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8 && password.length <= 20;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);
    return { minLength, hasSpecialChar, hasNumber };
  };

  const passwordValidations = validatePassword(formData.password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!passwordValidations.minLength || !passwordValidations.hasSpecialChar || !passwordValidations.hasNumber) {
        newErrors.password = 'Password does not meet requirements';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Proceed with sign up (e.g., API call)
      console.log('Sign Up Data:', formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
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
         {/* Logo moved to AuthLayout */}
         <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Welcome</h1>
         <p className="text-sm text-gray-600 dark:text-gray-300">Join thousands of teams managing their workflow</p>
      </div>

      <AuthTabs />

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <label htmlFor="fullName" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors w-5 h-5" />
            <Input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Alex Johnson"
                value={formData.fullName}
                onChange={handleChange}
                className={cn("pl-12 py-6 rounded-2xl", errors.fullName && "border-red-500")}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-2 font-bold">{errors.fullName}</p>}
          </div>
        </div>

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
                    placeholder="Create password"
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
             
             <div className="flex gap-2 mt-2">
                <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${formData.password.length > 0 ? (passwordValidations.minLength || passwordValidations.hasNumber || passwordValidations.hasSpecialChar ? 'bg-green-500' : 'bg-green-500') : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${formData.password.length > 0 && (Number(passwordValidations.minLength) + Number(passwordValidations.hasNumber) + Number(passwordValidations.hasSpecialChar) >= 2) ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${formData.password.length > 0 && passwordValidations.minLength && passwordValidations.hasNumber && passwordValidations.hasSpecialChar ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
            </div>

            <ul className="text-[11px] space-y-0.5 mt-1">
                <li className={`flex items-center gap-2 transition-colors ${passwordValidations.hasSpecialChar ? 'text-green-600' : 'text-gray-500 dark:text-gray-400'}`}>
                    {passwordValidations.hasSpecialChar ? <Check className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5 text-transparent" />}
                    <span>At least one special character</span>
                </li>
                 <li className={`flex items-center gap-2 transition-colors ${passwordValidations.minLength ? 'text-green-600' : 'text-gray-500 dark:text-gray-400'}`}>
                    {passwordValidations.minLength ? <Check className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5 text-transparent" />}
                    <span>8 - 20 Characters</span>
                </li>
                 <li className={`flex items-center gap-2 transition-colors ${passwordValidations.hasNumber ? 'text-green-600' : 'text-gray-500 dark:text-gray-400'}`}>
                    {passwordValidations.hasNumber ? <Check className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5 text-transparent" />}
                    <span>Contain number</span>
                </li>
            </ul>
        </div>
        

        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Confirm Password</label>
          <div className="relative group">
             <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors w-5 h-5" />
            <Input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={cn("pl-12 py-6 rounded-2xl", errors.confirmPassword && "border-red-500")}
            />
            <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
           {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1 ml-2 flex items-center gap-1">
                <X className="w-4 h-4" /> {errors.confirmPassword}
            </p>
           )}
        </div>

        <Button type="submit" variant="brand" className="w-full py-6 text-lg rounded-xl shadow-lg shadow-purple-600/20 dark:shadow-purple-900/40 mt-4">
          Sign Up
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
                Already have an account?{" "}
                <Link href="/sign-in" className="text-purple-600 hover:text-purple-500 transition-colors underline decoration-purple-600/30 underline-offset-4">
                    Sign In
                </Link>
            </p>
        </div>
      </form>
    </div>
  );
}
