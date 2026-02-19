"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { SECTION_REGISTRY } from "@/components/sections/registry";
import { EXTRA_SECTION_REGISTRY } from "@/components/extras/registry";
import { buildSectionOrder } from "@/lib/section-order";
import { getPropsForSection } from "@/lib/props-mapper";
import type { ContentData } from "@/types/content";
import { CursorFollower } from "@/components/ui/cursor-follower";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

/* ─── Scheduler Modal Context ────────────────────────────────────
   Provides the `open()` trigger to every section without prop drilling.
   Sections that contain a CTA button simply call `useSchedulerModal().open()`.
   ────────────────────────────────────────────────────────────── */

interface SchedulerModalContextValue {
  open: () => void;
}

export const SchedulerModalContext = createContext<SchedulerModalContextValue>({
  open: () => {},
});

/** Hook for any section to open the scheduler modal. */
export function useSchedulerModal(): SchedulerModalContextValue {
  return useContext(SchedulerModalContext);
}

/* ─── PageAssembler ──────────────────────────────────────────────
   Composes all page sections from content.json at render time.

   Layout contract:
     1. Fixed overlays rendered first (z-index owns them):
        ScrollProgress, StickyCTA, Navigation
     2. Dynamic body — base sections + inserted extra sections in order
     3. Fixed overlays rendered last (z-index owns them):
        CookieBanner, WhatsApp FAB, SchedulerModal

   The SchedulerModalContext wraps everything so that any section's
   CTA button can open the modal without knowing about its parents.
   ────────────────────────────────────────────────────────────── */

export interface PageAssemblerProps {
  content: ContentData;
}

export function PageAssembler({ content }: PageAssemblerProps) {
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  const openScheduler = useCallback(() => setSchedulerOpen(true), []);
  const closeScheduler = useCallback(() => setSchedulerOpen(false), []);

  // Intercept all anchor clicks targeting #contact and open the scheduler
  // instead of scrolling. This mirrors the original page.tsx behaviour and
  // means no section component needs to know about the modal directly.
  useEffect(() => {
    function handleAnchorClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href='#contact']");
      if (anchor) {
        e.preventDefault();
        setSchedulerOpen(true);
      }
    }

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  // Build the merged, ordered list of sections for this render.
  const orderedSections = buildSectionOrder(content);

  // Resolve fixed-position section components.
  const ScrollProgress = SECTION_REGISTRY["scroll-progress"];
  const StickyCTA = SECTION_REGISTRY["sticky-cta"];
  const Navigation = SECTION_REGISTRY["navigation"];
  const CookieBanner = SECTION_REGISTRY["cookie-banner"];
  const WhatsApp = SECTION_REGISTRY["whatsapp"];
  const SchedulerModal = SECTION_REGISTRY["scheduler-modal"];

  return (
    <SchedulerModalContext.Provider value={{ open: openScheduler }}>
      {/* ── Premium animations (smooth scroll + cursor) ── */}
      <SmoothScroll />
      <CursorFollower />

      {/* ── Fixed top overlays (always rendered, z-index controlled) ── */}
      {ScrollProgress && <ScrollProgress />}
      {StickyCTA && (
        <StickyCTA {...getPropsForSection("sticky-cta", content)} />
      )}
      {Navigation && (
        <Navigation {...getPropsForSection("navigation", content)} />
      )}

      {/* ── Dynamic section body ─────────────────────────────────── */}
      {orderedSections.map((section) => {
        if (section.isBase) {
          const Component = SECTION_REGISTRY[section.id];

          if (!Component) {
            // Section is listed in BASE_SECTIONS but its component hasn't
            // been registered yet (another agent may still be building it).
            // Render nothing rather than crashing.
            return null;
          }

          const props = getPropsForSection(section.id, content);
          return <Component key={section.id} {...props} />;
        }

        // Extra section
        const Component = EXTRA_SECTION_REGISTRY[section.type];

        if (!Component) {
          // Unknown extra type — skip gracefully.
          if (process.env.NODE_ENV === "development") {
            console.warn(
              `[PageAssembler] No component registered for extra section type "${section.type}" (id: "${section.id}"). Skipping.`
            );
          }
          return null;
        }

        return <Component key={section.id} {...section.data} />;
      })}

      {/* ── Fixed bottom overlays ────────────────────────────────── */}
      {CookieBanner && (
        <CookieBanner {...getPropsForSection("cookie-banner", content)} />
      )}
      {WhatsApp && (
        <WhatsApp {...getPropsForSection("whatsapp", content)} />
      )}
      {SchedulerModal && (
        <SchedulerModal
          isOpen={schedulerOpen}
          onClose={closeScheduler}
          {...getPropsForSection("scheduler-modal", content)}
        />
      )}
    </SchedulerModalContext.Provider>
  );
}
