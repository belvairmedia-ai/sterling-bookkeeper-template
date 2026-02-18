"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { AnimatedPrice, fadeUp } from "./shared";

export interface PriceCalculatorProps {
  calculator: {
    business_types: Array<{ id: string; label: string; base: number }>;
  };
}

export function PriceCalculator({ calculator }: PriceCalculatorProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [bedrijfsvorm, setBedrijfsvorm] = useState<string>("zzp");
  const [facturen, setFacturen] = useState<string>("0-25");
  const [heeftPersoneel, setHeeftPersoneel] = useState(false);
  const [aantalMedewerkers, setAantalMedewerkers] = useState(1);
  const [extraDiensten, setExtraDiensten] = useState<Record<string, boolean>>({
    btw: true,
    jaarrekening: false,
    salaris: false,
    fiscaal: false,
  });

  const bedrijfsvormen = calculator.business_types;

  const facturenOpties = [
    { id: "0-25", label: "0 \u2013 25", extra: 0 },
    { id: "25-50", label: "25 \u2013 50", extra: 30 },
    { id: "50-100", label: "50 \u2013 100", extra: 75 },
    { id: "100+", label: "100+", extra: 150 },
  ];

  /* ─── Market average multipliers (typical NL accountant) ─── */
  const marktMultiplier: Record<string, number> = {
    zzp: 1.55,
    vof: 1.50,
    bv: 1.45,
    "bv-holding": 1.40,
  };

  /* ─── Price calculation ─── */
  const basePrijs = bedrijfsvormen.find((b) => b.id === bedrijfsvorm)?.base ?? 89;
  const factuurExtra = facturenOpties.find((f) => f.id === facturen)?.extra ?? 0;
  const personeelExtra = heeftPersoneel ? aantalMedewerkers * 15 : 0;
  const jaarrekeningExtra = extraDiensten.jaarrekening ? 50 : 0;
  const salarisExtra = extraDiensten.salaris
    ? heeftPersoneel
      ? Math.max(25, aantalMedewerkers * 10)
      : 25
    : 0;
  const fiscaalExtra = extraDiensten.fiscaal ? 75 : 0;
  const totaal = basePrijs + factuurExtra + personeelExtra + jaarrekeningExtra + salarisExtra + fiscaalExtra;

  /* ─── Market comparison ─── */
  const multiplier = marktMultiplier[bedrijfsvorm] ?? 1.5;
  const marktPrijs = Math.round(totaal * multiplier);
  const besparing = marktPrijs - totaal;
  const besparingJaar = besparing * 12;

  /* ─── Smart recommendation ─── */
  const aanbevolenPlan = totaal <= 120 ? "ZZP Basis" : totaal <= 350 ? "MKB Groei" : "Onderneming Plus";

  return (
    <section ref={ref} className="bg-stone-900 py-16 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}>
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">Prijscalculator</span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={1}
            className="mx-auto max-w-xl font-serif text-[clamp(32px,4vw,51.2px)] leading-[1.1] tracking-tight text-white"
          >
            Wat kost uw boekhouder?{" "}
            <em className="text-accent">Reken het uit</em>.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={2}
            className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-stone-400"
          >
            Selecteer uw situatie en zie direct wat u per maand betaalt. Transparant, zonder verrassingen.
          </motion.p>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={3}
          className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_360px]"
        >
          {/* ─── Form ─── */}
          <div className="space-y-10">
            {/* Bedrijfsvorm */}
            <div>
              <h3 className="mb-4 text-[15px] font-semibold tracking-tight text-white">Bedrijfsvorm</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {bedrijfsvormen.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBedrijfsvorm(item.id)}
                    className={`rounded-2xl border px-4 py-4 text-center text-[13px] font-medium transition-all ${
                      bedrijfsvorm === item.id
                        ? "border-accent bg-accent/10 text-accent shadow-sm shadow-accent/10"
                        : "border-stone-600 bg-stone-700/50 text-stone-200 hover:border-stone-400"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Aantal facturen per maand */}
            <div>
              <h3 className="mb-4 text-[15px] font-semibold tracking-tight text-white">Aantal facturen per maand</h3>
              <div className="flex flex-wrap gap-3">
                {facturenOpties.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFacturen(item.id)}
                    className={`rounded-full border px-6 py-2.5 text-[13px] font-medium transition-all ${
                      facturen === item.id
                        ? "border-accent bg-accent/10 text-accent shadow-sm shadow-accent/10"
                        : "border-stone-600 bg-stone-700/50 text-stone-200 hover:border-stone-400"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Personeel */}
            <div>
              <h3 className="mb-4 text-[15px] font-semibold tracking-tight text-white">Personeel</h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  {["Nee", "Ja"].map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setHeeftPersoneel(label === "Ja")}
                      className={`rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all ${
                        (label === "Ja") === heeftPersoneel
                          ? "border-accent bg-accent/10 text-accent shadow-sm shadow-accent/10"
                          : "border-stone-600 bg-stone-700/50 text-stone-200 hover:border-stone-400"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {heeftPersoneel && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <label className="text-[13px] text-stone-400">Hoeveel medewerkers?</label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={aantalMedewerkers}
                      onChange={(e) => setAantalMedewerkers(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
                      className="w-20 rounded-xl border border-stone-600 bg-stone-700/50 px-3 py-2.5 text-center text-[14px] font-medium text-white outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20"
                    />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Extra diensten */}
            <div>
              <h3 className="mb-4 text-[15px] font-semibold tracking-tight text-white">Extra diensten</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { id: "btw", label: "BTW-aangifte", included: true },
                  { id: "jaarrekening", label: "Jaarrekening", included: false },
                  { id: "salaris", label: "Salarisadministratie", included: false },
                  { id: "fiscaal", label: "Fiscaal advies", included: false },
                ].map((dienst) => (
                  <label
                    key={dienst.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-5 py-4 text-[13px] font-medium transition-all ${
                      dienst.included
                        ? "border-accent/30 bg-accent/10 text-accent"
                        : extraDiensten[dienst.id]
                          ? "border-accent bg-accent/10 text-accent shadow-sm shadow-accent/10"
                          : "border-stone-600 bg-stone-700/50 text-stone-200 hover:border-stone-400"
                    } ${dienst.included ? "pointer-events-none" : ""}`}
                  >
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                        extraDiensten[dienst.id] || dienst.included
                          ? "border-accent bg-accent"
                          : "border-stone-500 bg-stone-600"
                      }`}
                    >
                      {(extraDiensten[dienst.id] || dienst.included) && (
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={extraDiensten[dienst.id]}
                      disabled={dienst.included}
                      onChange={() =>
                        setExtraDiensten((prev) => ({ ...prev, [dienst.id]: !prev[dienst.id] }))
                      }
                      className="sr-only"
                    />
                    {dienst.label}
                    {dienst.included && (
                      <span className="ml-auto text-[11px] font-normal text-accent/70">Inbegrepen</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Result Card ─── */}
          <div className="lg:sticky lg:top-32 lg:self-start space-y-4">
            <div className="rounded-2xl border border-stone-700 bg-stone-800 p-8 shadow-xl shadow-black/20">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400">Uw indicatieprijs</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-[18px] font-medium text-accent">&euro;</span>
                <span className="font-serif text-[clamp(48px,5vw,64px)] leading-none tracking-tight text-accent italic">
                  <AnimatedPrice value={totaal} />
                </span>
                <span className="ml-1 text-[15px] text-stone-400">/maand</span>
              </div>
              <p className="mt-1 text-[12px] text-stone-400">excl. BTW</p>

              {/* ─── Savings Comparison ─── */}
              <div className="mt-5 rounded-xl bg-accent/10 border border-accent/20 px-4 py-3">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-stone-300">Marktgemiddelde</span>
                  <span className="font-medium text-stone-400 line-through">&euro;<AnimatedPrice value={marktPrijs} /></span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[13px]">
                  <span className="font-semibold text-accent">U bespaart</span>
                  <span className="font-bold text-accent">&euro;<AnimatedPrice value={besparingJaar} /> /jaar</span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="mt-6 space-y-2 border-t border-stone-700 pt-5">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-stone-400">Basispakket</span>
                  <span className="font-medium text-stone-200">&euro;{basePrijs}</span>
                </div>
                {factuurExtra > 0 && (
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-stone-400">Factuurverwerking</span>
                    <span className="font-medium text-stone-200">+&euro;{factuurExtra}</span>
                  </div>
                )}
                {personeelExtra > 0 && (
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-stone-400">Personeel ({aantalMedewerkers}x)</span>
                    <span className="font-medium text-stone-200">+&euro;{personeelExtra}</span>
                  </div>
                )}
                {jaarrekeningExtra > 0 && (
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-stone-400">Jaarrekening</span>
                    <span className="font-medium text-stone-200">+&euro;{jaarrekeningExtra}</span>
                  </div>
                )}
                {salarisExtra > 0 && (
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-stone-400">Salarisadministratie</span>
                    <span className="font-medium text-stone-200">+&euro;{salarisExtra}</span>
                  </div>
                )}
                {fiscaalExtra > 0 && (
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-stone-400">Fiscaal advies</span>
                    <span className="font-medium text-stone-200">+&euro;{fiscaalExtra}</span>
                  </div>
                )}
              </div>

              <a
                href="#contact"
                className="mt-8 block rounded-full border border-stone-700 bg-transparent py-3.5 text-center text-[14px] font-medium text-stone-500 transition-all hover:border-stone-500 hover:text-stone-300"
              >
                Ontvang uw persoonlijke offerte
              </a>
              <p className="mt-4 text-center text-[12px] leading-relaxed text-stone-500">
                Dit is een indicatie. De exacte prijs bespreken wij graag persoonlijk.
              </p>
            </div>

            {/* ─── Smart Recommendation ─── */}
            <motion.a
              href="#tarieven"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="group flex items-center gap-3 rounded-2xl border border-accent/20 bg-accent/5 px-5 py-4 transition-all hover:border-accent/40 hover:bg-accent/10"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/20">
                <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[12px] text-stone-400">Ons advies voor u</p>
                <p className="text-[14px] font-semibold text-accent">{aanbevolenPlan}</p>
              </div>
              <svg className="h-4 w-4 text-accent/50 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
