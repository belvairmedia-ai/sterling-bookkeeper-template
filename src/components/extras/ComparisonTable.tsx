"use client";

import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface ComparisonColumn {
  name: string;
  highlighted?: boolean;
}

export interface ComparisonRow {
  feature: string;
  values: (boolean | string)[];
}

export interface ComparisonTableProps {
  label?: string;
  headline?: string;
  description?: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  footnote?: string;
}

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
        <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </span>
    ) : (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-stone-100">
        <svg className="h-3.5 w-3.5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    );
  }
  return <span className="text-[13px] font-medium text-stone-700">{value}</span>;
}

export function ComparisonTable({
  label = "Vergelijk",
  headline,
  description,
  columns,
  rows,
  footnote,
}: ComparisonTableProps) {
  return (
    <Section className="py-24 lg:py-32 bg-warm-white">
      <div className="mx-auto max-w-5xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
          <SectionLabel>{label}</SectionLabel>
          {headline && (
            <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
          )}
          {description && (
            <p className="mt-4 text-[15px] text-stone-500 leading-relaxed max-w-xl mx-auto">{description}</p>
          )}
        </motion.div>

        {/* Desktop table */}
        <motion.div variants={fadeUp} custom={1} className="hidden md:block overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="py-5 px-6 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400 border-b border-stone-100 w-[34%]">
                  Kenmerk
                </th>
                {columns.map((col, ci) => (
                  <th
                    key={ci}
                    className={`py-5 px-6 text-center text-[13px] font-semibold border-b ${
                      col.highlighted
                        ? "text-accent border-accent/30 bg-accent/5 border-t-2 border-t-accent"
                        : "text-stone-700 border-stone-100"
                    }`}
                  >
                    {col.highlighted && (
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-accent mb-0.5">Aanbevolen</span>
                    )}
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-stone-50/60"}>
                  <td className="py-4 px-6 text-[14px] font-medium text-stone-800 border-b border-stone-100/80">
                    {row.feature}
                  </td>
                  {columns.map((col, ci) => (
                    <td
                      key={ci}
                      className={`py-4 px-6 text-center border-b border-stone-100/80 ${
                        col.highlighted ? "bg-accent/5" : ""
                      }`}
                    >
                      <CellValue value={row.values[ci]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile stacked cards */}
        <div className="md:hidden space-y-4">
          {rows.map((row, ri) => (
            <motion.div
              key={ri}
              variants={fadeUp}
              custom={ri + 1}
              className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm"
            >
              <p className="text-[13px] font-semibold text-stone-800 mb-3">{row.feature}</p>
              <div className="space-y-2">
                {columns.map((col, ci) => (
                  <div key={ci} className={`flex items-center justify-between rounded-xl px-4 py-2.5 ${col.highlighted ? "bg-accent/8 border border-accent/20" : "bg-stone-50"}`}>
                    <span className={`text-[12px] font-medium ${col.highlighted ? "text-accent" : "text-stone-500"}`}>
                      {col.name}
                    </span>
                    <CellValue value={row.values[ci]} />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {footnote && (
          <motion.p variants={fadeUp} custom={rows.length + 2} className="mt-6 text-center text-[12px] text-stone-400">
            {footnote}
          </motion.p>
        )}
      </div>
    </Section>
  );
}
