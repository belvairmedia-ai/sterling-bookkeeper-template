"use client";

import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface Metric {
  value: string;
  label: string;
  description?: string;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
}

export interface ClientSuccessMetricsProps {
  label?: string;
  headline?: string;
  description?: string;
  metrics: Metric[];
  period?: string;
}

function TrendIndicator({ trend, trendValue }: { trend: Metric["trend"]; trendValue?: string }) {
  if (!trend || trend === "stable") {
    return trendValue ? (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-400">
        <span className="h-0.5 w-3 rounded bg-stone-300" />
        {trendValue}
      </span>
    ) : null;
  }

  const isUp = trend === "up";
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${isUp ? "text-emerald-600" : "text-red-500"}`}>
      <svg className={`h-3 w-3 ${isUp ? "" : "rotate-180"}`} viewBox="0 0 12 12" fill="currentColor">
        <path d="M6 1l4.5 8H1.5L6 1z" />
      </svg>
      {trendValue}
    </span>
  );
}

export function ClientSuccessMetrics({
  label = "Resultaten",
  headline,
  description,
  metrics,
  period,
}: ClientSuccessMetricsProps) {
  return (
    <Section className="py-24 lg:py-32 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <SectionLabel>{label}</SectionLabel>
            {headline && (
              <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
            )}
            {description && (
              <p className="mt-4 text-[15px] text-stone-500 leading-relaxed max-w-xl">{description}</p>
            )}
          </div>
          {period && (
            <div className="flex-shrink-0">
              <span className="inline-block rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[12px] font-semibold text-stone-500 shadow-sm">
                {period}
              </span>
            </div>
          )}
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i + 1}
              className="relative rounded-2xl border border-stone-100 bg-white p-6 hover:shadow-lg hover:border-stone-200 transition-all overflow-hidden"
            >
              {/* Subtle top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/60 to-accent/20 rounded-t-2xl" />

              <div className="mb-3 flex items-start justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-400 leading-tight">
                  {metric.label}
                </p>
                {metric.trend && (
                  <TrendIndicator trend={metric.trend} trendValue={metric.trendValue} />
                )}
              </div>

              <p className="font-serif text-4xl font-bold text-stone-900 tabular-nums leading-none">
                {metric.value}
              </p>

              {metric.description && (
                <p className="mt-3 text-[12px] text-stone-400 leading-relaxed">{metric.description}</p>
              )}

              {/* Decorative corner graphic */}
              <div className="pointer-events-none absolute bottom-0 right-0 h-20 w-20 rounded-tl-full bg-accent/4" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
