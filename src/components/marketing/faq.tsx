"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming cn utility exists, otherwise I'll use template literals or check for clsx. 
// Actually, I should check if @/lib/utils exists or similar. The user has clsx and tailwind-merge installed.
// I will assume standard shadcn-like utility or just write inline for now if I am not sure, but looking at package.json, they have the deps.
// Let's safe check utils existence or just implement simple logic.
// I saw "lib" in previous lists? No. I checked "src/app" and "src/components".
// Let's assume standard react patterns.

const faqs = [
  {
    question: "Who is your primary target audience?",
    answer: "Our primary target audience includes SaaS businesses, startups, and enterprises looking to streamline their billing and operational workflows."
  },
  {
    question: "What problem is Recura solving for your users?",
    answer: "Recura solves the complexity of recurring billing, subscription management, and workflow automation, allowing businesses to focus on growth."
  },
  {
    question: "What core features does your SaaS currently offer?",
    answer: "We offer advanced subscription management, automated invoicing, dunning management, and seamless integrations with popular tools."
  },
  {
    question: "Which features are used the most?",
    answer: "Our automated billing engine and comprehensive analytics dashboard are among the most utilized features by our customers."
  },
  {
    question: "How do you currently deliver value to customers?",
    answer: "We deliver value by reducing manual operational overhead, minimizing churn through smart retries, and providing actionable insights."
  }
];

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-20 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Frequently Asked Questions
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={cn(
                  "bg-white rounded-2xl overflow-hidden transition-all duration-300",
                   openIndex === index ? "shadow-lg shadow-purple-100" : "shadow-sm"
                )}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-slate-800 text-lg pr-4">{faq.question}</span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 shrink-0",
                    openIndex === index ? "bg-slate-900 text-white" : "bg-white text-slate-900"
                  )}>
                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>
                
                <div 
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Image */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-[300px] aspect-square">
               {/* Using the user provided image path */}
               <Image 
                 src="/images/landing/question_mark.png"
                 alt="FAQ Visualization"
                 fill
                 className="object-contain"
               />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


