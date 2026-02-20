"use client";

import { Button } from '@/components/ui/button';
import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Basic",
    description: "For small teams getting started",
    monthlyPrice: 29,
    annualPrice: 49,
    features: [
      "Manage subscriptions",
      "Send invoices",
      "Track inventory",
    ],
    highlight: false,
    buttonText: "Get started",
  },
  {
    name: "Growth",
    description: "For growing businesses with recurring revenue",
    monthlyPrice: 49,
    annualPrice: 240,
    features: [
      "Unlimited Subscription",
      "Automated billing & Invoice",
      "Advance analytics & Reports",
      "Inventory Tracking",
      "Use hosted payment pages",
      "Email support",
    ],
    highlight: true,
    buttonText: "Get started",
  },
  {
    name: "Business",
    description: "For large teams and scaling businesses",
    monthlyPrice: 999,
    annualPrice: 1800,
    features: [
      "Everything in growth",
      "Teams access & Role",
      "Custom Integration",
      "Priority Support",
      "Flexible revenue recognition configurations",
      "In-depth customization for reports and modules",
      "Priority support and dedicated account manager",
    ],
    highlight: false,
    buttonText: "Contact Us",
  },
];

export function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annually">("monthly");

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="section-title text-primary">
            The Right Plan for Your Business
          </h2>
          <p className="section-description text-gray-600">
            We have several powerful plans to showcase your business and get
            discovered as a creative entrepreneurs. Everything you need.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              billing === "monthly" ? "text-primary font-bold" : "text-gray-500"
            )}
          >
            Bill Monthly
          </span>
          <button
            onClick={() =>
              setBilling(billing === "monthly" ? "annually" : "monthly")
            }
            className="w-14 h-8 rounded-full bg-gray-200 p-1 relative transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            role="switch"
            aria-checked={billing === "annually"}
          >
            <div
              className={cn(
                "w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out",
                billing === "annually" ? "translate-x-6 bg-primary" : "translate-x-0 bg-primary"
              )}
            />
            {/* The toggle knob is purple in the image logic? The toggle track is usually the thing changing color. 
                In the image: Track is purple outline or light purple? Looks like track is light purple, knob is purple circle?
                Actually, the image shows:
                "Bill Monthly" (purple text) [Toggle: Track light purple, Knob purple filled circle on LEFT] "Bill Annually" (gray text).
                So when "Bill Monthly" is active, knob is left.
            */}
          </button>
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              billing === "annually"
                ? "text-primary font-bold"
                : "text-gray-500"
            )}
          >
            Bill Annually
          </span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "rounded-2xl p-8 flex flex-col relative transition-all duration-300 hover:shadow-xl",
                plan.highlight
                  ? "bg-gradient-purple text-white shadow-2xl scale-105 md:-mt-4 md:mb-4 z-10" // Growth card styling
                  : "bg-white text-gray-900 border border-gray-100 shadow-lg"
              )}
            >
              {plan.highlight && (
                <div className="absolute top-4 right-4">
                    <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30 flex items-center gap-1">
                      ✨ Popular
                    </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p
                  className={cn(
                    "text-sm",
                    plan.highlight ? "text-white/80" : "text-gray-500"
                  )}
                >
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold">
                    ${billing === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      plan.highlight ? "text-white/80" : "text-gray-400"
                    )}
                  >
                    /{billing === "monthly" ? "month" : "year"} 
                    {/* Assuming "year" for annual price display based on typical patterns, though user said "change to 49 dollars". 
                        The image shows "/month". If annual is a lump sum, it should probably say "/year" or just " billed annually".
                        User prompt said: "change to 49 dollars". 
                        I will put "/year" for clarity if annual is selected, or keep "/month" if it is monthly breakdown. 
                        Given $49/year is very cheap, likely it is /year.
                    */}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div
                className={cn(
                  "h-px w-full mb-8",
                  plan.highlight ? "bg-white/20" : "bg-gray-100"
                )}
              />

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className={cn(
                        "w-5 h-5 shrink-0",
                        plan.highlight ? "text-white" : "text-gray-800"
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm",
                        plan.highlight ? "text-white/90" : "text-gray-600"
                      )}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlight ? "outline" : plan.buttonText === "Contact Us" ? "brand" : "default"}
                className={cn(
                  "w-full py-6 rounded-full font-semibold transition-transform active:scale-95 text-base",
                  plan.highlight
                    ? "bg-white text-primary hover:bg-gray-50 border-white/20"
                    : plan.buttonText === "Contact Us"
                    ? ""
                    : "bg-gray-900 text-white hover:bg-gray-800"
                )}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
