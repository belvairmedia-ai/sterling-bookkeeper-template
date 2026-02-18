"use client";

import { motion } from "framer-motion";
import { fadeUp, Section } from "./shared";

export interface AcceptedPaymentsProps {
  label: string;
  methods: string[];
}

const paymentIcons: Record<string, React.ReactNode> = {
  visa: (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#1A1F71" />
      <path d="M18.83 22H15.96l1.8-11h2.87L18.83 22zM27.5 11.25C26.86 11 25.85 10.73 24.6 10.73c-2.82 0-4.8 1.5-4.82 3.64-.02 1.58 1.41 2.46 2.49 2.99 1.1.54 1.47.89 1.47 1.37 0 .74-.88 1.08-1.7 1.08-1.13 0-1.73-.17-2.65-.57L19 19.55l-.41 2.56c.7.32 2 .6 3.34.61 3.03 0 5-.15 5.02-2.45 0-1.63-1.73-2.7-3.37-3.27-.94-.36-1.32-.58-1.32-1.08 0-.37.42-.76 1.34-.76.76-.01 1.32.16 1.75.34l.21.1.32-2.25zM35.5 11h-2.28c-.7 0-1.23.2-1.54.94L27.3 22h3l.6-1.66h3.7l.34 1.66h2.66L35.5 11zm-3.56 7.22l1.15-3.17.65 3.17H31.94zM13.22 11l-2.8 7.49-.3-1.51C9.57 15.28 7.84 13.39 5.9 12.49L8.5 22h3l4.72-11h-3z" fill="white" />
      <path d="M8.03 11H3.05l-.05.27c3.85.99 6.4 3.36 7.45 6.22l-1.07-5.48C9.21 11.26 8.69 11.04 8.03 11z" fill="#F9A533" />
    </svg>
  ),
  mastercard: (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#252525" />
      <circle cx="18" cy="16" r="8" fill="#EB001B" />
      <circle cx="30" cy="16" r="8" fill="#F79E1B" />
      <path d="M24 9.74a8 8 0 0 1 0 12.52A8 8 0 0 1 24 9.74z" fill="#FF5F00" />
    </svg>
  ),
  amex: (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#2557D6" />
      <text x="24" y="21" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white" fontFamily="sans-serif">AMEX</text>
    </svg>
  ),
  paypal: (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#F4F4F4" />
      <text x="24" y="21" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#003087" fontFamily="sans-serif">PayPal</text>
    </svg>
  ),
  "apple pay": (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#000" />
      <text x="24" y="21" textAnchor="middle" fontSize="8" fontWeight="600" fill="white" fontFamily="sans-serif">Apple Pay</text>
    </svg>
  ),
  "google pay": (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#F8F8F8" />
      <text x="24" y="21" textAnchor="middle" fontSize="7.5" fontWeight="600" fill="#3C4043" fontFamily="sans-serif">Google Pay</text>
    </svg>
  ),
  cash: (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#E8F5E9" />
      <text x="24" y="21" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2E7D32" fontFamily="sans-serif">Cash</text>
    </svg>
  ),
  check: (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#FFF8E1" />
      <text x="24" y="21" textAnchor="middle" fontSize="9" fontWeight="600" fill="#F57F17" fontFamily="sans-serif">Check</text>
    </svg>
  ),
};

export function AcceptedPayments({ label, methods }: AcceptedPaymentsProps) {
  return (
    <Section className="py-12 bg-warm-white border-t border-stone-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <motion.span
            variants={fadeUp}
            custom={0}
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 flex-shrink-0"
          >
            {label}
          </motion.span>
          <div className="flex flex-wrap items-center gap-3">
            {methods.map((method, i) => {
              const key = method.toLowerCase();
              const icon = paymentIcons[key];
              return (
                <motion.div
                  key={method}
                  variants={fadeUp}
                  custom={i}
                  className="flex items-center justify-center rounded-lg border border-stone-100 bg-white shadow-sm px-3 py-2 h-12 min-w-[64px] hover:border-stone-200 transition-all"
                  title={method}
                >
                  {icon ?? (
                    <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wide">
                      {method}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
