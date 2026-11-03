"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { VIDEO_ID } from "@/components/YouTubeEmbed";

/**
 * Le film officiel du salon, lancé au clic : une photo et un bouton lecture,
 * puis le lecteur YouTube (sans cookies) avec le son et les commandes. Rien
 * n'est chargé depuis YouTube avant le clic.
 */
export default function VideoOfficielle({ poster, titre, lancer }: { poster: string; titre: string; lancer: string }) {
  const [lancee, setLancee] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-sm bg-charbon">
      {lancee ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={titre}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLancee(true)}
          aria-label={`${lancer} — ${titre}`}
          className="group absolute inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-jaune"
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover transition-transform duration-700 ease-sortie motion-safe:group-hover:scale-[1.03]"
          />
          <span aria-hidden className="absolute inset-0 bg-charbon/25 transition-colors duration-300 group-hover:bg-charbon/10" />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-jaune text-charbon shadow-[0_10px_30px_-10px_rgba(12,11,10,0.8)] transition-transform duration-300 ease-sortie motion-safe:group-hover:scale-110"
          >
            <Play className="h-8 w-8 md:h-10 md:w-10 translate-x-0.5" fill="currentColor" strokeWidth={0} />
          </span>
        </button>
      )}
    </div>
  );
}
