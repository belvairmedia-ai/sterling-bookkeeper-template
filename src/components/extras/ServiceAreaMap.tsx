"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface ServiceAreaMapProps {
  label: string;
  headline: string;
  description: string;
  areas: string[];
  mapImage?: string;
}

export function ServiceAreaMap({ label, headline, description, areas, mapImage }: ServiceAreaMapProps) {
  return (
    <Section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp} custom={0}>
            <SectionLabel>{label}</SectionLabel>
            <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
            <p className="mt-4 text-stone-500 text-lg leading-relaxed">{description}</p>

            <div className="mt-10">
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-stone-400 mb-4">
                Areas we serve
              </p>
              <div className="flex flex-wrap gap-2">
                {areas.map((area, i) => (
                  <motion.span
                    key={area}
                    variants={fadeUp}
                    custom={i * 0.5}
                    className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[13px] font-medium text-stone-700 hover:border-accent hover:text-accent transition-colors"
                  >
                    <svg className="h-3 w-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {area}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="relative">
            {mapImage ? (
              <div className="relative h-96 rounded-2xl overflow-hidden border border-stone-100 shadow-lg">
                <Image src={mapImage} alt="Service area map" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent" />
              </div>
            ) : (
              <div className="h-96 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center relative overflow-hidden">
                {/* Decorative map placeholder */}
                <div className="absolute inset-0 opacity-5">
                  <svg viewBox="0 0 400 300" className="w-full h-full" fill="currentColor">
                    <path d="M50,100 Q100,50 150,120 Q200,80 250,140 Q300,100 350,130 L350,250 L50,250 Z" className="text-accent" opacity="0.5" />
                    <circle cx="200" cy="150" r="20" className="text-accent" />
                  </svg>
                </div>
                <div className="relative z-10 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
                    <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                    </svg>
                  </div>
                  <p className="font-semibold text-stone-700 text-[15px]">Service Coverage Map</p>
                  <p className="text-[13px] text-stone-400 mt-1">{areas.length} areas served</p>
                </div>
              </div>
            )}

            {/* Floating stats */}
            <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white border border-stone-100 shadow-lg px-5 py-4">
              <p className="text-2xl font-bold text-stone-900">{areas.length}+</p>
              <p className="text-[12px] text-stone-500">Areas covered</p>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
