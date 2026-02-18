"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { fadeUp, SectionLabel, TiltCard } from "./shared";

export interface PricingProps {
  pricing: {
    label: string;
    headline_before: string;
    headline_emphasis: string;
    description: string;
    plans: Array<{
      name: string;
      price: string;
      period: string;
      description: string;
      features: string[];
      highlight: boolean;
    }>;
  };
}

export function Pricing({ pricing }: PricingProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activePlan, setActivePlan] = useState(1);

  const plans = pricing.plans;

  return (
    <section id="tarieven" ref={ref} className="bg-cream py-16 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10 text-center sm:mb-16">
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}>
            <SectionLabel>{pricing.label}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={1}
            className="mx-auto max-w-xl font-serif text-[clamp(32px,4vw,51.2px)] leading-[1.1] tracking-tight text-stone-900"
          >
            {pricing.headline_before}{" "}
            <em className="text-accent">{pricing.headline_emphasis}</em>.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={2}
            className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-stone-500"
          >
            {pricing.description}
          </motion.p>
        </div>

        {/* Mobile: Tab selector + single card */}
        <div className="lg:hidden">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={3}
            className="mb-6 flex rounded-2xl border border-stone-200 bg-white p-1"
          >
            {plans.map((plan, i) => (
              <button
                key={plan.name}
                onClick={() => setActivePlan(i)}
                className={`relative flex-1 rounded-xl py-3 text-center text-[13px] font-semibold transition-all ${
                  activePlan === i
                    ? "bg-accent text-white shadow-sm"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                {plan.name}
                {plan.highlight && activePlan !== i && (
                  <span className="absolute -top-1 right-2 h-2 w-2 rounded-full bg-accent" />
                )}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePlan}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className={`relative rounded-2xl border p-6 sm:p-8 ${
                plans[activePlan].highlight
                  ? "border-accent bg-white shadow-xl shadow-accent/10"
                  : "border-stone-200 bg-white"
              }`}
            >
              {plans[activePlan].highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                  Populairste keuze
                </span>
              )}
              <div className="flex items-baseline justify-between">
                <h3 className="text-[18px] font-semibold text-stone-900">{plans[activePlan].name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-[2.5rem] text-stone-900 italic">
                    {plans[activePlan].price}
                  </span>
                  <span className="text-[14px] text-stone-500">{plans[activePlan].period}</span>
                </div>
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-stone-500">
                {plans[activePlan].description}
              </p>

              <ul className="mt-6 space-y-2.5">
                {plans[activePlan].features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[13px] text-stone-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-6 block rounded-full py-3.5 text-center text-[14px] font-semibold transition-all ${
                  plans[activePlan].highlight
                    ? "bg-accent text-white hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
                    : "border border-stone-200 text-stone-700 hover:border-accent hover:text-accent"
                }`}
              >
                {plans[activePlan].price === "Op maat" ? "Offerte aanvragen" : "Kies dit pakket"}
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden gap-8 lg:grid lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
            >
              <TiltCard className={`relative rounded-2xl border p-8 lg:p-10 h-full ${
                plan.highlight
                  ? "border-accent bg-white shadow-xl shadow-accent/10"
                  : "border-stone-200 bg-white"
              }`}>
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                    Populairste keuze
                  </span>
                )}
                <h3 className="text-[18px] font-semibold text-stone-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-stone-900 italic">
                    {plan.price}
                  </span>
                  <span className="text-[14px] text-stone-500">{plan.period}</span>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-stone-500">
                  {plan.description}
                </p>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[14px] text-stone-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-8 block rounded-full py-3.5 text-center text-[14px] font-semibold transition-all ${
                    plan.highlight
                      ? "bg-accent text-white hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
                      : "border border-stone-200 text-stone-700 hover:border-accent hover:text-accent"
                  }`}
                >
                  {plan.price === "Op maat" ? "Offerte aanvragen" : "Kies dit pakket"}
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
