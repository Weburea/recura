'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AuthTabs() {
  const pathname = usePathname();
  const isSignUp = pathname === '/sign-up';
  const isSignIn = pathname === '/sign-in';

  return (
    <div className="flex w-full mb-6 p-1 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
      <Link 
        href="/sign-up" 
        className={`flex-1 text-center py-2 rounded-lg text-sm font-black uppercase tracking-wider transition-all duration-300 ${
          isSignUp 
            ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20' 
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
      >
        Sign Up
      </Link>
      <Link 
        href="/sign-in" 
        className={`flex-1 text-center py-2 rounded-lg text-sm font-black uppercase tracking-wider transition-all duration-300 ${
          isSignIn 
            ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20' 
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
      >
        Sign In
      </Link>
    </div>
  );
}
