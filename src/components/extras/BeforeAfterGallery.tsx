"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface BeforeAfterItem {
  before: string;
  after: string;
  caption: string;
}

export interface BeforeAfterGalleryProps {
  label: string;
  headline: string;
  items: BeforeAfterItem[];
}

function ComparisonSlider({ before, after, caption }: BeforeAfterItem) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    if (dragging.current) updatePosition(e.clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) updatePosition(e.touches[0].clientX);
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-stone-100 bg-white">
      <div
        ref={containerRef}
        className="relative h-72 select-none cursor-col-resize"
        onMouseMove={onMouseMove}
        onMouseUp={() => { dragging.current = false; }}
        onMouseLeave={() => { dragging.current = false; }}
        onTouchMove={onTouchMove}
        onTouchEnd={() => { dragging.current = false; }}
      >
        {/* After image (base) */}
        <div className="absolute inset-0">
          <Image src={after} alt="After" fill className="object-cover" />
          <div className="absolute top-3 right-3 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-white">
            After
          </div>
        </div>

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <Image src={before} alt="Before" fill className="object-cover" />
          <div className="absolute top-3 left-3 rounded-full bg-stone-900/70 px-3 py-1 text-[11px] font-semibold text-white">
            Before
          </div>
        </div>

        {/* Drag handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl cursor-col-resize"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          onMouseDown={(e) => { dragging.current = true; e.preventDefault(); }}
          onTouchStart={(e) => { dragging.current = true; e.preventDefault(); }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg border border-stone-200">
            <svg className="h-4 w-4 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
            </svg>
          </div>
        </div>
      </div>
      {caption && (
        <div className="px-6 py-4 border-t border-stone-100">
          <p className="text-[13px] text-stone-500">{caption}</p>
        </div>
      )}
    </div>
  );
}

export function BeforeAfterGallery({ label, headline, items }: BeforeAfterGalleryProps) {
  return (
    <Section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {items.map((item, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}>
              <ComparisonSlider {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
