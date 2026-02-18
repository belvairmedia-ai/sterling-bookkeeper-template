"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface NewsletterSignupProps {
  label?: string;
  headline?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  frequency?: string;
  topics?: string[];
  privacyText?: string;
}

export function NewsletterSignup({
  label = "Blijf Op De Hoogte",
  headline = "Fiscale tips direct in uw inbox",
  description = "Ontvang praktische adviezen over belasting, ondernemen en financiële planning — zonder ruis.",
  placeholder = "uw@emailadres.nl",
  buttonText = "Aanmelden",
  frequency = "Maandelijks",
  topics = ["Belastingtips", "Fiscale wijzigingen", "Ondernemen"],
  privacyText = "Geen spam. Uitschrijven kan altijd.",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <Section className="py-16 lg:py-20 bg-warm-white border-y border-stone-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">

          {/* Left: text + form */}
          <div>
            <motion.div variants={fadeUp} custom={0}>
              <SectionLabel>{label}</SectionLabel>
              <h2 className="font-serif text-3xl lg:text-4xl text-stone-900 mt-1">{headline}</h2>
              <p className="mt-3 text-[14px] text-stone-500 leading-relaxed max-w-xl">{description}</p>
            </motion.div>

            {/* Inline form */}
            <motion.form
              variants={fadeUp}
              custom={1}
              onSubmit={handleSubmit}
              className="mt-6 flex items-center gap-2 max-w-md relative"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2.5 text-[14px] font-semibold text-green-700"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    Aanmelding ontvangen — bedankt!
                  </motion.div>
                ) : (
                  <motion.div key="form" className="flex w-full gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={placeholder}
                      className="flex-1 rounded-xl border border-stone-200 bg-white px-4 py-3 text-[14px] text-stone-900 placeholder:text-stone-400 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                    <button
                      type="submit"
                      className="shrink-0 rounded-xl bg-accent px-6 py-3 text-[14px] font-semibold text-white hover:bg-accent/90 transition-all"
                    >
                      {buttonText}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>

            {privacyText && (
              <motion.p variants={fadeUp} custom={2} className="mt-2.5 text-[12px] text-stone-400">
                {privacyText}
              </motion.p>
            )}
          </div>

          {/* Right: frequency + topics */}
          <motion.div variants={fadeUp} custom={2} className="flex flex-col items-start lg:items-end gap-4">
            {frequency && (
              <div className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5">
                <svg className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                </svg>
                <span className="text-[12px] font-semibold text-accent">{frequency}</span>
              </div>
            )}

            {topics && topics.length > 0 && (
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {topics.map((topic, i) => (
                  <motion.span
                    key={topic}
                    variants={fadeUp}
                    custom={i}
                    className="rounded-lg border border-stone-200 bg-white px-3 py-1 text-[12px] font-medium text-stone-600"
                  >
                    {topic}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </Section>
  );
}
