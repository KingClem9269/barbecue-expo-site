import Image from "next/image";
import type { ReactNode } from "react";

/**
 * La bande de date des affiches : jours et mois empilés, filet, lieu, puis le
 * « B » en pied. Textes passés en props (traductions à la charge de la page).
 */
export default function BandeDate({
  jours,
  mois,
  annee,
  lieu,
  children,
}: {
  /** ex. « 12·13·14 » */
  jours: string;
  mois: string;
  annee: string;
  /** une ligne par entrée, ex. ["Parc Floral", "de Paris"] */
  lieu: string[];
  /** en pied de bande, ex. le bouton Billetterie */
  children?: ReactNode;
}) {
  return (
    <>
      <p className="font-affiche uppercase leading-[0.84] text-5xl md:text-6xl">
        {jours}
        <br />
        {mois}
        <br />
        {annee}
      </p>
      <hr className="border-0 border-t-[3px] border-charbon" />
      <p className="font-affiche uppercase leading-[0.95] text-xl md:text-2xl">
        {lieu.map((ligne, i) => (
          <span key={i} className="block">
            {ligne}
          </span>
        ))}
      </p>
      <Image src="/b-mark-noir.png" alt="" width={96} height={120} className="mt-auto w-14 md:w-16 h-auto" />
      {children}
    </>
  );
}
