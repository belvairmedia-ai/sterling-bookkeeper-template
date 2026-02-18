"use client";

import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface Resource {
  title: string;
  description: string;
  url: string;
  fileType: string;
  fileSize?: string;
}

export interface DownloadResourcesProps {
  label: string;
  headline: string;
  resources: Resource[];
}

const fileTypeConfig: Record<string, { bg: string; text: string; icon: string }> = {
  PDF: { bg: "bg-red-50", text: "text-red-600", icon: "📄" },
  DOC: { bg: "bg-blue-50", text: "text-blue-600", icon: "📝" },
  DOCX: { bg: "bg-blue-50", text: "text-blue-600", icon: "📝" },
  XLS: { bg: "bg-green-50", text: "text-green-600", icon: "📊" },
  XLSX: { bg: "bg-green-50", text: "text-green-600", icon: "📊" },
  ZIP: { bg: "bg-yellow-50", text: "text-yellow-700", icon: "🗜️" },
  MP4: { bg: "bg-purple-50", text: "text-purple-600", icon: "🎬" },
};

export function DownloadResources({ label, headline, resources }: DownloadResourcesProps) {
  return (
    <Section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="mb-16">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource, i) => {
            const config = fileTypeConfig[resource.fileType.toUpperCase()] ?? {
              bg: "bg-stone-100",
              text: "text-stone-600",
              icon: "📁",
            };
            return (
              <motion.a
                key={resource.title}
                href={resource.url}
                download
                variants={fadeUp}
                custom={i}
                className="flex items-start gap-4 rounded-2xl border border-stone-100 bg-white p-6 hover:shadow-lg hover:border-stone-200 transition-all group"
              >
                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${config.bg}`}>
                  <span className={`text-xs font-bold uppercase ${config.text}`}>{resource.fileType}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-stone-900 text-[15px] group-hover:text-accent transition-colors leading-snug">
                    {resource.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-stone-500 leading-relaxed line-clamp-2">
                    {resource.description}
                  </p>
                  {resource.fileSize && (
                    <p className="mt-2 text-[11px] text-stone-400 font-medium">{resource.fileSize}</p>
                  )}
                </div>
                <div className="flex-shrink-0 mt-0.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-50 group-hover:bg-accent group-hover:text-white transition-all">
                    <svg className="h-4 w-4 text-stone-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
