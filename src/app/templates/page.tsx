"use client";

/**
 * Template Demo Page
 *
 * Allows previewing all niche-specific content.json templates
 * with the Sterling modular section architecture.
 *
 * Each template is a content.json file that drives the same
 * PageAssembler component with different data.
 */

import { useState, useMemo } from "react";
import { PageAssembler } from "@/components/page-assembler";
import type { ContentData } from "@/types/content";

// Import all template content files
import bookkeeper from "@/data/content.json";
import dental from "@/data/templates/dental-nl.json";
import restaurant from "@/data/templates/restaurant-nl.json";
import lawfirm from "@/data/templates/lawfirm-nl.json";
import fitness from "@/data/templates/fitness-nl.json";
import autorepair from "@/data/templates/autorepair-nl.json";

interface TemplateOption {
  id: string;
  label: string;
  niche: string;
  city: string;
  theme: string;
  content: ContentData;
}

const TEMPLATES: TemplateOption[] = [
  {
    id: "bookkeeper",
    label: "Sterling & Partners",
    niche: "Boekhouder",
    city: "Amsterdam",
    theme: "forest",
    content: bookkeeper as unknown as ContentData,
  },
  {
    id: "dental",
    label: "Tandartspraktijk De Gracht",
    niche: "Tandarts",
    city: "Amsterdam",
    theme: "dental-blue",
    content: dental as unknown as ContentData,
  },
  {
    id: "restaurant",
    label: "Restaurant De Maas",
    niche: "Restaurant",
    city: "Rotterdam",
    theme: "restaurant-burgundy",
    content: restaurant as unknown as ContentData,
  },
  {
    id: "lawfirm",
    label: "Van Houten & Bakker",
    niche: "Advocatenkantoor",
    city: "Den Haag",
    theme: "law-navy",
    content: lawfirm as unknown as ContentData,
  },
  {
    id: "fitness",
    label: "FitFactory Utrecht",
    niche: "Sportschool",
    city: "Utrecht",
    theme: "fitness-energy",
    content: fitness as unknown as ContentData,
  },
  {
    id: "autorepair",
    label: "Garage Van den Berg",
    niche: "Autogarage",
    city: "Eindhoven",
    theme: "auto-steel",
    content: autorepair as unknown as ContentData,
  },
];

export default function TemplatesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = useMemo(
    () => TEMPLATES.find((t) => t.id === selectedId),
    [selectedId]
  );

  // If a template is selected, render it full-screen
  if (selected) {
    return (
      <div className="relative">
        {/* Floating back button */}
        <div className="fixed top-4 left-4 z-[9999]">
          <button
            onClick={() => setSelectedId(null)}
            className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-stone-700 shadow-lg backdrop-blur-sm border border-stone-200 hover:bg-white hover:shadow-xl transition-all"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Terug naar overzicht
          </button>
        </div>

        {/* Floating template info badge */}
        <div className="fixed top-4 right-4 z-[9999]">
          <div className="rounded-full bg-stone-900/80 px-4 py-2 text-sm text-white backdrop-blur-sm">
            <span className="font-medium">{selected.niche}</span>
            <span className="mx-2 text-stone-400">|</span>
            <span className="text-stone-300">{selected.city}</span>
            <span className="mx-2 text-stone-400">|</span>
            <span className="font-mono text-xs text-stone-400">
              {selected.theme}
            </span>
          </div>
        </div>

        {/* Render the full template */}
        <PageAssembler content={selected.content} />
      </div>
    );
  }

  // Template selection grid
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-20">
          <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-stone-400 mb-3">
            Sterling Template Engine
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Niche Templates
          </h1>
          <p className="mt-4 text-lg text-stone-500 max-w-2xl">
            Zes branchespecifieke websites gebouwd op dezelfde modulaire
            architectuur. Elk template is een <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded font-mono">content.json</code> bestand +
            een thema-configuratie.
          </p>
        </div>
      </div>

      {/* Template Grid */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedId(template.id)}
              className="group text-left rounded-2xl border border-stone-200 bg-white p-6 hover:shadow-xl hover:border-stone-300 transition-all duration-300"
            >
              {/* Niche badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                  {template.niche}
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {template.theme}
                </span>
              </div>

              {/* Logo placeholder */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-900 text-white font-bold text-lg">
                  {template.content.company.logo_initial}
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 group-hover:text-stone-700 transition-colors">
                    {template.label}
                  </h3>
                  <p className="text-sm text-stone-400">{template.city}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 mb-4">
                {template.content.company.description}
              </p>

              {/* Stats row */}
              <div className="flex items-center gap-4 text-xs text-stone-400 border-t border-stone-100 pt-4">
                <span>
                  {template.content.services.items.length} diensten
                </span>
                <span>
                  {template.content.team.members.length} teamleden
                </span>
                <span>
                  {template.content.extra_sections.length} extra secties
                </span>
              </div>

              {/* Arrow */}
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-stone-400 group-hover:text-stone-700 transition-colors">
                Preview bekijken
                <svg
                  className="h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Architecture info */}
        <div className="mt-16 rounded-2xl border border-stone-200 bg-white p-8">
          <h2 className="text-xl font-bold text-stone-900 mb-4">
            Architectuur
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-stone-700 mb-2">
                Content Layer
              </h3>
              <p className="text-sm text-stone-500">
                Elk template is een <code className="bg-stone-100 px-1 rounded font-mono text-xs">content.json</code> bestand
                met bedrijfsgegevens, diensten, team, FAQ, prijzen en
                extra_sections. Dezelfde structuur, andere data.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-stone-700 mb-2">
                Component Layer
              </h3>
              <p className="text-sm text-stone-500">
                Alle secties (hero, services, team, pricing, etc.) zijn
                herbruikbare React-componenten. Extra secties (menu, booking,
                opening hours) worden via een registry gekoppeld.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-stone-700 mb-2">
                Theme Layer
              </h3>
              <p className="text-sm text-stone-500">
                Kleuren en typografie worden gestuurd via CSS-variabelen in{" "}
                <code className="bg-stone-100 px-1 rounded font-mono text-xs">globals.css</code>.
                Elk niche-thema definieert accent, cream, warm-white en
                font-families.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
