import Image from "next/image";
import { Play } from "lucide-react";
import EcosystemLinks from "@/components/ecosystem/EcosystemLinks";
import Saisie from "@/components/geste/Saisie";
import Bouton from "@/components/marque/Bouton";
import Etiquette from "@/components/marque/Etiquette";
import { Link } from "@/i18n/navigation";
import { ORDRE_PASS, PALIERS, PASS, palierCourant, prix, prixMini, type IdPass } from "@/lib/billets";
import { CHIFFRES, nombre } from "@/lib/chiffres";
import { PHOTOS_GALERIE } from "@/lib/galerie";
import { SALON, edition, libelleBilletterie, mois } from "@/lib/salon";
import BarreMobile from "./BarreMobile";
import ModuleBillets from "./ModuleBillets";
import MosaiqueBilletterie from "./MosaiqueBilletterie";
import VideoOfficielle from "./VideoOfficielle";
import { contenu } from "./contenu";
import { ORDRE_PROGRAMME, PHOTOS_MOSAIQUE, PHOTOS_PROGRAMME, salon } from "./salon";

/** Vente 2027 ouverte, ou aperçu interne du module (variable d'environnement). */
const VENTE = SALON.billetterieOuverte || process.env.NEXT_PUBLIC_APERCU_BILLETTERIE === "1";

/**
 * La billetterie grand public, commune à /billetterie et /billetterie/<pass>,
 * construite comme une page d'événement : la mosaïque de photos en tête, puis
 * la présentation du salon (titre, accroche, chiffres, description, programme,
 * film, questions) à gauche et le module de vente collant à droite. Sur mobile, le module vient
 * juste après la description et un bouton collé en bas de l'écran y mène.
 */
