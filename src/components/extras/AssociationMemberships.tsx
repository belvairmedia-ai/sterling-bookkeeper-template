"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface Association {
  name: string;
  fullName: string;
  description: string;
  logo?: string;
  benefits: string[];
  url?: string;
}

export interface AssociationMembershipsProps {
  label?: string;
  headline?: string;
  description?: string;
  associations: Association[];
}

export function AssociationMemberships({
  label = "Aangesloten Bij",
  headline = "Erkend lid van toonaangevende beroepsorganisaties",
  description = "Onze lidmaatschappen zijn geen formaliteit — ze garanderen dat u werkt met een administratiekantoor dat voldoet aan strenge kwaliteitsnormen en verplichte permanente educatie.",
  associations,
}: AssociationMembershipsProps) {
  return (
    <Section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="max-w-2xl mb-14">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
          {description && (
            <p className="mt-4 text-stone-500 text-base leading-relaxed">{description}</p>
          )}
        </motion.div>

        <div className="space-y-6">
          {associations.map((association, i) => (
            <motion.div
              key={association.name}
              variants={fadeUp}
              custom={i + 1}
              className="rounded-2xl border border-stone-100 bg-white p-8 hover:shadow-lg hover:border-stone-200 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                {/* Logo or monogram */}
                <div className="flex-shrink-0">
                  {association.logo ? (
                    <div className="relative h-16 w-32 rounded-xl overflow-hidden border border-stone-100 bg-stone-50">
                      <Image
                        src={association.logo}
                        alt={`${association.name} logo`}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent/10">
                      <span className="font-serif text-xl font-bold text-accent">
                        {association.name.slice(0, 2)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-accent text-[13px] uppercase tracking-wider mb-0.5">
                        {association.name}
                      </p>
                      <h3 className="font-serif text-xl text-stone-900 leading-snug">
                        {association.fullName}
                      </h3>
                    </div>
                    {association.url && (
                      <a
                        href={association.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-accent hover:underline underline-offset-2 flex-shrink-0"
                      >
                        Bezoek website
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>

                  <div className="mt-4 rounded-xl bg-stone-50 border border-stone-100 px-5 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                      Wat betekent dit voor u?
                    </p>
                    <p className="text-[14px] text-stone-600 leading-relaxed">{association.description}</p>
                  </div>

                  <div className="mt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-3">
                      Voordelen van dit lidmaatschap
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {association.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2.5">
                          <svg
                            className="h-4 w-4 text-accent flex-shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-[13px] text-stone-600 leading-snug">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
