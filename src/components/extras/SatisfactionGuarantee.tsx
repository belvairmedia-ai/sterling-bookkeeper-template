"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface Guarantee {
  title: string;
  description: string;
  icon?: string;
}

export interface SatisfactionGuaranteeProps {
  label?: string;
  headline?: string;
  description?: string;
  guarantees: Guarantee[];
  badgeText?: string;
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 80 88" fill="none" className="w-full h-full">
      <path
        d="M40 4L8 16v24c0 18.6 13.6 36 32 44 18.4-8 32-25.4 32-44V16L40 4z"
        className="fill-accent/10 stroke-accent"
        strokeWidth="2"
      />
      <path
        d="M28 44l8 8 16-18"
        className="stroke-accent"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FALLBACK_ICONS: Record<number, React.ReactElement> = {
  0: (
    <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75a4.5 4.5 0 00-9 0v.75a.75.75 0 01-.75.75H3.75A2.25 2.25 0 001.5 7.5v12A2.25 2.25 0 003.75 21.75h16.5A2.25 2.25 0 0022.5 19.5v-12a2.25 2.25 0 00-2.25-2.25h-2.25a.75.75 0 01-.75-.75V3.75z" />
    </svg>
  ),
  1: (
    <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33" />
    </svg>
  ),
  2: (
    <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75s.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
    </svg>
  ),
};

export function SatisfactionGuarantee({
  label = "Onze Garantie",
  headline,
  description,
  guarantees,
  badgeText = "100% Tevredenheidsgarantie",
}: SatisfactionGuaranteeProps) {
  return (
    <Section className="py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
          <SectionLabel>{label}</SectionLabel>
          {headline && (
            <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
          )}
          {description && (
            <p className="mt-4 text-[15px] text-stone-500 leading-relaxed max-w-xl mx-auto">{description}</p>
          )}
        </motion.div>

        {/* Badge */}
        <motion.div variants={fadeUp} custom={1} className="flex flex-col items-center mb-14">
          <div className="relative flex flex-col items-center">
            <div className="w-28 h-28 drop-shadow-lg">
              <ShieldIcon />
            </div>
            <div className="mt-4 rounded-full border border-accent/30 bg-accent/8 px-5 py-2">
              <p className="text-[13px] font-bold tracking-wide text-accent uppercase">{badgeText}</p>
            </div>
          </div>
        </motion.div>

        {/* Guarantee cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guarantees.map((g, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i + 2}
              className="rounded-2xl border border-stone-100 bg-white p-6 hover:shadow-lg hover:border-accent/20 transition-all"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                {g.icon ? (
                  <span className="text-xl">{g.icon}</span>
                ) : (
                  FALLBACK_ICONS[i % 3]
                )}
              </div>
              <h3 className="font-semibold text-stone-900 text-[15px] leading-snug mb-2">{g.title}</h3>
              <p className="text-[13px] text-stone-500 leading-relaxed">{g.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
