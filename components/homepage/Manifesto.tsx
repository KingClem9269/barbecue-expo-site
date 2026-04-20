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
    eyebrow: "Le rendez-vous européen",
    stats: [
      { value: 12000, suffix: "+", label: "Visiteurs attendus" },
      { value: 80, suffix: "+", label: "Exposants internationaux" },
      { value: 3, suffix: "", label: "Jours d'immersion" },
    ],
    punchline:
      "Trois jours pour célébrer la braise, le bois et le feu — réunis pour la première fois au cœur de l'Europe.",
  },
  en: {
    eyebrow: "The European gathering",
    stats: [
      { value: 12000, suffix: "+", label: "Expected visitors" },
      { value: 80, suffix: "+", label: "International exhibitors" },
      { value: 3, suffix: "", label: "Days of immersion" },
    ],
    punchline:
      "Three days to celebrate ember, wood and fire — gathered for the first time in the heart of Europe.",
  },
  es: {
    eyebrow: "La cita europea",
    stats: [
      { value: 12000, suffix: "+", label: "Visitantes esperados" },
      { value: 80, suffix: "+", label: "Expositores internacionales" },
      { value: 3, suffix: "", label: "Días de inmersión" },
    ],
    punchline:
      "Tres días para celebrar la brasa, la madera y el fuego — reunidos por primera vez en el corazón de Europa.",
  },
  de: {
    eyebrow: "Das europäische Treffen",
    stats: [
      { value: 12000, suffix: "+", label: "Erwartete Besucher" },
      { value: 80, suffix: "+", label: "Internationale Aussteller" },
      { value: 3, suffix: "", label: "Tage des Eintauchens" },
    ],
    punchline:
      "Drei Tage, um Glut, Holz und Feuer zu feiern — zum ersten Mal im Herzen Europas vereint.",
  },
  nl: {
    eyebrow: "De Europese ontmoeting",
    stats: [
      { value: 12000, suffix: "+", label: "Verwachte bezoekers" },
      { value: 80, suffix: "+", label: "Internationale exposanten" },
      { value: 3, suffix: "", label: "Dagen onderdompeling" },
    ],
    punchline:
      "Drie dagen om gloed, hout en vuur te vieren — voor het eerst samen in het hart van Europa.",
  },
  pt: {
    eyebrow: "O encontro europeu",
    stats: [
      { value: 12000, suffix: "+", label: "Visitantes esperados" },
      { value: 80, suffix: "+", label: "Expositores internacionais" },
      { value: 3, suffix: "", label: "Dias de imersão" },
    ],
    punchline:
      "Três dias para celebrar a brasa, a madeira e o fogo — reunidos pela primeira vez no coração da Europa.",
  },
  it: {
    eyebrow: "L'appuntamento europeo",
    stats: [
      { value: 12000, suffix: "+", label: "Visitatori attesi" },
      { value: 80, suffix: "+", label: "Espositori internazionali" },
      { value: 3, suffix: "", label: "Giorni di immersione" },
    ],
    punchline:
      "Tre giorni per celebrare la brace, il legno e il fuoco — riuniti per la prima volta nel cuore dell'Europa.",
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
