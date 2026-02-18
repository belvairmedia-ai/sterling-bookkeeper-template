"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface GalleryMasonryProps {
  label: string;
  headline: string;
  images: GalleryImage[];
}

export function GalleryMasonry({ label, headline, images }: GalleryMasonryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const cols = [
    images.filter((_, i) => i % 3 === 0),
    images.filter((_, i) => i % 3 === 1),
    images.filter((_, i) => i % 3 === 2),
  ];

  return (
    <Section className="py-24 lg:py-32 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="mb-16">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {cols.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-4">
              {col.map((img, ii) => {
                const globalIndex = images.indexOf(img);
                return (
                  <motion.div
                    key={img.src}
                    variants={fadeUp}
                    custom={ci + ii}
                    className="relative overflow-hidden rounded-2xl cursor-pointer group"
                    style={{ aspectRatio: ii % 2 === 0 ? "4/5" : "4/3" }}
                    onClick={() => setLightbox(globalIndex)}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/30 transition-colors duration-300 flex items-center justify-center">
                      <svg
                        className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                    {img.caption && (
                      <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-stone-900/80 px-4 py-3">
                        <p className="text-[12px] text-white">{img.caption}</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/95 p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-[90vh] max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[80vh]">
                <Image
                  src={images[lightbox].src}
                  alt={images[lightbox].alt}
                  fill
                  className="object-contain"
                />
              </div>
              {images[lightbox].caption && (
                <p className="mt-3 text-center text-stone-300 text-[14px]">{images[lightbox].caption}</p>
              )}
              <button
                className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-stone-900 shadow-lg hover:bg-stone-100 transition-colors"
                onClick={() => setLightbox(null)}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Prev/Next */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                onClick={() => setLightbox((lightbox - 1 + images.length) % images.length)}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                onClick={() => setLightbox((lightbox + 1) % images.length)}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
