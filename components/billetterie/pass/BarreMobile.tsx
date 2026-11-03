"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Sur mobile et tablette, un seul bouton « Prendre mes billets », collé en bas
 * de l'écran, mène au module de vente. Il s'efface quand le module est à
 * l'écran, et sa flèche remonte une fois le module dépassé.
 */
export default function BarreMobile({ libelle, detail }: { libelle: string; detail?: string }) {
  const [visible, setVisible] = useState(true);
  const [auDessus, setAuDessus] = useState(false);

  useEffect(() => {
    const cible = document.getElementById("billets");
    if (!cible) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        setVisible(!e.isIntersecting);
        setAuDessus(!e.isIntersecting && e.boundingClientRect.top < 0);
      },
      { threshold: 0.05 },
    );
    obs.observe(cible);
    return () => obs.disconnect();
  }, []);

  const Fleche = auDessus ? ArrowUp : ArrowDown;

  return (
    <div
      className={cn(
        "lg:hidden fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-charbon/95 backdrop-blur-sm transition-transform duration-300 ease-sortie",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <a
        href="#billets"
        className="flex items-center justify-between gap-3 bg-jaune text-charbon px-5 pt-3.5 pb-3 font-affiche uppercase text-2xl leading-none"
      >
        <span>{libelle}</span>
        <span className="flex items-center gap-2">
          {detail && <span className="font-sans normal-case text-sm font-semibold">{detail}</span>}
          <Fleche className="h-5 w-5" strokeWidth={2.5} />
        </span>
      </a>
    </div>
  );
}
