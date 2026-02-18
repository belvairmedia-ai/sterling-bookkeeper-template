"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export interface SchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SchedulerModal({ isOpen, onClose }: SchedulerModalProps) {
  const [step, setStep] = useState(0);
  const [pakket, setPakket] = useState("mkb-groei");
  const [datum, setDatum] = useState("");
  const [tijd, setTijd] = useState("");
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [telefoon, setTelefoon] = useState("");
  const [bedrijf, setBedrijf] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    if (d.getDay() === 0 || d.getDay() === 6) return null;
    return d;
  }).filter(Boolean) as Date[];

  const tijdsloten = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"];

  const formatDate = (d: Date) => d.toLocaleDateString("nl-NL", { weekday: "short", day: "numeric", month: "short" });
  const formatDateKey = (d: Date) => d.toISOString().split("T")[0];

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStep(0);
      setPakket("mkb-groei");
      setDatum("");
      setTijd("");
      setNaam("");
      setEmail("");
      setTelefoon("");
      setBedrijf("");
      onClose();
    }, 3000);
  };

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(0);
        setSubmitted(false);
      }, 300);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-400 transition-colors hover:bg-stone-200 hover:text-stone-600"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="border-b border-stone-100 px-6 pt-6 pb-4 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                  <span className="font-serif text-lg text-white italic">S</span>
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-stone-900">Gratis Adviesgesprek</h3>
                  <p className="text-[12px] text-stone-400">30 minuten — vrijblijvend</p>
                </div>
              </div>

              {/* Progress */}
              {!submitted && (
                <div className="mt-4 flex gap-1.5">
                  {[0, 1, 2].map((s) => (
                    <div
                      key={s}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        s <= step ? "bg-accent" : "bg-stone-200"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="px-6 py-6 sm:px-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="mt-4 text-[18px] font-semibold text-stone-900">Afspraak ingepland!</h4>
                  <p className="mt-2 text-[14px] text-stone-500">
                    U ontvangt een bevestiging op {email || "uw e-mail"}.
                  </p>
                </motion.div>
              ) : (
                <AnimatePresence mode="wait">
                  {/* Step 1: Pakket */}
                  {step === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="text-[15px] font-semibold text-stone-900">Welk pakket heeft uw interesse?</h4>
                      <p className="mt-1 text-[13px] text-stone-400">U kunt dit later nog wijzigen.</p>
                      <div className="mt-5 space-y-2.5">
                        {[
                          { id: "zzp-basis", name: "ZZP Basis", price: "\u20AC99/maand", desc: "Boekhouding & BTW voor ZZP'ers" },
                          { id: "mkb-groei", name: "MKB Groei", price: "\u20AC299/maand", desc: "Compleet pakket met fiscaal advies", popular: true },
                          { id: "onderneming-plus", name: "Onderneming Plus", price: "Op maat", desc: "Maatwerk voor grotere bedrijven" },
                          { id: "weet-niet", name: "Weet ik nog niet", price: "", desc: "Bespreek opties tijdens het gesprek" },
                        ].map((p) => (
                          <button
                            key={p.id}
                            onClick={() => setPakket(p.id)}
                            className={`flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-all ${
                              pakket === p.id
                                ? "border-accent bg-accent/5 shadow-sm shadow-accent/10"
                                : "border-stone-200 hover:border-stone-300"
                            }`}
                          >
                            <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                              pakket === p.id ? "border-accent bg-accent" : "border-stone-300"
                            }`}>
                              {pakket === p.id && (
                                <div className="h-2 w-2 rounded-full bg-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[14px] font-semibold text-stone-900">{p.name}</span>
                                {p.popular && (
                                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">Populair</span>
                                )}
                              </div>
                              <span className="text-[12px] text-stone-400">{p.desc}</span>
                            </div>
                            {p.price && <span className="text-[13px] font-medium text-stone-500">{p.price}</span>}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setStep(1)}
                        className="mt-6 w-full rounded-full bg-accent py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
                      >
                        Kies datum & tijd
                      </button>
                    </motion.div>
                  )}

                  {/* Step 2: Datum & Tijd */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="text-[15px] font-semibold text-stone-900">Kies een datum</h4>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {dates.slice(0, 10).map((d) => (
                          <button
                            key={formatDateKey(d)}
                            onClick={() => setDatum(formatDateKey(d))}
                            className={`rounded-xl border px-3 py-2.5 text-[12px] font-medium transition-all ${
                              datum === formatDateKey(d)
                                ? "border-accent bg-accent/5 text-accent"
                                : "border-stone-200 text-stone-600 hover:border-stone-300"
                            }`}
                          >
                            {formatDate(d)}
                          </button>
                        ))}
                      </div>

                      {datum && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <h4 className="mt-6 text-[15px] font-semibold text-stone-900">Kies een tijd</h4>
                          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
                            {tijdsloten.map((t) => (
                              <button
                                key={t}
                                onClick={() => setTijd(t)}
                                className={`rounded-lg border py-2.5 text-center text-[13px] font-medium transition-all ${
                                  tijd === t
                                    ? "border-accent bg-accent/5 text-accent"
                                    : "border-stone-200 text-stone-600 hover:border-stone-300"
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      <div className="mt-6 flex gap-3">
                        <button
                          onClick={() => setStep(0)}
                          className="flex-1 rounded-full border border-stone-200 py-3.5 text-[14px] font-medium text-stone-600 transition-colors hover:bg-stone-50"
                        >
                          Terug
                        </button>
                        <button
                          onClick={() => datum && tijd && setStep(2)}
                          className={`flex-1 rounded-full py-3.5 text-[14px] font-semibold text-white transition-all ${
                            datum && tijd
                              ? "bg-accent hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
                              : "bg-stone-300 cursor-not-allowed"
                          }`}
                        >
                          Verder
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Contactgegevens */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="text-[15px] font-semibold text-stone-900">Uw gegevens</h4>
                      <p className="mt-1 text-[13px] text-stone-400">Zodat wij u kunnen bevestigen.</p>
                      <div className="mt-5 space-y-3">
                        <div>
                          <label className="text-[12px] font-medium text-stone-500">Naam *</label>
                          <input
                            type="text"
                            value={naam}
                            onChange={(e) => setNaam(e.target.value)}
                            placeholder="Jan de Vries"
                            className="mt-1 w-full rounded-xl border border-stone-200 px-4 py-3 text-[14px] text-stone-900 outline-none transition-colors placeholder:text-stone-300 focus:border-accent focus:ring-1 focus:ring-accent/20"
                          />
                        </div>
                        <div>
                          <label className="text-[12px] font-medium text-stone-500">E-mail *</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="jan@bedrijf.nl"
                            className="mt-1 w-full rounded-xl border border-stone-200 px-4 py-3 text-[14px] text-stone-900 outline-none transition-colors placeholder:text-stone-300 focus:border-accent focus:ring-1 focus:ring-accent/20"
                          />
                        </div>
                        <div>
                          <label className="text-[12px] font-medium text-stone-500">Telefoon</label>
                          <input
                            type="tel"
                            value={telefoon}
                            onChange={(e) => setTelefoon(e.target.value)}
                            placeholder="06 12345678"
                            className="mt-1 w-full rounded-xl border border-stone-200 px-4 py-3 text-[14px] text-stone-900 outline-none transition-colors placeholder:text-stone-300 focus:border-accent focus:ring-1 focus:ring-accent/20"
                          />
                        </div>
                        <div>
                          <label className="text-[12px] font-medium text-stone-500">Bedrijfsnaam</label>
                          <input
                            type="text"
                            value={bedrijf}
                            onChange={(e) => setBedrijf(e.target.value)}
                            placeholder="Uw Bedrijf B.V."
                            className="mt-1 w-full rounded-xl border border-stone-200 px-4 py-3 text-[14px] text-stone-900 outline-none transition-colors placeholder:text-stone-300 focus:border-accent focus:ring-1 focus:ring-accent/20"
                          />
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="mt-5 rounded-xl bg-stone-50 px-4 py-3">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">Samenvatting</p>
                        <div className="mt-2 space-y-1 text-[13px] text-stone-600">
                          <p>Pakket: <span className="font-medium text-stone-900">{pakket === "weet-niet" ? "Nog te bepalen" : pakket.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</span></p>
                          <p>Datum: <span className="font-medium text-stone-900">{datum ? new Date(datum).toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" }) : "\u2014"}</span></p>
                          <p>Tijd: <span className="font-medium text-stone-900">{tijd || "\u2014"}</span></p>
                        </div>
                      </div>

                      <div className="mt-6 flex gap-3">
                        <button
                          onClick={() => setStep(1)}
                          className="flex-1 rounded-full border border-stone-200 py-3.5 text-[14px] font-medium text-stone-600 transition-colors hover:bg-stone-50"
                        >
                          Terug
                        </button>
                        <button
                          onClick={() => naam && email && handleSubmit()}
                          className={`flex-1 rounded-full py-3.5 text-[14px] font-semibold text-white transition-all ${
                            naam && email
                              ? "bg-accent hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
                              : "bg-stone-300 cursor-not-allowed"
                          }`}
                        >
                          Bevestig afspraak
                        </button>
                      </div>

                      <p className="mt-4 text-center text-[11px] text-stone-400">
                        Door te bevestigen gaat u akkoord met ons privacybeleid.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
