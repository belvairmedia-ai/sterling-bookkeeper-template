// ============================================================
// Sterling Template — Content Type Definitions
// ============================================================
// ContentData mirrors the shape of src/data/content.json.
// ExtraSection is a discriminated union covering all supported
// dynamic section types. Add new variants here as the pipeline
// gains new component types.
// ============================================================

// ------------------------------------------------------------
// Shared primitives
// ------------------------------------------------------------

export type ExtraSectionPosition =
  | 'after_hero'
  | 'after_services'
  | 'after_about'
  | 'after_team'
  | 'after_pricing'
  | 'before_faq'
  | 'before_footer'
  | 'custom';

interface ExtraSectionBase {
  /** Unique identifier — also used as the HTML id attribute. */
  id: string;
  /** Maps to the component registry key (e.g. 'insurance-grid'). */
  type: string;
  /** Named slot where this section is injected into the page. */
  position: ExtraSectionPosition;
  /**
   * Sort order within the same position bucket.
   * Lower numbers render first. Defaults to 0.
   */
  order?: number;
}

// ------------------------------------------------------------
// Extra section variants
// ------------------------------------------------------------

export interface InsuranceGridSection extends ExtraSectionBase {
  type: 'insurance-grid';
  data: {
    label: string;
    providers: { name: string; logo?: string }[];
  };
}

export interface BeforeAfterGallerySection extends ExtraSectionBase {
  type: 'before-after-gallery';
  data: {
    label: string;
    headline: string;
    items: { before: string; after: string; caption: string }[];
  };
}

export interface DoctorCredentialsSection extends ExtraSectionBase {
  type: 'doctor-credentials';
  data: {
    label: string;
    headline: string;
    members: {
      name: string;
      title: string;
      credentials: string[];
      bio: string;
      image?: string;
      image_alt?: string;
    }[];
  };
}

export interface PatientFormsSection extends ExtraSectionBase {
  type: 'patient-forms';
  data: {
    label: string;
    headline: string;
    description?: string;
    forms: {
      name: string;
      description?: string;
      url: string;
      /** e.g. 'pdf', 'docx', 'online' */
      format?: string;
    }[];
  };
}

export interface VideoEmbedSection extends ExtraSectionBase {
  type: 'video-embed';
  data: {
    label?: string;
    headline: string;
    description?: string;
    /** YouTube, Vimeo, or direct MP4 URL */
    src: string;
    poster?: string;
    autoplay?: boolean;
  };
}

export interface AwardsSection extends ExtraSectionBase {
  type: 'awards';
  data: {
    label: string;
    headline?: string;
    items: {
      title: string;
      year?: string | number;
      issuer?: string;
      logo?: string;
    }[];
  };
}

export interface MapEmbedSection extends ExtraSectionBase {
  type: 'map-embed';
  data: {
    label?: string;
    headline?: string;
    /** Google Maps embed src or Mapbox tile URL */
    embed_url: string;
    /** Displayed alongside the map */
    address?: string;
    hours?: { day: string; hours: string }[];
  };
}

export interface PromoBannerSection extends ExtraSectionBase {
  type: 'promo-banner';
  data: {
    headline: string;
    description?: string;
    badge?: string;
    cta_label: string;
    cta_href: string;
    /** ISO date string — banner auto-hides after this date */
    expires?: string;
    background_color?: string;
  };
}

export interface TimelineSection extends ExtraSectionBase {
  type: 'timeline';
  data: {
    label: string;
    headline: string;
    events: {
      year: string | number;
      title: string;
      description?: string;
      image?: string;
    }[];
  };
}

export interface ComparisonTableSection extends ExtraSectionBase {
  type: 'comparison-table';
  data: {
    label?: string;
    headline: string;
    description?: string;
    columns: { key: string; label: string; highlight?: boolean }[];
    rows: {
      feature: string;
      /** key must match a column key; value is string | boolean */
      [key: string]: string | boolean;
    }[];
  };
}

