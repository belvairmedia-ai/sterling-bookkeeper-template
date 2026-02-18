import type { ComponentType } from "react";

// Healthcare / Medical
import { InsuranceGrid } from "./InsuranceGrid";
import { DoctorCredentials } from "./DoctorCredentials";
import { PatientForms } from "./PatientForms";

// Beauty / Salon
import { BeforeAfterGallery } from "./BeforeAfterGallery";
import { BookingWidget } from "./BookingWidget";
import { ProductShowcase } from "./ProductShowcase";

// Restaurant / Hospitality
import { MenuSection } from "./MenuSection";
import { ReservationCTA } from "./ReservationCTA";
import { EventsCalendar } from "./EventsCalendar";

// Trade / Construction
import { ProjectPortfolio } from "./ProjectPortfolio";
import { LicensesAndBonds } from "./LicensesAndBonds";
import { ServiceAreaMap } from "./ServiceAreaMap";

// Universal
import { AwardsAndBadges } from "./AwardsAndBadges";
import { VideoShowcase } from "./VideoShowcase";
import { GalleryMasonry } from "./GalleryMasonry";
import { OpeningHours } from "./OpeningHours";
import { SpecialOffers } from "./SpecialOffers";
import { DownloadResources } from "./DownloadResources";
import { SocialProofWall } from "./SocialProofWall";
import { AcceptedPayments } from "./AcceptedPayments";

/**
 * Registry mapping section IDs to their React components.
 * Use this in the Belvair pipeline to resolve extra sections by ID.
 *
 * Example usage:
 *   const Component = EXTRA_SECTION_REGISTRY['opening-hours'];
 *   if (Component) return <Component {...props} />;
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EXTRA_SECTION_REGISTRY: Record<string, ComponentType<any>> = {
  // Healthcare / Medical
  "insurance-grid": InsuranceGrid,
  "doctor-credentials": DoctorCredentials,
  "patient-forms": PatientForms,

  // Beauty / Salon
  "before-after-gallery": BeforeAfterGallery,
  "booking-widget": BookingWidget,
  "product-showcase": ProductShowcase,

  // Restaurant / Hospitality
  "menu-section": MenuSection,
  "reservation-cta": ReservationCTA,
  "events-calendar": EventsCalendar,

  // Trade / Construction
  "project-portfolio": ProjectPortfolio,
  "licenses-and-bonds": LicensesAndBonds,
  "service-area-map": ServiceAreaMap,

  // Universal
  "awards-and-badges": AwardsAndBadges,
  "video-showcase": VideoShowcase,
  "gallery-masonry": GalleryMasonry,
  "opening-hours": OpeningHours,
  "special-offers": SpecialOffers,
  "download-resources": DownloadResources,
  "social-proof-wall": SocialProofWall,
  "accepted-payments": AcceptedPayments,
} as const;

export type ExtraSectionId = keyof typeof EXTRA_SECTION_REGISTRY;

/** Returns true if the given string is a valid extra section ID */
export function isExtraSectionId(id: string): id is ExtraSectionId {
  return id in EXTRA_SECTION_REGISTRY;
}
