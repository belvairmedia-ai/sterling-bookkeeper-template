"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeIn } from "./shared";

export function Integrations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const tools = [
    {
      name: "Exact Online",
      logo: (
        <svg viewBox="0 0 120 36" className="h-9 w-28">
          <text x="0" y="26" fill="#e94d10" fontSize="22" fontWeight="700" fontFamily="system-ui">exact</text>
          <text x="72" y="26" fill="#666" fontSize="12" fontWeight="400" fontFamily="system-ui">online</text>
        </svg>
      ),
    },
    {
      name: "Twinfield",
      logo: (
        <svg viewBox="0 0 100 36" className="h-9 w-24">
          <text x="0" y="26" fill="#00a1e0" fontSize="20" fontWeight="700" fontFamily="system-ui">twinfield</text>
        </svg>
      ),
    },
    {
      name: "Yuki",
      logo: (
        <svg viewBox="0 0 60 36" className="h-9 w-16">
          <circle cx="14" cy="18" r="12" fill="#00b2a9"/>
          <text x="14" y="23" textAnchor="middle" fill="white" fontSize="12" fontWeight="800" fontFamily="system-ui">Y</text>
          <text x="32" y="25" fill="#00b2a9" fontSize="16" fontWeight="700" fontFamily="system-ui">uki</text>
        </svg>
      ),
    },
    {
      name: "Visma",
      logo: (
        <svg viewBox="0 0 80 36" className="h-9 w-20">
          <text x="0" y="25" fill="#1a1a5e" fontSize="20" fontWeight="800" fontFamily="system-ui">visma</text>
        </svg>
      ),
    },
    {
      name: "Xero",
      logo: (
        <svg viewBox="0 0 60 36" className="h-9 w-16">
          <text x="0" y="26" fill="#13B5EA" fontSize="22" fontWeight="800" fontFamily="system-ui">xero</text>
        </svg>
      ),
    },
    {
      name: "Mollie",
      logo: (
        <svg viewBox="0 0 70 36" className="h-9 w-18">
          <text x="0" y="25" fill="#000" fontSize="20" fontWeight="800" fontFamily="system-ui">mollie</text>
        </svg>
      ),
    },
    {
      name: "Stripe",
      logo: (
        <svg viewBox="0 0 70 36" className="h-9 w-18">
          <text x="0" y="26" fill="#635BFF" fontSize="22" fontWeight="700" fontFamily="system-ui">stripe</text>
        </svg>
      ),
    },
    {
      name: "Snelstart",
      logo: (
        <svg viewBox="0 0 100 36" className="h-9 w-24">
          <text x="0" y="25" fill="#f7941d" fontSize="18" fontWeight="700" fontFamily="system-ui">snelstart</text>
        </svg>
      ),
    },
  ];

  const marqueeItems = [...tools, ...tools];

  return (
    <section ref={ref} className="border-y border-stone-200 bg-white py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 sm:mb-10"
        >
          Wij werken met de software die u al kent
        </motion.p>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
        <motion.div
          className="flex items-center gap-12 sm:gap-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          {marqueeItems.map((tool, i) => (
            <div
              key={`${tool.name}-${i}`}
              className="shrink-0 opacity-60 transition-opacity duration-300 hover:opacity-100"
            >
              {tool.logo}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
