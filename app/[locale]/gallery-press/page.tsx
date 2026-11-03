import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Quote } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import PressCoverage from "@/components/PressCoverage";
import GalleryMosaic from "@/components/GalleryMosaic";
import { getLocale } from "next-intl/server";

/** Photos des éditions (2026 et précédentes), dans l'ordre de la mosaïque. */
const ALL_PHOTOS = [
  "/photos-2026/bbq-expo-008.jpg", "/photos-2026/bbq-expo-014.jpg",
  "/photos-2026/william-plin-jpc-120426-533a7828.jpg", "/photos-2026/bbq-expo-066.jpg",
  "/photos-2026/bbq-expo-073.jpg", "/photos-editions/533a7509.jpg",
  "/photos-2026/bbq-expo-078.jpg", "/photos-2026/bbq-expo-105.jpg",
  "/photos-2026/bbq-expo-154.jpg", "/photos-2026/bbq-expo-107.jpg",
  "/photos-2026/bbq-expo-129.jpg", "/photos-editions/j7i3281.jpg",
  "/photos-2026/bbq-expo-155.jpg", "/photos-2026/bbq-expo-171.jpg",
  "/photos-editions/bbqexpo-mars24-ninacoriton-114.jpg", "/photos-2026/bbq-expo-184.jpg",
  "/photos-2026/bbq-expo-268.jpg", "/photos-2026/william-plin-jpc-120426-533a7138.jpg",
  "/photos-2026/bbq-expo-293.jpg", "/photos-2026/bbq-expo-302.jpg",
  "/photos-editions/img-7929.jpg", "/photos-2026/bbq-expo-403.jpg",
  "/photos-2026/bbq-expo-404.jpg", "/photos-2026/bbq-expo-789.jpg",
  "/photos-2026/bbq-expo-441.jpg", "/photos-2026/bbq-expo-477.jpg",
  "/photos-editions/j7i1640.jpg", "/photos-2026/bbq-expo-688.jpg",
  "/photos-2026/bbq-expo-689.jpg", "/photos-2026/bbq-expo-645.jpg",
  "/photos-2026/bbq-expo-690.jpg", "/photos-2026/bbq-expo-720.jpg",
  "/photos-editions/bbqexpo-mars24-ninacoriton-053.jpg", "/photos-2026/bbq-expo-737.jpg",
  "/photos-2026/bbq-expo-740.jpg", "/photos-2026/bbq-expo-765.jpg",
  "/photos-2026/william-plin-jpc-110426-533a2850.jpg", "/photos-2026/william-plin-jpc-110426-533a3101.jpg",
  "/photos-editions/j7i2225.jpg", "/photos-2026/william-plin-jpc-110426-533a3756.jpg",
  "/photos-2026/william-plin-jpc-110426-533a4088.jpg", "/photos-2026/william-plin-jpc-110426-533a3838.jpg",
  "/photos-2026/william-plin-jpc-110426-533a4134.jpg", "/photos-2026/william-plin-jpc-110426-533a4353.jpg",
  "/photos-editions/j7i1963.jpg", "/photos-2026/william-plin-jpc-110426-533a4426.jpg",
  "/photos-2026/william-plin-jpc-110426-533a4660.jpg", "/photos-2026/bbq-expo-563.jpg",
  "/photos-2026/william-plin-jpc-110426-533a4856.jpg", "/photos-2026/william-plin-jpc-110426-533a4869.jpg",
  "/photos-editions/img-8188.jpg", "/photos-2026/william-plin-jpc-110426-533a4931.jpg",
  "/photos-2026/william-plin-jpc-110426-533a4969.jpg", "/photos-editions/j7i1575.jpg",
  "/photos-2026/william-plin-jpc-110426-533a5984.jpg", "/photos-2026/william-plin-jpc-110426-533a6023.jpg",
  "/photos-2026/william-plin-jpc-110426-533a4065.jpg", "/photos-2026/william-plin-jpc-110426-533a6029.jpg",
  "/photos-2026/william-plin-jpc-120426-533a6296.jpg", "/photos-editions/bbqexpo-mars24-ninacoriton-130.jpg",
  "/photos-2026/william-plin-jpc-120426-533a6497.jpg", "/photos-2026/william-plin-jpc-120426-533a6691.jpg",
  "/photos-2026/bbq-expo-615.jpg", "/photos-2026/william-plin-jpc-120426-533a6712.jpg",
  "/photos-2026/william-plin-jpc-120426-533a6971.jpg", "/photos-editions/j7i1328.jpg",
  "/photos-2026/william-plin-jpc-120426-533a8137.jpg", "/photos-2026/william-plin-jpc-120426-533a8581.jpg",
  "/photos-2026/william-plin-jpc-120426-533a7139.jpg", "/photos-editions/img-7808.jpg",
  "/photos-editions/bbqexpo-mars24-ninacoriton-021.jpg", "/photos-editions/j7i1281.jpg",
  "/photos-editions/bbqexpo-mars24-ninacoriton-046.jpg",
];

