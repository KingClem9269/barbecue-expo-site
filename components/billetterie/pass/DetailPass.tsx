import Image from "next/image";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { Link } from "@/i18n/navigation";
import { PASS, prix, prixMini, type IdPass } from "@/lib/billets";
import { CHIFFRES, nombre } from "@/lib/chiffres";
import { SALON } from "@/lib/salon";
import { cn } from "@/lib/utils";
import BarreMobile from "./BarreMobile";
import ModuleBillets from "./ModuleBillets";
import { contenu } from "./contenu";

const APERCU = process.env.NEXT_PUBLIC_APERCU_BILLETTERIE === "1";

/**
 * Le contenu d'un pass, affiché sous les cartes de /billetterie : ce qu'on
 * vient vivre (vidéo, texte, temps forts, photos, questions) à gauche, et le
 * module de vente du pass en colonne collante à droite. Sur mobile, le module
 * est en bas et un bouton « Prendre mes billets » y mène directement.
 */
export default function DetailPass({
  pass,
  locale,
  palier,
}: {
  pass: IdPass;
  locale: string;
  palier: number;
}) {
  const t = contenu(locale);
  const p = t.pass[pass];
  const mini = prixMini(pass, palier);
  const enVente = PASS[pass].ouvert && (SALON.billetterieOuverte || APERCU);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-10 md:pt-14 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_25rem] gap-12 lg:gap-14">
        <div className="flex flex-col gap-14 md:gap-16 min-w-0">
          <header className="flex flex-col gap-3 -mb-6 md:-mb-8">
            <h2 className="font-affiche font-normal uppercase leading-[0.85] text-[clamp(2.75rem,6vw,5rem)]">
              {p.nom}
            </h2>
            <p className="max-w-2xl text-xl md:text-2xl leading-snug text-charbon/85">
              {p.accroche}
            </p>
          </header>

          {/* Vidéo */}
          <figure className="flex flex-col gap-2">
            <div className="relative aspect-video overflow-hidden bg-charbon">
              <YouTubeEmbed />
            </div>
            <figcaption className="text-xs text-fumee">{t.ui.video}</figcaption>
          </figure>

          {/* Texte incitatif */}
          <div className="flex flex-col gap-5 max-w-2xl">
            {p.texte.map((paragraphe, i) => (
              <p
                key={i}
                className={cn(
                  "leading-relaxed",
                  i === 0 ? "text-xl md:text-2xl" : "text-lg text-charbon/85",
                )}
              >
                {paragraphe}
              </p>
            ))}
            {pass !== "food" && (
              <ul className="mt-2 grid grid-cols-3 gap-px bg-charbon/15 border border-charbon/15">
                {[
                  [
                    nombre(CHIFFRES.visiteursAttendus2027, locale),
                    t.ui.chiffres.visiteurs,
                  ],
                  [nombre(CHIFFRES.marques2027, locale), t.ui.chiffres.marques],
                  [nombre(CHIFFRES.pays2027, locale), t.ui.chiffres.pays],
                ].map(([valeur, libelle]) => (
                  <li
                    key={libelle}
                    className="bg-papier px-3 py-4 flex flex-col gap-1"
                  >
                    <span className="font-affiche text-4xl md:text-5xl leading-none">
                      {valeur}
                    </span>
                    <span className="text-xs md:text-sm text-fumee">
                      {libelle}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Temps forts */}
          {p.tempsForts.length > 0 && (
            <section className="flex flex-col gap-6">
              <h2 className="font-affiche font-normal uppercase text-4xl md:text-5xl leading-[0.9]">
                {t.ui.tempsForts}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {p.tempsForts.map((f) => (
                  <li
                    key={f.titre}
                    className="border-t-2 border-charbon pt-3 flex flex-col gap-1.5"
                  >
                    <h3 className="font-affiche font-normal uppercase text-2xl leading-none">
                      {f.titre}
                    </h3>
                    <p className="text-charbon/80 leading-relaxed">{f.texte}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Photos */}
          <section className="flex flex-col gap-6">
            <h2 className="font-affiche font-normal uppercase text-4xl md:text-5xl leading-[0.9]">
              {t.ui.enImages}
            </h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {p.photos.map((photo, i) => (
                <li
                  key={photo.src}
                  className={cn(i === 0 && "col-span-2 row-span-2")}
                >
                  <figure className="flex h-full flex-col gap-1.5">
                    <div
                      className={cn(
                        "relative overflow-hidden flex-1",
                        i === 0
                          ? "aspect-square md:aspect-auto md:min-h-[20rem]"
                          : "aspect-[4/3]",
                      )}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.legende}
                        fill
                        sizes={
                          i === 0
                            ? "(min-width: 1024px) 45vw, 100vw"
                            : "(min-width: 1024px) 22vw, 50vw"
                        }
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="text-xs text-fumee">
                      {photo.legende}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>

          {/* Questions */}
          {p.questions.length > 0 && (
            <section className="flex flex-col gap-4 max-w-2xl">
              <h2 className="font-affiche font-normal uppercase text-4xl md:text-5xl leading-[0.9]">
                {t.ui.questions}
              </h2>
              <div className="border-t-2 border-charbon">
                {p.questions.map((item) => (
                  <details
                    key={item.q}
                    className="group border-b border-charbon/15 py-4"
                  >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-lg">
                      {item.q}
                      <span
                        aria-hidden
                        className="font-affiche text-2xl leading-none transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-charbon/80 leading-relaxed">
                      {item.r}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {pass === "individuel" && (
            <p className="text-sm text-fumee">
              {t.ui.proQuestion}{" "}
              <Link
                href="/billetterie/pro-b2b"
                className="lien-marque font-semibold text-charbon"
              >
                {t.ui.proLien}
              </Link>
            </p>
          )}
        </div>

        {/* Module de vente : colonne collante sur ordinateur, bas de page sur mobile */}
        <aside
          id="billets"
          className="scroll-mt-24 lg:sticky lg:top-[100px] lg:self-start pb-24 lg:pb-0"
        >
          <ModuleBillets pass={pass} palier={palier} />
        </aside>
      </div>

      <BarreMobile
        libelle={enVente ? t.ui.prendre : PASS[pass].ouvert ? t.ui.ouvertureProchaine : t.ui.foodAlerte}
        detail={enVente && mini !== null ? `${t.ui.des} ${prix(mini, locale)}` : undefined}
      />
    </>
  );
}
