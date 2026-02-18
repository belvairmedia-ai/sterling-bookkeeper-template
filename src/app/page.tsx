/**
 * page.tsx — Sterling Template
 *
 * Thin shell: all section composition and ordering lives in PageAssembler.
 * Edit content via src/data/content.json.
 * Add sections via src/components/sections/registry.ts.
 */
import { PageAssembler } from "@/components/page-assembler";
import type { ContentData } from "@/types/content";
import contentJson from "@/data/content.json";

// TypeScript resolveJsonModule guarantees shape compatibility.
// The only optionally-absent field is extra_sections, typed as ExtraSection[]
// in ContentData. Cast is safe.
const content = contentJson as unknown as ContentData;

export default function Home() {
  return <PageAssembler content={content} />;
}
