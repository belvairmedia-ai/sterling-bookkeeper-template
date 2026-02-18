"use client";

import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

interface ExpatService {
  title: string;
  description: string;
  icon?: string;
}

export interface ExpatServicesProps {
  label?: string;
  headline?: string;
  description?: string;
  services: ExpatService[];
  languages: string[];
  ctaText?: string;
  ctaUrl?: string;
}

export function ExpatServices({
  label = "Expat Services",
  headline = "Your Dutch Tax Partner — in English",
  description = "We guide international professionals through the Dutch tax system. From 30% ruling applications to annual returns, everything is handled in your language.",
  services,
  languages,
  ctaText = "Get English-Language Advice",
  ctaUrl = "#contact",
}: ExpatServicesProps) {
  return (
    <Section className="py-24 lg:py-32 bg-stone-50 relative overflow-hidden">
      {/* Background globe illustration */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-[0.04]">
        <svg viewBox="0 0 600 600" fill="none" className="absolute right-[-10%] top-[-10%] h-[120%] w-auto">
          <circle cx="300" cy="300" r="280" stroke="#292524" strokeWidth="2" />
          <ellipse cx="300" cy="300" rx="140" ry="280" stroke="#292524" strokeWidth="1.5" />
          <ellipse cx="300" cy="300" rx="280" ry="100" stroke="#292524" strokeWidth="1.5" />
          <ellipse cx="300" cy="300" rx="280" ry="200" stroke="#292524" strokeWidth="1" />
          <line x1="20" y1="300" x2="580" y2="300" stroke="#292524" strokeWidth="1" />
          <line x1="300" y1="20" x2="300" y2="580" stroke="#292524" strokeWidth="1" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative">
        {/* Header */}
        <motion.div variants={fadeUp} custom={0} className="mb-6 max-w-2xl">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
          {description && (
            <p className="mt-4 text-stone-500 text-base leading-relaxed">{description}</p>
          )}
        </motion.div>

        {/* Language badges */}
        <motion.div variants={fadeUp} custom={1} className="flex flex-wrap gap-2 mb-14">
          {languages.map((lang) => (
            <span
              key={lang}
              className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-[12px] font-semibold text-accent tracking-wide"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {lang}
            </span>
          ))}
        </motion.div>

        {/* Service cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-14">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              custom={i + 2}
              className="rounded-2xl border border-stone-200 bg-white p-7 hover:shadow-md hover:border-stone-300 transition-all"
            >
              {service.icon && (
                <span className="mb-4 inline-block text-2xl">{service.icon}</span>
              )}
              <h3 className="font-serif text-[18px] text-stone-900 mb-2">{service.title}</h3>
              <p className="text-stone-500 text-[13px] leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        {ctaText && (
          <motion.div variants={fadeUp} custom={services.length + 2}>
            <a
              href={ctaUrl ?? "#contact"}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-[13px] font-semibold text-white hover:bg-accent/90 transition-colors"
            >
              {ctaText}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        )}
      </div>
    </Section>
  );
}
