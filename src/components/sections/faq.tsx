"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { fadeUp, SectionLabel } from "./shared";

export interface FAQProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function FAQ({ faqs }: FAQProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-16 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-10 sm:gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          {/* Left — Header */}
          <div>
            <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}>
              <SectionLabel>Veelgestelde Vragen</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={1}
              className="font-serif text-[clamp(32px,4vw,51.2px)] leading-[1.1] tracking-tight text-stone-900"
            >
              Vragen die wij
              <br />
              <em className="text-accent">vaak horen</em>.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={2}
              className="mt-4 text-[14px] leading-relaxed text-stone-500"
            >
              Staat uw vraag er niet bij?{" "}
              <a href="#contact" className="font-medium text-accent underline underline-offset-2">
                Neem direct contact op
              </a>
              .
            </motion.p>
          </div>

          {/* Right — Accordion */}
          <div>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={i * 0.3}
                className="border-b border-stone-200"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="text-[15px] font-semibold tracking-tight text-stone-900">
                    {faq.question}
                  </span>
                  <motion.svg
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-5 w-5 shrink-0 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </motion.svg>
                </button>
                <motion.div
                  initial={false}
                  animate={
                    openIndex === i
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-[14px] leading-relaxed text-stone-500">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
