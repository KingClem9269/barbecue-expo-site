"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import Image from "next/image";
import type { IdPass } from "@/lib/billets";
import { cn } from "@/lib/utils";

/**
 * Les trois pass de /billetterie en petits billets debout, qui servent
 * d'onglets : un clic affiche le contenu du pass juste en dessous, sans
 * changer de page. L'adresse suit (/billetterie/<pass>) pour qu'on puisse
 * partager le lien d'un pass ; elle mène à la même page, ce pass choisi.
 */

export type CartePass = {
  id: IdPass;
  nom: string;
  pourQui: string;
  photo: string;
  /** « dès 10 € », ou « Bientôt » */
  prix: string;
  prixLibelle?: string;
  ouvert: boolean;
};

const TONS: Record<IdPass, string> = {
  individuel: "bg-jaune text-charbon",
  groupes: "bg-papier text-charbon",
  food: "bg-[#2a2622] text-papier",
};

export default function SelecteurPass({
  cartes,
  panneaux,
  initial,
  libelleBientot,
}: {
  cartes: CartePass[];
  panneaux: Record<IdPass, ReactNode>;
  initial: IdPass;
  libelleBientot: string;
}) {
  const [choisi, setChoisi] = useState<IdPass>(initial);

  function choisir(id: IdPass) {
    setChoisi(id);
    // /billetterie, /en/billetterie… → …/billetterie/<pass>, sans recharger.
    const base = window.location.pathname.replace(/\/billetterie(\/[^/]*)?\/?$/, "/billetterie");
    window.history.replaceState(null, "", `${base}/${id}`);
  }

  // Flèches gauche/droite entre les onglets (motif « tabs » ARIA).
  function clavier(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const suivant = cartes[(i + (e.key === "ArrowRight" ? 1 : cartes.length - 1)) % cartes.length];
    choisir(suivant.id);
    document.getElementById(`onglet-${suivant.id}`)?.focus();
  }

  return (
    <>
      <div className="bg-charbon">
        <div
          role="tablist"
          aria-label="Pass"
          className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-2 pb-8 md:pb-10 grid grid-cols-3 gap-2.5 md:gap-5 lg:gap-6"
        >
          {cartes.map((c, i) => {
            const actif = c.id === choisi;
            return (
              <button
                key={c.id}
                id={`onglet-${c.id}`}
                type="button"
                role="tab"
                aria-selected={actif}
                aria-controls="panneau-pass"
                tabIndex={actif ? 0 : -1}
                onClick={() => choisir(c.id)}
                onKeyDown={(e) => clavier(e, i)}
                className={cn(
                  "ticket-debout [--talon:3.25rem] [--encoche:7px] md:[--talon:4.5rem] md:[--encoche:12px] group relative flex flex-col text-left transition duration-(--duree-ui) ease-sortie focus:outline-none focus-visible:ring-2 focus-visible:ring-jaune focus-visible:ring-offset-4 focus-visible:ring-offset-charbon",
                  TONS[c.id],
                  actif ? "-translate-y-1.5" : "opacity-60 hover:opacity-90 hover:-translate-y-0.5",
                )}
              >
                <div className="relative aspect-[4/3] md:aspect-[21/9] overflow-hidden">
                  <Image
                    src={c.photo}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 33vw"
                    priority
                    className="object-cover transition-transform duration-700 ease-sortie group-hover:scale-[1.04]"
                  />
                  {!c.ouvert && (
                    <span className="absolute right-1.5 top-1.5 md:right-3 md:top-3 bg-braise text-papier font-affiche uppercase leading-none text-xs md:text-base px-1.5 md:px-2.5 pt-1 pb-0.5 md:pt-1.5 md:pb-1">
                      {libelleBientot}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-1.5 p-2.5 md:px-5 md:pt-4 md:pb-3">
                  <span className="font-affiche uppercase leading-[0.85] text-[1.35rem] sm:text-3xl lg:text-[2.6rem]">
                    {c.nom}
                  </span>
                  <span className="hidden md:block text-sm leading-snug opacity-80">{c.pourQui}</span>
                </div>
                <div className="mx-2.5 md:mx-5 h-[3.25rem] md:h-[4.5rem] border-t-2 border-dashed border-current/40 flex items-center justify-between gap-2">
                  <span className="flex items-baseline gap-1.5 leading-none">
                    {c.prixLibelle && <span className="text-[0.65rem] md:text-xs uppercase tracking-[0.08em] opacity-75">{c.prixLibelle}</span>}
                    <span className="font-affiche text-2xl md:text-4xl">{c.prix}</span>
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "hidden md:block h-3 w-3 border-b-2 border-r-2 border-current transition-transform",
                      actif ? "rotate-45 -translate-y-0.5" : "-rotate-45",
                    )}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div id="panneau-pass" role="tabpanel" aria-labelledby={`onglet-${choisi}`} className="scroll-mt-24">
        {/* Seul le pass choisi est monté : une seule vidéo à la fois. */}
        {panneaux[choisi]}
      </div>
    </>
  );
}
