import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button'; // Using your Shadcn Button
import { Search, ChevronDown } from 'lucide-react';

export function Navbar() {
  return (
    // The outer <nav> tag: fixes it to the top, gives it a dark background with blur
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm  border-b border-white/10">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">

        {/* 1. Logo Section */}
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

        {/* 2. Navigation Links (Hidden on small screens) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="#features" className="nav-link">
            Features <ChevronDown className="w-4 h-4 text-primary" />
          </Link>
          <Link href="#pricing" className="nav-link">Pricing</Link>
          <Link href="#integrations" className="nav-link">Integrations</Link>
          <Link href="#about" className="nav-link">About Us</Link>
        </div>


        
        {/* 3. Action Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/search">
          <button className="text-slate-400 transition-colors cursor-pointer hover:text-white hover:scale-105">
            <Search className="w-5 h-5 text-primary" />
          </button>
          </Link>
          <Link href="/signin">
            <Button variant="ghost" className="btn-outline px-6">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="ghost" className="btn-primary px-6">
              Sign Up
            </Button>
          </Link>
        </div>

      </div>
    </nav>
  );
}