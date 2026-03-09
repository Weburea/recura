'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Check, X, User, Mail, Lock } from 'lucide-react';
import { AuthTabs } from './auth-tabs';
import { SocialButton } from './social-button';

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
            <SocialButton label="Google" />
            <SocialButton label="Apple" />
            <SocialButton label="GitHub" />
        </div>
      </form>
    </div>
  );
}
