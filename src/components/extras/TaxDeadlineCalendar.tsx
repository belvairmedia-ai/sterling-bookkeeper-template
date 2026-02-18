"use client";

import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export type DeadlineCategory = "btw" | "ib" | "vpb" | "loonheffing" | "jaarrekening" | "overig";

export interface TaxDeadline {
  title: string;
  date: string;
  description: string;
  category: DeadlineCategory;
  urgent?: boolean;
}

export interface TaxDeadlineCalendarProps {
  label?: string;
  headline?: string;
  deadlines: TaxDeadline[];
}

const CATEGORY_LABELS: Record<DeadlineCategory, string> = {
  btw: "BTW",
  ib: "Inkomstenbelasting",
  vpb: "Vennootschapsbelasting",
  loonheffing: "Loonheffing",
  jaarrekening: "Jaarrekening",
  overig: "Overig",
};

const CATEGORY_COLORS: Record<DeadlineCategory, string> = {
  btw: "bg-blue-50 text-blue-700 border-blue-200",
  ib: "bg-violet-50 text-violet-700 border-violet-200",
  vpb: "bg-emerald-50 text-emerald-700 border-emerald-200",
  loonheffing: "bg-amber-50 text-amber-700 border-amber-200",
  jaarrekening: "bg-stone-100 text-stone-700 border-stone-200",
  overig: "bg-slate-50 text-slate-600 border-slate-200",
};

const CATEGORY_DOT: Record<DeadlineCategory, string> = {
  btw: "bg-blue-500",
  ib: "bg-violet-500",
  vpb: "bg-emerald-500",
  loonheffing: "bg-amber-500",
  jaarrekening: "bg-stone-500",
  overig: "bg-slate-400",
};

function formatDutchDate(iso: string): string {
  const months = [
    "januari", "februari", "maart", "april", "mei", "juni",
    "juli", "augustus", "september", "oktober", "november", "december",
  ];
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${months[month - 1]} ${year}`;
}

function isUrgentByDate(iso: string): boolean {
  const deadline = new Date(iso);
  const now = new Date();
  const diff = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 30;
}

function groupByMonth(deadlines: TaxDeadline[]): Record<string, TaxDeadline[]> {
  const months = [
    "Januari", "Februari", "Maart", "April", "Mei", "Juni",
    "Juli", "Augustus", "September", "Oktober", "November", "December",
  ];
  const result: Record<string, TaxDeadline[]> = {};
  for (const d of deadlines) {
    const [year, month] = d.date.split("-").map(Number);
    const key = `${months[month - 1]} ${year}`;
    if (!result[key]) result[key] = [];
    result[key].push(d);
  }
  return result;
}

export function TaxDeadlineCalendar({
  label = "Fiscale Kalender",
  headline = "Aankomende belastingdeadlines",
  deadlines,
}: TaxDeadlineCalendarProps) {
  const sorted = [...deadlines].sort((a, b) => a.date.localeCompare(b.date));
  const grouped = groupByMonth(sorted);

  return (
    <Section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="mb-12">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
        </motion.div>

        <div className="space-y-10">
          {Object.entries(grouped).map(([month, items], gi) => (
            <motion.div key={month} variants={fadeUp} custom={gi + 1}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400 mb-4">
                {month}
              </p>
              <div className="space-y-3">
                {items.map((deadline, i) => {
                  const urgent = deadline.urgent ?? isUrgentByDate(deadline.date);
                  return (
                    <div
                      key={`${deadline.date}-${i}`}
                      className={`rounded-2xl border bg-white p-5 flex items-start gap-5 transition-all hover:shadow-md ${
                        urgent ? "border-orange-200 bg-orange-50/40" : "border-stone-100"
                      }`}
                    >
                      <div className="flex-shrink-0 w-14 text-center">
                        <p className={`text-2xl font-bold tabular-nums leading-none ${urgent ? "text-orange-500" : "text-accent"}`}>
                          {deadline.date.split("-")[2].replace(/^0/, "")}
                        </p>
                        <p className="text-[10px] uppercase tracking-wide text-stone-400 mt-0.5">
                          {new Date(deadline.date).toLocaleString("nl-NL", { month: "short" })}
                        </p>
                      </div>

                      <div className="w-px self-stretch bg-stone-100 flex-shrink-0" />

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <p className="font-semibold text-stone-900 text-[15px] leading-snug">
                            {deadline.title}
                          </p>
                          {urgent && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-600">
                              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                              Binnenkort
                            </span>
                          )}
                        </div>
                        <p className="text-[13px] text-stone-500 leading-relaxed">{deadline.description}</p>
                        <p className="mt-2 text-[12px] text-stone-400">{formatDutchDate(deadline.date)}</p>
                      </div>

                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold ${CATEGORY_COLORS[deadline.category]}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${CATEGORY_DOT[deadline.category]}`} />
                          {CATEGORY_LABELS[deadline.category]}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
