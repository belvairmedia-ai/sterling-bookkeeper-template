"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface VideoShowcaseProps {
  label: string;
  headline: string;
  description: string;
  videoUrl: string;
  thumbnailImage: string;
}

function getEmbedUrl(url: string): string {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  return url;
}

export function VideoShowcase({ label, headline, description, videoUrl, thumbnailImage }: VideoShowcaseProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <Section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-12 max-w-2xl mx-auto">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
          <p className="mt-4 text-stone-500 text-lg leading-relaxed">{description}</p>
        </motion.div>

        <motion.div variants={fadeUp} custom={1} className="relative rounded-3xl overflow-hidden shadow-2xl bg-stone-900">
          <AnimatePresence mode="wait">
            {playing ? (
              <motion.div
                key="player"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-video w-full"
              >
                <iframe
                  src={getEmbedUrl(videoUrl)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </motion.div>
            ) : (
              <motion.div
                key="thumbnail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-video cursor-pointer group"
                onClick={() => setPlaying(true)}
              >
                <Image
                  src={thumbnailImage}
                  alt={headline}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-stone-900/30 transition-colors" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <svg className="h-8 w-8 text-accent ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-semibold text-[15px]">Click to play</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Section>
  );
}
