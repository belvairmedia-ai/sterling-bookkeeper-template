"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface Product {
  name: string;
  description: string;
  price: string;
  image: string;
  alt: string;
}

export interface ProductShowcaseProps {
  label: string;
  headline: string;
  products: Product[];
}

export function ProductShowcase({ label, headline, products }: ProductShowcaseProps) {
  return (
    <Section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="mb-16">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              variants={fadeUp}
              custom={i}
              className="group rounded-2xl border border-stone-100 bg-white overflow-hidden hover:shadow-lg hover:border-stone-200 transition-all"
            >
              <div className="relative h-56 overflow-hidden bg-stone-50">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-stone-900 text-[15px] leading-snug">{product.name}</h3>
                <p className="mt-1.5 text-[13px] text-stone-500 leading-relaxed line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-lg">{product.price}</span>
                  <button className="rounded-full border border-accent px-4 py-1.5 text-[12px] font-semibold text-accent hover:bg-accent hover:text-white transition-all">
                    Add to cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
