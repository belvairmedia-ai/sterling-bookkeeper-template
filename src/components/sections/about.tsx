"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { fadeUp, scaleIn, SectionLabel } from "./shared";

export interface AboutProps {
  about: {
    label: string;
    headline: string;
    paragraph: string;
    image: string;
    image_alt: string;
    years_experience: string;
    pillars: Array<{ title: string; text: string }>;
  };
}

export function About({ about }: AboutProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="over-ons" ref={ref} className="relative overflow-hidden py-16 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Image Composition */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={about.image}
                alt={about.image_alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Overlapping Accent Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -bottom-8 right-0 rounded-2xl bg-accent p-6 text-white shadow-2xl sm:-right-4 sm:p-8 lg:-right-8"
            >
              <p className="font-serif text-4xl italic">{about.years_experience}</p>
              <p className="mt-1 text-[12px] font-medium uppercase tracking-wider text-white/70">
                Jaar
                <br />
                ervaring
              </p>
            </motion.div>
          </motion.div>

          {/* Copy */}
          <div>
            <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}>
              <SectionLabel>{about.label}</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={1}
              className="font-serif text-[clamp(32px,4vw,51.2px)] leading-[1.1] tracking-tight text-stone-900"
              dangerouslySetInnerHTML={{
                __html: about.headline
                  .replace(/\n/g, '<br />')
                  .replace(/Altijd bereikbaar/g, '<em class="text-accent">Altijd bereikbaar</em>')
              }}
            />
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={2}
              className="mt-6 text-[16px] leading-relaxed text-stone-500"
            >
              {about.paragraph}
            </motion.p>

            {/* Pillars */}
            <div className="mt-10 space-y-6">
              {about.pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  custom={3 + i}
                  className="flex gap-4"
                >
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-stone-900">
                      {pillar.title}
                    </h4>
                    <p className="mt-1 text-[14px] leading-relaxed text-stone-500">
                      {pillar.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
