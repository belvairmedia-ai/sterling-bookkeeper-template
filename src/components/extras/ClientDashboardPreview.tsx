"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface DashboardFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ClientDashboardPreviewProps {
  label?: string;
  headline?: string;
  description?: string;
  screenshot: string;
  screenshotAlt: string;
  features: DashboardFeature[];
}

const DEFAULT_ICONS: Record<number, React.ReactNode> = {
  0: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  1: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  2: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  3: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
};

export function ClientDashboardPreview({
  label = "Uw Dashboard",
  headline,
  description,
  screenshot,
  screenshotAlt,
  features,
}: ClientDashboardPreviewProps) {
  return (
    <Section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <motion.div variants={fadeUp} custom={0} className="text-center mb-16 max-w-2xl mx-auto">
          <SectionLabel>{label}</SectionLabel>
          {headline && (
            <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
          )}
          {description && (
            <p className="mt-4 text-stone-500 text-base leading-relaxed">{description}</p>
          )}
        </motion.div>

        {/* Browser mockup */}
        <motion.div
          variants={fadeUp}
          custom={1}
          className="mx-auto max-w-5xl mb-16"
          style={{ perspective: 1200 }}
        >
          <motion.div
            initial={{ rotateX: 6, y: 20, opacity: 0 }}
            animate={{ rotateX: 4, y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-stone-200 shadow-2xl shadow-stone-900/10 overflow-hidden"
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 bg-stone-100 border-b border-stone-200 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <div className="mx-3 flex-1 max-w-sm rounded-md bg-white border border-stone-200 px-3 py-1 text-[12px] text-stone-400 font-mono">
                app.uwboekhoudkantoor.nl
              </div>
            </div>
            {/* Screenshot */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <Image
                src={screenshot}
                alt={screenshotAlt}
                fill
                className="object-cover object-top"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Feature callouts */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              custom={i + 2}
              className="rounded-2xl border border-stone-100 bg-white p-6 hover:shadow-lg hover:border-stone-200 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
                {DEFAULT_ICONS[i % 4]}
              </div>
              <h3 className="font-semibold text-stone-900 text-[15px] mb-1.5">{feature.title}</h3>
              <p className="text-[13px] text-stone-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