export default function PageBilletterie({ locale, initial }: { locale: string; initial: IdPass }) {
  const t = contenu(locale);
  const s = salon(locale);
  const palier = palierCourant();
  const fin = PALIERS[palier].fin;
  const finPalier = fin
    ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", timeZone: "Europe/Paris" }).format(new Date(fin))
    : null;

  const minis = ORDRE_PASS.filter((id) => PASS[id].ouvert)
    .map((id) => prixMini(id, palier))
    .filter((p): p is number => p !== null);
  const mini = VENTE && minis.length ? Math.min(...minis) : null;

  // La mosaïque d'abord, puis le reste de la galerie du site dans la visionneuse.
  const photos = [...PHOTOS_MOSAIQUE, ...PHOTOS_GALERIE.filter((p) => !PHOTOS_MOSAIQUE.includes(p))];

  const chiffres: [string, string][] = [
    [`${nombre(CHIFFRES.surfaceInterieure2027, locale)} m²`, s.chiffres.interieur],
    [`${nombre(CHIFFRES.surfaceExterieure2027, locale)} m²`, s.chiffres.exterieur],
    [nombre(CHIFFRES.marques2027, locale), s.chiffres.marques],
    [nombre(CHIFFRES.visiteursAttendus2027, locale), s.chiffres.visiteurs],
  ];

  return (
    <div className="bg-papier text-charbon">
      {/* pt = hauteur de la navigation fixe */}
      <section className="bg-charbon pt-[76px] md:pt-[82px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-3 md:pt-8 pb-6 md:pb-10">
          <MosaiqueBilletterie
            photos={photos}
            labels={{
              galerie: s.ui.galerie,
              photoAlt: s.ui.photo,
              video: s.ui.video,
              open: s.ui.agrandir,
              close: s.ui.fermer,
              prev: s.ui.precedente,
              next: s.ui.suivante,
            }}
          />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-8 md:pt-12 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_25rem] gap-x-14 gap-y-12">
        {/* Présentation : titre, accroche, chiffres, description */}
        <div className="flex flex-col gap-8 min-w-0 lg:col-start-1">
          <header className="flex flex-col gap-4">
            <p className="text-xs md:text-sm uppercase tracking-[0.08em] text-fumee">
              {libelleBilletterie(locale)} · {SALON.jours} {mois(locale)} {SALON.annee} · {SALON.lieu.join(" ")}
            </p>
            <Saisie
              as="h1"
              mode="chargement"
              className="font-affiche font-normal uppercase leading-[0.82] text-[clamp(3rem,7vw,5.5rem)]"
            >
              Barbecue Expo {SALON.annee}
            </Saisie>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <Etiquette ton="charbon">{edition(locale)}</Etiquette>
              {VENTE && finPalier && (
                <>
                  <Etiquette ton="jaune">{t.paliers[PALIERS[palier].id]}</Etiquette>
                  <span className="text-sm md:text-base text-charbon/80">{t.ui.jusquau(finPalier)}</span>
                </>
              )}
              <Bouton href="#film-officiel" className="text-base md:text-lg px-3.5 pt-2 pb-1.5">
                <Play className="h-4 w-4 -translate-y-px" fill="currentColor" strokeWidth={0} />
                {s.ui.voirVideo}
              </Bouton>
            </div>
          </header>

          <p className="max-w-2xl text-xl md:text-2xl leading-snug">{s.accroche}</p>

          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-charbon/15 border border-charbon/15">
            {chiffres.map(([valeur, libelle]) => (
              <li key={libelle} className="bg-papier px-3 py-4 flex flex-col gap-1">
                <span className="font-affiche text-4xl leading-none whitespace-nowrap">{valeur}</span>
                <span className="text-xs md:text-sm text-fumee">{libelle}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-5 max-w-2xl">
            {s.texte.map((paragraphe, i) => (
              <p key={i} className="text-lg leading-relaxed text-charbon/85">
                {paragraphe}
              </p>
            ))}
          </div>
        </div>

        {/* Module de vente : colonne collante sur ordinateur, après la description sur mobile */}
        <aside id="billets" className="scroll-mt-24 lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <div className="lg:sticky lg:top-[100px]">
            <ModuleBillets initial={initial} palier={palier} />
          </div>
        </aside>

        {/* Programme, film, questions */}
        <div className="flex flex-col gap-14 md:gap-16 min-w-0 lg:col-start-1 lg:pt-2">
          <section className="flex flex-col gap-6">
            <h2 className="font-affiche font-normal uppercase text-4xl md:text-5xl leading-[0.9]">{s.ui.programme}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-9">
              {ORDRE_PROGRAMME.map((id) => (
                <li key={id} className="flex flex-col gap-3">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-charbon">
                    <Image
                      src={PHOTOS_PROGRAMME[id]}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 18vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-affiche font-normal uppercase text-2xl md:text-[1.75rem] leading-none">
                    {s.programme[id].titre}
                  </h3>
                  <p className="text-charbon/80 leading-relaxed">{s.programme[id].texte}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Cible du bouton « Voir la vidéo » de l'en-tête (marge = navigation fixe) */}
          <section id="film-officiel" className="flex flex-col gap-5 scroll-mt-28">
            <h2 className="font-affiche font-normal uppercase text-4xl md:text-5xl leading-[0.9]">{s.ui.film}</h2>
            <VideoOfficielle poster="/photos-2026/zone-grill-arena.jpg" titre={s.ui.film} lancer={s.ui.lancer} />
          </section>

          <section className="flex flex-col gap-4 max-w-2xl">
            <h2 className="font-affiche font-normal uppercase text-4xl md:text-5xl leading-[0.9]">{t.ui.questions}</h2>
            <div className="border-t-2 border-charbon">
              {s.questions.map((item) => (
                <details key={item.q} className="group border-b border-charbon/15 py-4">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-lg">
                    {item.q}
                    <span aria-hidden className="font-affiche text-2xl leading-none transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-charbon/80 leading-relaxed">{item.r}</p>
                </details>
              ))}
            </div>
          </section>

          <p className="text-sm text-fumee">
            {t.ui.proQuestion}{" "}
            <Link href="/billetterie/pro-b2b" className="lien-marque font-semibold text-charbon">
              {t.ui.proLien}
            </Link>
          </p>
        </div>
      </div>

      <BarreMobile
        libelle={VENTE ? t.ui.prendre : t.ui.ouvertureProchaine}
        detail={mini !== null ? `${t.ui.des} ${prix(mini, locale)}` : undefined}
      />

      <section className="pb-14 md:pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <EcosystemLinks locale={locale} items={["fest", "piment"]} />
        </div>
      </section>
    </div>
  );
}
