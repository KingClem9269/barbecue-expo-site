import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Saisie from "@/components/geste/Saisie";
import TraceB from "@/components/geste/TraceB";
import Trait, { type VarianteTrait } from "@/components/geste/Trait";
import Tableau from "@/components/geste/Tableau";
import CompteARebours from "@/components/geste/CompteARebours";
import Fiche from "@/components/geste/Fiche";
import Thermometre from "@/components/geste/Thermometre";
import Braise from "@/components/geste/Braise";
import { Rejouer } from "@/components/geste/Declencheur";
import Affiche from "@/components/marque/Affiche";
import BandeDate from "@/components/marque/BandeDate";
import Bouton from "@/components/marque/Bouton";
import Etiquette from "@/components/marque/Etiquette";
import Ticket from "@/components/marque/Ticket";
import Legende from "@/components/marque/Legende";
import Bandeau from "@/components/marque/Bandeau";
import { PARTNERS } from "@/lib/partners";
import { getCountryName, getPitmasterBySlug } from "@/lib/pitmasters";
import { DemoDecoupe, DemoTampons } from "./Demos";

/**
 * Banc d'essai « Marqué au feu » (phase 1) : chaque geste et chaque
 * composant, sur le vrai site, avant d'entrer dans une page. Non indexé,
 * absent de la production (404), visible en local et sur les previews.
 */
export const metadata: Metadata = {
  title: "Lab · Marqué au feu",
  robots: { index: false, follow: false },
};

const TRAITS: VarianteTrait[] = ["long-1", "long-2", "long-3", "long-4", "court-1", "court-2", "court-3"];

function Bloc({
  numero,
  titre,
  children,
  intro,
}: {
  numero: string;
  titre: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="py-14 md:py-20 border-t-2 border-charbon">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-3">
        <Etiquette ton="charbon">{numero}</Etiquette>
        <h2 className="font-affiche uppercase font-normal leading-[0.9] text-4xl md:text-6xl text-charbon">{titre}</h2>
      </div>
      <p className="max-w-2xl text-fumee text-base md:text-lg leading-relaxed mb-8">{intro}</p>
      {children}
    </section>
  );
}