// Citations de presse réelles : à conserver mot pour mot dans leur langue d'origine (ne pas traduire).
const PRESS_QUOTES = [
  {
    media: "Le Figaro Cuisine",
    quote: "L'événement BBQ qui manquait à l'Europe — enfin un format à la hauteur de la passion qui anime ses fans.",
    edition: "apr",
  },
  {
    media: "Saveurs Magazine",
    quote: "On y croise des pitmasters internationaux comme nulle part ailleurs. Trois jours qui font autorité dans le métier.",
    edition: "may",
  },
  {
    media: "Le Parisien",
    quote: "Vingt-cinq mille visiteurs, plus de deux cents marques. Le Parc Floral retrouve un grand rendez-vous gastronomique.",
    edition: "apr",
  },
  {
    media: "Maxi Cuisine",
    quote: "La nouvelle référence européenne, et probablement la seule où la qualité du contenu rivalise avec le spectacle.",
    edition: "may",
  },
] as const;

const PRESS_PARTNERS = [
  "Saveurs", "Le Figaro Cuisine", "Maxi Cuisine", "Le Parisien", "BBQ Mag",
  "Régal", "Les Grands Chefs", "FoodBeast", "Eater", "Vice Munchies",
  "Cuisine et Vins de France", "Trois Étoiles", "Atabula", "Time Out", "Telerama",
];

const FR = {
  metaTitle: "Galerie & Presse — Barbecue Expo 2027",
  metaDescription: "Photos de l'édition 2026 et coupures de presse. Tout ce que les médias retiennent du salon.",
  eyebrow: "Galerie & Presse · Édition 2026",
  heroTitle: "Ce qu'on a vécu en 2026.",
  heroParagraph:
    "Soixante-treize photos du salon et sa vidéo. Plus de soixante-cinq retombées presse. Voici la trace écrite et visuelle de la première édition.",
  galleryEyebrow: "Galerie",
  galleryTitle: "Soixante-treize images.",
  photoAlt: "Édition 2026",
  video: "Vidéo du salon",
  open: "Agrandir",
  close: "Fermer",
  prev: "Précédente",
  next: "Suivante",
  pressEyebrow: "Ils en parlent",
  pressTitle: "Soixante-cinq retombées presse en 2026.",
  editions: { apr: "Avril 2026", may: "Mai 2026" },
  partnersLabel: "Médias partenaires & couvertures presse",
  cta: "Demander mon accréditation presse",
};

const EN: typeof FR = {
  metaTitle: "Gallery & Press — Barbecue Expo 2027",
  metaDescription: "Photos from the 2026 edition and press clippings. Everything the media took away from the show.",
  eyebrow: "Gallery & Press · 2026 edition",
  heroTitle: "What we lived through in 2026.",
  heroParagraph:
    "Seventy-three photos of the show, and its video. More than sixty-five press mentions. Here is the written and visual record of the first edition.",
  galleryEyebrow: "Gallery",
  galleryTitle: "Seventy-three images.",
  photoAlt: "2026 edition",
  video: "Show video",
  open: "Enlarge",
  close: "Close",
  prev: "Previous",
  next: "Next",
  pressEyebrow: "In the press",
  pressTitle: "Sixty-five press mentions in 2026.",
  editions: { apr: "April 2026", may: "May 2026" },
  partnersLabel: "Media partners & press coverage",
  cta: "Request my press accreditation",
};

