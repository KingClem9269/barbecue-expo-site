"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Declencheur from "@/components/geste/Declencheur";
import Trait from "@/components/geste/Trait";
import Legende from "@/components/marque/Legende";

type Zone = { title: string; body: string; href: string; image: string };

/**
 * Liste « programme XXL » (comme l'affiche métro 2026) : une ligne en
 * capitales par zone, puces tracées à l'entrée dans l'écran (geste 2). Sur
 * grand écran, la photo suit la zone survolée ou focalisée ; sur mobile,
 * chaque zone a sa photo.
 */
export default function ZonesProgramme({ zones, legendeJour }: { zones: Zone[]; legendeJour: string }) {
  const [actif, setActif] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
      <Declencheur as="ul" className="puces-tracees lg:col-span-7 border-t-2 border-charbon">
        {zones.map((z, i) => (
          <li key={z.href} className="border-b-2 border-charbon">
            <Link
              href={z.href}
              onMouseEnter={() => setActif(i)}
              onFocus={() => setActif(i)}
              style={{ "--i": i } as CSSProperties}
              className="grid grid-cols-[2.25rem_minmax(0,1fr)] md:grid-cols-[3.25rem_minmax(0,1fr)] gap-x-3 md:gap-x-4 py-5 md:py-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-charbon focus-visible:ring-offset-2 focus-visible:ring-offset-jaune"
            >
              <Trait
                variante={i % 2 ? "court-2" : "court-1"}
                className="mt-2.5 md:mt-4 h-2.5 md:h-3 w-full text-charbon"
              />
              <span className="min-w-0">
                <span
                  className="lien-marque font-affiche uppercase leading-[0.9] text-3xl md:text-5xl"
                  style={{ "--lien-marque-couleur": "var(--color-papier)" } as CSSProperties}
                >
                  {z.title}
                </span>
                <span className="block mt-2 max-w-xl text-base md:text-lg leading-snug">{z.body}</span>
                <span className="lg:hidden relative block mt-4 aspect-[3/2] overflow-hidden bg-charbon">
                  <Image src={z.image} alt="" fill sizes="100vw" className="object-cover" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </Declencheur>

      <figure className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28 m-0">
        <div className="relative aspect-[4/5] overflow-hidden bg-charbon">
          {zones.map((z, i) => (
            <Image
              key={z.image}
              src={z.image}
              alt=""
              fill
              sizes="40vw"
              className={`object-cover transition-opacity duration-(--duree-geste) ease-sortie ${
                i === actif ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        <Legende jour={legendeJour} lieu={zones[actif]?.title} className="text-charbon/70" />
      </figure>
    </div>
  );
}
