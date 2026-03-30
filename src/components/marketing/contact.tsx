'use client';
import { Button } from '@/components/ui/button';

import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import Image from 'next/image';

interface GeographyObject {
  rsmKey: string;
  properties?: Record<string, unknown>;
  geometry?: Record<string, unknown>;
  [key: string]: unknown;
}

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const mapMarkers = [
    { name: "Canada", coordinates: [-106, 56] as [number, number], image: "/images/landing/map/tag-2.png" }, 
    { name: "Brazil", coordinates: [-51, -14] as [number, number], image: "/images/landing/map/tag-3.png" },
    { name: "Germany", coordinates: [10, 51] as [number, number], image: "/images/landing/map/tag-1.png" },
    { name: "Pakistan", coordinates: [69, 30] as [number, number], image: "/images/landing/map/tag.png" },
];

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

          {/* Map */}
          <div className="relative w-full h-[400px] lg:h-[500px]">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 100,
                center: [0, 20]
              }}
              className="w-full h-full"
            >
              <Geographies geography={geoUrl}>
                {({ geographies }: { geographies: GeographyObject[] }) =>
                  geographies.map((geo: GeographyObject) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#e5e7eb"
                      stroke="#FFFFFF"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#d1d5db", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>
              
              {mapMarkers.map(({ name, coordinates, image }) => (
                <Marker key={name} coordinates={coordinates}>
                  <foreignObject x="-104" y="-100" width="208" height="104">
                    <div className="relative group cursor-pointer transition-transform hover:scale-110 hover:z-10">
                        <Image 
                            src={image} 
                            alt={name} 
                            width={208} 
                            height={104} 
                            className="w-52 h-auto object-contain drop-shadow-xl"
                        />
                    </div>
                  </foreignObject>
                </Marker>
              ))}
            </ComposableMap>
          </div>
        </div>
      </div>
    </section>
  );
}
