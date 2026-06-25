"use client";

/**
 * Bloc « Les autres rendez-vous du feu » — maillage contextuel vers les sites
 * frères de l'écosystème. Les sites désactivés (lib/ecosystem.ts) sont omis.
 * Chaque clic émet l'événement GA4 `outbound_ecosystem` (mesure du maillage).
 */

import { sendGAEvent } from "@next/third-parties/google";
import {
  ecoSites,
  ecoText,
  ECO_BLOCK_TITLE,
  type EcoKey,
} from "@/lib/ecosystem";

export default function EcosystemLinks({
  items,
  locale,
  title,
  tone = "light",
  className = "",
}: {
  items: EcoKey[];
  locale: string;
  title?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const sites = ecoSites(items);
  if (sites.length === 0) return null;

  const heading = title ?? ecoText(ECO_BLOCK_TITLE, locale);
  const dark = tone === "dark";

  const wrap = dark
    ? "border-white/15 bg-white/[0.04]"
    : "border-ink-200 bg-ink-50/60";
  const head = dark ? "text-gold-300" : "text-gold-600";
  const name = dark ? "text-white" : "text-ink-900";
  const desc = dark ? "text-white/60" : "text-ink-500";
  const row = dark
    ? "border-white/10 hover:bg-white/[0.06]"
    : "border-ink-200 hover:bg-white";

  return (
    <aside
      aria-label={heading}
      className={`rounded-lg border p-5 sm:p-6 ${wrap} ${className}`}
    >
      <p
        className={`mb-3 text-xs font-bold uppercase tracking-[0.18em] ${head}`}
      >
        {heading}
      </p>
      <ul className="flex flex-col gap-2">
        {sites.map((s) => (
          <li key={s.key}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                sendGAEvent("event", "outbound_ecosystem", {
                  site: s.key,
                  location:
                    typeof window !== "undefined"
                      ? window.location.pathname
                      : "",
                })
              }
              className={`group flex flex-col rounded-sm border px-4 py-3 transition-colors ${row}`}
            >
              <span
                className={`flex items-center gap-1.5 text-sm font-bold ${name}`}
              >
                {s.name}
                <span aria-hidden className="opacity-50 group-hover:translate-x-0.5 transition-transform">
                  ↗
                </span>
              </span>
              <span className={`text-xs leading-snug ${desc}`}>
                {ecoText(s.blurb, locale)}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
