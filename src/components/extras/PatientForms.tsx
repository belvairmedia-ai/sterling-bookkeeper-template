"use client";

import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface PatientForm {
  title: string;
  description: string;
  url: string;
  fileType: string;
}

export interface PatientFormsProps {
  label: string;
  headline: string;
  description: string;
  forms: PatientForm[];
}

const fileTypeColors: Record<string, string> = {
  PDF: "bg-red-50 text-red-600",
  DOC: "bg-blue-50 text-blue-600",
  DOCX: "bg-blue-50 text-blue-600",
  XLS: "bg-green-50 text-green-600",
  XLSX: "bg-green-50 text-green-600",
};

export function PatientForms({ label, headline, description, forms }: PatientFormsProps) {
  return (
    <Section className="py-24 lg:py-32 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="max-w-2xl mb-16">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
          <p className="mt-4 text-stone-500 text-lg leading-relaxed">{description}</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {forms.map((form, i) => (
            <motion.a
              key={form.title}
              href={form.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              custom={i}
              className="flex items-start gap-4 rounded-2xl border border-stone-100 bg-white p-6 hover:shadow-lg hover:border-stone-200 transition-all group"
            >
              <div
                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-[10px] font-bold uppercase tracking-wide ${
                  fileTypeColors[form.fileType.toUpperCase()] ?? "bg-stone-100 text-stone-600"
                }`}
              >
                {form.fileType}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-stone-900 text-[15px] group-hover:text-accent transition-colors leading-snug">
                  {form.title}
                </h3>
                <p className="mt-1 text-[13px] text-stone-500 leading-relaxed">{form.description}</p>
              </div>
              <svg
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-stone-300 group-hover:text-accent transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
}