export interface PhotoGallerySection extends ExtraSectionBase {
  type: 'photo-gallery';
  data: {
    label?: string;
    headline?: string;
    /** 'masonry' | 'grid' | 'carousel' */
    layout?: string;
    images: { src: string; alt: string; caption?: string }[];
  };
}

export interface CtaBannerSection extends ExtraSectionBase {
  type: 'cta-banner';
  data: {
    headline: string;
    description?: string;
    primary_label: string;
    primary_href: string;
    secondary_label?: string;
    secondary_href?: string;
    background_image?: string;
  };
}

export interface NewsletterSection extends ExtraSectionBase {
  type: 'newsletter';
  data: {
    label?: string;
    headline: string;
    description?: string;
    placeholder?: string;
    button_label?: string;
    /** Mailchimp, ConvertKit, or custom POST endpoint */
    form_action?: string;
    privacy_note?: string;
  };
}

export interface SocialProofSection extends ExtraSectionBase {
  type: 'social-proof';
  data: {
    label?: string;
    platforms: {
      name: string;
      score: string | number;
      count: string | number;
      url?: string;
      logo?: string;
    }[];
  };
}

export interface OpenJobsSection extends ExtraSectionBase {
  type: 'open-jobs';
  data: {
    label: string;
    headline: string;
    description?: string;
    jobs: {
      title: string;
      department?: string;
      location?: string;
      type?: string;
      url: string;
    }[];
    empty_state?: string;
  };
}

export interface LocationsSection extends ExtraSectionBase {
  type: 'locations';
  data: {
    label: string;
    headline?: string;
    locations: {
      name: string;
      address: string;
      city: string;
      phone?: string;
      email?: string;
      image?: string;
      embed_url?: string;
    }[];
  };
}

export interface SpecialtiesSection extends ExtraSectionBase {
  type: 'specialties';
  data: {
    label: string;
    headline: string;
    description?: string;
    items: {
      title: string;
      description: string;
      icon?: string;
      image?: string;
    }[];
  };
}

export interface QuoteCarouselSection extends ExtraSectionBase {
  type: 'quote-carousel';
  data: {
    label?: string;
    quotes: {
      text: string;
      author: string;
      role?: string;
      avatar?: string;
    }[];
    autoplay?: boolean;
    interval_ms?: number;
  };
}

export interface PartnerLogosSection extends ExtraSectionBase {
  type: 'partner-logos';
  data: {
    label: string;
    partners: { name: string; logo: string; url?: string }[];
    /** 'scroll' | 'grid' */
    layout?: string;
  };
}

export interface RichTextSection extends ExtraSectionBase {
  type: 'rich-text';
  data: {
    label?: string;
    /** Raw HTML or Markdown string */
    content: string;
    /** 'html' | 'markdown' — default 'html' */
    format?: string;
    max_width?: string;
  };
}

// ------------------------------------------------------------
// Master discriminated union
// ------------------------------------------------------------

export type ExtraSection =
  | InsuranceGridSection
  | BeforeAfterGallerySection
  | DoctorCredentialsSection
  | PatientFormsSection
  | VideoEmbedSection
  | AwardsSection
  | MapEmbedSection
  | PromoBannerSection
  | TimelineSection
  | ComparisonTableSection
  | PhotoGallerySection
  | CtaBannerSection
  | NewsletterSection
  | SocialProofSection
  | OpenJobsSection
  | LocationsSection
  | SpecialtiesSection
  | QuoteCarouselSection
  | PartnerLogosSection
  | RichTextSection;

/** All valid `type` strings derived from the union. */
export type ExtraSectionType = ExtraSection['type'];

