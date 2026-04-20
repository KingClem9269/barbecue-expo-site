"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { CharDivider } from "@/components/signature/CharMark";

/**
 * Manifesto Section — editorial big-numbers strip.
 *
 * Renders 3 key stats oversize in SansPlomb brand font, on a cream background,
 * with count-up animation on enter viewport. Accent line before each label.
 *
 * JSON blok:
 * {
 *   "_uid": "...",
 *   "component": "manifesto",
 *   "eyebrow": "Le rendez-vous européen",
 *   "stats": [
 *     { "value": 12000, "suffix": "+", "label": "Visiteurs attendus" },
 *     { "value": 80, "suffix": "+", "label": "Exposants internationaux" },
 *     { "value": 3, "suffix": "", "label": "Jours d'immersion" }
 *   ],
 *   "punchline": "..." // optional closing sentence
 * }
 */

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

interface ManifestoBlok {
  _uid?: string;
  eyebrow?: string;
  stats?: Stat[];
  punchline?: string;
}

const DEFAULTS: Record<string, ManifestoBlok> = {
  fr: {
    eyebrow: "Édition 2026 — les chiffres",
    stats: [
      { value: 25896, suffix: "", label: "Visiteurs en 2026" },
      { value: 250, suffix: "", label: "Marques internationales" },
      { value: 25, suffix: "", label: "Nationalités représentées" },
    ],
    punchline:
      "Le seul salon européen où les prescripteurs BBQ et les marques internationales se rencontrent pendant trois jours.",
  },
  en: {
    eyebrow: "2026 edition — key figures",
    stats: [
      { value: 25896, suffix: "", label: "Visitors in 2026" },
      { value: 250, suffix: "", label: "International brands" },
      { value: 25, suffix: "", label: "Nationalities represented" },
    ],
    punchline:
      "The only European show where BBQ tastemakers and international brands meet for three days.",
  },
  es: {
    eyebrow: "Edición 2026 — las cifras",
    stats: [
      { value: 25896, suffix: "", label: "Visitantes en 2026" },
      { value: 250, suffix: "", label: "Marcas internacionales" },
      { value: 25, suffix: "", label: "Nacionalidades representadas" },
    ],
    punchline:
      "La única feria europea donde los prescriptores BBQ y las marcas internacionales se encuentran durante tres días.",
  },
  de: {
    eyebrow: "Ausgabe 2026 — die Zahlen",
    stats: [
      { value: 25896, suffix: "", label: "Besucher 2026" },
      { value: 250, suffix: "", label: "Internationale Marken" },
      { value: 25, suffix: "", label: "Vertretene Nationalitäten" },
    ],
    punchline:
      "Die einzige europäische Messe, auf der BBQ-Trendsetter und internationale Marken drei Tage lang zusammentreffen.",
  },
  nl: {
    eyebrow: "Editie 2026 — de cijfers",
    stats: [
      { value: 25896, suffix: "", label: "Bezoekers in 2026" },
      { value: 250, suffix: "", label: "Internationale merken" },
      { value: 25, suffix: "", label: "Vertegenwoordigde nationaliteiten" },
    ],
    punchline:
      "De enige Europese beurs waar BBQ-toonaangevers en internationale merken elkaar drie dagen lang ontmoeten.",
  },
  pt: {
    eyebrow: "Edição 2026 — os números",
    stats: [
      { value: 25896, suffix: "", label: "Visitantes em 2026" },
      { value: 250, suffix: "", label: "Marcas internacionais" },
      { value: 25, suffix: "", label: "Nacionalidades representadas" },
    ],
    punchline:
      "A única feira europeia onde os prescritores BBQ e as marcas internacionais se encontram durante três dias.",
  },
  it: {
    eyebrow: "Edizione 2026 — i numeri",
    stats: [
      { value: 25896, suffix: "", label: "Visitatori nel 2026" },
      { value: 250, suffix: "", label: "Marchi internazionali" },
      { value: 25, suffix: "", label: "Nazionalità rappresentate" },
    ],
    punchline:
      "L'unica fiera europea dove i prescrittori BBQ e i marchi internazionali si incontrano per tre giorni.",
  },
};

function useCountUp(
  target: number,
  options: { duration?: number; delay?: number; enabled?: boolean } = {},
) {
  const { duration = 1800, delay = 0, enabled = true } = options;
  const [value, setValue] = useState(target); // SSR & reduced-motion default: final value
  useEffect(() => {
    if (!enabled) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      setValue(target);
      return;
    }
    setValue(0);
    let frame = 0;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(target * eased));
      if (progress < 1) frame = requestAnimationFrame(step);
      else setValue(target);
    };
    const startTimer = window.setTimeout(() => {
      frame = requestAnimationFrame(step);
    }, delay);
    // Fallback: if tab is hidden (rAF throttled) or device doesn't run rAF,
    // ensure the final value is set after delay + duration + buffer.
    const fallbackTimer = window.setTimeout(() => {
      setValue(target);
      if (frame) cancelAnimationFrame(frame);
    }, delay + duration + 200);
    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(fallbackTimer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target, duration, delay, enabled]);
  return value;
}

function StatBlock({
  stat,
  inView,
  index,
}: {
  stat: Stat;
  inView: boolean;
  index: number;
}) {
  const count = useCountUp(stat.value, {
    duration: 1800,
    delay: 200 + index * 150,
    enabled: inView,
  });
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <span className="inline-block w-12 h-px bg-gold-500" aria-hidden="true" />
      <span
        className="text-ink-900 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight font-bold tabular-nums"
        style={{ fontFamily: "SansPlomb-98, sans-serif" }}
      >
        {count.toLocaleString()}
        {stat.suffix}
      </span>
      <span className="text-ink-600 text-sm md:text-base uppercase tracking-widest font-medium">
        {stat.label}
      </span>
    </div>
  );
}

export default function Manifesto({ blok }: { blok: ManifestoBlok }) {
  const locale = useLocale();
  const defaults = DEFAULTS[locale] || DEFAULTS.fr;
  const data: ManifestoBlok = {
    eyebrow: blok.eyebrow || defaults.eyebrow,
    stats: blok.stats && blok.stats.length > 0 ? blok.stats : defaults.stats,
    punchline: blok.punchline || defaults.punchline,
  };

  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Trigger animation after mount with a small delay for smoother UX.
  // We don't tie to viewport anymore because hydration + observer combo
  // was unreliable. Animation starts ~300ms after the component mounts;
  // by the time user scrolls past the hero, numbers will already be ready.
  useEffect(() => {
    const t = window.setTimeout(() => setInView(true), 300);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full bg-cream-100 py-20 md:py-32 lg:py-40 overflow-hidden"
      aria-label="Chiffres clés du salon"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        {data.eyebrow && (
          <div className="mb-12 md:mb-16 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold">
            {data.eyebrow}
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {data.stats?.map((stat, i) => (
            <StatBlock key={i} stat={stat} inView={inView} index={i} />
          ))}
        </div>

        {/* Punchline with signature divider above */}
        {data.punchline && (
          <div className="mt-16 md:mt-24 max-w-3xl">
            <CharDivider className="mb-6 md:mb-8 justify-start" />
            <p
              className="text-ink-900 text-xl md:text-2xl lg:text-3xl leading-snug"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {data.punchline}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
