"use client";

import { useState, type ReactNode } from "react";
import Decoupe from "@/components/geste/Decoupe";
import Tampon from "@/components/geste/Tampon";
import { RejouerContexte } from "@/components/geste/Declencheur";

const BOUTON =
  "mt-4 bg-jaune text-charbon font-affiche uppercase text-lg px-4 pt-2 pb-1.5 hover:bg-gold-300 transition-colors duration-(--duree-ui) focus:outline-none focus-visible:ring-2 focus-visible:ring-charbon focus-visible:ring-offset-2";

/** Découpe : passe d'une scène à l'autre à chaque clic. */
export function DemoDecoupe({ scenes }: { scenes: ReactNode[] }) {
  const [actif, setActif] = useState(0);
  return (
    <div>
      <Decoupe scenes={scenes} actif={actif} className="aspect-video bg-charbon" />
      <button type="button" className={BOUTON} onClick={() => setActif((i) => (i + 1) % scenes.length)}>
        Trancher
      </button>
    </div>
  );
}

const TAMPONS: Array<[string, number]> = [
  ["Early bird", -9],
  ["Complet", -5],
  ["Reçu", -12],
];

/** Tampon : chaque clic pose un tampon différent, jamais au même angle. */
export function DemoTampons({ billet }: { billet: ReactNode }) {
  const [n, setN] = useState(0);
  const [texte, angle] = TAMPONS[n % TAMPONS.length];
  return (
    <div>
      <div className="relative w-full max-w-[34rem]">
        {billet}
        <RejouerContexte.Provider value={n}>
          <span className="pointer-events-none absolute left-[30%] top-[26%] mix-blend-multiply">
            <Tampon key={n} angle={angle} className="text-braise text-4xl md:text-5xl">
              {texte}
            </Tampon>
          </span>
        </RejouerContexte.Provider>
      </div>
      <button type="button" className={BOUTON} onClick={() => setN((v) => v + 1)}>
        Tamponner
      </button>
    </div>
  );
}
