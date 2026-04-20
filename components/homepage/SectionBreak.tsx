"use client";
import { CharDivider } from "@/components/signature/CharMark";

/**
 * SectionBreak — subtle editorial pause between major sections.
 *
 * Thin vertical space with a centered CharDivider (gold line + dot + optional label).
 * Use to break rhythm when two sections with similar colors would otherwise
 * blend together.
 *
 * JSON blok:
 * {
 *   "_uid": "...",
 *   "component": "section-break",
 *   "label": "Programme",   // optional uppercase label between the dots
 *   "background": "cream"   // "cream" | "ink" | "white" — default "cream"
 * }
 */

interface SectionBreakBlok {
  _uid?: string;
  label?: string;
  background?: "cream" | "ink" | "white";
}

export default function SectionBreak({ blok }: { blok: SectionBreakBlok }) {
  const bg =
    blok.background === "ink"
      ? "bg-ink-950"
      : blok.background === "white"
        ? "bg-white"
        : "bg-cream-100";
  const accent = blok.background === "ink" ? "gold-500" : "gold-500";

  return (
    <div className={`${bg} py-12 md:py-20`}>
      <div className="max-w-7xl mx-auto px-6">
        <CharDivider label={blok.label} accent={accent} />
      </div>
    </div>
  );
}
