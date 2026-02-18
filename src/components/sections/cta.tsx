"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp } from "./shared";
import { useSchedulerModal } from "@/components/page-assembler";

export interface CTAProps {
  cta: {
    label: string;
    headline: string;
    description: string;
  };
  hero: {
    cta_primary: string;
  };
  company: {
    phone: string;
    phone_raw: string;
  };
}

export function CTA({ cta, hero, company }: CTAProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const scheduler = useSchedulerModal();

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden bg-accent py-16 sm:py-28 lg:py-36">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-12">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}>
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 mb-4">
            {cta.label}
          </span>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          className="font-serif text-[clamp(35.2px,5vw,64px)] leading-[1.08] tracking-tight text-white"
          dangerouslySetInnerHTML={{ __html: cta.headline.replace(/\n/g, '<br />') }}
        />
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={2}
          className="mx-auto mt-6 max-w-lg text-[16px] leading-relaxed text-white/70"
        >
          {cta.description}
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={3}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <button
            onClick={(e) => { e.preventDefault(); scheduler.open(); }}
            className="group inline-flex items-center gap-3 rounded-full bg-white px-10 py-4 text-[15px] font-semibold text-accent transition-all hover:shadow-2xl hover:shadow-black/20 cursor-pointer"
          >
            {hero.cta_primary}
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <a
            href={`tel:+${company.phone_raw}`}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-white/80 transition-colors hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {company.phone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
