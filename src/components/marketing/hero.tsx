import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative bg-white pt-32 pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/landing/line_bg.png"
          alt="Background Pattern"
          fill
          className="object-cover opacity-80 pointer-events-none"
          priority
        />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 text-center">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          <span className="text-gradient">
            Manage Subscriptions, Billings, And <br />
          </span>
          <span className="text-gradient-bold">
            Inventory From One Dashboard
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Master your financial operations with a unified platform that integrates efficient invoicing, flexible subscription management, and full tax regulatory compliance
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <Link href="/start-trial">
            <Button variant="brand" className="px-8 py-6 text-lg">
              Start your free trial
            </Button>
          </Link>
          <Link href="/demo">
            <Button variant="outline-brand" className="px-8 py-6 text-lg">
              Request Demo
            </Button>
          </Link>
        </div>

        {/* Dashboard Image Preview */}
        <div className="relative mx-auto mt-16 w-full max-w-[1400px]">
          <Image 
            src="/images/landing/hero-dashboard.png" 
            alt="Recura Dashboard"
            width={1300}
            height={800}
            className="w-full h-auto"
            priority 
          />
        </div>
      </div>
    </section>
  );
}