"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Pause, Play } from "lucide-react";

const LABELS: Record<string, { pause: string; play: string }> = {
  fr: { pause: "Mettre le défilement en pause", play: "Relancer le défilement" },
  en: { pause: "Pause scrolling", play: "Resume scrolling" },
  es: { pause: "Pausar el desplazamiento", play: "Reanudar el desplazamiento" },
  de: { pause: "Laufband anhalten", play: "Laufband fortsetzen" },
  nl: { pause: "Scrollen pauzeren", play: "Scrollen hervatten" },
  pt: { pause: "Pausar o deslizamento", play: "Retomar o deslizamento" },
  it: { pause: "Metti in pausa lo scorrimento", play: "Riprendi lo scorrimento" },
};

/**
 * Bouton pause d'un bandeau défilant (WCAG 2.2.2). À placer dans l'élément
 * [data-marquee] : pose data-paused au clic et data-offscreen quand le
 * bandeau sort de l'écran (les règles .marquee-track de globals.css font le
 * reste). Masqué en mouvement réduit, où le bandeau est déjà immobile.
 */
export default function MarqueePause({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [paused, setPaused] = useState(false);
  const locale = useLocale();
  const labels = LABELS[locale] || LABELS.fr;

  useEffect(() => {
    const host = ref.current?.closest<HTMLElement>("[data-marquee]");
    if (!host || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      host.dataset.offscreen = entry.isIntersecting ? "false" : "true";
    });
    io.observe(host);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    const host = ref.current?.closest<HTMLElement>("[data-marquee]");
    if (host) host.dataset.paused = next ? "true" : "false";
  };

  const colors =
    tone === "light"
      ? "text-cream-50 border-cream-50/30 hover:border-gold-500 hover:text-gold-500"
      : "text-ink-900 border-ink-900/30 hover:border-ink-900";

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      aria-label={paused ? labels.play : labels.pause}
      title={paused ? labels.play : labels.pause}
      className={`motion-reduce:hidden flex items-center justify-center w-8 h-8 border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${colors}`}
    >
      {paused ? (
        <Play className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
      ) : (
        <Pause className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
      )}
    </button>
  );
}
