"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface CalendarEvent {
  title: string;
  date: string;
  time: string;
  description: string;
  image?: string;
}

export interface EventsCalendarProps {
  label: string;
  headline: string;
  events: CalendarEvent[];
}

export function EventsCalendar({ label, headline, events }: EventsCalendarProps) {
  return (
    <Section className="py-24 lg:py-32 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="mb-16">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, i) => {
            const dateObj = new Date(event.date);
            const month = dateObj.toLocaleString("default", { month: "short" }).toUpperCase();
            const day = dateObj.getDate();

            return (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl border border-stone-100 bg-white overflow-hidden hover:shadow-lg hover:border-stone-200 transition-all group"
              >
                {event.image ? (
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 rounded-xl bg-white shadow-md px-3 py-2 text-center min-w-[48px]">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-accent">{month}</p>
                      <p className="text-2xl font-bold text-stone-900 leading-none">{day}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-accent/5 px-6 pt-6 pb-2 flex items-center gap-4">
                    <div className="rounded-xl border border-accent/20 bg-white px-4 py-3 text-center min-w-[60px] shadow-sm">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-accent">{month}</p>
                      <p className="text-2xl font-bold text-stone-900 leading-none">{day}</p>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <h3 className="font-semibold text-stone-900 text-[16px] leading-snug">{event.title}</h3>
                  <p className="mt-1 text-[12px] font-medium text-accent flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.time}
                  </p>
                  <p className="mt-3 text-[13px] text-stone-500 leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
