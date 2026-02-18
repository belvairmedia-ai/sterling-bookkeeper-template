"use client";

import { InsuranceGrid } from "@/components/extras/InsuranceGrid";
import { DoctorCredentials } from "@/components/extras/DoctorCredentials";
import { PatientForms } from "@/components/extras/PatientForms";
import { BeforeAfterGallery } from "@/components/extras/BeforeAfterGallery";
import { BookingWidget } from "@/components/extras/BookingWidget";
import { ProductShowcase } from "@/components/extras/ProductShowcase";
import { MenuSection } from "@/components/extras/MenuSection";
import { ReservationCTA } from "@/components/extras/ReservationCTA";
import { EventsCalendar } from "@/components/extras/EventsCalendar";
import { ProjectPortfolio } from "@/components/extras/ProjectPortfolio";
import { LicensesAndBonds } from "@/components/extras/LicensesAndBonds";
import { ServiceAreaMap } from "@/components/extras/ServiceAreaMap";
import { AwardsAndBadges } from "@/components/extras/AwardsAndBadges";
import { VideoShowcase } from "@/components/extras/VideoShowcase";
import { GalleryMasonry } from "@/components/extras/GalleryMasonry";
import { OpeningHours } from "@/components/extras/OpeningHours";
import { SpecialOffers } from "@/components/extras/SpecialOffers";
import { DownloadResources } from "@/components/extras/DownloadResources";
import { SocialProofWall } from "@/components/extras/SocialProofWall";
import { AcceptedPayments } from "@/components/extras/AcceptedPayments";
// Bookkeeper / Accounting
import { TaxDeadlineCalendar } from "@/components/extras/TaxDeadlineCalendar";
import { ComplianceBadges } from "@/components/extras/ComplianceBadges";
import { AssociationMemberships } from "@/components/extras/AssociationMemberships";
import { SoftwarePartners } from "@/components/extras/SoftwarePartners";
import { ClientDashboardPreview } from "@/components/extras/ClientDashboardPreview";
import { FreeToolsSection } from "@/components/extras/FreeToolsSection";
import { ClientPortal } from "@/components/extras/ClientPortal";
import { NewsletterSignup } from "@/components/extras/NewsletterSignup";
import { ReferralProgram } from "@/components/extras/ReferralProgram";
import { ComparisonTable } from "@/components/extras/ComparisonTable";
import { SatisfactionGuarantee } from "@/components/extras/SatisfactionGuarantee";
import { ClientSuccessMetrics } from "@/components/extras/ClientSuccessMetrics";
import { ExpatServices } from "@/components/extras/ExpatServices";
import { EmergencySupport } from "@/components/extras/EmergencySupport";
import { PartnerNetwork } from "@/components/extras/PartnerNetwork";

/* ─────────────────────────────────────────────────────────────
   TOC entries — one per component
───────────────────────────────────────────────────────────── */
const sections = [
  { id: "insurance-grid",      label: "InsuranceGrid",      category: "Healthcare / Medical" },
  { id: "doctor-credentials",  label: "DoctorCredentials",  category: "Healthcare / Medical" },
  { id: "patient-forms",       label: "PatientForms",       category: "Healthcare / Medical" },
  { id: "before-after-gallery",label: "BeforeAfterGallery", category: "Beauty / Salon" },
  { id: "booking-widget",      label: "BookingWidget",      category: "Beauty / Salon" },
  { id: "product-showcase",    label: "ProductShowcase",    category: "Beauty / Salon" },
  { id: "menu-section",        label: "MenuSection",        category: "Restaurant / Hospitality" },
  { id: "reservation-cta",     label: "ReservationCTA",     category: "Restaurant / Hospitality" },
  { id: "events-calendar",     label: "EventsCalendar",     category: "Restaurant / Hospitality" },
  { id: "project-portfolio",   label: "ProjectPortfolio",   category: "Trade / Construction" },
  { id: "licenses-and-bonds",  label: "LicensesAndBonds",   category: "Trade / Construction" },
  { id: "service-area-map",    label: "ServiceAreaMap",     category: "Trade / Construction" },
  { id: "awards-and-badges",   label: "AwardsAndBadges",    category: "Universal" },
  { id: "video-showcase",      label: "VideoShowcase",      category: "Universal" },
  { id: "gallery-masonry",     label: "GalleryMasonry",     category: "Universal" },
  { id: "opening-hours",       label: "OpeningHours",       category: "Universal" },
  { id: "special-offers",      label: "SpecialOffers",      category: "Universal" },
  { id: "download-resources",  label: "DownloadResources",  category: "Universal" },
  { id: "social-proof-wall",   label: "SocialProofWall",    category: "Universal" },
  { id: "accepted-payments",        label: "AcceptedPayments",        category: "Universal" },
  // Bookkeeper / Boekhouder
  { id: "tax-deadline-calendar",    label: "TaxDeadlineCalendar",    category: "Bookkeeper / Boekhouder" },
  { id: "compliance-badges",        label: "ComplianceBadges",        category: "Bookkeeper / Boekhouder" },
  { id: "association-memberships",  label: "AssociationMemberships",  category: "Bookkeeper / Boekhouder" },
  { id: "software-partners",        label: "SoftwarePartners",        category: "Bookkeeper / Boekhouder" },
  { id: "client-dashboard-preview", label: "ClientDashboardPreview",  category: "Bookkeeper / Boekhouder" },
  { id: "free-tools-section",       label: "FreeToolsSection",        category: "Bookkeeper / Boekhouder" },
  { id: "client-portal",            label: "ClientPortal",            category: "Bookkeeper / Boekhouder" },
  { id: "newsletter-signup",        label: "NewsletterSignup",        category: "Bookkeeper / Boekhouder" },
  { id: "referral-program",         label: "ReferralProgram",         category: "Bookkeeper / Boekhouder" },
  { id: "comparison-table",         label: "ComparisonTable",         category: "Bookkeeper / Boekhouder" },
  { id: "satisfaction-guarantee",   label: "SatisfactionGuarantee",   category: "Bookkeeper / Boekhouder" },
  { id: "client-success-metrics",   label: "ClientSuccessMetrics",    category: "Bookkeeper / Boekhouder" },
  { id: "expat-services",           label: "ExpatServices",           category: "Bookkeeper / Boekhouder" },
  { id: "emergency-support",        label: "EmergencySupport",        category: "Bookkeeper / Boekhouder" },
  { id: "partner-network",          label: "PartnerNetwork",          category: "Bookkeeper / Boekhouder" },
] as const;

const categories = [...new Set(sections.map((s) => s.category))];

