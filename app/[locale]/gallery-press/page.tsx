import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Quote } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

const ALL_PHOTOS = [
  "bbq-expo-008.jpg", "bbq-expo-014.jpg", "bbq-expo-066.jpg", "bbq-expo-073.jpg",
  "bbq-expo-078.jpg", "bbq-expo-105.jpg", "bbq-expo-107.jpg", "bbq-expo-129.jpg",
  "bbq-expo-155.jpg", "bbq-expo-171.jpg", "bbq-expo-184.jpg", "bbq-expo-268.jpg",
  "bbq-expo-293.jpg", "bbq-expo-302.jpg", "bbq-expo-403.jpg", "bbq-expo-404.jpg",
  "bbq-expo-441.jpg", "bbq-expo-477.jpg", "bbq-expo-688.jpg", "bbq-expo-689.jpg",
  "bbq-expo-690.jpg", "bbq-expo-720.jpg", "bbq-expo-737.jpg", "bbq-expo-740.jpg",
  "william-plin-jpc-110426-533a2850.jpg", "william-plin-jpc-110426-533a3101.jpg",
  "william-plin-jpc-110426-533a3756.jpg", "william-plin-jpc-110426-533a4088.jpg",
  "william-plin-jpc-110426-533a4134.jpg", "william-plin-jpc-110426-533a4353.jpg",
  "william-plin-jpc-110426-533a4426.jpg", "william-plin-jpc-110426-533a4660.jpg",
  "william-plin-jpc-110426-533a4856.jpg", "william-plin-jpc-110426-533a4869.jpg",
  "william-plin-jpc-110426-533a4931.jpg", "william-plin-jpc-110426-533a4969.jpg",
  "william-plin-jpc-110426-533a5984.jpg", "william-plin-jpc-110426-533a6023.jpg",
  "william-plin-jpc-110426-533a6029.jpg", "william-plin-jpc-120426-533a6296.jpg",
  "william-plin-jpc-120426-533a6497.jpg", "william-plin-jpc-120426-533a6691.jpg",
  "william-plin-jpc-120426-533a6712.jpg", "william-plin-jpc-120426-533a6971.jpg",
  "william-plin-jpc-120426-533a8137.jpg", "william-plin-jpc-120426-533a8581.jpg",
];

const PRESS_QUOTES = [
  {
    media: "Le Figaro Cuisine",
    quote: "L'événement BBQ qui manquait à l'Europe — enfin un format à la hauteur de la passion qui anime ses fans.",
    edition: "Avril 2026",
  },
  {
    media: "Saveurs Magazine",
    quote: "On y croise des pitmasters internationaux comme nulle part ailleurs. Trois jours qui font autorité dans le métier.",
    edition: "Mai 2026",
  },
  {
    media: "Le Parisien",
    quote: "Vingt-cinq mille visiteurs, deux cent cinquante marques. Le Parc Floral retrouve un grand rendez-vous gastronomique.",
    edition: "Avril 2026",
  },
  {
    media: "Maxi Cuisine",
    quote: "La nouvelle référence européenne, et probablement la seule où la qualité du contenu rivalise avec le spectacle.",
    edition: "Mai 2026",
  },
];

const PRESS_PARTNERS = [
  "Saveurs", "Le Figaro Cuisine", "Maxi Cuisine", "Le Parisien", "BBQ Mag",
  "Régal", "Les Grands Chefs", "FoodBeast", "Eater", "Vice Munchies",
  "Cuisine et Vins de France", "Trois Étoiles", "Atabula", "Time Out", "Telerama",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, "/gallery-press", {
    title: "Galerie & Presse — Barbecue Expo 2027",
    description: "Photos de l'édition 2026 et coupures de presse. Tout ce que les médias retiennent du salon.",
  });
}

export default function GalleryPressPage() {
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
            Galerie & Presse · Édition 2026
          </div>
          <h1
            className="text-cream-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight font-bold max-w-5xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            Ce qu'on a vécu en 2026.
          </h1>
          <p className="mt-8 text-cream-50/85 text-lg md:text-xl max-w-3xl leading-relaxed font-light">
            Quarante-six photos sélectionnées par notre photographe officiel. Plus de soixante-cinq retombées presse. Voici la trace écrite et visuelle de la première édition.
          </p>
        </div>
      </section>

      {/* GALERIE — Masonry */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-20 md:py-28">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14 px-2 md:px-4">
          <div>
            <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-4">
              <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
              Galerie
            </div>
            <h2
              className="text-ink-900 text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight font-bold"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              Quarante-six images.
            </h2>
          </div>
        </div>

        {/* CSS columns for masonry effect */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-4 [&>*]:mb-3 md:[&>*]:mb-4 [&>*]:break-inside-avoid">
          {ALL_PHOTOS.map((file, i) => (
            <div key={file} className="relative overflow-hidden bg-char-800 rounded-sm">
              <Image
                src={`/photos-2026/${file}`}
                alt={`Édition 2026 — ${i + 1}`}
                width={1200}
                height={800}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </section>

      {/* PRESSE — Quotes + partners */}
      <section className="bg-ink-950 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            Ils en parlent
          </div>
          <h2
            className="text-cream-50 text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight font-bold mb-16 md:mb-20 max-w-4xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            Soixante-cinq retombées presse en 2026.
          </h2>

          {/* Quotes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14 md:gap-y-20 mb-20 md:mb-28">
            {PRESS_QUOTES.map((q, i) => (
              <blockquote key={i} className="border-t border-white/15 pt-6">
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
                  <span className="text-xs uppercase tracking-widest">— {q.edition}</span>
                </footer>
              </blockquote>
            ))}
          </div>

          {/* Press partners list */}
          <div>
            <div className="text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-6">
              Médias partenaires & couvertures presse
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
              <span>Demander mon accréditation presse</span>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