const ES: typeof FR = {
  metaTitle: "Galería y prensa — Barbecue Expo 2027",
  metaDescription: "Fotos de la edición 2026 y recortes de prensa. Todo lo que los medios destacan del salón.",
  eyebrow: "Galería y prensa · Edición 2026",
  heroTitle: "Lo que vivimos en 2026.",
  heroParagraph:
    "Setenta y tres fotos del salón y su vídeo. Más de sesenta y cinco apariciones en prensa. Este es el testimonio escrito y visual de la primera edición.",
  galleryEyebrow: "Galería",
  galleryTitle: "Setenta y tres imágenes.",
  photoAlt: "Edición 2026",
  video: "Vídeo del salón",
  open: "Ampliar",
  close: "Cerrar",
  prev: "Anterior",
  next: "Siguiente",
  pressEyebrow: "Hablan de nosotros",
  pressTitle: "Sesenta y cinco apariciones en prensa en 2026.",
  editions: { apr: "Abril 2026", may: "Mayo 2026" },
  partnersLabel: "Medios asociados y cobertura de prensa",
  cta: "Solicitar mi acreditación de prensa",
};

const DE: typeof FR = {
  metaTitle: "Galerie & Presse — Barbecue Expo 2027",
  metaDescription: "Fotos der Ausgabe 2026 und Presseausschnitte. Alles, was die Medien von der Messe mitgenommen haben.",
  eyebrow: "Galerie & Presse · Ausgabe 2026",
  heroTitle: "Was wir 2026 erlebt haben.",
  heroParagraph:
    "Dreiundsiebzig Fotos der Messe und ihr Video. Über fünfundsechzig Presseberichte. Hier ist die schriftliche und visuelle Spur der ersten Ausgabe.",
  galleryEyebrow: "Galerie",
  galleryTitle: "Dreiundsiebzig Bilder.",
  photoAlt: "Ausgabe 2026",
  video: "Video der Messe",
  open: "Vergrößern",
  close: "Schließen",
  prev: "Zurück",
  next: "Weiter",
  pressEyebrow: "Sie berichten darüber",
  pressTitle: "Fünfundsechzig Presseberichte im Jahr 2026.",
  editions: { apr: "April 2026", may: "Mai 2026" },
  partnersLabel: "Medienpartner & Presseberichte",
  cta: "Presseakkreditierung beantragen",
};

const NL: typeof FR = {
  metaTitle: "Galerij & pers — Barbecue Expo 2027",
  metaDescription: "Foto's van de editie 2026 en persknipsels. Alles wat de media van de beurs onthouden.",
  eyebrow: "Galerij & pers · Editie 2026",
  heroTitle: "Wat we in 2026 hebben beleefd.",
  heroParagraph:
    "Drieënzeventig foto's van de beurs en de video. Meer dan vijfenzestig persvermeldingen. Dit is het geschreven en visuele verslag van de eerste editie.",
  galleryEyebrow: "Galerij",
  galleryTitle: "Drieënzeventig beelden.",
  photoAlt: "Editie 2026",
  video: "Video van de beurs",
  open: "Vergroten",
  close: "Sluiten",
  prev: "Vorige",
  next: "Volgende",
  pressEyebrow: "Zij spreken erover",
  pressTitle: "Vijfenzestig persvermeldingen in 2026.",
  editions: { apr: "April 2026", may: "Mei 2026" },
  partnersLabel: "Mediapartners & persaandacht",
  cta: "Mijn persaccreditatie aanvragen",
};

const PT: typeof FR = {
  metaTitle: "Galeria e imprensa — Barbecue Expo 2027",
  metaDescription: "Fotos da edição de 2026 e recortes de imprensa. Tudo o que os media retêm do salão.",
  eyebrow: "Galeria e imprensa · Edição 2026",
  heroTitle: "O que vivemos em 2026.",
  heroParagraph:
    "Setenta e três fotos do salão e o seu vídeo. Mais de sessenta e cinco referências na imprensa. Eis o registo escrito e visual da primeira edição.",
  galleryEyebrow: "Galeria",
  galleryTitle: "Setenta e três imagens.",
  photoAlt: "Edição 2026",
  video: "Vídeo do salão",
  open: "Ampliar",
  close: "Fechar",
  prev: "Anterior",
  next: "Seguinte",
  pressEyebrow: "Falam de nós",
  pressTitle: "Sessenta e cinco referências na imprensa em 2026.",
  editions: { apr: "Abril 2026", may: "Maio 2026" },
  partnersLabel: "Media parceiros e cobertura de imprensa",
  cta: "Pedir a minha acreditação de imprensa",
};

