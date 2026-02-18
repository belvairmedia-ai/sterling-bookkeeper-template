"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { fadeUp, SectionLabel } from "./shared";

export interface TeamProps {
  team: {
    label: string;
    headline_before: string;
    headline_emphasis: string;
    description: string;
    members: Array<{
      name: string;
      role: string;
      credentials: string;
      bio: string;
      image: string;
      alt: string;
    }>;
  };
}

export function Team({ team }: TeamProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="team" ref={ref} className="py-16 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:mb-20 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}>
              <SectionLabel>{team.label}</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={1}
              className="font-serif text-[clamp(32px,4vw,51.2px)] leading-[1.1] tracking-tight text-stone-900"
            >
              {team.headline_before}
              <br />
              <em className="text-accent">{team.headline_emphasis}</em>.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={2}
            className="max-w-sm text-[14px] leading-relaxed text-stone-500"
          >
            {team.description}
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
          {team.members.map((member, i) => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-stone-100">
                <Image
                  src={member.image}
                  alt={member.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="mt-3 sm:mt-5">
                <h3 className="text-[14px] font-semibold tracking-tight text-stone-900 sm:text-[16px]">
                  {member.name}
                </h3>
                <p className="mt-0.5 text-[12px] font-medium text-accent sm:mt-1 sm:text-[13px]">
                  {member.role}
                </p>
                <p className="hidden text-[11px] font-medium tracking-wide text-stone-400 sm:mt-1 sm:block">
                  {member.credentials}
                </p>
                <p className="mt-2 hidden text-[12px] leading-relaxed text-stone-500 sm:block">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
