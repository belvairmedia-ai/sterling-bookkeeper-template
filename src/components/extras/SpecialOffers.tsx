"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface Offer {
  title: string;
  description: string;
  discount: string;
  validUntil?: string;
  code?: string;
}

export interface SpecialOffersProps {
  label: string;
  headline: string;
  offers: Offer[];
}

function Countdown({ validUntil }: { validUntil: string }) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number } | null>(null);

  useEffect(() => {
    const update = () => {
      const end = new Date(validUntil).getTime();
      const now = Date.now();
      const diff = Math.max(0, end - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft({ days, hours, minutes });
    };

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [validUntil]);

  if (!timeLeft) return null;

  return (
    <div className="flex items-center gap-2 mt-3">
      <svg className="h-3.5 w-3.5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="text-[12px] text-stone-500">
        Expires in&nbsp;
        <span className="font-semibold text-stone-700">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
        </span>
      </span>
    </div>
  );
}

function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-accent/40 bg-accent/5 px-4 py-2 hover:border-accent/70 hover:bg-accent/10 transition-all"
    >
      <span className="font-mono text-[13px] font-bold text-accent tracking-wider">{code}</span>
      <svg className={`h-3.5 w-3.5 ${copied ? "text-green-500" : "text-stone-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        {copied ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        )}
      </svg>
    </button>
  );
}

export function SpecialOffers({ label, headline, offers }: SpecialOffersProps) {
  return (
    <Section className="py-24 lg:py-32 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.title}
              variants={fadeUp}
              custom={i}
              className="rounded-2xl border border-stone-100 bg-white p-8 hover:shadow-lg hover:border-stone-200 transition-all relative overflow-hidden"
            >
              {/* Discount badge */}
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[80px] border-l-transparent border-t-[80px] border-t-accent" />
              <span className="absolute top-2 right-2 -rotate-45 text-[10px] font-bold text-white leading-none">
                {offer.discount}
              </span>

              <h3 className="font-serif text-xl text-stone-900 pr-12">{offer.title}</h3>
              <p className="mt-2 text-[13px] text-stone-500 leading-relaxed">{offer.description}</p>

              {offer.validUntil && <Countdown validUntil={offer.validUntil} />}
              {offer.code && <CopyCode code={offer.code} />}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
