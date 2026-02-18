"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

export interface NavigationProps {
  company: {
    name: string;
    logo_initial: string;
    logo_subtitle: string;
  };
  nav: {
    items: string[];
    cta: string;
  };
}

export function Navigation({ company, nav }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: `rgba(250, 250, 248, ${bgOpacity})`,
        backdropFilter: "blur(12px)",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
            <span className="font-serif text-lg text-white italic">{company.logo_initial}</span>
          </div>
          <div className="leading-tight">
            <span className="text-[15px] font-semibold tracking-tight text-stone-900">
              {company.name.split(" ")[0]}
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-stone-400">
              {company.logo_subtitle}
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-10 md:flex">
          {nav.items.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-[13px] font-medium tracking-wide text-stone-500 transition-colors hover:text-stone-900"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-accent px-6 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
          >
            {nav.cta}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-[2px] w-6 bg-stone-900"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block h-[2px] w-6 bg-stone-900"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-[2px] w-6 bg-stone-900"
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="overflow-hidden bg-warm-white md:hidden"
      >
        <div className="flex flex-col gap-4 px-6 pb-8 pt-2">
          {nav.items.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setOpen(false)}
              className="py-2 text-[15px] font-medium text-stone-700"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-accent px-6 py-3 text-center text-[14px] font-semibold text-white"
          >
            {nav.cta}
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}
