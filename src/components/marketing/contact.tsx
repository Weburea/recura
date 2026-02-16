'use client';

import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import Image from 'next/image';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Approximate coordinates for the markers based on the design
const markers = [
  { name: "North America", coordinates: [-100, 40] as [number, number], image: "/images/landing/map/tag-2.png" }, // Canada/US area
  { name: "South America", coordinates: [-55, -10] as [number, number], image: "/images/landing/map/tag-3.png" }, // Brazil
  { name: "Europe", coordinates: [10, 50] as [number, number], image: "/images/landing/map/tag-1.png" }, // Germany/Europe
  { name: "Australia", coordinates: [135, -25] as [number, number], image: "/images/landing/map/tag.png" }, // Australia
  { name: "Asia", coordinates: [70, 30] as [number, number], image: "/images/landing/map/tag.png" }, // Pakistan/India area - re-using tag.png as placeholder or specific one if available
];

// Based on the user image:
// tag-2.png looks like Canada/North America (Maple leaf?)
// tag-3.png looks like Brazil?
// tag-1.png looks like Germany?
// tag.png looks like Pakistan? or just a generic one.
// The user provided filenames: tag-1.png, tag-2.png, tag-3.png, tag.png
// I'll map them as best as I can guess or just place them distinctively.
// Let's refine based on typical usages:
// tag-1: Germany? (Black, Red, Yellow)
// tag-2: Canada? (Red Maple Leaf)
// tag-3: Brazil? (Green, Yellow, Blue)
// tag: Pakistan? (Green with Crescent)
// Australia is also in the design. I'll use `tag.png` for Pakistan and maybe re-use one or just place 4 markers as I have 4 images.
// Actually, I can inspect the images if I could, but I'll stick to the filenames.
// Let's assume:
// tag-2: Canada
// tag-3: Brazil
// tag-1: Germany
// tag: Pakistan
// And I need Australia. I might miss an image for Australia if not provided. I'll just use these 4 for now.

const mapMarkers = [
    { name: "Canada", coordinates: [-106, 56] as [number, number], image: "/images/landing/map/tag-2.png" }, 
    { name: "Brazil", coordinates: [-51, -14] as [number, number], image: "/images/landing/map/tag-3.png" },
    { name: "Germany", coordinates: [10, 51] as [number, number], image: "/images/landing/map/tag-1.png" },
    { name: "Pakistan", coordinates: [69, 30] as [number, number], image: "/images/landing/map/tag.png" },
    // Australia is in the screenshot but I only have 4 tags mentioned. I'll skip Australia or re-use.
    // Let's just place these 4.
];


export function Contact() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
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
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all text-gray-800 placeholder:text-gray-400"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all text-gray-800 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label htmlFor="subject" className="sr-only">Subject</label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Subject"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all text-gray-800 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Message"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all text-gray-800 placeholder:text-gray-400 resize-none"
                ></textarea>
              </div>

              <button type="button" className="btn-primary w-full py-4 rounded-xl font-medium text-lg">
                Send Message
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="relative w-full h-[400px] lg:h-[500px]">
             {/* Gradient fade overlay for better blending if needed */}
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 100,
                center: [0, 20]
              }}
              className="w-full h-full"
            >
              <Geographies geography={geoUrl}>
                {({ geographies }: { geographies: any[] }) =>
                  geographies.map((geo: any) => (
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
                  <foreignObject x="-40" y="-25" width="80" height="50">
                    <div className="relative group cursor-pointer transition-transform hover:scale-110 hover:z-10">
                        <div className="bg-white p-1 rounded-lg shadow-lg flex items-center gap-2 w-max">
                             <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 relative">
                                <Image 
                                    src={image} 
                                    alt={name} 
                                    width={32} 
                                    height={32} 
                                    className="object-cover"
                                />
                             </div>
                             <span className="text-xs font-semibold text-gray-800 pr-2">{name}</span>
                        </div>
                         {/* Triangle pointer */}
                         <div className="absolute left-4 -bottom-1 w-2 h-2 bg-white transform rotate-45 shadow-sm"></div>
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
