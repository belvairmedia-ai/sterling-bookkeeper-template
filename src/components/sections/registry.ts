import { About } from "./about";
import { BlogPreview } from "./blog-preview";
import { CaseStudy } from "./case-study";
import { ClientLogos } from "./client-logos";
import { CookieBanner } from "./cookie-banner";
import { CTA } from "./cta";
import { FAQ } from "./faq";
import { Footer } from "./footer";
import { Hero } from "./hero";
import { Industries } from "./industries";
import { Integrations } from "./integrations";
import { Navigation } from "./navigation";
import { Pricing } from "./pricing";
import { PriceCalculator } from "./price-calculator";
import { Process } from "./process";
import { SchedulerModal } from "./scheduler-modal";
import { ScrollProgress } from "./scroll-progress";
import { Services } from "./services";
import { Stats } from "./stats";
import { StickyCTA } from "./sticky-cta";
import { Team } from "./team";
import { Testimonials } from "./testimonials";
import { TrustBar } from "./trust-bar";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const SECTION_REGISTRY: Record<string, React.ComponentType<any>> = {
  "scroll-progress": ScrollProgress,
  "sticky-cta": StickyCTA,
  navigation: Navigation,
  hero: Hero,
  "trust-bar": TrustBar,
  "client-logos": ClientLogos,
  services: Services,
  industries: Industries,
  about: About,
  stats: Stats,
  "case-study": CaseStudy,
  team: Team,
  testimonials: Testimonials,
  process: Process,
  "price-calculator": PriceCalculator,
  pricing: Pricing,
  integrations: Integrations,
  "blog-preview": BlogPreview,
  faq: FAQ,
  cta: CTA,
  footer: Footer,
  "cookie-banner": CookieBanner,
  "scheduler-modal": SchedulerModal,
};
