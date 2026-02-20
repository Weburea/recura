'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
  children?: React.ReactNode;
  imageSrc: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  reverse?: boolean; // If true, image is on the right
}

export function AuthLayout({ 
  children, 
  imageSrc, 
  imageAlt = "Authentication Dashboard Preview", 
  title = "Turn Data Into Clear Decisions",
  subtitle = "See trends, track performance, and grow with confidence",
  reverse = false 
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex w-full bg-white relative">
      {/* Back to Home Button - Absolute only if you want it over content, or fixed */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>

      <div className={`flex w-full min-h-screen ${reverse ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Gradient Side Panel */}
        <div 
          className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-center items-center p-12 text-white"
          style={{
            background: 'linear-gradient(135deg, #A28CFF 0%, #8A3BF5 100%)'
          }}
        >
           <div className="max-w-xl w-full z-10 space-y-8">
              <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-sm">
                    {title}
                  </h1>
                  <p className="text-lg text-white/90 leading-relaxed max-w-md drop-shadow-sm">
                    {subtitle}
                  </p>
              </div>

              {/* Floating Dashboard Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 bg-white/10 backdrop-blur-sm  p-2">
                 <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className="object-cover object-top"
                        priority
                    />
                 </div>
              </div>
           </div>

           {/* Decorative Elements (Optional based on design nuances) */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 overflow-y-auto bg-white relative ">
           {/* Logo Top Right */}
           <div className="absolute top-6 right-6">
                <Image src="/images/landing/logo.png" alt="Recura" width={100} height={32} className="w-auto h-5" />
           </div>

          <div className="w-full max-w-md space-y-8 mt-12 lg:mt-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
