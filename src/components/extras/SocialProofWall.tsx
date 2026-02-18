"use client";

import { motion } from "framer-motion";
import { fadeUp, Section, SectionLabel } from "./shared";

export interface Review {
  platform: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface SocialProofWallProps {
  label: string;
  headline: string;
  reviews: Review[];
}

const platformConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  google: {
    color: "text-blue-600",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    ),
  },
  yelp: {
    color: "text-red-600",
    icon: (
      <svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.16 12.73l-4.703 1.16c-.8.198-1.502-.542-1.168-1.313l1.973-4.47c.27-.611 1.071-.735 1.517-.235l2.73 3.31c.425.517.173 1.3-.35 1.548zm-9.023 5.04l-1.04 4.822c-.14.65-.891.956-1.395.543L5.02 19.9c-.52-.428-.433-1.23.163-1.535l4.46-2.28c.756-.385 1.6.26 1.493 1.085zm-.633-6.81L6.18 8.44c-.53-.39-.508-1.205.04-1.565l4.413-2.846c.567-.365 1.307.038 1.347.715l.304 5.28c.06 1.028-1.065 1.685-1.78 1.136zm4.79 6.51l-2.28-4.46c-.385-.756.258-1.6 1.085-1.494l4.822 1.04c.65.14.956.891.543 1.395l-2.235 3.683c-.428.52-1.23.433-1.535-.163zm-7.92-1.77l-4.47 1.973c-.77.34-1.511-.367-1.313-1.168l1.16-4.703c.198-.8 1.13-1.074 1.547-.35l2.282 4.46c.385.755-.26 1.6-1.085 1.494l-.12-.026z" />
      </svg>
    ),
  },
  facebook: {
    color: "text-blue-700",
    icon: (
      <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? "text-amber-400" : "text-stone-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function SocialProofWall({ label, headline, reviews }: SocialProofWallProps) {
  return (
    <Section className="py-24 lg:py-32 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 mt-2">{headline}</h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => {
            const platform = platformConfig[review.platform.toLowerCase()];
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl border border-stone-100 bg-white p-6 hover:shadow-lg hover:border-stone-200 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-stone-900 text-[14px]">{review.author}</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">{review.date}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {platform?.icon}
                    <span className={`text-[11px] font-semibold capitalize ${platform?.color ?? "text-stone-500"}`}>
                      {review.platform}
                    </span>
                  </div>
                </div>
                <StarRating rating={review.rating} />
                <p className="mt-3 text-[13px] text-stone-600 leading-relaxed">{review.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
