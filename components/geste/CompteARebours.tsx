"use client";

import { useEffect, useRef, useState } from "react";
import { MOUVEMENT_REDUIT } from "@/lib/motion/jetons";
import { defiler } from "./volets";

function formater(ms: number) {
  const reste = Math.max(0, ms);
  const j = Math.floor(reste / 864e5);
  const h = Math.floor((reste % 864e5) / 36e5);
  const m = Math.floor((reste % 36e5) / 6e4);
  const deux = (n: number) => String(n).padStart(2, "0");
  return `${String(j).padStart(3, " ")}J ${deux(h)}H ${deux(m)}M`;
}

/**
 * Compte à rebours en cases à volets (jours, heures, minutes). Calculé côté
 * client uniquement : le HTML statique n'affiche pas une valeur périmée.
 */
export default function CompteARebours({
  cible,
  legende,
  className = "",
}: {
  /** date ISO, ex. « 2027-03-12T10:00:00+01:00 » */
  cible: string;
  /** préfixe lu par les lecteurs d'écran, ex. « Ouverture dans » */
  legende: string;
  className?: string;
}) {
  const [maintenant, setMaintenant] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const precedent = useRef<string | null>(null);

  useEffect(() => {
    const t0 = window.setTimeout(() => setMaintenant(Date.now()), 0);
    const id = window.setInterval(() => setMaintenant(Date.now()), 20000);
    return () => {
      window.clearTimeout(t0);
      window.clearInterval(id);
    };
  }, []);

  const texte = maintenant === null ? "···J ··H ··M" : formater(new Date(cible).getTime() - maintenant);

  // Bat les volets des chiffres qui changent (pas au premier affichage).
  useEffect(() => {
    const avant = precedent.current;
    precedent.current = texte;
    const el = ref.current;
    if (!el || avant === null || window.matchMedia(MOUVEMENT_REDUIT).matches) return;
    const annulations: Array<() => void> = [];
    el.querySelectorAll<HTMLElement>(".volet").forEach((c, i) => {
      if (avant[i] !== texte[i]) annulations.push(defiler(c, texte[i], i * 20, 3));
    });
    return () => annulations.forEach((a) => a());
  }, [texte]);

  const ms = maintenant === null ? null : new Date(cible).getTime() - maintenant;
  const lu =
    ms === null
      ? legende
      : `${legende} ${Math.floor(Math.max(0, ms) / 864e5)} jours, ${Math.floor((Math.max(0, ms) % 864e5) / 36e5)} heures`;

  return (
    <div className={className}>
      <div ref={ref} aria-hidden="true" className="flex gap-[0.1em]">
        {texte.split("").map((ch, i) => (
          <span key={i} className="volet">
            <span>{ch}</span>
          </span>
        ))}
      </div>
      <p className="sr-only">{lu}</p>
    </div>
  );
}
