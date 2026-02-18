"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { fadeUp, scaleIn, SectionLabel } from "./shared";

export interface HeroProps {
  hero: {
    label: string;
    headline_before: string;
    headline_after: string;
    emphasis: string;
    subheadline: string;
    cta_primary: string;
    cta_secondary: string;
    image: string;
    image_alt: string;
    floating_card_label: string;
    floating_card_value: string;
    badges: Array<{ value: string; label: string }>;
  };
}

export function Hero({ hero }: HeroProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden pt-28 pb-20 lg:pt-40 lg:pb-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left — Copy */}
          <div className="max-w-xl">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              <SectionLabel>{hero.label}</SectionLabel>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="mt-2 font-serif text-[clamp(44.8px,6vw,80px)] font-normal leading-[1.05] tracking-tight text-stone-900"
            >
              {hero.headline_before}
              <br />
              {hero.headline_after}{" "}
              <em className="text-accent">{hero.emphasis}</em>.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mt-8 max-w-md text-[16px] leading-relaxed text-stone-500"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-[14px] font-semibold text-white transition-all hover:bg-accent-light hover:shadow-xl hover:shadow-accent/20"
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
              </a>
              <a
                href="#diensten"
                className="text-[14px] font-medium text-stone-500 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-stone-900 hover:decoration-stone-500"
              >
                {hero.cta_secondary}
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-stone-200 pt-8 sm:gap-8"
            >
              {hero.badges.map((badge, i) => (
                <>
                  {i > 0 && <div key={`divider-${i}`} className="hidden h-10 w-px bg-stone-200 sm:block" />}
                  <div key={badge.label}>
                    <span className="block font-serif text-3xl text-stone-900 italic">{badge.value}</span>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-stone-400">
                      {badge.label}
                    </span>
                  </div>
                </>
              ))}
            </motion.div>
          </div>

          {/* Right — Hero Image */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <motion.div style={{ y: imageY }} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:rounded-3xl">
                <Image
                  src={hero.image}
                  alt={hero.image_alt}
                  fill
                  className="object-cover img-reveal"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent" />
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -bottom-6 left-0 rounded-2xl bg-white p-4 shadow-2xl shadow-stone-900/10 sm:-left-6 sm:p-6 lg:-left-10"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
                    <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-stone-400">
                      {hero.floating_card_label}
                    </span>
                    <span className="block text-2xl font-semibold text-stone-900">{hero.floating_card_value}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Gradient Orb */}
      <div className="absolute -top-40 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-accent/5 to-cream opacity-60 blur-3xl" />
    </section>
  );
}
