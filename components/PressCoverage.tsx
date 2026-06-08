"use client";

import Image from "next/image";
import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import { MEDIA_FEATURED, MEDIA_MENTIONS } from "@/app/[locale]/presentation-exposants/data";

/**
 * Retombées presse — vidéos principales (TV/replay) + grille « Ils en ont parlé ».
 * Conçu pour un fond sombre (bg-ink-950). Réutilisé sur la page catalogue
 * exposant et sur la page Galerie & Presse.
 */

// Logo média : vrai logo si dispo, sinon wordmark texte (repli si échec de chargement).
function MediaLogo({ name, logo }: { name: string; logo?: string | null }) {
  const [err, setErr] = useState(false);
  const [outlet, show] = name.split(" — ");
  if (logo && !err) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={logo} alt={name} onError={() => setErr(true)} className="max-h-[80%] max-w-[85%] object-contain" />
    );
  }
  return (
    <div className="flex flex-col items-center justify-center text-center px-3 leading-tight">
      <span className="text-ink-900 font-bold text-base md:text-lg" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{outlet}</span>
      {show && <span className="text-ink-400 text-[11px] font-medium mt-0.5">{show}</span>}
    </div>
  );
}

export default function PressCoverage() {
  return (
    <div>
      {/* Vidéos principales — encadrées */}
      <div className="text-cream-50/60 text-xs uppercase tracking-widest mb-4">Vidéos principales</div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {MEDIA_FEATURED.map((m) => (
          <a key={m.show} href={m.url} target="_blank" rel="noopener noreferrer" className="group block rounded-sm overflow-hidden border-2 border-gold-500/60 hover:border-gold-500 transition-colors">
            <div className="relative aspect-video bg-ink-900 flex items-center justify-center overflow-hidden">
              <Image src={m.thumb} alt={`${m.outlet} — ${m.show}`} fill unoptimized sizes="(max-width:1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 bg-ink-950/30 group-hover:bg-ink-950/20 transition-colors" aria-hidden="true" />
              <span className="relative z-10 w-12 h-12 rounded-full bg-gold-500 text-ink-950 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Play className="w-5 h-5 ml-0.5" fill="currentColor" strokeWidth={0} />
              </span>
            </div>
            <div className="p-3 bg-ink-950">
              <div className="text-cream-50 font-bold text-sm" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{m.outlet}</div>
              <div className="text-cream-50/60 text-xs">{m.show}</div>
            </div>
          </a>
        ))}
      </div>

      {/* Toutes les retombées */}
      <div className="text-cream-50/60 text-xs uppercase tracking-widest mb-4">Ils en ont parlé</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {MEDIA_MENTIONS.map((m, i) => {
          const inner = (
            <div className="h-full flex flex-col items-center justify-center text-center gap-2 bg-cream-50/[0.04] border border-cream-50/10 rounded-sm p-4 hover:border-gold-500/40 transition-colors">
              <div className="w-full aspect-[5/2] rounded-sm bg-white flex items-center justify-center overflow-hidden">
                <MediaLogo name={m.name} logo={m.logo} />
              </div>
              {m.url
                ? <span className="text-gold-500 text-xs font-semibold flex items-center gap-1">Voir le sujet<ExternalLink className="w-3 h-3" /></span>
                : <span className="text-cream-50/40 text-xs font-medium">Diffusé</span>}
            </div>
          );
          return m.url ? (
            <a key={i} href={m.url} target="_blank" rel="noopener noreferrer" className="block">{inner}</a>
          ) : (
            <div key={i}>{inner}</div>
          );
        })}
      </div>
    </div>
  );
}
