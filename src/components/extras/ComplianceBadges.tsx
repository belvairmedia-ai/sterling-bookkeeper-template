"use client";

import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export type BadgeCategory = "privacy" | "financial" | "quality" | "security";

export interface ComplianceBadge {
  name: string;
  description: string;
  icon?: string;
  category: BadgeCategory;
}

export interface ComplianceBadgesProps {
  label?: string;
  headline?: string;
  description?: string;
  badges: ComplianceBadge[];
}

const CATEGORY_CONFIG: Record<
  BadgeCategory,
  { label: string; borderColor: string; bgColor: string; iconColor: string; icon: React.ReactNode }
> = {
  privacy: {
    label: "Privacy",
    borderColor: "border-l-violet-400",
    bgColor: "bg-violet-50",
    iconColor: "text-violet-500",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  financial: {
    label: "Financieel",
    borderColor: "border-l-emerald-400",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  quality: {
    label: "Kwaliteit",
    borderColor: "border-l-amber-400",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  security: {
    label: "Beveiliging",
    borderColor: "border-l-blue-400",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
};

export function ComplianceBadges({
  label = "Compliance & Veiligheid",
  headline = "Uw gegevens in veilige handen",
  description = "Wij voldoen aan alle geldende wet- en regelgeving en hanteren de hoogste standaarden voor privacy, beveiliging en financiële integriteit.",
  badges,
}: ComplianceBadgesProps) {
  return (
    <Section className="py-24 lg:py-32 bg-stone-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="max-w-2xl mb-14">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
          {description && (
            <p className="mt-4 text-stone-500 text-base leading-relaxed">{description}</p>
          )}
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge, i) => {
            const config = CATEGORY_CONFIG[badge.category];
            return (
              <motion.div
                key={badge.name}
                variants={fadeUp}
                custom={i + 1}
                className={`rounded-2xl border border-stone-100 bg-white p-6 border-l-4 ${config.borderColor} hover:shadow-lg hover:border-stone-200 transition-all`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${config.bgColor} ${config.iconColor}`}>
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider mb-1.5 ${config.iconColor}`}>
                      {config.label}
                    </span>
                    <p className="font-semibold text-stone-900 text-[15px] leading-snug">{badge.name}</p>
                  </div>
                </div>

                <p className="mt-4 text-[13px] text-stone-500 leading-relaxed">{badge.description}</p>

                <div className="mt-4 flex items-center gap-2">
                  <svg className="h-4 w-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[12px] font-medium text-accent">Gecertificeerd &amp; gecontroleerd</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