export default async function LabPage() {
  if (process.env.VERCEL_ENV === "production") notFound();
  const olson = await getPitmasterBySlug("david-w-olson");

  return (
    <div className="bg-papier text-charbon">
      <Thermometre className="fixed bottom-20 right-4 z-40 lg:bottom-4" />

      {/* En-tête */}
      <header className="bg-charbon text-papier pt-32 pb-14 md:pt-40 md:pb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_12rem] gap-10 items-end">
          <div>
            <Etiquette>Lab · phase 1</Etiquette>
            <Saisie as="h1" mode="chargement" className="mt-6 font-affiche uppercase font-normal leading-[0.84] text-7xl md:text-9xl text-jaune">
              Marqué
              <br />
              au feu
            </Saisie>
            <p className="mt-6 max-w-xl text-papier/85 text-lg leading-relaxed">
              Les gestes et composants de la refonte, sur le vrai site, avant d&apos;entrer dans une page. Page non indexée,
              absente de la production. Pour voir les versions « mouvement réduit », activez l&apos;option dans les réglages
              d&apos;accessibilité de votre système.
            </p>
          </div>
          <TraceB mode="chargement" className="text-jaune w-32 md:w-48" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Couleurs et typographie */}
        <Bloc
          numero="Base"
          titre="Couleurs et capitales"
          intro="Le jaune se pose en aplat, jamais en liseré ni en halo. Les titres sont en SansPlomb capitales, dans leur graisse réelle et sans resserrer les lettres."
        >
          <div className="grid grid-cols-2 md:grid-cols-5 border border-charbon/15">
            {[
              ["Jaune Expo", "#F4AD3C", "bg-jaune text-charbon", "aplats"],
              ["Charbon", "#0C0B0A", "bg-charbon text-papier", "panneaux, texte"],
              ["Papier", "#FBFAF6", "bg-papier text-charbon", "lecture"],
              ["Fumée", "#5C5850", "bg-fumee text-papier", "texte secondaire"],
              ["Braise", "#B8390F", "bg-braise text-white", "encre de tampon"],
            ].map(([nom, hex, classes, role]) => (
              <div key={nom} className={`${classes} min-h-36 p-4 flex flex-col justify-end last:col-span-2 md:last:col-span-1`}>
                <span className="font-affiche uppercase text-2xl leading-none">{nom}</span>
                <span className="text-xs uppercase tracking-[0.06em] mt-1">
                  {hex} · {role}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-10 font-affiche uppercase leading-[0.9] text-5xl md:text-7xl">
            Le plan <span className="bg-jaune px-2">du salon</span>
          </p>
        </Bloc>

        {/* Geste 1 */}
        <Bloc
          numero="Geste 1"
          titre="La Saisie"
          intro="Le titre apparaît en marques de grill incandescentes, inclinées comme les traits du « B », puis refroidit en aplat. Survolez « Billetterie » : c'est la seule braise du site."
        >
          <Rejouer>
            <Affiche
              bande={
                <BandeDate jours="12·13·14" mois="mars" annee="2027" lieu={["Parc Floral", "de Paris"]}>
                  <Braise className="self-stretch">
                    <Bouton variante="charbon" className="w-full">
                      Billetterie
                    </Bouton>
                  </Braise>
                </BandeDate>
              }
              pied={<Bandeau logos={PARTNERS.map((p) => ({ src: p.logo, alt: p.name }))} />}
            >
              <p className="text-xs uppercase tracking-[0.08em] text-papier/75">6ᵉ édition · 12, 13 et 14 mars 2027</p>
              <Saisie as="p" mode="chargement" className="font-affiche uppercase leading-[0.84] text-6xl md:text-8xl text-jaune mt-auto">
                Barbecue
                <br />
                Expo
              </Saisie>
              <p className="font-affiche uppercase text-xl text-jaune">The world grills in Paris</p>
            </Affiche>
          </Rejouer>
        </Bloc>

        {/* Geste 2 */}
        <Bloc
          numero="Geste 2"
          titre="La Marque"
          intro="Les vrais coups de pinceau du logo, extraits du fichier du « B » et remis à l'horizontale. Ils remplacent les flèches qui glissent, les filets dorés et les puces."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-4">
              {TRAITS.map((v) => (
                <div key={v} className="flex items-center gap-4">
                  <Trait variante={v} className="h-3 w-56 md:w-72 text-charbon" />
                  <span className="text-xs uppercase tracking-[0.06em] text-fumee">trait-{v}</span>
                </div>
              ))}
            </div>
            <div className="bg-charbon text-papier p-6 md:p-8 flex flex-col gap-5">
              <p className="text-lg leading-relaxed">
                Soulignement au survol : <a href="#" className="lien-marque">voir le programme</a>, lire{" "}
                <a href="#" className="lien-marque">les infos pratiques</a>.
              </p>
              <ul className="flex flex-col gap-2 text-lg">
                {["Les légendes du BBQ", "Compétitions internationales", "Dégustations et masterclasses"].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <Trait variante="court-2" className="h-2 w-6 text-jaune shrink-0" />
                    <span className="font-affiche uppercase text-2xl leading-none">{t}</span>
                  </li>
                ))}
              </ul>
              <Trait variante="long-2" className="h-3 w-full text-jaune" />
            </div>
          </div>
          <Rejouer className="mt-12">
            <div className="grid grid-cols-2 gap-6 max-w-lg">
              <div className="bg-charbon p-6">
                <TraceB mode="chargement" className="text-jaune" />
              </div>
              <div className="bg-jaune p-6">
                <TraceB mode="chargement" className="text-charbon" />
              </div>
            </div>
          </Rejouer>
        </Bloc>

        {/* Geste 3 */}
        <Bloc
          numero="Geste 3"
          titre="Le Tampon"
          intro="Early bird, complet, nouveau, pastilles Awards, « reçu » après un formulaire. Impact, léger rebond, encre irrégulière. En production : un vrai tampon scanné pour la texture."
        >
          <div className="bg-jaune p-6 md:p-10">
            <DemoTampons
              billet={
                <Ticket
                  talon={
                    <>
                      <span className="text-[11px] font-semibold tracking-[0.05em] [writing-mode:vertical-rl] rotate-180">
                        N° 2027-0412
                      </span>
                      <Image src="/b-mark-noir.png" alt="" width={96} height={120} className="w-10 h-auto" />
                    </>
                  }
                >
                  <p className="text-[11px] uppercase tracking-[0.08em]">Barbecue Expo · 6ᵉ édition</p>
                  <p className="font-affiche uppercase leading-[0.84] text-5xl md:text-6xl my-2">
                    Pass
                    <br />
                    samedi
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.04em]">13.03.2027 · Parc Floral de Paris</p>
                </Ticket>
              }
            />
          </div>
        </Bloc>

        {/* Geste 4 */}
        <Bloc
          numero="Geste 4"
          titre="Le Tableau"
          intro="Un tableau à volets, comme les panneaux horaires jaunes de la Grill Arena. Il remplace les compteurs qui défilent. Données : le programme des duels déjà rédigé dans BattleSchedule.tsx (à réconcilier avec les horaires des fiches pitmasters)."
        >
          <Rejouer>
            <div className="bg-[#141311] text-papier p-5 md:p-8 flex flex-col gap-5">
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <span className="font-affiche uppercase text-2xl text-jaune leading-none">Grill Arena</span>
                <span className="text-xs uppercase tracking-[0.1em] text-papier/60">Programme des duels</span>
              </div>
              <Tableau
                className="text-[17px] md:text-[26px]"
                lignes={[
                  ["VEN 12.03", "19:00", "HUITIÈMES", "8 DUELS"],
                  ["SAM 13.03", "19:00", "QUARTS·DEMIS", "6 DUELS"],
                  ["DIM 14.03", "20:00", "FINALE", "1 TITRE"],
                ]}
                largeurs={[9, 5, 12, 7]}
                legende="Grill Arena : vendredi 12 mars à 19 h, huitièmes de finale, 8 duels ; samedi 13 mars à 19 h, quarts et demi-finales, 6 duels ; dimanche 14 mars à 20 h, finale."
              />
              <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-4">
                <span className="text-xs uppercase tracking-[0.1em] text-papier/60">Avant le 12 mars 2027</span>
                <CompteARebours
                  cible="2027-03-12T00:00:00+01:00"
                  legende="Ouverture du salon dans"
                  className="text-[17px] md:text-[26px]"
                />
              </div>
            </div>
          </Rejouer>
        </Bloc>

        {/* Geste 5 */}
        <Bloc
          numero="Geste 5"
          titre="La Découpe"
          intro="Un coup de couteau à l'angle du « B », puis les deux moitiés s'écartent. Pour changer de jour dans le programme, basculer Grand public / Pro, puis (phase 2) passer d'une page à l'autre."
        >
          <DemoDecoupe
            scenes={[
              <div key="a" className="h-full w-full bg-charbon flex flex-col justify-end p-6 md:p-10 gap-3">
                <span className="font-affiche uppercase leading-[0.82] text-jaune text-7xl md:text-9xl">
                  Grill
                  <br />
                  Arena
                </span>
                <span className="text-xs uppercase tracking-[0.06em] text-papier">16 pitmasters · 90 minutes par duel</span>
              </div>,
              <figure key="b" className="relative h-full w-full bg-jaune m-0">
                <div className="absolute inset-x-0 top-0 bottom-10">
                  <Image
                    src="/photos-2026/bbq-expo-690.jpg"
                    alt="Panneau « Continental Final, U.S. vs Europe » sur la scène Grill Arena"
                    fill
                    sizes="(max-width: 1024px) 100vw, 72rem"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-10 flex items-center px-4">
                  <Legende lieu="Grill Arena" texte="Panneau Continental Final" jour="Avril 2026" className="mt-0 text-charbon" />
                </div>
              </figure>,
            ]}
          />
        </Bloc>

        {/* Geste 6 */}
        {olson && (
          <Bloc
            numero="Geste 6"
            titre="Le Retournement"
            intro="On retourne la fiche comme une pièce sur la grille. Recto : le portrait. Verso : ce qui fait venir un visiteur. Données : content/pitmasters/index.json."
          >
            <Fiche
              libelle={`Retourner la fiche de ${olson.name}`}
              className="aspect-[2/3] w-64 md:w-72"
              recto={
                <div className="relative h-full bg-charbon text-papier flex flex-col">
                  <div className="relative flex-1">
                    {olson.portrait && (
                      <Image src={olson.portrait} alt="" fill sizes="18rem" className="object-cover object-top" />
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-affiche uppercase text-3xl leading-[0.9] text-jaune">{olson.name}</p>
                    <p className="text-[11px] uppercase tracking-[0.06em] mt-1">
                      {getCountryName(olson.country, "fr")}
                      {olson.stand ? ` · stand ${olson.stand}` : ""}
                    </p>
                  </div>
                </div>
              }
              verso={
                <div className="h-full bg-jaune text-charbon p-4 flex flex-col gap-2.5">
                  <p className="font-affiche uppercase text-3xl leading-[0.88] mb-1">{olson.name}</p>
                  <p className="border-t-2 border-charbon pt-1.5 text-sm leading-snug">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.08em]">Spécialité</span>
                    {olson.specialty}
                  </p>
                  {olson.sessions?.map((s) => (
                    <p key={`${s.day}-${s.time}`} className="border-t-2 border-charbon pt-1.5 text-sm leading-snug">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.08em]">{s.type}</span>
                      {s.day} {s.time} · {s.title}
                    </p>
                  ))}
                  {olson.social?.followers ? (
                    <p className="border-t-2 border-charbon pt-1.5 text-sm leading-snug">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.08em]">Instagram</span>
                      {olson.social.followers.toLocaleString("fr")} abonnés
                    </p>
                  ) : null}
                </div>
              }
            />
          </Bloc>
        )}

        {/* Geste 7 */}
        <Bloc
          numero="Geste 7"
          titre="Le Thermomètre"
          intro="En bas à droite : la progression de lecture en sonde de cuisson, de 20 °C à 95 °C (« prêt à trancher »), avec le plateau entre 65 et 75 °C que connaît tout pitmaster. Pour les articles, le devis exposant et la candidature Awards."
        >
          <p className="text-fumee">Faites défiler la page pour le voir monter.</p>
        </Bloc>

        {/* Composants */}
        <Bloc
          numero="Composants"
          titre="Étiquettes, boutons, légendes"
          intro="Deux familles de boutons au lieu de onze, des étiquettes qui portent une information, et une légende datée et créditée sous chaque photo."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Etiquette>Sam. 13 mars · 16:30</Etiquette>
            <Etiquette ton="charbon">Stand A12</Etiquette>
            <Etiquette ton="contour">Nouveau</Etiquette>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Bouton href="/billetterie">Billetterie</Bouton>
            <Bouton href="/programme" variante="charbon">
              Le programme
            </Bouton>
            <Bouton href="/infos-pratiques" variante="contour">
              Infos pratiques
            </Bouton>
            <span className="bg-charbon p-3 inline-flex">
              <Bouton href="/pro" variante="contour-clair">
                Espace pro
              </Bouton>
            </span>
          </div>
          <figure className="mt-10 max-w-3xl">
            <div className="relative aspect-[3/2]">
              <Image
                src="/photos-2026/william-plin-jpc-110426-533a4969.jpg"
                alt="La scène du salon, son grand « B » rayé en fond jaune, et le public"
                fill
                sizes="(max-width: 768px) 100vw, 48rem"
                className="object-cover"
              />
            </div>
            <Legende jour="Sam. 11.04.2026" lieu="Scène principale" auteur="William Plin" />
          </figure>
        </Bloc>
      </div>
    </div>
  );
}
