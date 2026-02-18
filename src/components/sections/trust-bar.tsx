"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeIn } from "./shared";

export interface TrustBarProps {
  trust: {
    label: string;
    google_score: string;
    google_count: string;
  };
}

export function TrustBar({ trust }: TrustBarProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="border-y border-stone-200 bg-white py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400">
            {trust.label}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14">
            {/* Google Reviews */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <svg className="h-6 w-6" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-[20px] font-bold tracking-tight text-stone-900">{trust.google_score}</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-3.5 w-3.5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <span className="text-[10px] text-stone-400">{trust.google_count} beoordelingen</span>
            </div>
            <div className="hidden h-10 w-px bg-stone-200 sm:block" />
            {/* NOAB Logo */}
            <div className="group flex flex-col items-center gap-1 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0">
              <svg viewBox="0 0 80 32" className="h-8 w-20">
                <rect x="0" y="4" width="24" height="24" rx="4" fill="#003366"/>
                <text x="12" y="21" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="system-ui">N</text>
                <text x="30" y="22" fill="#003366" fontSize="14" fontWeight="800" fontFamily="system-ui" letterSpacing="1">OAB</text>
              </svg>
            </div>
            {/* SRA Logo */}
            <div className="group flex flex-col items-center gap-1 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0">
              <svg viewBox="0 0 60 32" className="h-8 w-16">
                <rect x="0" y="4" width="60" height="24" rx="4" fill="#1a5632"/>
                <text x="30" y="21" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="system-ui" letterSpacing="2">SRA</text>
              </svg>
            </div>
            {/* NBA Logo */}
            <div className="hidden group flex-col items-center gap-1 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 sm:flex">
              <svg viewBox="0 0 60 32" className="h-8 w-16">
                <circle cx="16" cy="16" r="12" fill="none" stroke="#004899" strokeWidth="2.5"/>
                <text x="16" y="20" textAnchor="middle" fill="#004899" fontSize="10" fontWeight="800" fontFamily="system-ui">NBA</text>
                <text x="44" y="14" fill="#004899" fontSize="7" fontWeight="600" fontFamily="system-ui">Koninklijke</text>
                <text x="44" y="22" fill="#004899" fontSize="7" fontWeight="600" fontFamily="system-ui">NBA</text>
              </svg>
            </div>
            {/* RB Logo */}
            <div className="hidden group flex-col items-center gap-1 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 sm:flex">
              <svg viewBox="0 0 50 32" className="h-8 w-14">
                <rect x="0" y="6" width="50" height="20" rx="3" fill="none" stroke="#8B1A1A" strokeWidth="2"/>
                <text x="25" y="21" textAnchor="middle" fill="#8B1A1A" fontSize="12" fontWeight="800" fontFamily="system-ui" letterSpacing="3">RB</text>
              </svg>
            </div>
            {/* Exact Online Logo */}
            <div className="hidden group flex-col items-center gap-1 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 lg:flex">
              <svg viewBox="0 0 100 32" className="h-8 w-24">
                <text x="0" y="22" fill="#e94d10" fontSize="18" fontWeight="700" fontFamily="system-ui">exact</text>
                <text x="62" y="22" fill="#333" fontSize="10" fontWeight="400" fontFamily="system-ui">online</text>
              </svg>
            </div>
            {/* Twinfield Logo */}
            <div className="hidden group flex-col items-center gap-1 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 lg:flex">
              <svg viewBox="0 0 100 32" className="h-8 w-24">
                <text x="0" y="22" fill="#00a1e0" fontSize="16" fontWeight="700" fontFamily="system-ui">twinfield</text>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
