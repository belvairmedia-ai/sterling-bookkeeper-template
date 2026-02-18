"use client";

import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface ClientPortalProps {
  label?: string;
  headline?: string;
  description?: string;
  portalUrl: string;
  portalName?: string;
  features: string[];
  supportPhone?: string;
  supportEmail?: string;
}

export function ClientPortal({
  label = "Mijn Omgeving",
  headline = "Uw persoonlijk klantportaal",
  description = "Bekijk uw documenten, facturen en belastingaangiften op elk moment — veilig en overzichtelijk op één plek.",
  portalUrl,
  portalName = "Mijn Sterling",
  features,
  supportPhone,
  supportEmail,
}: ClientPortalProps) {
  return (
    <Section className="py-24 lg:py-32 bg-stone-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* Left: copy + CTA */}
          <div>
            <motion.div variants={fadeUp} custom={0}>
              <SectionLabel>{label}</SectionLabel>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} className="flex items-start gap-4 mt-2">
              {/* Shield icon */}
              <div className="shrink-0 mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 border border-accent/30">
                <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <h2 className="font-serif text-4xl lg:text-5xl text-white">{headline}</h2>
                <p className="mt-4 text-[15px] text-stone-400 leading-relaxed max-w-lg">{description}</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={2} className="mt-8">
              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-2xl bg-accent px-8 py-4 font-semibold text-white shadow-lg hover:bg-accent/90 transition-all"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Inloggen bij {portalName}
              </a>
            </motion.div>

            {/* Support */}
            {(supportPhone || supportEmail) && (
              <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-wrap gap-5 text-[13px] text-stone-500">
                {supportPhone && (
                  <a href={`tel:${supportPhone}`} className="flex items-center gap-1.5 hover:text-stone-300 transition-colors">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    {supportPhone}
                  </a>
                )}
                {supportEmail && (
                  <a href={`mailto:${supportEmail}`} className="flex items-center gap-1.5 hover:text-stone-300 transition-colors">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    {supportEmail}
                  </a>
                )}
              </motion.div>
            )}
          </div>

          {/* Right: feature list card */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="rounded-2xl border border-stone-700 bg-stone-800/60 p-8 backdrop-blur-sm"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500 mb-5">
              Beschikbaar in uw portaal
            </p>
            <ul className="space-y-3.5">
              {features.map((feature, i) => (
                <motion.li
                  key={feature}
                  variants={fadeUp}
                  custom={i}
                  className="flex items-center gap-3 text-[14px] text-stone-300"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20">
                    <svg className="h-3 w-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </Section>
  );
}
