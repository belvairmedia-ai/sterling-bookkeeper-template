"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Counter, fadeUp } from "./shared";

export interface StatsProps {
  stats: Array<{ value: number; suffix: string; label: string; prefix?: string }>;
}

export function Stats({ stats }: StatsProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="border-y border-stone-200 bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-2 gap-6 sm:gap-10 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-stone-200">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
              className="text-center"
            >
              <p className="font-serif text-[clamp(40px,5vw,56px)] text-stone-900 italic">
                {"prefix" in stat && stat.prefix}
                <Counter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.15em] text-stone-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
