"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, SectionLabel, TiltCard } from "./shared";

export interface ServicesProps {
  services: {
    label: string;
    headline_before: string;
    headline_emphasis: string;
    description: string;
    items: Array<{ title: string; description: string }>;
  };
}

const serviceIcons = [
  <svg key="icon-0" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>,
  <svg key="icon-1" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="icon-2" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>,
  <svg key="icon-3" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>,
  <svg key="icon-4" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>,
  <svg key="icon-5" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>,
];

export function Services({ services }: ServicesProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const items = services.items.map((item, i) => ({
    icon: serviceIcons[i],
    title: item.title,
    description: item.description,
  }));

  return (
    <section id="diensten" ref={ref} className="relative py-16 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 max-w-2xl sm:mb-20">
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}>
            <SectionLabel>{services.label}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={1}
            className="font-serif text-[clamp(32px,4vw,56px)] leading-[1.1] tracking-tight text-stone-900"
          >
            {services.headline_before}
            <br />
            <em className="text-accent">{services.headline_emphasis}</em>.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={2}
            className="mt-6 text-[16px] leading-relaxed text-stone-500"
          >
            {services.description}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid gap-3 sm:gap-6">
          {/* Large cards row */}
          <div className="grid gap-3 sm:gap-6 md:grid-cols-2">
            {items.slice(0, 2).map((service, i) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={i * 0.5}
              >
                <TiltCard className="group relative rounded-2xl border border-stone-200/60 bg-gradient-to-br from-accent/5 to-white p-8 transition-all duration-500 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5 sm:p-10 lg:p-12 h-full">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/15 sm:h-16 sm:w-16">
                    {service.icon}
                  </div>
                  <h3 className="mb-3 text-[18px] font-semibold tracking-tight text-stone-900 sm:text-[22px]">
                    {service.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-stone-500 sm:text-[15px]">
                    {service.description}
                  </p>
                  <a href="#contact" className="mt-6 flex items-center gap-2 text-[13px] font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Meer informatie
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </TiltCard>
              </motion.div>
            ))}
          </div>
          {/* Small cards row */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {items.slice(2).map((service, i) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={(i + 2) * 0.5}
              >
                <TiltCard className="group relative rounded-2xl border border-stone-200/60 bg-white p-5 transition-all duration-500 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5 sm:p-6 h-full">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-stone-50 text-accent transition-colors group-hover:bg-accent/10 sm:h-12 sm:w-12">
                    {service.icon}
                  </div>
                  <h3 className="mb-2 text-[14px] font-semibold tracking-tight text-stone-900 sm:text-[16px]">
                    {service.title}
                  </h3>
                  <p className="hidden text-[13px] leading-relaxed text-stone-500 sm:block">
                    {service.description}
                  </p>
                  <a href="#contact" className="mt-4 flex items-center gap-2 text-[12px] font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100 sm:text-[13px]">
                    Meer informatie
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
