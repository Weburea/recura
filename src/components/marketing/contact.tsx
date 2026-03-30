'use client';
import { Button } from '@/components/ui/button';

import React from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function Contact() {
  return (
    <section className="py-24 bg-white dark:bg-transparent relative overflow-hidden" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="section-title text-dark dark:text-white">Contact Us</h2>
          <p className="section-description text-gray-600 dark:text-slate-300 mx-auto">
            Have a question or need support? Our team is ready to help you get the most out of Recura.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <div className="w-full max-w-lg mx-auto lg:mx-0">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>

              <div>
                <label htmlFor="subject" className="sr-only">Subject</label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Subject"
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Message"
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none"
                ></textarea>
              </div>

              <Button type="button" variant="brand" className="w-full py-6 rounded-xl font-medium text-lg">
                Send Message
              </Button>
            </form>
          </div>

          {/* Map Placeholder */}
          <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center">
            <Card className="w-full h-full flex items-center justify-center bg-gray-50/50 dark:bg-white/5 border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Global Reach</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                  Map visualization is temporarily unavailable while we upgrade our infrastructure, but we support customers worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
