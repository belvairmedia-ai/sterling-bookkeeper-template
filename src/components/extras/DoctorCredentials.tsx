"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface Doctor {
  name: string;
  title: string;
  credentials: string;
  education: string[];
  specialties: string[];
  image: string;
  alt: string;
}

export interface DoctorCredentialsProps {
  label: string;
  headline: string;
  doctors: Doctor[];
}

export function DoctorCredentials({ label, headline, doctors }: DoctorCredentialsProps) {
  return (
    <Section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="mb-16">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor, i) => (
            <motion.div
              key={doctor.name}
              variants={fadeUp}
              custom={i}
              className="rounded-2xl border border-stone-100 bg-white overflow-hidden hover:shadow-lg hover:border-stone-200 transition-all group"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={doctor.image}
                  alt={doctor.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="font-serif text-xl text-stone-900">{doctor.name}</h3>
                <p className="text-accent font-medium text-[13px] mt-1">{doctor.title}</p>
                <p className="text-stone-500 text-[12px] font-semibold tracking-wide mt-1">
                  {doctor.credentials}
                </p>

                {doctor.specialties.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-stone-400 mb-2">
                      Specialties
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {doctor.specialties.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-medium text-accent"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {doctor.education.length > 0 && (
                  <div className="mt-4 border-t border-stone-100 pt-4">
                    <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-stone-400 mb-2">
                      Education
                    </p>
                    <ul className="space-y-1">
                      {doctor.education.map((edu) => (
                        <li key={edu} className="text-[13px] text-stone-600 flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
