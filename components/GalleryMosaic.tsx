"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import YouTubeEmbed, { VIDEO_ID } from "@/components/YouTubeEmbed";

/**
 * Mosaïque de la galerie (vidéo du salon en premier, puis les photos) et
 * visionneuse plein écran : clic sur une vignette, puis flèches, ← → au
 * clavier ou glissé du doigt pour faire défiler, Échap pour fermer.
 */

export type GalleryLabels = {
  photoAlt: string;
  video: string;
  open: string;
  close: string;
  prev: string;
  next: string;
};

/** Élément de la visionneuse : la vidéo du salon ou une photo. */
export type Item = { type: "video" } | { type: "photo"; src: string; alt: string };

export default function GalleryMosaic({ photos, labels }: { photos: string[]; labels: GalleryLabels }) {
  const items: Item[] = [
    { type: "video" },
    ...photos.map((src, i) => ({ type: "photo" as const, src, alt: `${labels.photoAlt} — ${i + 1}` })),
  ];
  const [index, setIndex] = useState<number | null>(null);
  // Vignette qui a ouvert la visionneuse : elle reprend le focus à la fermeture.
  const openerRef = useRef<HTMLElement | null>(null);

  const open = (i: number, opener: HTMLElement) => {
    openerRef.current = opener;
    setIndex(i);
  };
  const close = useCallback(() => {
    setIndex(null);
    openerRef.current?.focus();
  }, []);

  return (
    <>
      {/* CSS columns for masonry effect */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-4 [&>*]:mb-3 md:[&>*]:mb-4 [&>*]:break-inside-avoid">
        {/* Vidéo en tête de mosaïque (= en haut à gauche). Le bouton d'ouverture est
            sous le bouton « Activer le son » du lecteur, qui reste cliquable. */}
        <div className="relative isolate aspect-video overflow-hidden bg-ink-950 rounded-sm">
          <YouTubeEmbed />
          <button
            type="button"
            onClick={(e) => open(0, e.currentTarget)}
            aria-label={`${labels.open} — ${labels.video}`}
            className="group absolute inset-0 z-[5] cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-500"
          >
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-ink-950/70 px-3 py-1.5 text-cream-50 text-xs font-semibold backdrop-blur transition-colors group-hover:bg-gold-500 group-hover:text-ink-950">
              <Play className="w-3.5 h-3.5" strokeWidth={2.5} />
              {labels.video}
            </span>
          </button>
        </div>

        {items.slice(1).map((item, k) =>
          item.type === "photo" ? (
            <button
              key={item.src}
              type="button"
              onClick={(e) => open(k + 1, e.currentTarget)}
              aria-label={`${labels.open} — ${item.alt}`}
              className="group relative block w-full overflow-hidden bg-char-800 rounded-sm cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={1200}
                height={800}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="w-full h-auto transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
              />
            </button>
          ) : null,
        )}
      </div>

      {index !== null && (
        <Lightbox items={items} index={index} setIndex={setIndex} onClose={close} labels={labels} />
      )}
    </>
  );
}

/** Visionneuse plein écran, reprise par la mosaïque de /billetterie. */
export function Lightbox({
  items,
  index,
  setIndex,
  onClose,
  labels,
}: {
  items: Item[];
  index: number;
  setIndex: (update: (i: number | null) => number | null) => void;
  onClose: () => void;
  labels: GalleryLabels;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipeRef = useRef<{ x: number; y: number } | null>(null);
  const total = items.length;
  const item = items[index];

  const go = useCallback(
    (step: number) => setIndex((i) => (i === null ? i : (i + step + total) % total)),
    [setIndex, total],
  );

  // Ouverture : focus sur « Fermer », page bloquée derrière.
  useEffect(() => {
    closeRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        // Le focus reste dans la visionneuse.
        const focusables = [...dialogRef.current.querySelectorAll<HTMLElement>("button, iframe")];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") swipeRef.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const start = swipeRef.current;
    swipeRef.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  };

  const neighbours = [items[(index + 1) % total], items[(index - 1 + total) % total]];
  const navButton =
    "absolute top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-cream-50/10 hover:bg-gold-500 text-cream-50 hover:text-ink-950 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.type === "video" ? labels.video : item.alt}
      className="fixed inset-0 z-[200] flex flex-col bg-ink-950/95 backdrop-blur-sm"
    >
      {/* Barre du haut : compteur + fermer */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 text-cream-50">
        <span className="text-xs uppercase tracking-widest tabular-nums text-cream-50/70" aria-live="polite">
          {index + 1} / {total}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-cream-50/10 hover:bg-cream-50/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          <X className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>

      {/* Scène : un clic à côté de la photo ferme la visionneuse */}
      <div
        className="relative flex-1 min-h-0 flex items-center justify-center px-4 md:px-20 pb-6 touch-pan-y"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className={`${navButton} left-2 md:left-6`}>
          <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
        </button>

        {item.type === "video" ? (
          <div className="w-full max-w-[min(72rem,calc((100dvh-8rem)*16/9))] aspect-video bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={labels.video}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : (
          <Image
            key={item.src}
            src={item.src}
            alt={item.alt}
            width={2400}
            height={1600}
            sizes="100vw"
            priority
            className="w-auto h-auto max-w-full max-h-[calc(100dvh-6.5rem)] object-contain select-none"
            draggable={false}
          />
        )}

        <button type="button" onClick={() => go(1)} aria-label={labels.next} className={`${navButton} right-2 md:right-6`}>
          <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
        </button>

        {/* Photos voisines chargées d'avance pour un défilement sans attente */}
        {neighbours.map((n) =>
          n.type === "photo" ? (
            <Image key={`pre-${n.src}`} src={n.src} alt="" width={2400} height={1600} sizes="100vw" loading="eager" className="hidden" aria-hidden="true" />
          ) : null,
        )}
      </div>
    </div>
  );
}
