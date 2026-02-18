/**
 * Maps a base section ID to the correct slice of ContentData.
 *
 * Each case returns only the props the section component expects —
 * nothing more. This keeps section components decoupled from the full
 * content shape and makes the data contract explicit.
 *
 * Keep this file in sync with:
 *   - BASE_SECTIONS in @/lib/section-order
 *   - Section component prop interfaces in @/components/sections/*
 *   - ContentData in @/types/content
 */

import type { ContentData } from "@/types/content";

/**
 * Returns the props object to spread into a base section component.
 * Returns an empty object for unknown section IDs (graceful no-op).
 */
export function getPropsForSection(
  sectionId: string,
  content: ContentData
): Record<string, unknown> {
  switch (sectionId) {
    // ── Fixed-position (handled outside dynamic list) ────────────
    // These cases are included so callers can safely call getPropsForSection
    // for any section ID without risking an exception.

    case "scroll-progress":
      return {};

    case "sticky-cta":
      return { sticky_cta: content.sticky_cta };

    case "navigation":
      return {
        company: {
          name: content.company.name,
          logo_initial: content.company.logo_initial,
          logo_subtitle: content.company.logo_subtitle,
        },
        nav: content.nav,
      };

    // ── Orderable base sections ──────────────────────────────────

    case "hero":
      return {
        hero: content.hero,
      };

    case "trust-bar":
      return {
        trust: content.trust,
      };

    case "client-logos":
      return {
        clients: content.clients,
        client_logos: content.client_logos,
      };

    case "services":
      return {
        services: content.services,
      };

    case "industries":
      return {
        industries: content.industries,
        sections: content.sections,
      };

    case "about":
      return {
        about: content.about,
      };

    case "stats":
      return {
        stats: content.stats,
      };

    case "case-study":
      return {
        case_study: content.case_study,
      };

    case "team":
      return {
        team: content.team,
      };

    case "testimonials":
      return {
        testimonials: content.testimonials,
        sections: content.sections,
      };

    case "process":
      return {
        process: content.process,
      };

    case "price-calculator":
      return {
        calculator: content.calculator,
        sections: content.sections,
        price_calc_ui: content.price_calc_ui,
      };

    case "pricing":
      return {
        pricing: content.pricing,
        pricing_ui: content.pricing_ui,
      };

    case "integrations":
      return {
        integrations: content.integrations,
        integrations_label: content.integrations_label,
      };

    case "blog-preview":
      return {
        blog: content.blog,
      };

    case "faq":
      return {
        faqs: content.faqs,
        sections: content.sections,
        company: {
          email: content.company.email,
          phone: content.company.phone,
        },
      };

    case "cta":
      return {
        cta: content.cta,
        hero: {
          cta_primary: content.hero.cta_primary,
        },
        company: {
          phone: content.company.phone,
          phone_raw: content.company.phone_raw,
          email: content.company.email,
        },
      };

    case "footer":
      return {
        footer: content.footer,
        footer_ui: content.footer_ui,
        company: content.company,
      };

    // ── Always-on overlays (handled outside dynamic list) ────────

    case "cookie-banner":
      return { cookie: content.cookie };

    case "whatsapp":
      return {
        whatsapp: content.whatsapp,
        phone_raw: content.company.whatsapp,
      };

    case "scheduler-modal":
      return {
        scheduler: content.scheduler,
      };

    default:
      // Unknown section — return empty props so the caller can render a
      // fallback or simply skip. Never throw — this is a runtime concern.
      return {};
  }
}
