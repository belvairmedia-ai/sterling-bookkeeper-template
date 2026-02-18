"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export interface StickyCTAProps {
  sticky_cta: {
    title: string;
    subtitle: string;
    button: string;
  };
}

export function StickyCTA({ sticky_cta }: StickyCTAProps) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [600, 800], [0, 1]);
  const pointerEvents = useTransform(scrollY, (v) => (v > 800 ? "auto" : "none"));

  return (
    <motion.div
      style={{ opacity, pointerEvents }}
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200 bg-white/90 py-3 backdrop-blur-md md:hidden"
    >
      <div className="flex items-center justify-between px-4">
        <div>
          <p className="text-[13px] font-semibold text-stone-900">{sticky_cta.title}</p>
          <p className="text-[11px] text-stone-500">{sticky_cta.subtitle}</p>
        </div>
        <a
          href="#contact"
          className="rounded-full bg-accent px-5 py-3 text-[13px] font-semibold text-white"
        >
          {sticky_cta.button}
        </a>
      </div>
    </motion.div>
  );
}
