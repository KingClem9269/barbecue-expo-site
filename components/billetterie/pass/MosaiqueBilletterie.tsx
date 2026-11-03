"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { LayoutGrid } from "lucide-react";
import { Lightbox, type GalleryLabels, type Item } from "@/components/GalleryMosaic";
import { cn } from "@/lib/utils";

/**
 * Mosaïque en tête de /billetterie, comme sur les pages d'événement : une
 * grande photo et quatre petites (la grande seule sur mobile). Un clic sur une
 * photo, ou sur « Galerie », ouvre la visionneuse sur toutes les photos.
 */
export default function MosaiqueBilletterie({
  photos,
  labels,
}: {
  /** les cinq premières forment la mosaïque, les suivantes sont dans la visionneuse */
  photos: string[];
  labels: GalleryLabels & { galerie: string };
}) {
  const items: Item[] = photos.map((src, i) => ({ type: "photo", src, alt: `${labels.photoAlt} — ${i + 1}` }));
  const [index, setIndex] = useState<number | null>(null);
  // Bouton qui a ouvert la visionneuse : il reprend le focus à la fermeture.
  const openerRef = useRef<HTMLElement | null>(null);

  const open = (i: number, opener: HTMLElement) => {
    openerRef.current = opener;
    setIndex(i);
  };
  const close = () => {
    setIndex(null);
    openerRef.current?.focus();
  };

  return (
    <>
      <div className="relative grid grid-cols-1 sm:grid-cols-4 sm:grid-rows-2 gap-2 md:gap-3 sm:h-[clamp(19rem,40vw,31rem)]">
        {items.slice(0, 5).map((item, i) =>
          item.type === "photo" ? (
            <button
              key={item.src}
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              aria-label={`${labels.open} — ${item.alt}`}
              className={cn(
                "group relative overflow-hidden rounded-sm bg-char-800 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-jaune",
                i === 0 ? "aspect-[4/3] sm:aspect-auto sm:col-span-2 sm:row-span-2" : "hidden sm:block",
              )}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={i === 0 ? "(min-width: 640px) 50vw, 100vw" : "25vw"}
                priority={i === 0}
                className="object-cover transition-transform duration-700 ease-sortie motion-safe:group-hover:scale-[1.03]"
              />
            </button>
          ) : null,
        )}

        <button
          type="button"
          onClick={(e) => open(0, e.currentTarget)}
          className="absolute bottom-3 right-3 md:bottom-4 md:right-4 inline-flex items-center gap-2 rounded-full bg-papier text-charbon px-4 py-2.5 text-sm font-semibold shadow-[0_6px_20px_-8px_rgba(12,11,10,0.6)] transition-colors hover:bg-jaune focus:outline-none focus-visible:ring-2 focus-visible:ring-jaune focus-visible:ring-offset-2 focus-visible:ring-offset-charbon"
        >
          <LayoutGrid className="h-4 w-4" strokeWidth={2.5} />
          {labels.galerie}
          <span className="tabular-nums text-charbon/60">{items.length}</span>
        </button>
      </div>

      {index !== null && <Lightbox items={items} index={index} setIndex={setIndex} onClose={close} labels={labels} />}
    </>
  );
}
