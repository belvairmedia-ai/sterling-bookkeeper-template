"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface Award {
  name: string;
  year: string;
  issuer: string;
  image?: string;
  description?: string;
}

export interface AwardsAndBadgesProps {
  label: string;
  headline: string;
  awards: Award[];
}

export function AwardsAndBadges({ label, headline, awards }: AwardsAndBadgesProps) {
  return (
    <Section className="py-24 lg:py-32 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((award, i) => (
            <motion.div
              key={`${award.name}-${award.year}`}
              variants={fadeUp}
              custom={i}
              className="flex flex-col items-center text-center rounded-2xl border border-stone-100 bg-white p-8 hover:shadow-lg hover:border-stone-200 transition-all"
            >
              {award.image ? (
                <div className="relative h-16 w-16 mb-4">
                  <Image src={award.image} alt={award.name} fill className="object-contain" />
                </div>
              ) : (
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </div>
              )}
              <span className="inline-block rounded-full bg-accent/10 px-3 py-0.5 text-[11px] font-bold text-accent mb-2">
                {award.year}
              </span>
              <h3 className="font-semibold text-stone-900 text-[15px] leading-snug">{award.name}</h3>
              <p className="mt-1 text-[12px] text-stone-400 font-medium">{award.issuer}</p>
              {award.description && (
                <p className="mt-3 text-[12px] text-stone-500 leading-relaxed">{award.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
