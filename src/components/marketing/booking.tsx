import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Booking() {
  return (
    <section className="py-10 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-[2.5rem] p-2 md:p-4 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
            
          {/* Image Section */}
          <div className="w-full md:w-3/12 relative min-h-[300px] md:min-h-[400px]">
             <div className="relative w-full h-full">
                <Image
                src="/images/landing/Cash-machines.png"
                alt="Recura Billing Cash Machines"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
                priority
                />
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-9/12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="text-gradient">
                    Get Recura Billing and Elevate
                </span>{' '}
                <br className="hidden md:block" />
                <span className="text-gradient-bold"> your billing experience </span>
                </h2>
                <p className="text-slate-500 text-lg md:text-lg leading-relaxed">
                Get a quick overview of Recura&apos;s capabilities over a 45-minute session with our product experts.
                </p>
            </div>

            <div className="flex-shrink-0">
                <Link href="#">
                    <Button variant="ghost" className="btn-primary px-8 py-6 text-lg shadow-primary/25">
                        Schedule a Call
                    </Button>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