/* ─────────────────────────────────────────────────────────────
   Section divider shown between each component
───────────────────────────────────────────────────────────── */
function SectionDivider({ id, label }: { id: string; label: string }) {
  return (
    <div
      id={id}
      className="sticky top-0 z-20 flex items-center gap-4 bg-stone-900/95 backdrop-blur-sm border-b border-stone-700 px-6 py-3"
    >
      <span className="font-mono text-[11px] font-semibold text-accent tracking-[0.15em] uppercase">
        {id}
      </span>
      <div className="h-px flex-1 bg-stone-700" />
      <span className="font-sans text-[12px] text-stone-400 font-medium">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Sample data
───────────────────────────────────────────────────────────── */

// 1. InsuranceGrid
const insuranceGridProps = {
  label: "Geaccepteerde zorgverzekeraars",
  providers: [
    { name: "Zilveren Kruis" },
    { name: "CZ" },
    { name: "VGZ" },
    { name: "Menzis" },
    { name: "DSW" },
    { name: "ONVZ" },
    { name: "Zorg en Zekerheid" },
    { name: "Eno" },
    { name: "AEVITAE" },
    { name: "Anderzorg" },
  ],
};

// 2. DoctorCredentials
const doctorCredentialsProps = {
  label: "Ons team",
  headline: "Erkende zorgprofessionals met brede expertise",
  doctors: [
    {
      name: "Dr. Annemarie van der Berg",
      title: "Huisarts & Praktijkhouder",
      credentials: "BIG-reg. 19034567803",
      education: [
        "Geneeskunde, Universiteit Utrecht (2004)",
        "Huisartsopleiding LUMC (2007)",
        "Kaderarts Hart & Vaatziekten (2015)",
      ],
      specialties: ["Hart & Vaatziekten", "Diabetes", "Preventieve Zorg"],
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
      alt: "Dr. Annemarie van der Berg",
    },
    {
      name: "Drs. Pieter Kooijman",
      title: "Fysiotherapeut",
      credentials: "BIG-reg. 79023456701",
      education: [
        "Fysiotherapie, HAN Hogeschool (2010)",
        "Manuele Therapie, VU Amsterdam (2014)",
      ],
      specialties: ["Manuele Therapie", "Sportrevalidatie", "Rugklachten"],
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
      alt: "Drs. Pieter Kooijman",
    },
    {
      name: "Drs. Fatima El Ouali",
      title: "Psycholoog GZ",
      credentials: "BIG-reg. 39087654302",
      education: [
        "Klinische Psychologie, UvA (2012)",
        "Postmaster GZ-opleiding, AMC (2016)",
      ],
      specialties: ["Cognitieve Gedragstherapie", "Burn-out", "Angststoornissen"],
      image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=800&q=80",
      alt: "Drs. Fatima El Ouali",
    },
  ],
};

// 3. PatientForms
const patientFormsProps = {
  label: "Formulieren",
  headline: "Download uw formulieren vooraf",
  description:
    "Bespaar tijd bij uw eerste consult door de benodigde formulieren thuis in te vullen. Print ze uit of bewaar ze digitaal.",
  forms: [
    {
      title: "Nieuw patiënt inschrijfformulier",
      description: "Vul dit formulier in voor uw eerste bezoek aan onze praktijk.",
      url: "#",
      fileType: "PDF",
    },
    {
      title: "Medische voorgeschiedenis",
      description: "Geef een overzicht van uw huidige medicatie en aandoeningen.",
      url: "#",
      fileType: "PDF",
    },
    {
      title: "Toestemmingsverklaring behandeling",
      description: "Standaard toestemmingsverklaring voor medische behandelingen.",
      url: "#",
      fileType: "DOCX",
    },
    {
      title: "Klachtenformulier",
      description: "Heeft u een klacht? Gebruik dit formulier om deze bij ons in te dienen.",
      url: "#",
      fileType: "PDF",
    },
    {
      title: "Verwijsbrief aanvraagformulier",
      description: "Aanvraag voor doorverwijzing naar een specialist.",
      url: "#",
      fileType: "PDF",
    },
    {
      title: "Bloeddruk dagboek",
      description: "Bijhouden van uw bloeddrukmetingen over een periode van 7 dagen.",
      url: "#",
      fileType: "XLSX",
    },
  ],
};

// 4. BeforeAfterGallery
const beforeAfterGalleryProps = {
  label: "Resultaten",
  headline: "Zie het verschil zelf",
  items: [
    {
      before: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&q=80",
      after: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
      caption: "Kleur & highlights behandeling — resultaat na één sessie",
    },
    {
      before: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&q=80",
      after: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&q=80",
      caption: "Dieptebehandeling & keratine — glad en glanzend resultaat",
    },
    {
      before: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=800&q=80",
      after: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80",
      caption: "Coupe & styling — frisse look in minder dan een uur",
    },
    {
      before: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80",
      after: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80",
      caption: "Balayage techniek — natuurlijk doorschijnend zomereffect",
    },
  ],
};

// 5. BookingWidget
const bookingWidgetProps = {
  label: "Afspraak maken",
  headline: "Boek een financieel consult",
  description:
    "Kies een dienst en reserveer direct uw afspraak online. Onze boekhouders staan klaar voor ZZP'ers, MKB en BV's in heel Nederland.",
  bookingUrl: "https://calendly.com",
  services: [
    { name: "Kennismakingsgesprek",      duration: "30 minuten",  price: "Gratis" },
    { name: "Jaarrekening bespreking",   duration: "60 minuten",  price: "€ 95" },
    { name: "Belastingaangifte consult", duration: "45 minuten",  price: "€ 75" },
    { name: "Bedrijfsadvies sessie",     duration: "90 minuten",  price: "€ 145" },
  ],
};

// 6. ProductShowcase
const productShowcaseProps = {
  label: "Producten",
  headline: "Professionele haarverzorging",
  products: [
    {
      name: "Argan Oil Treatment",
      description: "Intensieve verzorgende behandeling met Marokkaanse arganolie voor droog haar.",
      price: "€ 29,95",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
      alt: "Argan Oil Treatment",
    },
    {
      name: "Keratine Shampoo",
      description: "Sulfaatvrije shampoo die beschadigd haar herstelt en gladmaakt.",
      price: "€ 22,50",
      image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&q=80",
      alt: "Keratine Shampoo",
    },
    {
      name: "Leave-in Conditioner",
      description: "Lichtgewicht spray voor dagelijkse bescherming en glans zonder plakkerigheid.",
      price: "€ 18,00",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
      alt: "Leave-in Conditioner",
    },
    {
      name: "Scalp Serum",
      description: "Stimuleert haargroei en verzorgt een droge, geïrriteerde hoofdhuid.",
      price: "€ 34,95",
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80",
      alt: "Scalp Serum",
    },
  ],
};

// 7. MenuSection
const menuSectionProps = {
  label: "Menukaart",
  headline: "Eerlijk, seizoensgebonden & smakelijk",
  categories: [
    {
      name: "Voorgerechten",
      items: [
        {
          name: "Hollandse garnalenkroket",
          description: "Krokant gebakken kroket gevuld met Noordzeegarnalen en verse kruiden.",
          price: "€ 8,50",
          tags: ["popular"],
        },
        {
          name: "Geitenkaas salade",
          description: "Verse gemengde salade met gegrilde geitenkaas, honing en walnoten.",
          price: "€ 9,00",
          tags: ["vegetarian"],
        },
        {
          name: "Zalmtartaar",
          description: "Fijngesneden Schotse zalm met kappertjes, rode ui en een lichte citrusvinaigrette.",
          price: "€ 11,50",
          tags: ["gluten-free"],
        },
        {
          name: "Soep van de dag",
          description: "Vraag naar onze dagelijks wisselende soep op basis van verse groenten.",
          price: "€ 6,50",
          tags: ["vegan", "new"],
        },
      ],
    },
    {
      name: "Hoofdgerechten",
      items: [
        {
          name: "Gegrilde zeebaars",
          description: "Mediterraan gekruide zeebaars met groene asperges en citroenboter.",
          price: "€ 24,50",
          tags: ["gluten-free"],
        },
        {
          name: "Ribeye 250g",
          description: "Drooggerijpte Nederlandse ribeye, geserveerd met friet en hussenaise.",
          price: "€ 31,00",
          tags: ["popular"],
        },
        {
          name: "Paddestoelenrisotto",
          description: "Romige risotto met porcini, truffelolie en Parmezaan.",
          price: "€ 19,50",
          tags: ["vegetarian"],
        },
        {
          name: "Lamscurry",
          description: "Langzaam gestoofd lamsvlees in een milde kokoscurry met naanbrood.",
          price: "€ 22,00",
          tags: ["spicy"],
        },
      ],
    },
    {
      name: "Desserts",
      items: [
        {
          name: "Dame Blanche",
          description: "Vanille-ijs met warme Belgische chocoladesaus en slagroom.",
          price: "€ 7,50",
          tags: ["popular"],
        },
        {
          name: "Stroopwafeltiramisu",
          description: "Nederlandse twist op de Italiaanse klassieker met Gouda-stroopwafels.",
          price: "€ 8,50",
          tags: ["new"],
        },
        {
          name: "Sorbet seizoensfruit",
          description: "Drie bolletjes huisgemaakte sorbet naar keuze.",
          price: "€ 6,00",
          tags: ["vegan", "gluten-free"],
        },
      ],
    },
  ],
};

// 8. ReservationCTA
const reservationCTAProps = {
  label: "Reserveren",
  headline: "Een tafel voor een bijzondere avond",
  description:
    "Reserveer eenvoudig online of bel ons voor persoonlijk advies over gezelschappen, speciale dieetwensen of feestelijke arrangementen.",
  reservationUrl: "https://www.opentable.com",
  phone: "070 123 45 67",
};

// 9. EventsCalendar
const eventsCalendarProps = {
  label: "Evenementen",
  headline: "Beleef bijzondere avonden bij ons",
  events: [
    {
      title: "Wijnproeverij Bourgogne",
      date: "2026-03-08",
      time: "19:00 – 22:00",
      description: "Geniet van zes Bourgondische wijnen begeleid door een verhaal van onze sommelier.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
    },
    {
      title: "Chef's Table Dinner",
      date: "2026-03-22",
      time: "18:30 – 23:00",
      description: "Exclusief vijfgangenmenu bereid door Chef de Vries, rechtstreeks aan tafel gepresenteerd.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    },
    {
      title: "Paasbrunch",
      date: "2026-04-05",
      time: "10:00 – 14:00",
      description: "Uitgebreid Paasontbijt en -brunch met live muziek en een hoek voor kinderen.",
      image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80",
    },
    {
      title: "Moederdag Diner",
      date: "2026-05-10",
      time: "17:00 – 22:00",
      description: "Verras uw moeder met een driegangenmenu en een welkomstglas bubbels.",
    },
    {
      title: "Jazz & Bites Avond",
      date: "2026-05-29",
      time: "20:00 – 00:00",
      description: "Live jazz van het Quartet van Leiden gecombineerd met kleine Spaanse hapjes.",
      image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80",
    },
    {
      title: "Truffelweekend",
      date: "2026-06-13",
      time: "18:00 – 22:30",
      description: "Speciaal weekend-menu volledig rondom de Périgord-truffel als hoofdster.",
    },
  ],
};

// 10. ProjectPortfolio
const projectPortfolioProps = {
  label: "Projecten",
  headline: "Van plan tot sleuteloverdracht",
  projects: [
    {
      title: "Verbouwing herenhuis Amsterdam-Zuid",
      description:
        "Volledige renovatie van een jaren-30 herenhuis inclusief badkamer, keuken en complete dakopbouw. Opgeleverd binnen planning en budget.",
      beforeImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      scope: "Totaalrenovatie",
      timeline: "14 weken",
      location: "Amsterdam",
    },
    {
      title: "Uitbouw achtertuin Rotterdam",
      description:
        "Aanbouw van een stijlvolle terrasoverkapping en extra woonruimte van 28 m² aan de achterzijde van een rijtjeshuis.",
      beforeImage: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      scope: "Aanbouw",
      timeline: "8 weken",
      location: "Rotterdam",
    },
    {
      title: "Badkamer renovatie Den Haag",
      description:
        "Luxe badkamer van 12 m² met inloopdouche, vrijstaand bad en vloerverwarming. Inclusief Italiaans tegelwerk.",
      beforeImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      scope: "Badkamer",
      timeline: "3 weken",
      location: "Den Haag",
    },
    {
      title: "Kantoorinrichting Leiden",
      description:
        "Transformatie van een leegstaand pakhuis naar een modern kantoor voor 40 werkplekken met flexibele indeling.",
      beforeImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
      scope: "Kantoorinrichting",
      timeline: "10 weken",
      location: "Leiden",
    },
  ],
};

// 11. LicensesAndBonds
const licensesAndBondsProps = {
  label: "Certificeringen & Registraties",
  headline: "Gecertificeerd, verzekerd en geregistreerd",
  items: [
    {
      type: "NBA Registeraccountant (RA)",
      number: "RA-2024-00812",
      issuer: "Nederlandse Beroepsorganisatie van Accountants",
      validThrough: "31 december 2026",
    },
    {
      type: "Register Belastingadviseur (RB)",
      number: "RB-NL-058234",
      issuer: "Register Belastingadviseurs",
      validThrough: "31 december 2026",
    },
    {
      type: "SRA-Erkend administratiekantoor",
      number: "SRA-AK-11487",
      issuer: "Samenwerkende Registeraccountants en Accountants-Administratieconsulenten",
      validThrough: "30 juni 2027",
    },
    {
      type: "Beroepsaansprakelijkheidsverzekering",
      number: "POL-2024-NL-004491",
      issuer: "Nationale-Nederlanden Zakelijk",
      validThrough: "1 januari 2027",
    },
    {
      type: "NOAB-lid",
      number: "NOAB-2023-7843",
      issuer: "Nederlandse Orde van Administratie- en Belastingdeskundigen",
      validThrough: "31 december 2025",
    },
    {
      type: "AVG Verwerkersovereenkomst (ISO 27001)",
      number: "ISO27001-NL-20892",
      issuer: "Bureau Veritas Nederland",
    },
  ],
};

// 12. ServiceAreaMap
const serviceAreaMapProps = {
  label: "Werkgebied",
  headline: "Wij werken door heel Nederland",
  description:
    "Onze boekhouders werken hoofdzakelijk vanuit Den Haag, maar bedienen klanten in de gehele Randstad en ver daarbuiten — zowel op kantoor als volledig digitaal.",
  areas: [
    "Den Haag",
    "Amsterdam",
    "Rotterdam",
    "Utrecht",
    "Leiden",
    "Delft",
    "Zoetermeer",
    "Rijswijk",
    "Wassenaar",
    "Voorburg",
    "Haarlem",
    "Alphen aan den Rijn",
    "Gouda",
    "Dordrecht",
    "Breda",
  ],
};

// 13. AwardsAndBadges
const awardsAndBadgesProps = {
  label: "Erkenningen",
  headline: "Bekroond vakmanschap",
  awards: [
    {
      name: "Best Accountant Firm",
      year: "2024",
      issuer: "FD Gazellen Ranking",
      description: "Snelst groeiend accountantskantoor in de regio Haaglanden.",
    },
    {
      name: "Klanttevredenheid 9,2",
      year: "2023",
      issuer: "Independer.nl",
      description: "Gebaseerd op 312 geverifieerde klantbeoordelingen.",
    },
    {
      name: "Erkend Leerbedrijf",
      year: "2022",
      issuer: "SBB — Stichting Beroepsonderwijs Bedrijfsleven",
      description: "Gecertificeerd als leerbedrijf voor mbo- en hbo-stagiairs.",
    },
    {
      name: "Duurzaamheidslint",
      year: "2023",
      issuer: "MVO Nederland",
      description: "Voor onze volledig CO₂-neutrale bedrijfsvoering en papierloos kantoor.",
    },
  ],
};

// 14. VideoShowcase
const videoShowcaseProps = {
  label: "Over ons",
  headline: "Bekijk hoe wij werken",
  description:
    "In twee minuten leggen wij uit hoe wij uw administratie overnemen, uw belastingdruk verlagen en u laten groeien — zonder zorgen.",
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  thumbnailImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
};

// 15. GalleryMasonry
const galleryMasonryProps = {
  label: "Galerij",
  headline: "Momenten die tellen",
  images: [
    { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", alt: "Modern kantoor", caption: "Ons kantoor in Den Haag" },
    { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80", alt: "Team overleg", caption: "Wekelijks klantoverleg" },
    { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80", alt: "Boekhoudwerk", caption: "Zorgvuldige administratie" },
    { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", alt: "Adviseur portret", caption: "Senior adviseur Jan de Vries" },
    { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80", alt: "Teamfoto", caption: "Het team van Sterling" },
    { src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80", alt: "Teamvergadering", caption: "Strategiesessie Q1 2025" },
    { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80", alt: "Presentatie", caption: "Jaarrekening presentatie" },
    { src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80", alt: "Developer op laptop", caption: "Digitale werkplek" },
    { src: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=800&q=80", alt: "Ontmoeting klant", caption: "Klantgesprek op locatie" },
  ],
};

// 16. OpeningHours
const openingHoursProps = {
  label: "Openingstijden",
  headline: "Wanneer kunt u ons bereiken?",
  note: "Buiten kantoortijden kunt u altijd een bericht achterlaten of een terugbelverzoek indienen via het contactformulier.",
  hours: [
    { day: "Monday",    open: "08:30", close: "17:30" },
    { day: "Tuesday",   open: "08:30", close: "17:30" },
    { day: "Wednesday", open: "08:30", close: "17:30" },
    { day: "Thursday",  open: "08:30", close: "20:00" },
    { day: "Friday",    open: "08:30", close: "16:00" },
    { day: "Saturday",  open: "09:00", close: "13:00" },
    { day: "Sunday",    open: "",      close: "", closed: true },
  ],
};

// 17. SpecialOffers
const specialOffersProps = {
  label: "Acties",
  headline: "Tijdelijke aanbiedingen voor nieuwe klanten",
  offers: [
    {
      title: "Gratis jaarrekening*",
      description:
        "Stap over voor 1 april en ontvang uw eerste jaarrekening volledig gratis. Geldig voor ZZP-pakket.",
      discount: "100%",
      validUntil: "2026-04-01T23:59:00",
      code: "WELKOM2026",
    },
    {
      title: "3 maanden 50% korting",
      description:
        "Nieuwe MKB-klanten profiteren de eerste drie maanden van halve prijs op ons Basis-pakket.",
      discount: "50%",
      validUntil: "2026-05-31T23:59:00",
      code: "MKB50",
    },
    {
      title: "Gratis salarisadministratie",
      description:
        "Sluit een jaarcontract af voor boekhouding en ontvang de salarisadministratie voor maximaal 3 personeelsleden gratis.",
      discount: "Gratis",
      code: "SALARIS0",
    },
  ],
};

// 18. DownloadResources
const downloadResourcesProps = {
  label: "Downloads",
  headline: "Handige documenten & sjablonen",
  resources: [
    {
      title: "Checklist jaarrekening ZZP",
      description: "Compleet overzicht van documenten die u nodig heeft voor uw jaaraangifte.",
      url: "#",
      fileType: "PDF",
      fileSize: "340 KB",
    },
    {
      title: "BTW-aangifte sjabloon 2026",
      description: "Ingevuld Excel-model voor kwartaalaangifte omzetbelasting.",
      url: "#",
      fileType: "XLSX",
      fileSize: "128 KB",
    },
    {
      title: "Kilometerregistratie formulier",
      description: "Officieel goedgekeurd rijdagboek voor belastingaftrek zakelijke kilometers.",
      url: "#",
      fileType: "DOCX",
      fileSize: "58 KB",
    },
    {
      title: "Oprichtingschecklist BV",
      description: "Stap-voor-stap gids voor het oprichten van een besloten vennootschap in Nederland.",
      url: "#",
      fileType: "PDF",
      fileSize: "412 KB",
    },
    {
      title: "Factuursjabloon NL (Twinfield-klaar)",
      description: "Professionele factuurtemplate conform Nederlandse BTW-wetgeving.",
      url: "#",
      fileType: "XLSX",
      fileSize: "94 KB",
    },
    {
      title: "Fiscal Quickscan 2026",
      description: "Ontdek uw fiscale kansen — invulhulp voor ondernemers die willen optimaliseren.",
      url: "#",
      fileType: "PDF",
      fileSize: "220 KB",
    },
  ],
};

// 19. SocialProofWall
const socialProofWallProps = {
  label: "Klantbeoordelingen",
  headline: "Wat onze klanten over ons zeggen",
  reviews: [
    {
      platform: "Google",
      author: "Martijn Verhoeven",
      rating: 5,
      text: "Sterling heeft onze BV-administratie volledig overgenomen. Eindelijk rust in mijn hoofd en meer tijd voor mijn bedrijf. Sterk aanbevolen!",
      date: "12 januari 2026",
    },
    {
      platform: "Google",
      author: "Sophie de Groot",
      rating: 5,
      text: "Als ZZP'er in de IT had ik altijd stress rondom belastingtijd. Nu regelt Sterling alles en word ik elk kwartaal proactief geïnformeerd.",
      date: "28 november 2025",
    },
    {
      platform: "Facebook",
      author: "Bram Jacobs",
      rating: 5,
      text: "Fantastisch team. Ze denken écht mee en zijn altijd bereikbaar. De overstap van ons oude kantoor was de beste beslissing van het jaar.",
      date: "4 oktober 2025",
    },
    {
      platform: "Google",
      author: "Laila Mouktar",
      rating: 4,
      text: "Snelle reacties, heldere uitleg en een prima prijs-kwaliteitverhouding. Het onboarding-proces was soepel en professioneel.",
      date: "19 september 2025",
    },
    {
      platform: "Yelp",
      author: "Rick van Dijk",
      rating: 5,
      text: "Ons horecabedrijf groeit hard en Sterling groeit gewoon mee. Ze begrijpen onze sector en geven echt strategisch advies.",
      date: "2 augustus 2025",
    },
    {
      platform: "Google",
      author: "Ilse Bakker",
      rating: 5,
      text: "Overstap was within een week geregeld. Duidelijk, transparant en betaalbaar. Zeker voor ZZP'ers een absolute aanrader.",
      date: "17 juli 2025",
    },
  ],
};

// 20. AcceptedPayments
const acceptedPaymentsProps = {
  label: "Wij accepteren",
  methods: ["Visa", "Mastercard", "iDEAL", "PayPal", "Apple Pay", "Google Pay", "Cash", "Check"],
};

// ── Bookkeeper / Boekhouder sample data ──────────────────────

// 21. TaxDeadlineCalendar
const taxDeadlineCalendarProps = {
  label: "Fiscale Kalender",
  headline: "Belastingdeadlines 2026 — mis nooit meer een datum",
  deadlines: [
    {
      title: "BTW-aangifte Q4 2025",
      date: "2026-01-31",
      description: "Laatste dag voor indiening kwartaalaangifte omzetbelasting Q4 2025 via de Belastingdienst.",
      category: "btw" as const,
    },
    {
      title: "Loonheffing aangifte januari",
      date: "2026-02-28",
      description: "Maandelijkse aangifte loonheffingen voor werkgevers. Tijdig betalen voorkomt boetes.",
      category: "loonheffing" as const,
    },
    {
      title: "BTW-aangifte Q1 2026",
      date: "2026-04-30",
      description: "Indiening en betaling van de BTW-aangifte over het eerste kwartaal van 2026.",
      category: "btw" as const,
    },
    {
      title: "Inkomstenbelasting aangifte 2025",
      date: "2026-05-01",
      description: "Deadline voor het indienen van de aangifte inkomstenbelasting over belastingjaar 2025.",
      category: "ib" as const,
    },
    {
      title: "Vennootschapsbelasting aangifte 2025",
      date: "2026-06-01",
      description: "Aangifte vennootschapsbelasting voor BV's en NV's over het boekjaar 2025.",
      category: "vpb" as const,
    },
    {
      title: "Publicatie jaarrekening bij KvK",
      date: "2026-07-31",
      description: "Deponering van de jaarrekening 2025 bij de Kamer van Koophandel. Verplicht voor rechtspersonen.",
      category: "jaarrekening" as const,
    },
    {
      title: "BTW-aangifte Q2 2026",
      date: "2026-07-31",
      description: "Indiening en betaling van de BTW-aangifte over het tweede kwartaal van 2026.",
      category: "btw" as const,
    },
    {
      title: "BTW-aangifte Q3 2026",
      date: "2026-10-31",
      description: "Indiening en betaling van de BTW-aangifte over het derde kwartaal van 2026.",
      category: "btw" as const,
    },
    {
      title: "Voorlopige aangifte IB 2026",
      date: "2026-12-01",
      description: "Aanpassen of indienen van de voorlopige aanslag inkomstenbelasting voor belastingjaar 2026.",
      category: "ib" as const,
    },
  ],
};

// 22. ComplianceBadges
const complianceBadgesProps = {
  label: "Compliance & Certificering",
  headline: "Uw gegevens zijn bij ons in veilige handen",
  description: "Wij voldoen aan alle geldende Nederlandse en Europese wet- en regelgeving en worden periodiek getoetst door onafhankelijke instanties.",
  badges: [
    {
      name: "AVG / GDPR Compliant",
      description: "Wij verwerken persoonsgegevens conform de Algemene Verordening Gegevensbescherming (AVG). U heeft altijd inzage in en controle over uw eigen data.",
      category: "privacy" as const,
    },
    {
      name: "Wwft-plichtig kantoor",
      description: "Als administratiekantoor vallen wij onder de Wet ter voorkoming van witwassen en financieren van terrorisme. Wij voeren verplichte cliëntonderzoeken uit.",
      category: "financial" as const,
    },
    {
      name: "ISO 27001 Gecertificeerd",
      description: "Onze informatiebeveiliging is gecertificeerd conform ISO 27001. Uw financiële data wordt opgeslagen in beveiligde, Nederlandse datacenters.",
      category: "security" as const,
    },
    {
      name: "BIT-getoetste cloudopslag",
      description: "Wij maken gebruik van BIT-getoetste cloudinfrastructuur — de Nederlandse keurmerkstandaard voor betrouwbare hostingdiensten.",
      category: "quality" as const,
    },
    {
      name: "Permanente Educatie (PE)",
      description: "Al onze adviseurs volgen jaarlijks verplichte permanente educatie. Zo blijven wij altijd op de hoogte van de laatste fiscale wet- en regelgeving.",
      category: "quality" as const,
    },
    {
      name: "Beroepsaansprakelijkheidsverzekering",
      description: "Wij zijn volledig verzekerd voor beroepsaansprakelijkheid. U bent beschermd als er een fout wordt gemaakt in uw administratie of aangifte.",
      category: "financial" as const,
    },
  ],
};

// 23. AssociationMemberships
const associationMembershipsProps = {
  label: "Aangesloten Bij",
  headline: "Erkend lid van de toonaangevende beroepsorganisaties",
  description: "Onze lidmaatschappen zijn meer dan een logo op een website — ze staan voor aantoonbare kwaliteit, onafhankelijk toezicht en verplichte kwaliteitsnormen.",
  associations: [
    {
      name: "NOAB",
      fullName: "Nederlandse Orde van Administratie- en Belastingdeskundigen",
      description: "Als NOAB-lid werkt u met een kantoor dat voldoet aan strenge kwaliteitseisen. NOAB-leden worden periodiek getoetst op vakbekwaamheid en integriteit.",
      benefits: [
        "Onafhankelijk kwaliteitstoezicht",
        "Verplichte permanente educatie (40 uur/jaar)",
        "Klachtenregeling voor u als klant",
        "Beroepsaansprakelijkheidsverzekering verplicht",
        "Gedragscode en integriteitsnormen",
        "Netwerk van 3.000+ gecertificeerde kantoren",
      ],
      url: "https://www.noab.nl",
    },
    {
      name: "SRA",
      fullName: "Samenwerkende Registeraccountants en Accountants-Administratieconsulenten",
      description: "Het SRA-keurmerk staat voor transparantie, eerlijkheid en betrouwbaarheid. SRA-kantoren worden tweejaarlijks extern getoetst op kwaliteit en onafhankelijkheid.",
      benefits: [
        "Tweejaarlijkse externe kwaliteitstoets",
        "Vaste prijzen en heldere afspraken",
        "Erkend voor samenstellingsopdrachten",
        "Netwerk voor overleg en kennisdeling",
        "Toegang tot SRA-klachtencommissie",
      ],
      url: "https://www.sra.nl",
    },
    {
      name: "RB",
      fullName: "Register Belastingadviseurs",
      description: "Register Belastingadviseurs is de beroepsorganisatie voor fiscale adviseurs in Nederland. Het RB-lidmaatschap garandeert gespecialiseerde fiscale kennis op het hoogste niveau.",
      benefits: [
        "Specialisme in Nederlandse belastingwetgeving",
        "Verplichte nascholing fiscaal recht",
        "Rechtsbescherming voor belastingadvies",
        "Fiscale second opinion mogelijk",
      ],
      url: "https://www.rb.nl",
    },
  ],
};

// 24. SoftwarePartners
const softwarePartnersProps = {
  label: "Software & Koppelingen",
  headline: "Wij werken met de beste boekhoudpakketten",
  description: "Of u nu al gebruik maakt van een boekhoudpakket of nog kiest — wij zijn gecertificeerd partner van de belangrijkste aanbieders en begeleiden desgewenst uw overstap.",
  partners: [
    {
      name: "Exact Online",
      description: "Exact Online is het meest gebruikte boekhoudpakket voor het Nederlandse MKB. Realtime inzicht, automatische bankkoppelingen en directe samenwerking met uw boekhouder.",
      features: [
        "Directe koppeling met ABN AMRO, Rabobank & ING",
        "Automatische factuurherkenning (OCR)",
        "Realtime rapporten en dashboards",
        "Salarismodule voor loonheffingen",
      ],
      migrationSupport: true,
      certified: true,
      url: "https://www.exact.com/nl",
    },
    {
      name: "Twinfield",
      description: "Twinfield is de keuze voor internationale ondernemers en groeiende bedrijven. Multi-valuta, multi-entiteit en volledig in de cloud — ideaal voor BV-structuren.",
      features: [
        "Multi-valuta & multi-entiteit",
        "XBRL-rapportage voor deponering",
        "Geavanceerde consolidatie",
        "Internationale BTW-ondersteuning",
      ],
      migrationSupport: true,
      certified: true,
      url: "https://www.twinfield.nl",
    },
    {
      name: "Yuki",
      description: "Yuki automatiseert uw volledige administratie via slimme AI. Bankafschriften, facturen en bonnetjes worden automatisch verwerkt — u hoeft alleen te accorderen.",
      features: [
        "AI-gedreven factuurverwerking",
        "WhatsApp-bonnetjes insturen",
        "Automatische BTW-voorbereiding",
        "Overzichtelijk klantportaal",
      ],
      migrationSupport: true,
      certified: false,
      url: "https://www.yuki.nl",
    },
    {
      name: "Visma eAccounting",
      description: "Visma eAccounting is de gebruiksvriendelijkste keuze voor ZZP'ers en kleine ondernemers. Eenvoudig, betaalbaar en volledig geïntegreerd met de Belastingdienst.",
      features: [
        "Directe koppeling Belastingdienst",
        "Simpele factuurmodule",
        "Bankimport in één klik",
        "Ideaal voor ZZP en kleine MKB",
      ],
      migrationSupport: true,
      certified: false,
      url: "https://www.visma.nl",
    },
  ],
};

// 25. ClientDashboardPreview
const clientDashboardPreviewProps = {
  label: "Uw Dashboard",
  headline: "Alles overzichtelijk op één plek",
  description: "Via het Mijn Sterling portaal heeft u 24/7 toegang tot uw financiën, documenten en aangiften. Transparant, veilig en altijd up-to-date.",
  screenshot: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  screenshotAlt: "Screenshot van het Sterling klantdashboard",
  features: [
    {
      title: "Realtime overzicht",
      description: "Bekijk uw winst, omzet en liquiditeit live — bijgewerkt zodra uw boekhouder een boeking verwerkt.",
    },
    {
      title: "Facturen & bonnetjes",
      description: "Upload bonnetjes via mobiel, bekijk uitgaande facturen en volg openstaande bedragen.",
    },
    {
      title: "BTW-overzicht",
      description: "Automatisch overzicht van uw BTW-positie per kwartaal, inclusief te betalen of te ontvangen bedrag.",
    },
    {
      title: "Beveiligde documenten",
      description: "Jaarrekeningen, aangiften en correspondentie veilig opgeslagen in uw persoonlijk archief.",
    },
  ],
};

// 26. FreeToolsSection
const freeToolsSectionProps = {
  label: "Gratis Tools",
  headline: "Handige calculators voor ondernemers",
  description: "Gebruik onze gratis online tools om snel fiscale berekeningen te maken — zonder dat u eerst klant hoeft te worden.",
  tools: [
    {
      name: "BTW Calculator",
      description: "Bereken snel het BTW-bedrag en het ex- of inclusief BTW-totaal. Geschikt voor 9% en 21% tarieven.",
      category: "calculator" as const,
      url: "#btw-calculator",
    },
    {
      name: "Loonkosten Calculator",
      description: "Wat kost een medewerker u echt per maand? Inclusief werkgeverslasten, vakantiegeld en verzuimkosten.",
      category: "calculator" as const,
      url: "#loonkosten-calculator",
    },
    {
      name: "BV vs ZZP Check",
      description: "Wanneer is een BV voordeliger dan ZZP? Vul uw jaarwinst in en zie direct het omslagpunt.",
      category: "checker" as const,
      url: "#bv-zzp-check",
    },
    {
      name: "KvK Nummers Checker",
      description: "Controleer snel of een KvK-nummer geldig is en bekijk de basisgegevens van een onderneming.",
      category: "checker" as const,
      url: "#kvk-checker",
    },
    {
      name: "Factuursjabloon 2026",
      description: "Download een gratis factuursjabloon conform de Nederlandse BTW-wetgeving, klaar voor gebruik in Excel.",
      category: "template" as const,
      url: "#factuursjabloon",
    },
    {
      name: "Belastinggids ZZP 2026",
      description: "Alles wat u als ZZP'er moet weten over belasting, aftrekposten en de MKB-winstvrijstelling.",
      category: "guide" as const,
      url: "#belastinggids-zzp",
    },
  ],
};

// 27. ClientPortal
const clientPortalProps = {
  label: "Mijn Omgeving",
  headline: "Uw persoonlijk klantportaal",
  description: "Via Mijn Sterling heeft u te allen tijde inzage in uw administratie, documenten en aangiften. Veilig inloggen via Exact Online of uw persoonlijke toegangscode.",
  portalUrl: "https://start.exactonline.nl",
  portalName: "Mijn Sterling",
  features: [
    "Realtime winst- en verliesoverzicht",
    "Openstaande debiteuren en crediteuren",
    "Alle BTW-aangiften en betalingsbewijzen",
    "Jaarrekeningen en accountantsverklaringen",
    "Ingediende IB- en VPB-aangiften",
    "Salarisstroken en loonheffingsoverzicht",
    "Veilig documenten uitwisselen met uw boekhouder",
    "Berichtenfunctie direct naar uw adviseur",
  ],
  supportPhone: "070 123 45 67",
  supportEmail: "portaal@sterlingaccounting.nl",
};

// 28. NewsletterSignup
const newsletterSignupProps = {
  label: "Fiscale Nieuwsbrief",
  headline: "Maandelijkse fiscale tips in uw inbox",
  description: "Ontvang elke maand een overzicht van relevante belastingwijzigingen, aftrekposten en financieel nieuws — speciaal voor Nederlandse ondernemers.",
  placeholder: "uw@emailadres.nl",
  buttonText: "Aanmelden",
  frequency: "Maandelijks",
  topics: ["BTW-wijzigingen", "IB aftrekposten", "MKB-tips", "ZZP-nieuws", "Prinsjesdag update"],
  privacyText: "Geen spam. Uitschrijven kan altijd via de link in de e-mail. Privacybeleid van toepassing.",
};

// 29. ReferralProgram
const referralProgramProps = {
  label: "Doorverwijsprogramma",
  headline: "Verwijs een ondernemer, ontvang €100 korting",
  description: "Kent u een ondernemer die baat heeft bij professionele boekhouding? Verwijs ze door naar Sterling en ontvang €100 korting op uw volgende factuur — voor altijd, per succesvolle verwijzing.",
  reward: "€ 100",
  rewardDescription: "korting op uw volgende factuur",
  steps: [
    {
      step: "01",
      title: "Verwijs een ondernemer",
      description: "Stuur ons de naam en het e-mailadres van de ondernemer die u doorverwijst via het contactformulier of WhatsApp.",
    },
    {
      step: "02",
      title: "Zij worden klant",
      description: "Zodra de doorverwezen ondernemer een overeenkomst tekent, bevestigen wij dit schriftelijk aan u beiden.",
    },
    {
      step: "03",
      title: "U ontvangt €100 korting",
      description: "De korting wordt verrekend op uw eerstvolgende factuur. Geen maximum — elke verwijzing levert op.",
    },
  ],
  ctaText: "Verwijs nu door",
  ctaUrl: "#contact",
  terms: "* Geldig voor nieuwe klanten die een lopend pakket afsluiten. Korting wordt verrekend op de factuur na activering van het nieuwe klantcontract.",
};

// 30. ComparisonTable
const comparisonTableProps = {
  label: "Vergelijk",
  headline: "Sterling vs. alternatieven",
  description: "Objectieve vergelijking van wat u krijgt bij Sterling ten opzichte van een gemiddeld accountantskantoor of zelf doen.",
  columns: [
    { name: "Sterling Accounting", highlighted: true },
    { name: "Gemiddeld kantoor" },
    { name: "Zelf doen" },
  ],
  rows: [
    {
      feature: "Vaste maandprijs (geen verrassingen)",
      values: [true, false, true],
    },
    {
      feature: "Reactie binnen 1 werkdag",
      values: [true, false, false],
    },
    {
      feature: "Dedicated accountmanager",
      values: [true, false, false],
    },
    {
      feature: "Proactief fiscaal advies",
      values: [true, false, false],
    },
    {
      feature: "Online klantportaal 24/7",
      values: [true, "Soms", false],
    },
    {
      feature: "Overstapbegeleiding inbegrepen",
      values: [true, false, false],
    },
  ],
  footnote: "* Vergelijking gebaseerd op marktonderzoek onder 50 Nederlandse accountantskantoren (2025).",
};

// 31. SatisfactionGuarantee
const satisfactionGuaranteeProps = {
  label: "Onze Garanties",
  headline: "Tevreden of uw geld terug",
  description: "Wij staan 100% achter onze dienstverlening. Daarom bieden wij drie concrete garanties die nergens anders in de branche worden gegeven.",
  badgeText: "100% Tevredenheidsgarantie",
  guarantees: [
    {
      title: "Overstapgarantie",
      description: "Stapt u over van een ander kantoor? Wij regelen de volledige overdracht van uw administratie kosteloos en zorgen voor een naadloze overgang — inclusief contact met uw vorige adviseur.",
    },
    {
      title: "Vaste prijs garantie",
      description: "Uw maandprijs staat vast voor minimaal 12 maanden. Geen verborgen kosten, geen nacalculaties. Meerwerk wordt altijd vooraf afgestemd en schriftelijk bevestigd.",
    },
    {
      title: "Reactietijd garantie",
      description: "Uw vragen worden binnen één werkdag beantwoord. Lukt dat niet? Dan ontvangt u de volgende maand 10% korting op uw factuur — automatisch, zonder dat u erom hoeft te vragen.",
    },
  ],
};

// 32. ClientSuccessMetrics
const clientSuccessMetricsProps = {
  label: "Onze Resultaten",
  headline: "Cijfers die voor zich spreken",
  description: "Transparantie is onze kernwaarde. Hier zijn de werkelijke resultaten die wij voor onze klanten realiseren.",
  period: "Peildatum januari 2026",
  metrics: [
    {
      value: "€ 2,4M",
      label: "Belasting bespaard",
      description: "Totaal aan belastingbesparing gerealiseerd voor onze klanten in 2025 via legale optimalisatie.",
      trend: "up" as const,
      trendValue: "+18% t.o.v. 2024",
    },
    {
      value: "1.200+",
      label: "Aangiften ingediend",
      description: "Inkomstenbelasting-, BTW- en VPB-aangiften verwerkt in het afgelopen jaar. 0 boetes opgelopen.",
      trend: "up" as const,
      trendValue: "+220 t.o.v. vorig jaar",
    },
    {
      value: "98%",
      label: "Klanttevredenheid",
      description: "Gemiddelde score op basis van 412 geverifieerde klantbeoordelingen op Google en Independer.",
      trend: "stable" as const,
      trendValue: "Stabiel",
    },
    {
      value: "15+",
      label: "Jaar ervaring",
      description: "Opgericht in 2009, gespecialiseerd in ZZP, MKB en expatriates in heel Nederland.",
      trend: "stable" as const,
    },
  ],
};

// 33. ExpatServices
const expatServicesProps = {
  label: "Expat Services",
  headline: "Your Dutch Tax Partner — in English",
  description: "We specialize in helping international professionals navigate the Dutch tax system. From 30% ruling applications to annual returns, we handle everything in your language — with no Dutch required.",
  languages: ["English", "Nederlands", "Deutsch"],
  services: [
    {
      title: "30% Ruling Application",
      description: "We apply for the 30% tax ruling on your behalf, maximizing your net salary as an expat. We handle the full application with your employer and the Belastingdienst.",
      icon: "🎯",
    },
    {
      title: "Annual Income Tax Return (IB)",
      description: "We prepare and file your Dutch income tax return (aangifte inkomstenbelasting), including M-form for your first or final year in the Netherlands.",
      icon: "📋",
    },
    {
      title: "International Structures",
      description: "Operating across borders? We advise on tax-efficient structures for entrepreneurs with activities in multiple EU countries, including transfer pricing basics.",
      icon: "🌍",
    },
    {
      title: "Social Security Advice",
      description: "We advise on your A1 certificate, DigiD setup and AOW pension entitlements as a foreign national working in the Netherlands.",
      icon: "🛡️",
    },
    {
      title: "Dutch Company Formation",
      description: "We guide you through setting up a BV (private limited company) or eenmanszaak (sole trader) in the Netherlands — including KvK registration and VAT number.",
      icon: "🏢",
    },
    {
      title: "Expat Relocation Tax Check",
      description: "Moving to or from the Netherlands? We perform a tax position check for your move year to minimize tax liabilities on both sides of the border.",
      icon: "✈️",
    },
  ],
  ctaText: "Book a Free English-Language Consultation",
  ctaUrl: "#contact",
};

// 34. EmergencySupport
const emergencySupportProps = {
  label: "Spoedhulp",
  headline: "Dringende belastinghulp nodig?",
  description: "Een boekenonderzoek, onverwachte naheffing of bedrijf in financiële nood? Wij reageren binnen twee uur — ook buiten kantooruren.",
  phone: "070 911 22 33",
  phoneRaw: "+31709112233",
  availability: "Ma–vr 07:00–22:00 | Za 09:00–17:00",
  responseTime: "Binnen 2 uur reactie gegarandeerd",
  situations: [
    {
      title: "Boekenonderzoek door Belastingdienst",
      description: "De Belastingdienst kondigt een controle aan. Wij bereiden u voor, begeleiden het onderzoek en treden op als uw vertegenwoordiger.",
      urgency: "critical" as const,
    },
    {
      title: "Naheffingsaanslag ontvangen",
      description: "U heeft een naheffing of boete ontvangen. Wij beoordelen de aanslag, bezwaar is soms nog mogelijk binnen 6 weken.",
      urgency: "critical" as const,
    },
    {
      title: "Bedreiging faillissement",
      description: "Liquiditeitsproblemen of een WHOA-traject? Wij helpen met een urgente financiële analyse en adviseren over herstructurering.",
      urgency: "high" as const,
    },
    {
      title: "Gemiste BTW-aangifte deadline",
      description: "De deadline is verstreken. Wij dienen alsnog zo snel mogelijk in om boetes te minimaliseren en nemen contact op met de Belastingdienst.",
      urgency: "high" as const,
    },
    {
      title: "Beslag op bankrekening",
      description: "Deurwaarder of Belastingdienst heeft beslag gelegd op uw rekening. Wij adviseren over spoedbetalingen en het opheffen van het beslag.",
      urgency: "critical" as const,
    },
    {
      title: "Jaarrekening deadline gemist",
      description: "U heeft de KvK-publicatiedatum overschreden. Wij dienen zo snel mogelijk in en beperken de risico's van bestuurdersaansprakelijkheid.",
      urgency: "medium" as const,
    },
  ],
};

// 35. PartnerNetwork
const partnerNetworkProps = {
  label: "Ons Netwerk",
  headline: "Betrouwbare partners voor elk vraagstuk",
  description: "Goede boekhouding raakt aan veel disciplines. Via ons netwerk van gecertificeerde partners verbinden wij u met de juiste specialist — persoonlijk doorverwezen, nooit anoniem.",
  partners: [
    {
      type: "Notariaat",
      name: "Notariskantoor Van der Berg & Partners",
      description: "Gespecialiseerd in bedrijfsoverdrachten, oprichting van BV's, testamenten en vastgoedtransacties voor ondernemers.",
      specialties: ["BV-oprichting", "Bedrijfsoverdracht", "Vastgoed", "Testament"],
    },
    {
      type: "Juridisch Advies",
      name: "Advocatenkantoor Dijkstra Recht",
      description: "Juridische bijstand voor ondernemers bij arbeidsconflicten, contracten, aandeelhoudersgeschillen en incasso.",
      specialties: ["Arbeidsrecht", "Contractrecht", "Aandeelhoudersrecht", "Incasso"],
    },
    {
      type: "Hypotheek & Financiering",
      name: "Helder Hypotheken",
      description: "Onafhankelijk hypotheekadvies voor ZZP'ers en ondernemers. Specialist in het aantonen van inkomen bij banken en hypotheekverstrekkers.",
      specialties: ["ZZP-hypotheek", "Bedrijfspand", "Overwaarde benutten", "Herfinanciering"],
    },
    {
      type: "Verzekeringen",
      name: "Ondernemers Verzekerd B.V.",
      description: "Zakelijke verzekeringsadviseur voor AOV (arbeidsongeschiktheid), bedrijfsaansprakelijkheid en rechtsbijstand voor MKB.",
      specialties: ["AOV", "Aansprakelijkheid", "Rechtsbijstand", "Pensioenbeheer"],
    },
    {
      type: "HR & Salaris",
      name: "PeopleFirst HR Solutions",
      description: "HR-advies en payrolling voor groeiende bedrijven. Van arbeidsovereenkomsten tot verzuimbegeleiding en ontslag.",
      specialties: ["Payrolling", "Arbeidsrecht", "Verzuim", "Werving & Selectie"],
    },
    {
      type: "Pensioen & Vermogen",
      name: "Solide Vermogensbeheer",
      description: "Pensioenadvies voor ondernemers zonder werkgeverspensioenfonds. Opbouw via lijfrente, banksparen of eigen BV-pensioen.",
      specialties: ["Pensioenopbouw", "Lijfrente", "Vermogensbeheer", "DGA-pensioen"],
    },
  ],
};

/* ─────────────────────────────────────────────────────────────
   Page component
───────────────────────────────────────────────────────────── */
export default function ExtrasPreviewPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Page Header ── */}
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-serif text-xl text-stone-900 leading-none">Extra Sections</p>
            <p className="text-[12px] text-stone-400 mt-0.5">Visual preview — 35 components</p>
          </div>
          <span className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent">
            Sterling Design System
          </span>
        </div>
      </header>

      {/* ── TOC ── */}
      <nav className="border-b border-stone-100 bg-warm-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-8">
          <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-stone-400 mb-6">
            Jump to section
          </p>
          <div className="space-y-6">
            {categories.map((cat) => (
              <div key={cat}>
                <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-stone-300 mb-3">
                  {cat}
                </p>
                <div className="flex flex-wrap gap-2">
                  {sections
                    .filter((s) => s.category === cat)
                    .map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className="rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[12px] font-medium text-stone-600 hover:border-accent hover:text-accent transition-colors"
                      >
                        {s.label}
                      </a>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Components ── */}
      <main>
        <SectionDivider id="insurance-grid" label="InsuranceGrid" />
        <InsuranceGrid {...insuranceGridProps} />

        <SectionDivider id="doctor-credentials" label="DoctorCredentials" />
        <DoctorCredentials {...doctorCredentialsProps} />

        <SectionDivider id="patient-forms" label="PatientForms" />
        <PatientForms {...patientFormsProps} />

        <SectionDivider id="before-after-gallery" label="BeforeAfterGallery" />
        <BeforeAfterGallery {...beforeAfterGalleryProps} />

        <SectionDivider id="booking-widget" label="BookingWidget" />
        <BookingWidget {...bookingWidgetProps} />

        <SectionDivider id="product-showcase" label="ProductShowcase" />
        <ProductShowcase {...productShowcaseProps} />

        <SectionDivider id="menu-section" label="MenuSection" />
        <MenuSection {...menuSectionProps} />

        <SectionDivider id="reservation-cta" label="ReservationCTA" />
        <ReservationCTA {...reservationCTAProps} />

        <SectionDivider id="events-calendar" label="EventsCalendar" />
        <EventsCalendar {...eventsCalendarProps} />

        <SectionDivider id="project-portfolio" label="ProjectPortfolio" />
        <ProjectPortfolio {...projectPortfolioProps} />

        <SectionDivider id="licenses-and-bonds" label="LicensesAndBonds" />
        <LicensesAndBonds {...licensesAndBondsProps} />

        <SectionDivider id="service-area-map" label="ServiceAreaMap" />
        <ServiceAreaMap {...serviceAreaMapProps} />

        <SectionDivider id="awards-and-badges" label="AwardsAndBadges" />
        <AwardsAndBadges {...awardsAndBadgesProps} />

        <SectionDivider id="video-showcase" label="VideoShowcase" />
        <VideoShowcase {...videoShowcaseProps} />

        <SectionDivider id="gallery-masonry" label="GalleryMasonry" />
        <GalleryMasonry {...galleryMasonryProps} />

        <SectionDivider id="opening-hours" label="OpeningHours" />
        <OpeningHours {...openingHoursProps} />

        <SectionDivider id="special-offers" label="SpecialOffers" />
        <SpecialOffers {...specialOffersProps} />

        <SectionDivider id="download-resources" label="DownloadResources" />
        <DownloadResources {...downloadResourcesProps} />

        <SectionDivider id="social-proof-wall" label="SocialProofWall" />
        <SocialProofWall {...socialProofWallProps} />

        <SectionDivider id="accepted-payments" label="AcceptedPayments" />
        <AcceptedPayments {...acceptedPaymentsProps} />

        {/* ── Bookkeeper / Boekhouder ── */}
        <SectionDivider id="tax-deadline-calendar" label="TaxDeadlineCalendar" />
        <TaxDeadlineCalendar {...taxDeadlineCalendarProps} />

        <SectionDivider id="compliance-badges" label="ComplianceBadges" />
        <ComplianceBadges {...complianceBadgesProps} />

        <SectionDivider id="association-memberships" label="AssociationMemberships" />
        <AssociationMemberships {...associationMembershipsProps} />

        <SectionDivider id="software-partners" label="SoftwarePartners" />
        <SoftwarePartners {...softwarePartnersProps} />

        <SectionDivider id="client-dashboard-preview" label="ClientDashboardPreview" />
        <ClientDashboardPreview {...clientDashboardPreviewProps} />

        <SectionDivider id="free-tools-section" label="FreeToolsSection" />
        <FreeToolsSection {...freeToolsSectionProps} />

        <SectionDivider id="client-portal" label="ClientPortal" />
        <ClientPortal {...clientPortalProps} />

        <SectionDivider id="newsletter-signup" label="NewsletterSignup" />
        <NewsletterSignup {...newsletterSignupProps} />

        <SectionDivider id="referral-program" label="ReferralProgram" />
        <ReferralProgram {...referralProgramProps} />

        <SectionDivider id="comparison-table" label="ComparisonTable" />
        <ComparisonTable {...comparisonTableProps} />

        <SectionDivider id="satisfaction-guarantee" label="SatisfactionGuarantee" />
        <SatisfactionGuarantee {...satisfactionGuaranteeProps} />

        <SectionDivider id="client-success-metrics" label="ClientSuccessMetrics" />
        <ClientSuccessMetrics {...clientSuccessMetricsProps} />

        <SectionDivider id="expat-services" label="ExpatServices" />
        <ExpatServices {...expatServicesProps} />

        <SectionDivider id="emergency-support" label="EmergencySupport" />
        <EmergencySupport {...emergencySupportProps} />

        <SectionDivider id="partner-network" label="PartnerNetwork" />
        <PartnerNetwork {...partnerNetworkProps} />
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-stone-100 bg-white py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 text-center">
          <p className="text-[12px] text-stone-400">
            Sterling Accounting — Extra Sections Preview &nbsp;·&nbsp; {sections.length} components rendered
          </p>
        </div>
      </footer>
    </div>
  );
}
