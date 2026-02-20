"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">

        {/* 1. Logo Section */}
        <Link href="/" className="flex items-center gap-2">
           <Image
             src="/images/landing/logo.png"
             alt="Recura Logo"
             width={120}
             height={40}
             className="w-auto object-contain"
           />
        </Link>

        {/* 2. Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          
          {/* Features Dropdown Trigger */}
          <div className="relative group">
            <button 
              className="nav-link flex items-center gap-1 focus:outline-none"
              onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
              onMouseEnter={() => setIsFeaturesOpen(true)}
              onMouseLeave={() => setIsFeaturesOpen(false)}
            >
              Features <ChevronDown className={`w-4 h-4 text-primary transition-transform ${isFeaturesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Features Dropdown Content */}
            <div 
              className={`absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-lg rounded-lg py-2 mt-1 transform transition-all duration-200 origin-top-left ${
                isFeaturesOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
              }`}
              onMouseEnter={() => setIsFeaturesOpen(true)}
              onMouseLeave={() => setIsFeaturesOpen(false)}
            >
              <Link href="/sign-in" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Sign In</Link>
              <Link href="/sign-up" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Sign Up</Link>
              <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Dashboard</Link>
            </div>
          </div>

          <Link href="#pricing" className="nav-link">Pricing</Link>
          <Link href="#integrations" className="nav-link">Integrations</Link>
          <Link href="#about" className="nav-link">About Us</Link>
        </div>

        {/* 3. Action Buttons & Mobile Toggle */}
        <div className="flex items-center gap-4">
          
          {/* Search Popover */}
          <div className="relative">
             <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-slate-400 transition-colors cursor-pointer hover:text-black hover:scale-105"
             >
              {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5 text-primary" />}
            </button>
            
            {/* Search Input Dropdown */}
            <div className={`absolute right-0 top-full mt-2 w-64 bg-white border border-gray-100 shadow-lg rounded-lg p-2 transform transition-all duration-200 origin-top-right ${
                isSearchOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
            }`}>
                <input 
                    ref={searchInputRef}
                    type="text" 
                    placeholder="Search..." 
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/sign-in">
                <Button variant="outline-brand" className="px-6">
                Sign In
                </Button>
            </Link>
            <Link href="/sign-up">
                <Button variant="brand" className="px-6">
                Sign Up
                </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-t border-gray-100 shadow-lg p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
            <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                  className="flex items-center justify-between text-lg font-medium text-gray-700 py-2 border-b border-gray-50"
                >
                    Features 
                    <ChevronDown className={`w-4 h-4 transition-transform ${isFeaturesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isFeaturesOpen && (
                    <div className="pl-4 flex flex-col gap-2 border-l-2 border-primary/20 bg-gray-50/50 rounded-sm py-2">
                        <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-gray-600">Sign In</Link>
                        <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-gray-600">Sign Up</Link>
                        <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-gray-600">Dashboard</Link>
                    </div>
                )}
            </div>
            
            <Link href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-700 py-2 border-b border-gray-50">Pricing</Link>
            <Link href="#integrations" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-700 py-2 border-b border-gray-50">Integrations</Link>
            <Link href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-700 py-2 border-b border-gray-50">About Us</Link>
            
            <div className="flex flex-col gap-3 mt-4">
                 <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline-brand" className="w-full justify-center">Sign In</Button>
                 </Link>
                 <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="brand" className="w-full justify-center">Sign Up</Button>
                 </Link>
            </div>
        </div>
      )}
    </nav>
  );
}
