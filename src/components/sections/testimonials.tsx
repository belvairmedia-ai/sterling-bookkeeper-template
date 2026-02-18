"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { fadeUp } from "./shared";

export interface TestimonialsProps {
  testimonials: Array<{
    quote: string;
    author: string;
    title: string;
    image: string;
    alt: string;
  }>;
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const paginate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  // Auto-advance every 5s
  useEffect(() => {
    autoRef.current = setInterval(() => paginate(1), 5000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, []);

  const resetAuto = (dir: number) => {
    if (autoRef.current) clearInterval(autoRef.current);
    paginate(dir);
    autoRef.current = setInterval(() => paginate(1), 5000);
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section id="testimonials" ref={ref} className="bg-stone-900 py-16 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}>
              <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-light mb-4">
                Klantverhalen
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={1}
              className="font-serif text-[clamp(32px,4vw,51.2px)] leading-[1.1] tracking-tight text-white"
            >
              Wat ondernemers
              <br />
              <em className="text-accent-light">over ons zeggen</em>.
            </motion.h2>
          </div>

          {/* Nav Arrows */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={2}
            className="flex items-center gap-3"
          >
            <button
              onClick={() => resetAuto(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all hover:border-white/30 hover:text-white"
              aria-label="Vorige"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => resetAuto(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all hover:border-white/30 hover:text-white"
              aria-label="Volgende"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid gap-8 lg:grid-cols-3"
            >
              {/* Show 1 on mobile, 3 on desktop */}
              {[0, 1, 2].map((offset) => {
                const idx = (current + offset) % testimonials.length;
                const t = testimonials[idx];
                return (
                  <div
                    key={t.author}
                    className={`relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm lg:p-10 ${
                      offset > 0 ? "hidden lg:block" : ""
                    }`}
                  >
                    <svg
                      className="mb-6 h-8 w-8 text-accent-light/40"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                    </svg>
                    <p className="text-[15px] leading-relaxed text-stone-300">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full">
                        <Image
                          src={t.image}
                          alt={t.alt}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-white">{t.author}</p>
                        <p className="text-[12px] text-stone-400">{t.title}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
                if (autoRef.current) clearInterval(autoRef.current);
                autoRef.current = setInterval(() => paginate(1), 5000);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-accent-light" : "w-2 bg-white/20"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
