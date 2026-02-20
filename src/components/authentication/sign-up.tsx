'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Check, X, User, Mail, Lock } from 'lucide-react';
import { AuthTabs } from './auth-tabs';

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

  const inputClasses = "w-full px-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-gray-800 placeholder:text-gray-400 pl-12 shadow-sm";
  const iconClasses = "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5";

  return (
    <div className="w-full">
      <div className="mb-8 text-center sm:text-left">
         {/* Logo moved to AuthLayout */}
         <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h1>
         <p className="text-gray-600">Join thousands of teams managing their workflow with ease</p>
      </div>

      <AuthTabs />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label htmlFor="fullName" className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
          <div className="relative">
            <User className={iconClasses} />
            <input
                type="text"
                id="fullName"
                name="fullName"
                // placeholder="Full Name" 
                // Design might imply simpler placeholders or none if label is there.
                // Keeping it blank or simple as design shows just icon often.
                value={formData.fullName}
                onChange={handleChange}
                className={`${inputClasses} ${errors.fullName ? 'border-red-500 focus:border-red-500/50 focus:ring-red-500/20' : ''}`}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1 ml-2">{errors.fullName}</p>}
          </div>
        </div>

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
             
             {/* Dynamic Password Strength Indicator Bars */}
             <div className="flex gap-2 mt-3">
                <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${formData.password.length > 0 ? (passwordValidations.minLength || passwordValidations.hasNumber || passwordValidations.hasSpecialChar ? 'bg-green-500' : 'bg-green-500') : 'bg-gray-200'}`}></div>
                <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${formData.password.length > 0 && (Number(passwordValidations.minLength) + Number(passwordValidations.hasNumber) + Number(passwordValidations.hasSpecialChar) >= 2) ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${formData.password.length > 0 && passwordValidations.minLength && passwordValidations.hasNumber && passwordValidations.hasSpecialChar ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            </div>

            <ul className="text-sm space-y-1 mt-2">
                <li className={`flex items-center gap-2 transition-colors ${passwordValidations.hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordValidations.hasSpecialChar ? <Check className="w-4 h-4" /> : <Check className="w-4 h-4 text-transparent" />} {/* Keeping layout stable */}
                    <span className={passwordValidations.hasSpecialChar ? "" : "text-gray-500"}>At least one special character</span>
                </li>
                 <li className={`flex items-center gap-2 transition-colors ${passwordValidations.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordValidations.minLength ? <Check className="w-4 h-4" /> : <Check className="w-4 h-4 text-transparent" />}
                    <span className={passwordValidations.minLength ? "" : "text-gray-500"}>8 - 20 Characters</span>
                </li>
                 <li className={`flex items-center gap-2 transition-colors ${passwordValidations.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordValidations.hasNumber ? <Check className="w-4 h-4" /> : <Check className="w-4 h-4 text-transparent" />}
                    <span className={passwordValidations.hasNumber ? "" : "text-gray-500"}>Contain number</span>
                </li>
            </ul>
        </div>
        

        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 ml-1">Confirm Password</label>
          <div className="relative">
             <Lock className={iconClasses} />
            <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`${inputClasses} ${errors.confirmPassword ? 'border-red-500 focus:border-red-500/50 focus:ring-red-500/20' : ''}`}
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

        <Button type="submit" variant="brand" className="w-full py-6 text-lg rounded-xl shadow-lg shadow-purple-200 mt-4">
          Sign Up
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
            <SocialButton icon="/images/icons/google.svg" label="Google" />
            <SocialButton icon="/images/icons/apple.svg" label="Apple" />
            <SocialButton icon="/images/icons/github.svg" label="GitHub" />
        </div>
      </form>
    </div>
  );
}

function SocialButton({ icon, label }: { icon: string; label: string }) {
    // Using Lucide icons for fallback if images not present
    // The user mentioned replacing X with GitHub.
    // I will try to use `simple-icons` or just Lucide/Text if images are missing.
    // Assuming standard images might be absent, I'll attempt to use inline SVGs for standard logos if possible or stick to text fallback.
    // Actually, I'll use text labels if icon fails, but I'll try to find or use generic placeholders.
    // Since I cannot fetch external images easily without valid URLs, and user provided images folder check was empty-ish for icons.
    
    // Quick inline SVGs for these common logos to ensure they appear:
    const getIcon = () => {
        if (label === 'Google') return (
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        );
        if (label === 'Apple') return (
            <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.29-1.02 3.93-.84 1.31.14 2.29.57 2.94 1.5-2.66 1.58-2.24 4.83.35 5.86-.53 1.62-1.37 3.3-2.3 4.71zM11.96 4.98c.66-1.62 2.37-2.92 4.14-2.98.02 1.48-.92 3.51-2.95 3.56-.75.05-1.76-.79-1.19-1.49-.09 0-.05.57 0 .91z"/></svg>
        );
        if (label === 'GitHub') return (
            <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 2.592 1.028 3.683 0 3.848-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"/></svg>
        );
        return <span className="text-xs font-bold">{label[0]}</span>;
    }

    return (
        <button type="button" className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors shadow-sm w-12 h-12 flex items-center justify-center" aria-label={`Sign in with ${label}`}>
             {getIcon()}
        </button>
    )
}
