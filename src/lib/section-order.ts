/**
 * Section ordering for the Sterling page assembler.
 *
 * BASE_SECTIONS defines the canonical render order for all sections
 * that are always present on the page. Extra sections from content.json
 * are spliced in at the named position slots defined by ExtraSectionPosition.
 *
 * Naming conventions:
 *   - base section IDs match the component function names (kebab-case)
 *   - position slot names are "after_<sectionId>" or "before_<sectionId>"
 */

import type { ContentData, ExtraSection } from "@/types/content";

// ============================================================
// Descriptors
// ============================================================

/** A base section that is always rendered (fixed slot in page). */
export interface BaseSectionDescriptor {
  isBase: true;
  /** Matches a key in SECTION_REGISTRY */
  id: string;
}

/** A dynamically injected extra section from content.extra_sections. */
export interface ExtraSectionDescriptor {
  isBase: false;
  /** Unique ID — used as React key and HTML id attribute */
  id: string;
  /** Matches a key in EXTRA_SECTION_REGISTRY */
  type: string;
  /** Props forwarded to the component */
  data: Record<string, unknown>;
}

export type SectionDescriptor = BaseSectionDescriptor | ExtraSectionDescriptor;

// ============================================================
// Canonical section order
// ============================================================

/**
 * Full ordered list of every section ID in the page, including
 * fixed-position overlays (scroll-progress, sticky-cta, etc.).
 *
 * PageAssembler renders fixed-position sections independently;
 * they appear here so the list reflects the complete DOM structure
 * and so extra sections can be ordered relative to all base sections.
 *
 * Insertion points for extra sections are shown as comments.
 */
export const BASE_SECTIONS = [
  "scroll-progress",
  "sticky-cta",
  "navigation",
  "hero",
  // INSERTION POINT: after_hero
  "trust-bar",
  "client-logos",
  "services",
  // INSERTION POINT: after_services
  "industries",
  "about",
  // INSERTION POINT: after_about
  "stats",
  "case-study",
  "team",
  // INSERTION POINT: after_team
  "testimonials",
  "process",
  "price-calculator",
  "pricing",
  // INSERTION POINT: after_pricing
  "integrations",
  "blog-preview",
  // INSERTION POINT: before_faq (inserts before faq, i.e. after blog-preview)
  "faq",
  "cta",
  // INSERTION POINT: before_footer (inserts before footer, i.e. after cta)
  "footer",
  "cookie-banner",
  "whatsapp",
  "scheduler-modal",
] as const;

export type BaseSectionId = (typeof BASE_SECTIONS)[number];

// ============================================================
// Position → anchor mapping
// ============================================================

/**
 * Maps each ExtraSectionPosition to the base section ID that extras
 * are inserted AFTER (i.e. the last section before the named slot).
 *
 * 'custom' is excluded — those extras are appended after all base sections.
 */
const POSITION_AFTER_MAP: Record<string, BaseSectionId> = {
  after_hero:     "hero",
  after_services: "services",
  after_about:    "about",
  after_team:     "team",
  after_pricing:  "pricing",
  before_faq:     "blog-preview", // insert before faq → after blog-preview
  before_footer:  "cta",          // insert before footer → after cta
};

// ============================================================
// Core utilities
// ============================================================

/**
 * Builds the final ordered list of section descriptors by merging
 * base sections with the extra sections from content.extra_sections.
 *
 * Extra sections are grouped by their position slot. Within each slot
 * they are sorted by `order` (ascending, default 0). Sections with
 * position 'custom' are appended after all base sections, also sorted
 * by `order`.
 *
 * @example
 * ```tsx
 * const descriptors = buildSectionOrder(content);
 * return descriptors.map((desc) =>
 *   desc.isBase
 *     ? <BaseSection key={desc.id} id={desc.id} content={content} />
 *     : <ExtraSection key={desc.id} descriptor={desc} />
 * );
 * ```
 */
export function buildSectionOrder(content: ContentData): SectionDescriptor[] {
  const extras: ExtraSection[] = content.extra_sections ?? [];

  // Group extras by the anchor section they follow.
  const extrasByAnchor = new Map<string, ExtraSection[]>();
  const customExtras: ExtraSection[] = [];

  for (const extra of extras) {
    if (extra.position === "custom") {
      customExtras.push(extra);
      continue;
    }
    const anchor = POSITION_AFTER_MAP[extra.position];
    if (!anchor) continue; // unknown position — skip gracefully
    if (!extrasByAnchor.has(anchor)) extrasByAnchor.set(anchor, []);
    extrasByAnchor.get(anchor)!.push(extra);
  }

  // Sort each anchor bucket by `order` ascending.
  for (const [anchor, bucket] of extrasByAnchor.entries()) {
    extrasByAnchor.set(
      anchor,
      [...bucket].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    );
  }

  const result: SectionDescriptor[] = [];

  for (const sectionId of BASE_SECTIONS) {
    // Add the base section itself.
    result.push({ isBase: true, id: sectionId });

    // Append any extras anchored after this section.
    const following = extrasByAnchor.get(sectionId) ?? [];
    for (const extra of following) {
      result.push({
        isBase: false,
        id: extra.id,
        type: extra.type,
        // Cast: each union variant's `data` is a specific object — safe to
        // widen to Record<string, unknown> for uniform downstream handling.
        data: extra.data as Record<string, unknown>,
      });
    }
  }

  // Append 'custom' extras at the end, sorted by order.
  const sortedCustom = [...customExtras].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );
  for (const extra of sortedCustom) {
    result.push({
      isBase: false,
      id: extra.id,
      type: extra.type,
      data: extra.data as Record<string, unknown>,
    });
  }

  return result;
}

/**
 * Builds an O(1) lookup map from section ID → ExtraSection object.
 * Useful during rendering to retrieve full section data by ID without
 * iterating the extra_sections array.
 *
 * @example
 * ```ts
 * const map = buildExtraSectionMap(content.extra_sections);
 * const section = map.get('dental-insurance-grid');
 * if (section?.type === 'insurance-grid') { ... }
 * ```
 */
export function buildExtraSectionMap(
  extraSections: ExtraSection[],
): Map<string, ExtraSection> {
  return new Map(extraSections.map((s) => [s.id, s]));
}
