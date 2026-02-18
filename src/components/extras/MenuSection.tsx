"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  tags?: string[];
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface MenuSectionProps {
  label: string;
  headline: string;
  categories: MenuCategory[];
}

const tagColors: Record<string, string> = {
  vegan: "bg-green-50 text-green-700",
  vegetarian: "bg-emerald-50 text-emerald-700",
  "gluten-free": "bg-amber-50 text-amber-700",
  spicy: "bg-red-50 text-red-600",
  popular: "bg-accent/10 text-accent",
  new: "bg-blue-50 text-blue-600",
};

export function MenuSection({ label, headline, categories }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <Section className="py-24 lg:py-32 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div variants={fadeUp} custom={1} className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={`rounded-full px-5 py-2 text-[13px] font-semibold transition-all ${
                activeCategory === i
                  ? "bg-accent text-white shadow-lg shadow-accent/20"
                  : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Items grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {categories[activeCategory]?.items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-start justify-between gap-4 rounded-2xl border border-stone-100 bg-white p-6 hover:shadow-md hover:border-stone-200 transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2">
                  <h3 className="font-semibold text-stone-900 text-[15px]">{item.name}</h3>
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                        tagColors[tag.toLowerCase()] ?? "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-1 text-[13px] text-stone-500 leading-relaxed">{item.description}</p>
              </div>
              <span className="flex-shrink-0 font-bold text-stone-900 text-[17px]">{item.price}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
