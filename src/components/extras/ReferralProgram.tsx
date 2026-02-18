"use client";

import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface ReferralStep {
  step: string;
  title: string;
  description: string;
}

export interface ReferralProgramProps {
  label?: string;
  headline?: string;
  description?: string;
  reward: string;
  rewardDescription: string;
  steps: ReferralStep[];
  ctaText?: string;
  ctaUrl?: string;
  terms?: string;
}

export function ReferralProgram({
  label = "Doorverwijsprogramma",
  headline = "Verwijs een ondernemer, ontvang een beloning",
  description = "Kent u een ondernemer die baat heeft bij goede boekhouding? Verwijs ze door en profiteer samen.",
  reward,
  rewardDescription,
  steps,
  ctaText = "Verwijs nu door",
  ctaUrl = "#contact",
  terms,
}: ReferralProgramProps) {
  return (
    <Section className="py-24 lg:py-32 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header row */}
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end mb-16">
          <motion.div variants={fadeUp} custom={0}>
            <SectionLabel>{label}</SectionLabel>
            <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
            <p className="mt-4 text-[15px] text-stone-500 leading-relaxed max-w-xl">{description}</p>
          </motion.div>

          {/* Reward badge */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="shrink-0 rounded-2xl bg-accent px-8 py-6 text-center shadow-lg shadow-accent/20"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <svg className="h-5 w-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/70">Uw beloning</span>
            </div>
            <p className="font-serif text-4xl font-bold text-white">{reward}</p>
            <p className="mt-1 text-[13px] text-white/75">{rewardDescription}</p>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              variants={fadeUp}
              custom={i}
              className="relative rounded-2xl border border-stone-100 bg-white p-8 hover:shadow-lg hover:border-stone-200 transition-all"
            >
              {/* Connector line between cards */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-3 z-10 w-6 h-[2px] bg-stone-200" />
              )}

              <div className="flex items-center gap-3 mb-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-[13px] font-bold text-accent">
                  {item.step}
                </span>
                <div className="h-px flex-1 bg-stone-100" />
              </div>

              <h3 className="font-serif text-xl text-stone-900">{item.title}</h3>
              <p className="mt-2 text-[13px] text-stone-500 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA + terms */}
        <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-col items-center gap-3">
          <a
            href={ctaUrl}
            className="inline-flex items-center gap-2.5 rounded-2xl bg-stone-900 px-8 py-4 font-semibold text-white hover:bg-stone-700 transition-all"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            {ctaText}
          </a>
          {terms && (
            <p className="text-[12px] text-stone-400 text-center max-w-md">{terms}</p>
          )}
        </motion.div>

      </div>
    </Section>
  );
}
