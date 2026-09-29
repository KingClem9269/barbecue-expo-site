"use client";

import { useEffect, useRef } from "react";

// Paliers d'un brisket : on le sort vers 93-95 °C ; entre 65 et 75 °C, la
// température stagne (le « stall »), c'est là qu'on l'emballe.
const PALIERS: Array<[number, string]> = [
  [50, "Mise en température"],
  [65, "Ça monte"],
  [76, "Le plateau"],
  [93, "Emballé"],
  [Infinity, "Prêt à trancher"],
];

/**
 * Geste 7 · Le Thermomètre — progression de lecture affichée comme une sonde
 * de cuisson, de 20 °C à 95 °C. Pour les articles, le devis exposant et la
 * candidature Awards. Mises à jour directes du DOM (aucun rendu React au
 * défilement). Décoratif : aria-hidden.
 */
export default function Thermometre({ className = "" }: { className?: string }) {
  const niveau = useRef<HTMLSpanElement>(null);
  const temp = useRef<HTMLSpanElement>(null);
  const etat = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let attente = false;
    const lire = () => {
      attente = false;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
      const t = Math.round(20 + p * 75);
      if (niveau.current) niveau.current.style.width = `${(p * 100).toFixed(1)}%`;
      if (temp.current) temp.current.textContent = String(t);
      if (etat.current) etat.current.textContent = PALIERS.find(([max]) => t < max)?.[1] ?? "";
    };
    const surDefilement = () => {
      if (!attente) {
        attente = true;
        requestAnimationFrame(lire);
      }
    };
    lire();
    window.addEventListener("scroll", surDefilement, { passive: true });
    window.addEventListener("resize", surDefilement);
    return () => {
      window.removeEventListener("scroll", surDefilement);
      window.removeEventListener("resize", surDefilement);
    };
  }, []);

  return (
    <div aria-hidden="true" className={`flex items-center gap-2.5 bg-charbon text-papier px-3 py-2 ${className}`}>
      <span className="relative block w-16 h-1.5 bg-papier/20">
        <span ref={niveau} className="absolute inset-y-0 left-0 bg-jaune" style={{ width: 0 }} />
        {/* le plateau, de 65 à 76 °C */}
        <span className="absolute -top-[3px] h-3 border-x border-papier/50" style={{ left: "60%", width: "14.7%" }} />
      </span>
      <span className="font-affiche text-lg leading-none text-jaune">
        <span ref={temp}>20</span> °C
      </span>
      <span ref={etat} className="text-[11px] uppercase tracking-[0.05em]">
        Mise en température
      </span>
    </div>
  );
}
