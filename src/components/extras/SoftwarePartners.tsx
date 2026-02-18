"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface SoftwarePartner {
  name: string;
  logo?: string;
  description: string;
  features: string[];
  migrationSupport: boolean;
  certified?: boolean;
  url?: string;
}

export interface SoftwarePartnersProps {
  label?: string;
  headline?: string;
  description?: string;
  partners: SoftwarePartner[];
}

export function SoftwarePartners({
  label = "Software & Koppelingen",
  headline,
  description,
  partners,
}: SoftwarePartnersProps) {
  return (
    <Section className="py-24 lg:py-32 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="mb-16">
          <SectionLabel>{label}</SectionLabel>
          {headline && (
            <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
          )}
          {description && (
            <p className="mt-4 text-stone-500 text-base max-w-2xl leading-relaxed">{description}</p>
          )}
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              variants={fadeUp}
              custom={i}
              className="rounded-2xl border border-stone-100 bg-white p-8 hover:shadow-lg hover:border-stone-200 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  {partner.logo ? (
                    <div className="relative h-10 w-24 flex-shrink-0">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <span className="text-[11px] font-bold uppercase text-accent">
                        {partner.name.slice(0, 2)}
                      </span>
                    </div>
                  )}
                  <h3 className="font-serif text-xl text-stone-900">{partner.name}</h3>
                </div>
                {partner.certified && (
                  <span className="inline-flex flex-shrink-0 items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Gecertificeerd Partner
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-stone-500 text-[14px] leading-relaxed mb-5">{partner.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-5">
                {partner.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-[13px] text-stone-700">
                    <svg className="h-4 w-4 flex-shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                {partner.migrationSupport ? (
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-stone-500">
                    <svg className="h-3.5 w-3.5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    Overstap begeleiding beschikbaar
                  </span>
                ) : (
                  <span />
                )}
                {partner.url && (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] font-semibold text-accent hover:underline"
                  >
                    Meer info →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
