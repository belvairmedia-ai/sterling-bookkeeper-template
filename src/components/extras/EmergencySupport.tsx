"use client";

import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

type Urgency = "critical" | "high" | "medium";

interface Situation {
  title: string;
  description: string;
  urgency: Urgency;
}

export interface EmergencySupportProps {
  label?: string;
  headline?: string;
  description?: string;
  phone: string;
  phoneRaw: string;
  availability: string;
  situations: Situation[];
  responseTime?: string;
}

const urgencyConfig: Record<Urgency, { border: string; badge: string; dot: string; label: string }> = {
  critical: {
    border: "border-red-300",
    badge: "bg-red-50 text-red-700",
    dot: "bg-red-500",
    label: "Urgent",
  },
  high: {
    border: "border-orange-300",
    badge: "bg-orange-50 text-orange-700",
    dot: "bg-orange-400",
    label: "Hoog",
  },
  medium: {
    border: "border-yellow-300",
    badge: "bg-yellow-50 text-yellow-700",
    dot: "bg-yellow-400",
    label: "Normaal",
  },
};

export function EmergencySupport({
  label = "Spoedhulp",
  headline = "Dringende belastinghulp nodig?",
  description = "Belastingcontrole, naheffing of deadline gemist? Wij staan voor u klaar — ook buiten kantooruren.",
  phone,
  phoneRaw,
  availability,
  situations,
  responseTime = "Binnen 2 uur reactie",
}: EmergencySupportProps) {
  return (
    <Section className="py-24 lg:py-32 bg-stone-900 relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(180,83,9,0.12),transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14">
          <motion.div variants={fadeUp} custom={0} className="max-w-xl">
            <SectionLabel>{label}</SectionLabel>
            <h2 className="font-serif text-4xl lg:text-5xl text-white mt-2">{headline}</h2>
            {description && (
              <p className="mt-4 text-stone-400 text-base leading-relaxed">{description}</p>
            )}
          </motion.div>

          {/* Phone CTA block */}
          <motion.div variants={fadeUp} custom={1} className="flex-shrink-0">
            <div className="rounded-2xl border border-stone-700 bg-stone-800 p-8 text-center lg:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-2">
                {availability}
              </p>
              <a
                href={`tel:${phoneRaw}`}
                className="block font-serif text-3xl lg:text-4xl text-white hover:text-orange-400 transition-colors mb-4"
              >
                {phone}
              </a>
              {responseTime && (
                <span className="inline-block rounded-full bg-orange-500/20 px-3 py-1 text-[11px] font-semibold text-orange-400 mb-4">
                  {responseTime}
                </span>
              )}
              <div className="block">
                <a
                  href={`tel:${phoneRaw}`}
                  className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-[13px] font-semibold text-white hover:bg-orange-400 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Bel direct
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Situation cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {situations.map((situation, i) => {
            const cfg = urgencyConfig[situation.urgency];
            return (
              <motion.div
                key={situation.title}
                variants={fadeUp}
                custom={i + 2}
                className={`rounded-xl border-l-4 ${cfg.border} bg-stone-800 p-6`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`h-2 w-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${cfg.badge}`}>
                    {cfg.label}
                  </span>
                </div>
                <h3 className="font-serif text-[17px] text-white mb-2">{situation.title}</h3>
                <p className="text-stone-400 text-[13px] leading-relaxed">{situation.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
