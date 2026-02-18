"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeIn } from "./shared";

export interface CaseStudyProps {
  case_study: {
    before_label: string;
    before_value: string;
    after_label: string;
    after_value: string;
    savings: string;
    savings_label: string;
    client: string;
    description: string;
  };
}

export function CaseStudy({ case_study }: CaseStudyProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-accent py-16 sm:py-24">
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
            {/* Before */}
            <div className="text-center lg:text-right">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">{case_study.before_label}</p>
              <p className="mt-2 font-serif text-[clamp(40px,5vw,64px)] text-white/40 italic line-through decoration-white/20">{case_study.before_value}</p>
              <p className="mt-1 text-[13px] text-white/50">belasting betaald per jaar</p>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <svg className="h-6 w-6 rotate-90 text-white lg:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>

            {/* After */}
            <div className="text-center lg:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">{case_study.after_label}</p>
              <p className="mt-2 font-serif text-[clamp(40px,5vw,64px)] text-white italic">{case_study.after_value}</p>
              <p className="mt-1 text-[13px] text-white/70">belasting betaald per jaar</p>
            </div>
          </div>

          {/* Bottom line */}
          <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-center sm:gap-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-[22px] font-bold text-white">{case_study.savings}</p>
                <p className="text-[12px] text-white/60">{case_study.savings_label}</p>
              </div>
            </div>
            <div className="hidden h-8 w-px bg-white/10 sm:block" />
            <p className="max-w-md text-center text-[13px] leading-relaxed text-white/60 sm:text-left">
              {case_study.client} {case_study.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
