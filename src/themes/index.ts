/**
 * Theme definitions for Sterling Bookkeeper Template
 *
 * 5 visual personas — same content.json, same page.tsx, different colors + fonts.
 * The n8n workflow picks the best theme via Haiku and generates globals.css + layout.tsx.
 * This file is a reference for local testing — swap themes by updating globals.css + layout.tsx.
 */

export type ThemeId = 'forest' | 'navy' | 'burgundy' | 'ocean' | 'charcoal';

export interface ThemeColors {
  background: string;
  foreground: string;
  accent: string;
  'accent-light': string;
  'accent-dark': string;
  cream: string;
  'warm-white': string;
  'stone-50': string;
  'stone-100': string;
  'stone-200': string;
  'stone-300': string;
  'stone-400': string;
  'stone-500': string;
  'stone-600': string;
  'stone-700': string;
  'stone-800': string;
  'stone-900': string;
}

export interface ThemeFontConfig {
  name: string;       // next/font/google import name (e.g. 'DM_Sans')
  display: string;    // Human-readable name (e.g. 'DM Sans')
  weights: string[];
  styles: string[];   // ['normal', 'italic'] or []
}

export interface Theme {
  id: ThemeId;
  label: string;
  vibe: string;
  colors: ThemeColors;
  fonts: {
    sans: ThemeFontConfig;
    serif: ThemeFontConfig;
  };
}

export const themes: Record<ThemeId, Theme> = {
  forest: {
    id: 'forest',
    label: 'Forest',
    vibe: 'Traditional, trustworthy',
    colors: {
      background: '#FAFAF8',
      foreground: '#1A1A1A',
      accent: '#2D5A3D',
      'accent-light': '#3A7350',
      'accent-dark': '#1E3D29',
      cream: '#F5F0E8',
      'warm-white': '#FDFCFA',
      'stone-50': '#FAF9F6',
      'stone-100': '#F5F4F0',
      'stone-200': '#E8E6E1',
      'stone-300': '#D4D1CA',
      'stone-400': '#A8A49C',
      'stone-500': '#78746C',
      'stone-600': '#5C584F',
      'stone-700': '#3D3A33',
      'stone-800': '#2A2822',
      'stone-900': '#1A1A1A',
    },
    fonts: {
      sans: { name: 'DM_Sans', display: 'DM Sans', weights: ['300', '400', '500', '600', '700'], styles: [] },
      serif: { name: 'Instrument_Serif', display: 'Instrument Serif', weights: ['400'], styles: ['normal', 'italic'] },
    },
  },
  navy: {
    id: 'navy',
    label: 'Navy',
    vibe: 'Corporate, established',
    colors: {
      background: '#F8F9FB',
      foreground: '#1A1D23',
      accent: '#1B3A5C',
      'accent-light': '#2B5580',
      'accent-dark': '#122840',
      cream: '#EDF1F7',
      'warm-white': '#FAFBFD',
      'stone-50': '#F8F9FB',
      'stone-100': '#F1F3F6',
      'stone-200': '#E2E5EB',
      'stone-300': '#CDD1D9',
      'stone-400': '#9BA1AD',
      'stone-500': '#6B7280',
      'stone-600': '#4B5563',
      'stone-700': '#374151',
      'stone-800': '#1F2937',
      'stone-900': '#111827',
    },
    fonts: {
      sans: { name: 'Inter', display: 'Inter', weights: ['300', '400', '500', '600', '700'], styles: [] },
      serif: { name: 'Playfair_Display', display: 'Playfair Display', weights: ['400', '700'], styles: ['normal', 'italic'] },
    },
  },
  burgundy: {
    id: 'burgundy',
    label: 'Burgundy',
    vibe: 'Premium, boutique',
    colors: {
      background: '#FAF8F7',
      foreground: '#1A1717',
      accent: '#6B2D3E',
      'accent-light': '#8A3D52',
      'accent-dark': '#4A1F2B',
      cream: '#F5EDE8',
      'warm-white': '#FDFBFA',
      'stone-50': '#FAF8F7',
      'stone-100': '#F5F1EF',
      'stone-200': '#EAE3DF',
      'stone-300': '#D6CCC6',
      'stone-400': '#ADA19A',
      'stone-500': '#7D7069',
      'stone-600': '#5E524C',
      'stone-700': '#403733',
      'stone-800': '#2B2422',
      'stone-900': '#1A1717',
    },
    fonts: {
      sans: { name: 'Raleway', display: 'Raleway', weights: ['300', '400', '500', '600', '700'], styles: [] },
      serif: { name: 'Lora', display: 'Lora', weights: ['400', '700'], styles: ['normal', 'italic'] },
    },
  },
  ocean: {
    id: 'ocean',
    label: 'Ocean',
    vibe: 'Modern, approachable',
    colors: {
      background: '#F7FAFA',
      foreground: '#1A1F1F',
      accent: '#0E7C7B',
      'accent-light': '#12A09F',
      'accent-dark': '#095756',
      cream: '#E8F3F3',
      'warm-white': '#FAFCFC',
      'stone-50': '#FAFAFA',
      'stone-100': '#F4F4F5',
      'stone-200': '#E4E4E7',
      'stone-300': '#D4D4D8',
      'stone-400': '#A1A1AA',
      'stone-500': '#71717A',
      'stone-600': '#52525B',
      'stone-700': '#3F3F46',
      'stone-800': '#27272A',
      'stone-900': '#18181B',
    },
    fonts: {
      sans: { name: 'Plus_Jakarta_Sans', display: 'Plus Jakarta Sans', weights: ['300', '400', '500', '600', '700'], styles: [] },
      serif: { name: 'Fraunces', display: 'Fraunces', weights: ['400', '700'], styles: ['normal', 'italic'] },
    },
  },
  charcoal: {
    id: 'charcoal',
    label: 'Charcoal',
    vibe: 'Minimalist, sleek',
    colors: {
      background: '#F9F9F9',
      foreground: '#1A1A1A',
      accent: '#2C2C2C',
      'accent-light': '#444444',
      'accent-dark': '#1A1A1A',
      cream: '#F0F0F0',
      'warm-white': '#FCFCFC',
      'stone-50': '#FAFAFA',
      'stone-100': '#F5F5F5',
      'stone-200': '#E5E5E5',
      'stone-300': '#D4D4D4',
      'stone-400': '#A3A3A3',
      'stone-500': '#737373',
      'stone-600': '#525252',
      'stone-700': '#404040',
      'stone-800': '#262626',
      'stone-900': '#171717',
    },
    fonts: {
      sans: { name: 'Outfit', display: 'Outfit', weights: ['300', '400', '500', '600', '700'], styles: [] },
      serif: { name: 'Source_Serif_4', display: 'Source Serif 4', weights: ['400', '700'], styles: ['normal', 'italic'] },
    },
  },
};
