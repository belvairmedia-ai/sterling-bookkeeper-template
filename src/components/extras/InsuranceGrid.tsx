"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface InsuranceGridProps {
  label: string;
  providers: { name: string; logo?: string }[];
}

export function InsuranceGrid({ label, providers }: InsuranceGridProps) {
  return (
    <Section className="py-24 lg:py-32 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
          <SectionLabel>{label}</SectionLabel>
          <p className="text-stone-500 text-base mt-1">
            We are proud to be in-network with major insurance providers.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {providers.map((provider, i) => (
            <motion.div
              key={provider.name}
              variants={fadeUp}
              custom={i}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-stone-100 bg-white p-6 hover:shadow-lg hover:border-stone-200 transition-all"
            >
              {provider.logo ? (
                <div className="relative h-10 w-full">
                  <Image
                    src={provider.logo}
                    alt={provider.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                  <span className="text-[11px] font-bold text-accent uppercase">
                    {provider.name.slice(0, 2)}
                  </span>
                </div>
              )}
              <span className="text-[12px] font-medium text-stone-600 text-center leading-tight">
                {provider.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
