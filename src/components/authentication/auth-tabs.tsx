'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AuthTabs() {
  const pathname = usePathname();
  const isSignUp = pathname === '/sign-up';
  const isSignIn = pathname === '/sign-in';

  return (
    <div className="flex w-full mb-8 border border-gray-200 rounded-lg p-1 bg-white">
      <Link 
        href="/sign-up" 
        className={`flex-1 text-center py-2.5 rounded-md text-sm font-medium transition-all ${
          isSignUp 
            ? 'bg-white text-purple-600 shadow-sm border border-gray-100 ring-1 ring-black/5' 
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
        }`}
      >
        Sign Up
      </Link>
      <Link 
        href="/sign-in" 
        className={`flex-1 text-center py-2.5 rounded-md text-sm font-medium transition-all ${
          isSignIn 
            ? 'bg-purple-600 text-white shadow-md' 
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
        }`}
      >
        Sign In
      </Link>
    </div>
  );
}
