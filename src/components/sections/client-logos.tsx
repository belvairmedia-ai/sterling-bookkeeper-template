"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeIn } from "./shared";

export interface ClientLogosProps {
  clients: Array<{ name: string; style: string }>;
  client_logos: {
    label: string;
  };
}

export function ClientLogos({ clients, client_logos }: ClientLogosProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const marqueeClients = [...clients, ...clients];

  return (
    <section ref={ref} className="py-10 sm:py-14 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400"
        >
          {client_logos.label}
        </motion.p>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-warm-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-warm-white to-transparent" />
        <motion.div
          className="flex items-center gap-10 sm:gap-14"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          {marqueeClients.map((client, i) => (
            <span
              key={`${client.name}-${i}`}
              className={`shrink-0 text-stone-300 transition-colors hover:text-stone-500 ${client.style}`}
            >
              {client.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
