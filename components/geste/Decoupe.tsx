"use client";

import { useState, type ReactNode } from "react";
import { useMouvementReduit } from "@/lib/motion/useMouvementReduit";

/**
 * Geste 5 · La Découpe — passage d'une scène à l'autre par un coup de
 * couteau à l'angle du « B » : la lame traverse, puis les deux moitiés de
 * l'ancienne scène s'écartent. Contrôlé par `actif`. Les scènes doivent avoir
 * la même hauteur (donner un format au conteneur via className).
 * Usages : jours du programme, bascule Grand public / Pro, puis transitions
 * de page (phase 2).
 */
export default function Decoupe({
  scenes,
  actif,
  className = "",
}: {
  scenes: ReactNode[];
  actif: number;
  className?: string;
}) {
  const reduit = useMouvementReduit();
  const [affiche, setAffiche] = useState(actif);
  const [ancienne, setAncienne] = useState<number | null>(null);

  // Changement de scène : on garde l'ancienne le temps de la trancher.
  if (actif !== affiche) {
    setAffiche(actif);
    setAncienne(reduit ? null : affiche);
  }

  return (
    <div className={`decoupe ${className}`}>
      <div className="h-full">{scenes[actif]}</div>
      {ancienne !== null && (
        <>
          <div className="decoupe-moitie decoupe-moitie--haut" aria-hidden="true" inert>
            {scenes[ancienne]}
          </div>
          <div
            className="decoupe-moitie decoupe-moitie--bas"
            aria-hidden="true"
            inert
            onAnimationEnd={(e) => {
              if (e.target === e.currentTarget) setAncienne(null);
            }}
          >
            {scenes[ancienne]}
          </div>
          <span className="decoupe-couteau" aria-hidden="true" />
        </>
      )}
    </div>
  );
}
