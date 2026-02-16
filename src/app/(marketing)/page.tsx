import { Navbar } from '@/components/marketing/navbar';
import { Hero } from '@/components/marketing/hero';
import { Brands } from '@/components/marketing/brands';
import { Services } from '@/components/marketing/services';
import { Booking } from '@/components/marketing/booking';
import { BusinessTypes } from '@/components/marketing/business-types';
import { Pricing } from '@/components/marketing/pricing';
import { Testimonials } from '@/components/marketing/testimonials';
import Integration from '@/components/marketing/integration';
import { Contact } from '@/components/marketing/contact';
import { Faq } from '@/components/marketing/faq';
import { Footer } from '@/components/marketing/footer';

export default function LandingPage() {
  return (
    // A main wrapper with the dark background color
    <main className="bg-dark min-h-screen">
      <Navbar />
      <Hero />
      <Brands />
      <Services />
      <Booking />
      <Testimonials />
      <Integration />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}