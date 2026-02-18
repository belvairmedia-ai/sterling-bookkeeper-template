"use client";

import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface ReservationCTAProps {
  label: string;
  headline: string;
  description: string;
  reservationUrl: string;
  phone: string;
}

export function ReservationCTA({ label, headline, description, reservationUrl, phone }: ReservationCTAProps) {
  return (
    <Section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="rounded-3xl bg-stone-900 px-8 py-16 lg:px-16 lg:py-20 overflow-hidden relative">
          {/* Decorative accent circle */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent/10 blur-2xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} custom={0}>
              <SectionLabel>{label}</SectionLabel>
              <h2 className="font-serif text-4xl lg:text-5xl text-white mt-2">{headline}</h2>
              <p className="mt-4 text-stone-400 text-lg leading-relaxed">{description}</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={reservationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/30"
                >
                  Reserve a Table
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-[14px] font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {phone}
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={1}
              className="rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-stone-400 mb-6">
                Make a Reservation
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-stone-400 mb-1.5">Party Size</label>
                  <select className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2.5 text-[13px] text-white placeholder-stone-500 focus:outline-none focus:border-accent">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n} className="text-stone-900 bg-white">
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-stone-400 mb-1.5">Date</label>
                  <input
                    type="date"
                    className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2.5 text-[13px] text-white focus:outline-none focus:border-accent"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[12px] font-medium text-stone-400 mb-1.5">Time</label>
                  <select className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2.5 text-[13px] text-white focus:outline-none focus:border-accent">
                    {["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"].map((t) => (
                      <option key={t} value={t} className="text-stone-900 bg-white">{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <a
                href={reservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block w-full rounded-xl bg-accent py-3 text-center text-[14px] font-semibold text-white transition-all hover:bg-accent-light"
              >
                Find Available Times
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}
