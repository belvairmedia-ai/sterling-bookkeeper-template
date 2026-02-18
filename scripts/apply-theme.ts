#!/usr/bin/env tsx
/**
 * Apply a theme to the Sterling template.
 * Usage: npx tsx scripts/apply-theme.ts <theme-id>
 * Theme IDs: forest | navy | burgundy | ocean | charcoal
 *
 * Generates:
 *   src/app/globals.css  — themed @theme inline block
 *   src/app/layout.tsx   — correct Google Font imports
 */

import fs from 'fs'
import path from 'path'
import { themes, type ThemeId } from '../src/themes/index'

const themeId = process.argv[2] as ThemeId

if (!themeId || !themes[themeId]) {
  console.error(`Usage: npx tsx scripts/apply-theme.ts <theme-id>`)
  console.error(`Available themes: ${Object.keys(themes).join(', ')}`)
  process.exit(1)
}

const theme = themes[themeId]
const ROOT = path.resolve(__dirname, '..')

// ── Generate globals.css ──

const globalsCss = `@import "tailwindcss";

@theme inline {
  --color-background: ${theme.colors.background};
  --color-foreground: ${theme.colors.foreground};
  --color-stone-50: ${theme.colors['stone-50']};
  --color-stone-100: ${theme.colors['stone-100']};
  --color-stone-200: ${theme.colors['stone-200']};
  --color-stone-300: ${theme.colors['stone-300']};
  --color-stone-400: ${theme.colors['stone-400']};
  --color-stone-500: ${theme.colors['stone-500']};
  --color-stone-600: ${theme.colors['stone-600']};
  --color-stone-700: ${theme.colors['stone-700']};
  --color-stone-800: ${theme.colors['stone-800']};
  --color-stone-900: ${theme.colors['stone-900']};
  --color-accent: ${theme.colors.accent};
  --color-accent-light: ${theme.colors['accent-light']};
  --color-accent-dark: ${theme.colors['accent-dark']};
  --color-cream: ${theme.colors.cream};
  --color-warm-white: ${theme.colors['warm-white']};
  --font-sans: var(--font-${theme.fonts.sans.name.toLowerCase().replace(/_/g, '-')}), sans-serif;
  --font-serif: var(--font-${theme.fonts.serif.name.toLowerCase().replace(/_/g, '-')}), serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--color-background);
  color: var(--color-foreground);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Signature grain overlay */
.grain::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

/* Horizontal rule with character */
.divider-dot {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.divider-dot::before,
.divider-dot::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--color-stone-200);
}

/* Selection color */
::selection {
  background: var(--color-accent);
  color: white;
}

/* Smooth image reveal */
@keyframes imageReveal {
  from {
    clip-path: inset(0 0 100% 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

.img-reveal {
  animation: imageReveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--color-stone-100);
}
::-webkit-scrollbar-thumb {
  background: var(--color-stone-300);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-stone-400);
}
`

// ── Generate layout.tsx ──

const sans = theme.fonts.sans
const serif = theme.fonts.serif

// Build the weight config
const sansWeightStr = sans.weights.length === 1
  ? `  weight: "${sans.weights[0]}",`
  : `  weight: [${sans.weights.map(w => `"${w}"`).join(', ')}],`

const serifWeightStr = serif.weights.length === 1
  ? `  weight: "${serif.weights[0]}",`
  : `  weight: [${serif.weights.map(w => `"${w}"`).join(', ')}],`

const serifStyleStr = serif.styles.length > 0
  ? `\n  style: [${serif.styles.map(s => `"${s}"`).join(', ')}],`
  : ''

const sansVarName = sans.name.charAt(0).toLowerCase() + sans.name.slice(1).replace(/_/g, '')
const serifVarName = serif.name.charAt(0).toLowerCase() + serif.name.slice(1).replace(/_/g, '')
const sansCssVar = `--font-${sans.name.toLowerCase().replace(/_/g, '-')}`
const serifCssVar = `--font-${serif.name.toLowerCase().replace(/_/g, '-')}`

const layoutTsx = `import type { Metadata } from "next";
import { ${sans.name}, ${serif.name} } from "next/font/google";
import "./globals.css";
import content from "@/data/content.json";

const ${sansVarName} = ${sans.name}({
  variable: "${sansCssVar}",
  subsets: ["latin"],
${sansWeightStr}
});

const ${serifVarName} = ${serif.name}({
  variable: "${serifCssVar}",
  subsets: ["latin"],
${serifWeightStr}${serifStyleStr}
});

export const metadata: Metadata = {
  title: \`\${content.company.name} | Boekhouder \${content.company.city} — ZZP, MKB & BV\`,
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
                "telephone": content.company.phone_raw ? \`+\${content.company.phone_raw}\` : undefined,
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
        className={\`\${${sansVarName}.variable} \${${serifVarName}.variable} grain antialiased\`}
      >
        {children}
      </body>
    </html>
  );
}
`

// ── Write files ──
fs.writeFileSync(path.join(ROOT, 'src/app/globals.css'), globalsCss)
fs.writeFileSync(path.join(ROOT, 'src/app/layout.tsx'), layoutTsx)

console.log(`\n✅ Theme "${theme.label}" (${theme.id}) applied!`)
console.log(`   Vibe: ${theme.vibe}`)
console.log(`   Accent: ${theme.colors.accent}`)
console.log(`   Fonts: ${sans.display} + ${serif.display}`)
console.log(`\n   Updated: src/app/globals.css`)
console.log(`   Updated: src/app/layout.tsx\n`)
