import { Navbar } from '@/components/marketing/navbar';
import { Hero } from '@/components/marketing/hero';
import { Brands } from '@/components/marketing/brands';
import { Services } from '@/components/marketing/services';
import { Booking } from '@/components/marketing/booking';

export default function LandingPage() {
  return (
    // A main wrapper with the dark background color
    <main className="bg-dark min-h-screen">
      <Navbar />
      <Hero />
      <Brands />
      <Services />
      <Booking />
      {/* <Features /> */}
      {/* <Pricing /> */}
    </main>
  );
}