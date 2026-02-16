"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    logo: "ONEPLUS",
    quote: "Managing subscriptions and billing used to be stressful. (Webname) made everything simple and organized",
    author: "John D.",
    role: "ONEPLUS",
    color: "text-red-600",
    borderColor: "border-red-600",
    iconText: "1+"
  },
  {
    logo: "Spotify",
    quote: "The analytics features have completely transformed how we understand our user base. Highly recommended!",
    author: "Sarah M.",
    role: "Product Manager",
    color: "text-green-500",
    borderColor: "border-green-500",
    iconText: "Sp"
  },
  {
    logo: "Slack",
    quote: "We've saved countless hours on invoicing thanks to the automated billing system. It just works.",
    author: "Mike R.",
    role: "Operations Director",
    color: "text-blue-500",
    borderColor: "border-blue-500",
    iconText: "Sl"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header - Aligned to the start of the card container */}
        <div className="max-w-6xl mx-auto ps-3 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-bold inline-block">
            Testimonials
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl">
            Business across different industries use (webname) to manage
            subscription with ease
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[500px]">
          {/* Left Side - Brand/Logo Area */}
          <div className="md:w-5/12 bg-fuchsia-50 flex items-center justify-center p-12 min-h-[300px] transition-all duration-300">
             <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-300" key={currentIndex}>
                <div className={cn("w-12 h-12 border-2 flex items-center justify-center font-bold text-2xl rounded-sm", current.borderColor, current.color)}>
                    {current.iconText}
                </div>
                <span className={cn("font-bold text-4xl tracking-tight", current.color)}>{current.logo}</span>
             </div>
          </div>

          {/* Right Side - Content Area */}
          <div className="md:w-7/12 bg-gradient-purple p-12 flex flex-col justify-between relative text-white">
            
            <div className="flex-1 flex flex-col justify-center animate-in slide-in-from-right-4 duration-300 fade-in" key={currentIndex}>
              <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-12">
                &quot;{current.quote}&quot;
              </blockquote>

              <div>
                <div className="font-semibold text-xl mb-1">{current.author}</div>
                <div className="text-white/80 text-lg">{current.role}</div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 self-end mt-8">
              <button 
                onClick={prevTestimonial}
                className="btn-icon"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="btn-icon"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
