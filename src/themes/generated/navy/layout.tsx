import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import content from "@/data/content.json";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: `${content.company.name} | Boekhouder ${content.company.city} — ZZP, MKB & BV`,
  description: content.company.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "AccountingService",
                "name": content.company.name,
                "description": content.company.description,
                "telephone": content.company.phone_raw ? `+${content.company.phone_raw}` : undefined,
                "email": content.company.email,
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": content.company.address,
                  "addressLocality": content.company.city,
                  "postalCode": content.company.postcode,
                  "addressCountry": "NL",
                },
                "areaServed": {
                  "@type": "Country",
                  "name": "Nederland",
                },
                "priceRange": "€€",
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  "opens": "08:30",
                  "closes": "17:30",
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Boekhouddiensten",
                  "itemListElement": content.pricing.plans
                    .filter((p: { price: string }) => p.price.startsWith("€"))
                    .map((p: { name: string; description: string; price: string }) => ({
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": p.name,
                        "description": p.description,
                      },
                      "price": p.price.replace("€", ""),
                      "priceCurrency": "EUR",
                      "priceSpecification": {
                        "@type": "UnitPriceSpecification",
                        "billingDuration": "P1M",
                      },
                    })),
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": content.faqs.map((faq: { question: string; answer: string }) => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer,
                  },
                })),
              },
            ]),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfairDisplay.variable} grain antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