const IT: typeof FR = {
  metaTitle: "Galleria & Stampa — Barbecue Expo 2027",
  metaDescription: "Foto dell'edizione 2026 e rassegna stampa. Tutto ciò che i media ricordano del salone.",
  eyebrow: "Galleria & Stampa · Edizione 2026",
  heroTitle: "Quello che abbiamo vissuto nel 2026.",
  heroParagraph:
    "Settantatré foto del salone e il suo video. Oltre sessantacinque uscite stampa. Ecco la traccia scritta e visiva della prima edizione.",
  galleryEyebrow: "Galleria",
  galleryTitle: "Settantatré immagini.",
  photoAlt: "Edizione 2026",
  video: "Video del salone",
  open: "Ingrandisci",
  close: "Chiudi",
  prev: "Precedente",
  next: "Successiva",
  pressEyebrow: "Parlano di noi",
  pressTitle: "Sessantacinque uscite stampa nel 2026.",
  editions: { apr: "Aprile 2026", may: "Maggio 2026" },
  partnersLabel: "Media partner & copertura stampa",
  cta: "Richiedi il mio accredito stampa",
};

const CONTENT: Record<string, typeof FR> = {
  fr: FR,
  en: EN,
  es: ES,
  de: DE,
  nl: NL,
  pt: PT,
  it: IT,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = CONTENT[locale] || CONTENT.fr;
  return buildMetadata(locale, "/gallery-press", {
    title: ui.metaTitle,
    description: ui.metaDescription,
  });
}

export default async function GalleryPressPage() {
  const locale = await getLocale();
  const ui = CONTENT[locale] || CONTENT.fr;

  return (
    <div className="bg-cream-50">
      {/* Hero */}
      <section className="relative w-full min-h-[55dvh] overflow-hidden bg-ink-950">
        <Image
          src="/photos-2026/william-plin-jpc-110426-533a4856.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/30" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28 flex flex-col justify-end min-h-[55dvh]">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.eyebrow}
          </div>
          <h1
            className="text-cream-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] font-bold max-w-5xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.heroTitle}
          </h1>
          <p className="mt-8 text-cream-50/85 text-lg md:text-xl max-w-3xl leading-relaxed font-light">
            {ui.heroParagraph}
          </p>
        </div>
      </section>

      {/* GALERIE — Masonry */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14 px-2 md:px-4">
          <div>
            <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-4">
              <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
              {ui.galleryEyebrow}
            </div>
            <h2
              className="text-ink-900 text-4xl sm:text-5xl md:text-6xl leading-[0.95] font-bold"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {ui.galleryTitle}
            </h2>
          </div>
        </div>

        <GalleryMosaic
          photos={ALL_PHOTOS}
          labels={{
            photoAlt: ui.photoAlt,
            video: ui.video,
            open: ui.open,
            close: ui.close,
            prev: ui.prev,
            next: ui.next,
          }}
        />
      </section>

      {/* PRESSE — Quotes + partners */}
      <section className="bg-ink-950 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.pressEyebrow}
          </div>
          <h2
            className="text-cream-50 text-4xl sm:text-5xl md:text-6xl leading-[0.95] font-bold mb-16 md:mb-20 max-w-4xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.pressTitle}
          </h2>

          {/* Retombées réelles — vidéos TV + logos médias (cliquables) */}
          <div className="mb-20 md:mb-28">
            <PressCoverage />
          </div>

          {/* Quotes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14 md:gap-y-20 mb-20 md:mb-28">
            {PRESS_QUOTES.map((q, i) => (
              <blockquote key={i} lang="fr" className="border-t border-white/15 pt-6">
                <Quote className="w-7 h-7 text-gold-500 mb-4" strokeWidth={1.5} />
                <p
                  className="text-cream-50 text-xl md:text-2xl lg:text-3xl leading-snug mb-6"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                >
                  « {q.quote} »
                </p>
                <footer className="flex items-baseline gap-3 text-cream-50/70">
                  <span className="text-gold-500 text-sm font-bold uppercase tracking-widest">
                    {q.media}
                  </span>
                  <span className="text-xs uppercase tracking-widest">— {ui.editions[q.edition]}</span>
                </footer>
              </blockquote>
            ))}
          </div>

          {/* Press partners list */}
          <div>
            <div className="text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-6">
              {ui.partnersLabel}
            </div>
            <div className="flex flex-wrap gap-3">
              {PRESS_PARTNERS.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center px-4 py-2 border border-white/15 bg-white/[0.02] rounded-sm text-cream-50/80 text-sm font-medium"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 md:mt-20">
            <Link
              href="/billetterie/presse"
              className="group inline-flex items-center gap-4 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors"
            >
              <span>{ui.cta}</span>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
