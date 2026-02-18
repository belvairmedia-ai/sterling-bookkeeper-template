"use client";

import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface FreeTool {
  name: string;
  description: string;
  icon?: string;
  category: "calculator" | "checker" | "template" | "guide";
  url?: string;
  comingSoon?: boolean;
}

export interface FreeToolsSectionProps {
  label?: string;
  headline?: string;
  description?: string;
  tools: FreeTool[];
}

const CATEGORY_CONFIG: Record<
  FreeTool["category"],
  { label: string; bg: string; text: string }
> = {
  calculator: { label: "Calculator", bg: "bg-blue-50", text: "text-blue-600" },
  checker:    { label: "Checker",    bg: "bg-emerald-50", text: "text-emerald-600" },
  template:   { label: "Template",   bg: "bg-violet-50", text: "text-violet-600" },
  guide:      { label: "Gids",       bg: "bg-amber-50",  text: "text-amber-600" },
};

const DEFAULT_ICON = (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export function FreeToolsSection({
  label = "Gratis Tools",
  headline,
  description,
  tools,
}: FreeToolsSectionProps) {
  return (
    <Section className="py-24 lg:py-32 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <motion.div variants={fadeUp} custom={0} className="mb-16">
          <SectionLabel>{label}</SectionLabel>
          {headline && (
            <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
          )}
          {description && (
            <p className="mt-4 text-stone-500 text-base max-w-2xl leading-relaxed">{description}</p>
          )}
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => {
            const cat = CATEGORY_CONFIG[tool.category];
            return (
              <motion.div
                key={tool.name}
                variants={fadeUp}
                custom={i}
                className="relative rounded-2xl border border-stone-100 bg-white p-7 hover:shadow-lg hover:border-stone-200 transition-all overflow-hidden"
              >
                {/* Category badge */}
                <span
                  className={`absolute top-5 right-5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${cat.bg} ${cat.text}`}
                >
                  {cat.label}
                </span>

                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-5">
                  {DEFAULT_ICON}
                </div>

                {/* Content */}
                <h3 className="font-semibold text-stone-900 text-[16px] mb-2 pr-20">{tool.name}</h3>
                <p className="text-[13px] text-stone-500 leading-relaxed mb-6">{tool.description}</p>

                {/* CTA */}
                {tool.url ? (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:underline"
                  >
                    Gebruik tool
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-stone-400">
                    Binnenkort beschikbaar
                  </span>
                )}

                {/* Coming soon overlay */}
                {tool.comingSoon && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-[2px]">
                    <span className="rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[12px] font-semibold text-stone-500 shadow-sm">
                      Binnenkort beschikbaar
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
