"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, SectionLabel } from "./shared";

export interface ProcessProps {
  process: {
    label: string;
    headline_before: string;
    headline_emphasis: string;
    steps: Array<{ step: string; title: string; description: string }>;
  };
}

export function Process({ process }: ProcessProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-16 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 text-center sm:mb-20">
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}>
            <SectionLabel>{process.label}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={1}
            className="mx-auto max-w-xl font-serif text-[clamp(32px,4vw,51.2px)] leading-[1.1] tracking-tight text-stone-900"
          >
            {process.headline_before}{" "}
            <em className="text-accent">{process.headline_emphasis}</em>.
          </motion.h2>
        </div>

        <div className="mx-auto max-w-3xl">
          {process.steps.map((step, i) => (
            <motion.div
              key={step.step}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
              className="relative flex gap-6 pb-12 last:pb-0 sm:gap-8"
            >
              {/* Timeline line */}
              {i < process.steps.length - 1 && (
                <div className="absolute left-[23px] top-14 bottom-0 w-px bg-stone-200 sm:left-[27px]" />
              )}
              {/* Step number circle */}
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/20 sm:h-14 sm:w-14">
                <span className="font-serif text-lg text-white italic sm:text-xl">{step.step}</span>
              </div>
              {/* Content */}
              <div className="pt-1">
                <h3 className="text-[17px] font-semibold tracking-tight text-stone-900 sm:text-[19px]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-stone-500">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
