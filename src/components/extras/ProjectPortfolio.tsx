"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface PortfolioProject {
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  scope: string;
  timeline: string;
  location: string;
}

export interface ProjectPortfolioProps {
  label: string;
  headline: string;
  projects: PortfolioProject[];
}

export function ProjectPortfolio({ label, headline, projects }: ProjectPortfolioProps) {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];

  return (
    <Section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="mb-16">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Project list */}
          <motion.div variants={fadeUp} custom={1} className="space-y-3">
            {projects.map((p, i) => (
              <button
                key={p.title}
                onClick={() => setSelected(i)}
                className={`w-full rounded-xl border text-left px-5 py-4 transition-all ${
                  selected === i
                    ? "border-accent bg-accent/5"
                    : "border-stone-100 bg-white hover:border-stone-200 hover:shadow-md"
                }`}
              >
                <p className={`font-semibold text-[14px] leading-snug ${selected === i ? "text-accent" : "text-stone-900"}`}>
                  {p.title}
                </p>
                <p className="text-[12px] text-stone-500 mt-0.5">{p.location}</p>
              </button>
            ))}
          </motion.div>

          {/* Project detail */}
          <motion.div variants={fadeUp} custom={2} className="lg:col-span-2">
            {project && (
              <div className="rounded-2xl border border-stone-100 bg-white overflow-hidden">
                <div className="grid grid-cols-2 h-64">
                  <div className="relative overflow-hidden">
                    <Image src={project.beforeImage} alt={`${project.title} before`} fill className="object-cover" />
                    <div className="absolute bottom-3 left-3 rounded-full bg-stone-900/70 px-3 py-1 text-[11px] font-semibold text-white">
                      Before
                    </div>
                  </div>
                  <div className="relative overflow-hidden border-l border-white/20">
                    <Image src={project.afterImage} alt={`${project.title} after`} fill className="object-cover" />
                    <div className="absolute bottom-3 right-3 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-white">
                      After
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-2xl text-stone-900">{project.title}</h3>
                  <p className="mt-2 text-stone-500 text-[14px] leading-relaxed">{project.description}</p>

                  <div className="mt-6 grid grid-cols-3 gap-4">
                    {[
                      { label: "Scope", value: project.scope },
                      { label: "Timeline", value: project.timeline },
                      { label: "Location", value: project.location },
                    ].map(({ label: l, value }) => (
                      <div key={l} className="rounded-xl bg-stone-50 p-4">
                        <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-stone-400">{l}</p>
                        <p className="mt-1 text-[13px] font-semibold text-stone-900">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
