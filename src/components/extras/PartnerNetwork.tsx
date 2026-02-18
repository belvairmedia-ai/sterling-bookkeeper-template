"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

interface Partner {
  type: string;
  name: string;
  description: string;
  logo?: string;
  specialties: string[];
  url?: string;
}

export interface PartnerNetworkProps {
  label?: string;
  headline?: string;
  description?: string;
  partners: Partner[];
}

export function PartnerNetwork({
  label = "Ons Netwerk",
  headline = "Betrouwbare partners voor elk vraagstuk",
  description = "Via ons netwerk verbinden we u met de juiste specialist — van notaris tot hypotheekadviseur. Persoonlijk doorverwezen, nooit anoniem.",
  partners,
}: PartnerNetworkProps) {
  return (
    <Section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle network dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #292524 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative">
        {/* Header */}
        <motion.div variants={fadeUp} custom={0} className="mb-16 max-w-2xl">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
          {description && (
            <p className="mt-4 text-stone-500 text-base leading-relaxed">{description}</p>
          )}
        </motion.div>

        {/* Partner cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              variants={fadeUp}
              custom={i + 1}
              className="group rounded-2xl border border-stone-100 bg-white p-7 hover:shadow-lg hover:border-stone-200 transition-all flex flex-col"
            >
              {/* Type badge */}
              <span className="inline-block self-start rounded-full bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent mb-5">
                {partner.type}
              </span>

              {/* Logo + name */}
              <div className="flex items-center gap-4 mb-4">
                {partner.logo ? (
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-stone-100">
                    <Image src={partner.logo} alt={partner.name} fill className="object-contain p-1.5" />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-stone-100 text-lg font-serif text-stone-500">
                    {partner.name.charAt(0)}
                  </div>
                )}
                <h3 className="font-serif text-[17px] text-stone-900 leading-snug">{partner.name}</h3>
              </div>

              {/* Description */}
              <p className="text-stone-500 text-[13px] leading-relaxed mb-5 flex-1">{partner.description}</p>

              {/* Specialties */}
              {partner.specialties.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {partner.specialties.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-stone-100 px-3 py-1 text-[11px] font-medium text-stone-600"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {/* Link */}
              {partner.url && (
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-accent hover:underline mt-auto"
                >
                  Meer informatie
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
