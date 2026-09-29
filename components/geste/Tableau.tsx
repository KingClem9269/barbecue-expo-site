"use client";

import { useContext, useEffect, useRef } from "react";
import { MOUVEMENT_REDUIT } from "@/lib/motion/jetons";
import { RejouerContexte } from "./Declencheur";
import { aligner, defiler } from "./volets";

/**
 * Geste 4 · Le Tableau — un tableau d'affichage à volets, comme les panneaux
 * horaires jaunes de la Grill Arena. Le texte final est rendu côté serveur ;
 * à l'entrée dans l'écran, les volets défilent puis s'arrêtent colonne par
 * colonne. Pour les horaires, les résultats et les chiffres clés (à la place
 * des compteurs qui défilent).
 */
export default function Tableau({
  lignes,
  largeurs,
  legende,
  className = "",
}: {
  lignes: string[][];
  /** nombre de cases par colonne */
  largeurs: number[];
  /** version texte, lue par les lecteurs d'écran */
  legende: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rejoue = useContext(RejouerContexte) > 0;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia(MOUVEMENT_REDUIT).matches) return;
    const annulations: Array<() => void> = [];
    const jouer = () =>
      el.querySelectorAll<HTMLElement>(".volet").forEach((c) =>
        annulations.push(
          defiler(
            c,
            c.dataset.cible ?? " ",
            Number(c.dataset.col) * 14 + Number(c.dataset.ligne) * 90,
            5 + Math.floor(Math.random() * 7),
          ),
        ),
      );
    if (rejoue) {
      jouer();
      return () => annulations.forEach((a) => a());
    }
    const io = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          jouer();
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      annulations.forEach((a) => a());
    };
  }, [rejoue]);

  return (
    <div className={className}>
      <div ref={ref} aria-hidden="true" className="grid gap-[0.7em] overflow-x-auto pb-1">
        {lignes.map((ligne, l) => {
          let col = 0;
          return (
            <div key={l} className="flex flex-wrap gap-x-[0.55em] gap-y-[0.3em]">
              {ligne.map((cellule, k) => (
                <div key={k} className="flex shrink-0 gap-[0.1em]">
                  {aligner(cellule, largeurs[k] ?? cellule.length)
                    .split("")
                    .map((ch, i) => (
                      <span key={i} className="volet" data-cible={ch} data-ligne={l} data-col={col++}>
                        <span>{ch}</span>
                      </span>
                    ))}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <p className="sr-only">{legende}</p>
    </div>
  );
}