// ------------------------------------------------------------
// ContentData — mirrors content.json root shape
// ------------------------------------------------------------

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
    badges: { value: string; label: string }[];
  };

  trust: {
    label: string;
    google_score: string;
    google_count: string;
    certifications: string[];
    software: string[];
  };

  clients: { name: string; style: string }[];

  services: {
    label: string;
    headline_before: string;
    headline_emphasis: string;
    description: string;
    items: { title: string; description: string }[];
  };

  industries: { name: string; desc: string }[];

  about: {
    label: string;
    headline: string;
    paragraph: string;
    image: string;
    image_alt: string;
    years_experience: string;
    pillars: { title: string; text: string }[];
  };

  stats: {
    value: number;
    suffix: string;
    label: string;
    prefix?: string;
  }[];

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
    members: {
      name: string;
      role: string;
      credentials: string;
      bio: string;
      image: string;
      alt: string;
    }[];
  };

  testimonials: {
    quote: string;
    author: string;
    title: string;
    image: string;
    alt: string;
  }[];

  process: {
    label: string;
    headline_before: string;
    headline_emphasis: string;
    steps: { step: string; title: string; description: string }[];
  };

  calculator: {
    business_types: { id: string; label: string; base: number }[];
  };

  pricing: {
    label: string;
    headline_before: string;
    headline_emphasis: string;
    description: string;
    plans: {
      name: string;
      price: string;
      period: string;
      description: string;
      features: string[];
      highlight: boolean;
    }[];
  };

  integrations: string[];
  integrations_label: string;

  blog: {
    label: string;
    headline_before: string;
    headline_emphasis: string;
    posts: {
      category: string;
      title: string;
      description: string;
      image: string;
      date: string;
    }[];
  };

  faqs: { question: string; answer: string }[];

  cta: {
    label: string;
    headline: string;
    description: string;
  };

  footer: {
    diensten: string[];
    bedrijf: { label: string; href: string }[];
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

  scheduler: {
    title: string;
    subtitle: string;
    step1: {
      title: string;
      subtitle: string;
      packages: {
        id: string;
        name: string;
        price: string;
        desc: string;
        popular?: boolean;
      }[];
      button: string;
    };
    step2: {
      title_date: string;
      title_time: string;
      button_back: string;
      button_next: string;
    };
    step3: {
      title: string;
      subtitle: string;
      fields: {
        naam: string;
        email: string;
        telefoon: string;
        bedrijf: string;
      };
      summary_title: string;
      summary_package: string;
      summary_date: string;
      summary_time: string;
      button_back: string;
      button_submit: string;
      privacy: string;
    };
    success: {
      title: string;
      message: string;
    };
  };

  whatsapp: {
    message: string;
    tooltip: string;
  };

  cookie: {
    message: string;
    privacy_link: string;
    necessary: string;
    analytics: string;
    marketing: string;
    accept: string;
    settings: string;
    save: string;
    reject: string;
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

  price_calc_ui: {
    bedrijfsvorm: string;
    facturen: string;
    personeel: string;
    ja: string;
    nee: string;
    hoeveel: string;
    extra_diensten: string;
    dienst_btw: string;
    dienst_jaarrekening: string;
    dienst_salaris: string;
    dienst_fiscaal: string;
    inbegrepen: string;
    indicatieprijs: string;
    per_maand: string;
    excl_btw: string;
    marktgemiddelde: string;
    u_bespaart: string;
    per_jaar: string;
    basispakket: string;
    factuurverwerking: string;
    personeel_label: string;
    jaarrekening: string;
    salarisadministratie: string;
    fiscaal_advies: string;
    offerte_button: string;
    disclaimer: string;
    advies: string;
  };

  pricing_ui: {
    populair: string;
    kies_pakket: string;
    offerte: string;
  };

  footer_ui: {
    contact: string;
    bedrijf: string;
    diensten: string;
    copyright: string;
    privacy: string;
    voorwaarden: string;
    sitemap: string;
  };

  /**
   * Dynamic sections injected by the generation pipeline.
   * Each entry is typed via the ExtraSection discriminated union.
   * An empty array means no extras — the base template renders as-is.
   */
  extra_sections: ExtraSection[];
}
