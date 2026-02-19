"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

/**
 * CursorFollower — A magnetic ball that smoothly follows the mouse.
 * Uses spring physics for natural-feeling lag.
 *
 * Renders only on desktop (hidden on touch devices via the `pointer-coarse`
 * media query so mobile visitors see the normal cursor).
 */
export function CursorFollower() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 120, damping: 18, mass: 0.6 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] hidden md:block"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Outer ring */}
      <div
        className="h-9 w-9 rounded-full border border-stone-400/50 opacity-60"
        style={{ mixBlendMode: "difference" }}
      />
      {/* Inner dot */}
      <div
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-900 opacity-80"
        style={{ mixBlendMode: "difference" }}
      />
    </motion.div>
  );
}
