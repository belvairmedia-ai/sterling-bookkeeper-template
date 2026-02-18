"use client";

import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface HoursEntry {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface OpeningHoursProps {
  label: string;
  headline: string;
  hours: HoursEntry[];
  note?: string;
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function OpeningHours({ label, headline, hours, note }: OpeningHoursProps) {
  const today = DAYS[new Date().getDay()];

  return (
    <Section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp} custom={0}>
            <SectionLabel>{label}</SectionLabel>
            <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
            {note && (
              <p className="mt-4 text-stone-500 text-base leading-relaxed">{note}</p>
            )}

            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[13px] font-semibold text-accent">
                {hours.find((h) => h.day.toLowerCase() === today.toLowerCase() && !h.closed)
                  ? "Open Today"
                  : "Closed Today"}
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            className="rounded-2xl border border-stone-100 bg-white overflow-hidden shadow-sm"
          >
            {hours.map((entry, i) => {
              const isToday = entry.day.toLowerCase() === today.toLowerCase();
              return (
                <div
                  key={entry.day}
                  className={`flex items-center justify-between px-6 py-4 ${
                    i < hours.length - 1 ? "border-b border-stone-50" : ""
                  } ${isToday ? "bg-accent/5" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    {isToday && (
                      <span className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    )}
                    <span
                      className={`text-[14px] font-medium ${
                        isToday ? "text-accent font-semibold" : "text-stone-700"
                      }`}
                    >
                      {entry.day}
                      {isToday && (
                        <span className="ml-2 text-[11px] font-semibold text-accent opacity-70">Today</span>
                      )}
                    </span>
                  </div>
                  {entry.closed ? (
                    <span className="text-[13px] text-stone-400">Closed</span>
                  ) : (
                    <span className={`text-[14px] tabular-nums ${isToday ? "font-semibold text-accent" : "text-stone-600"}`}>
                      {entry.open} – {entry.close}
                    </span>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
