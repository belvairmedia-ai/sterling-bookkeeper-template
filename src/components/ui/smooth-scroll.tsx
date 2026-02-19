"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * SmoothScroll — Initialises Lenis for buttery smooth scrolling.
 * Add this once near the root of the page (e.g. inside PageAssembler).
 * It renders nothing — purely a side-effect component.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return null;
}
