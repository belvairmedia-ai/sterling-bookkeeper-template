"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface BookingService {
  name: string;
  duration: string;
  price: string;
}

export interface BookingWidgetProps {
  label: string;
  headline: string;
  description: string;
  bookingUrl: string;
  services: BookingService[];
}

export function BookingWidget({ label, headline, description, bookingUrl, services }: BookingWidgetProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <Section className="py-24 lg:py-32 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp} custom={0}>
            <SectionLabel>{label}</SectionLabel>
            <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
            <p className="mt-4 text-stone-500 text-lg leading-relaxed">{description}</p>

            <div className="mt-10 space-y-3">
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-stone-400">
                Select a service
              </p>
              {services.map((service, i) => (
                <button
                  key={service.name}
                  onClick={() => setSelected(i)}
                  className={`w-full flex items-center justify-between rounded-xl border px-5 py-4 text-left transition-all ${
                    selected === i
                      ? "border-accent bg-accent/5"
                      : "border-stone-100 bg-white hover:border-stone-200 hover:shadow-md"
                  }`}
                >
                  <div>
                    <p className={`font-semibold text-[15px] ${selected === i ? "text-accent" : "text-stone-900"}`}>
                      {service.name}
                    </p>
                    <p className="text-[13px] text-stone-500 mt-0.5">{service.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${selected === i ? "text-accent" : "text-stone-900"}`}>
                      {service.price}
                    </p>
                    {selected === i && (
                      <span className="text-[11px] font-semibold text-accent">Selected</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <a
              href={selected !== null ? `${bookingUrl}?service=${encodeURIComponent(services[selected].name)}` : bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
            >
              Book Now
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            className="rounded-2xl border border-stone-100 bg-white p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-stone-900 text-[15px]">Quick Booking</p>
                <p className="text-[12px] text-stone-400">Available online 24/7</p>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, d) => {
                const slots = d < 5 ? 4 : 2;
                return (
                  <div key={day} className="flex items-center gap-3">
                    <span className="w-8 text-[12px] font-medium text-stone-400">{day}</span>
                    <div className="flex gap-1.5">
                      {Array.from({ length: slots }).map((_, s) => (
                        <div
                          key={s}
                          className={`h-6 w-14 rounded-md text-[10px] font-medium flex items-center justify-center cursor-pointer transition-all
                            ${Math.random() > 0.4
                              ? "bg-accent/10 text-accent hover:bg-accent hover:text-white"
                              : "bg-stone-100 text-stone-300 cursor-not-allowed line-through"
                            }`}
                        >
                          {`${9 + s * 2}:00`}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-stone-400 text-center">
              Real availability loads when you book
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
