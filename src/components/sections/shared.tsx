"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { createContext, useContext, useEffect, useRef, useState } from "react";

/* ─── Animation Variants ─── */
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ─── Reusable Section Wrapper ─── */
export function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} id={id} className={className}>
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeIn}
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ─── Section Label ─── */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
      {children}
    </span>
  );
}

/* ─── 3D Tilt Card ─── */
export function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: "transform 0.15s ease-out" }}
    >
      {children}
    </div>
  );
}

/* ─── Animated Counter ─── */
export function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  if (inView && count === 0) {
    let start = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
  }

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Animated Price Display ─── */
export function AnimatedPrice({ value }: { value: number }) {
  const motionValue = useMotionValue(value);
  const spring = useSpring(motionValue, { stiffness: 100, damping: 20 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v: number) => {
      setDisplay(Math.round(v));
    });
    return unsubscribe;
  }, [spring]);

  return <>{display}</>;
}

/* ─── Scheduler Context ─── */
export const SchedulerContext = createContext<{ open: () => void }>({ open: () => {} });

export function useScheduler() {
  return useContext(SchedulerContext);
}

/* ─── Content Types ─── */
export interface ContentData {
  company: {
    name: string;
    logo_initial: string;
    logo_subtitle: string;
    city: string;
    address: string;
    postcode: string;
    phone: string;
    phone_raw: string;
    email: string;
    kvk: string;
    btw_id: string;
    whatsapp: string;
    description: string;
  };
  hero: {
    label: string;
    headline_before: string;
    headline_after: string;
    emphasis: string;
    subheadline: string;
    cta_primary: string;
    cta_secondary: string;
    image: string;
    image_alt: string;
    floating_card_label: string;
    floating_card_value: string;
    badges: Array<{ value: string; label: string }>;
  };
  trust: {
    label: string;
    google_score: string;
    google_count: string;
    certifications: string[];
    software: string[];
  };
  clients: Array<{ name: string; style: string }>;
  services: {
    label: string;
    headline_before: string;
    headline_emphasis: string;
    description: string;
    items: Array<{ title: string; description: string }>;
  };
  industries: Array<{ name: string; desc: string }>;
  about: {
    label: string;
    headline: string;
    paragraph: string;
    image: string;
    image_alt: string;
    years_experience: string;
    pillars: Array<{ title: string; text: string }>;
  };
  stats: Array<{ value: number; suffix: string; label: string; prefix?: string }>;
  case_study: {
    before_label: string;
    before_value: string;
    after_label: string;
    after_value: string;
    savings: string;
    savings_label: string;
    client: string;
    description: string;
  };
  team: {
    label: string;
    headline_before: string;
    headline_emphasis: string;
    description: string;
    members: Array<{
      name: string;
      role: string;
      credentials: string;
      bio: string;
      image: string;
      alt: string;
    }>;
  };
  testimonials: Array<{
    quote: string;
    author: string;
    title: string;
    image: string;
    alt: string;
  }>;
  process: {
    label: string;
    headline_before: string;
    headline_emphasis: string;
    steps: Array<{ step: string; title: string; description: string }>;
  };
  calculator: {
    business_types: Array<{ id: string; label: string; base: number }>;
  };
  pricing: {
    label: string;
    headline_before: string;
    headline_emphasis: string;
    description: string;
    plans: Array<{
      name: string;
      price: string;
      period: string;
      description: string;
      features: string[];
      highlight: boolean;
    }>;
  };
  integrations: string[];
  blog: {
    label: string;
    headline_before: string;
    headline_emphasis: string;
    posts: Array<{
      category: string;
      title: string;
      description: string;
      image: string;
      date: string;
    }>;
  };
  faqs: Array<{ question: string; answer: string }>;
  cta: {
    label: string;
    headline: string;
    description: string;
  };
  footer: {
    diensten: string[];
    bedrijf: Array<{ label: string; href: string }>;
  };
  sticky_cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  nav: {
    items: string[];
    cta: string;
  };
  client_logos: {
    label: string;
  };
  sections: {
    sectoren: string;
    sectoren_headline: string;
    klantverhalen: string;
    klantverhalen_headline_before: string;
    klantverhalen_headline_after: string;
    vraag_label: string;
    vraag_headline_before: string;
    vraag_headline_after: string;
    vraag_contact: string;
    prijscalculator_label: string;
    prijscalculator_headline: string;
    prijscalculator_description: string;
  };
  footer_ui: {
    copyright: string;
  };
  whatsapp: {
    message: string;
    tooltip: string;
  };
}
