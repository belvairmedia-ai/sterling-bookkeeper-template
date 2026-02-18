"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", JSON.stringify({ necessary: true, analytics: true, marketing: true }));
    setVisible(false);
  }

  function reject() {
    localStorage.setItem("cookie-consent", JSON.stringify({ necessary: true, analytics: false, marketing: false }));
    setVisible(false);
  }

  function saveSettings() {
    localStorage.setItem("cookie-consent", JSON.stringify({ necessary: true, analytics, marketing }));
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200 bg-white/95 p-5 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md sm:p-6 md:bottom-6 md:left-6 md:right-auto md:max-w-md md:rounded-2xl md:border md:border-stone-200"
        >
          <p className="text-[13px] leading-relaxed text-stone-600">
            Wij gebruiken cookies om uw ervaring te verbeteren en onze diensten te optimaliseren.{" "}
            <a href="#" className="font-medium text-accent underline underline-offset-2 transition-colors hover:text-accent/80">
              Lees ons privacybeleid
            </a>
          </p>

          {/* Settings expansion */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-3 border-t border-stone-100 pt-4">
                  {/* Noodzakelijk — always on */}
                  <label className="flex items-center justify-between">
                    <span className="text-[13px] font-medium text-stone-700">Noodzakelijk</span>
                    <div className="relative h-6 w-10 cursor-not-allowed rounded-full bg-accent/80">
                      <div className="absolute top-0.5 left-[18px] h-5 w-5 rounded-full bg-white shadow-sm" />
                    </div>
                  </label>
                  {/* Analytisch */}
                  <label className="flex cursor-pointer items-center justify-between">
                    <span className="text-[13px] font-medium text-stone-700">Analytisch</span>
                    <button
                      onClick={() => setAnalytics(!analytics)}
                      className={`relative h-6 w-10 rounded-full transition-colors duration-200 ${analytics ? "bg-accent" : "bg-stone-300"}`}
                    >
                      <div
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${analytics ? "left-[18px]" : "left-0.5"}`}
                      />
                    </button>
                  </label>
                  {/* Marketing */}
                  <label className="flex cursor-pointer items-center justify-between">
                    <span className="text-[13px] font-medium text-stone-700">Marketing</span>
                    <button
                      onClick={() => setMarketing(!marketing)}
                      className={`relative h-6 w-10 rounded-full transition-colors duration-200 ${marketing ? "bg-accent" : "bg-stone-300"}`}
                    >
                      <div
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${marketing ? "left-[18px]" : "left-0.5"}`}
                      />
                    </button>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={accept}
              className="flex-1 rounded-full bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent/90"
            >
              Accepteren
            </button>
            <button
              onClick={showSettings ? saveSettings : () => setShowSettings(true)}
              className="flex-1 rounded-full border border-stone-300 px-4 py-2.5 text-[13px] font-semibold text-stone-700 transition-colors hover:bg-stone-100"
            >
              {showSettings ? "Opslaan" : "Instellingen"}
            </button>
            <button
              onClick={reject}
              className="rounded-full px-4 py-2.5 text-[13px] font-medium text-stone-500 transition-colors hover:text-stone-700"
            >
              Weigeren
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
