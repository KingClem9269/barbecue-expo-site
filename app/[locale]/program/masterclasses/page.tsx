import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "next-intl/server";
import pitmastersData from "@/content/pitmasters/index.json";
import { type Pitmaster } from "@/lib/pitmasters-shared";

type MasterclassEntry = {
  number: string;
  title: string;
  pitmasterSlug: string;
  pitmasterName: string;
  pitmasterCountry: string;
  portrait?: string;
  day: string;
  time: string;
  duration: string;
  description: string;
  seats: string;
};

// Curated 12 masterclasses, mapped to existing pitmasters
const MASTERCLASSES: MasterclassEntry[] = [
  { number: "01", title: "L'art du brisket parfait", pitmasterSlug: "david-w-olson", pitmasterName: "David W. Olson", pitmasterCountry: "us", day: "Vendredi", time: "14:00", duration: "90 min", description: "Trois heures de fumage condensées en une heure trente. La pré-saison, la bonne température, le moment où on enveloppe, le repos. Un brisket de qualité, expliqué point par point.", seats: "20 places" },
  { number: "02", title: "Yakitori fondamentaux", pitmasterSlug: "takumi-ishida", pitmasterName: "Takumi Ishida", pitmasterCountry: "jp", day: "Vendredi", time: "10:30", duration: "90 min", description: "Le binchōtan brûle silencieux et précis. Apprenez à monter votre charbon japonais, choisir votre brochette, gérer la cuisson minute par minute. La maîtrise du discret.", seats: "20 places" },
  { number: "03", title: "Légumes au feu vif", pitmasterSlug: "genevieve-taylor", pitmasterName: "Genevieve Taylor", pitmasterCountry: "gb", day: "Vendredi", time: "12:00", duration: "90 min", description: "Aubergines aux braises, poireaux carbonisés, courges fendues. Comment travailler le végétal au feu nu sans le perdre. Live-fire cooking exigeant et joyeux.", seats: "20 places" },
  { number: "04", title: "Chuletón basque", pitmasterSlug: "carmen-sanchez", pitmasterName: "Carmen Sánchez", pitmasterCountry: "es", day: "Vendredi", time: "13:30", duration: "90 min", description: "Maturation extrême, charbon basque, sel gros. La parrilla espagnole dans toute sa pureté. Un seul ingrédient secret : la patience.", seats: "20 places" },
  { number: "05", title: "Saumon fumé au genévrier", pitmasterSlug: "lars-andersen", pitmasterName: "Lars Andersen", pitmasterCountry: "dk", day: "Vendredi", time: "15:00", duration: "90 min", description: "La tradition scandinave du saumon fumé. Bois de genévrier, marinade à sec, fumage doux à 30°C. Chaque étape compte.", seats: "20 places" },
  { number: "06", title: "Kamado temperature mastery", pitmasterSlug: "eric-gephart", pitmasterName: "Eric Gephart", pitmasterCountry: "us", day: "Vendredi", time: "15:30", duration: "90 min", description: "120°C pendant 12 heures. Cette précision n'est pas de la chance. Apprenez à maîtriser votre kamado comme un thermostat — réglages d'air, charge charbon, courbe de température.", seats: "20 places" },
  { number: "07", title: "Competition mindset", pitmasterSlug: "danielle-bennett", pitmasterName: "Diva Q Bennett", pitmasterCountry: "ca", day: "Vendredi", time: "16:00", duration: "90 min", description: "Préparer une compétition n'est pas cuisiner. C'est planifier, déléguer, anticiper, signer une assiette en six minutes. Vingt ans d'expérience condensés en quatre-vingt-dix minutes.", seats: "20 places" },
  { number: "08", title: "Asado de tira", pitmasterSlug: "javier-herrera", pitmasterName: "Javier Herrera", pitmasterCountry: "ar", day: "Samedi", time: "12:30", duration: "90 min", description: "Le travers argentin sur parrilla. Le sel uniquement, un feu de bois lent, une patience absolue. La tradition gaucho, intacte.", seats: "20 places" },
  { number: "09", title: "Charcuterie fumée en 48h", pitmasterSlug: "chef-carlos-bear", pitmasterName: "Chef Carlos Bear", pitmasterCountry: "fr", day: "Samedi", time: "13:30", duration: "90 min", description: "Pancetta maison, magret fumé, échine séchée. La frontière entre fumage américain et charcuterie française. Suivez la chaîne du froid au tranchage.", seats: "20 places" },
  { number: "10", title: "Dry-aged mastery", pitmasterSlug: "camillo-tomanek", pitmasterName: "Camillo Tomanek", pitmasterCountry: "de", day: "Samedi", time: "15:00", duration: "90 min", description: "21 jours, 45 jours, 90 jours. Comment la maturation à sec change tout — et pourquoi votre cuisson doit s'adapter. Du choix de la pièce au tranchage.", seats: "20 places" },
  { number: "11", title: "Galbi & marinades", pitmasterSlug: "min-joon-park", pitmasterName: "Min-joon Park", pitmasterCountry: "kr", day: "Dimanche", time: "12:00", duration: "90 min", description: "Le BBQ coréen est une affaire de marinade. Soja, poire asiatique, ail, sésame, gingembre. Un équilibre, pas une recette. Maîtrisez-le et le reste suit.", seats: "20 places" },
  { number: "12", title: "Wood selection & smoke control", pitmasterSlug: "the-barbecue-dude", pitmasterName: "The Barbecue Dude", pitmasterCountry: "de", day: "Dimanche", time: "15:00", duration: "90 min", description: "Hêtre, chêne, cerisier, hickory. Quel bois pour quelle viande, quel signal d'arrêt sur la fumée, comment éviter l'amertume. Quatre-vingt-dix minutes de précisions techniques.", seats: "20 places" },
];

// Pitmaster portrait lookup
function withPortraits(): MasterclassEntry[] {
  const map = new Map<string, Pitmaster>();
  for (const p of pitmastersData as Pitmaster[]) map.set(p.slug, p);
  return MASTERCLASSES.map((m) => ({
    ...m,
    portrait: map.get(m.pitmasterSlug)?.portrait,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, "/program/masterclasses", {
    title: "Masterclasses — Barbecue Expo 2027",
    description: "12 masterclasses limitées à 20 places. Trois jours d'apprentissage intense avec les meilleurs pitmasters internationaux.",
  });
}

export default async function MasterclassesPage() {
  await getLocale();
  const items = withPortraits();
  return (
    <div className="bg-cream-50">
      {/* Hero */}
      <section className="relative w-full min-h-[60dvh] overflow-hidden bg-ink-950">
        <Image
          src="/photos-2026/bbq-expo-105.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-ink-950/40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28 flex flex-col justify-end min-h-[60dvh]">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            Édition 2027
          </div>
          <h1
            className="text-cream-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight font-bold max-w-5xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            Douze masterclasses.<br /><span className="text-gold-500">Vingt places chacune.</span>
          </h1>
          <p className="mt-8 text-cream-50/85 text-lg md:text-xl max-w-3xl leading-relaxed font-light">
            Pas une démo grand public. Une heure et demie en petit groupe avec un pitmaster international qui vous montre, qui vous corrige, qui vous fait goûter. Réservation obligatoire — c'est plein chaque année.
          </p>
        </div>
      </section>

      {/* List of 12 */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 space-y-16 md:space-y-24">
        {items.map((m, i) => {
          const reverse = i % 2 === 1;
          return (
            <article
              key={m.number}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Pitmaster portrait or photo placeholder */}
              <div className="lg:col-span-5 relative aspect-[3/4] overflow-hidden rounded-sm bg-char-800">
                {m.portrait && (
                  <Image
                    src={m.portrait}
                    alt={m.pitmasterName}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center"
                  />
                )}
                <div className="absolute inset-3 ring-1 ring-gold-500/40 pointer-events-none rounded-sm" aria-hidden="true" />
              </div>

              <div className="lg:col-span-7">
                <div
                  className="text-gold-600 text-base md:text-lg font-bold tabular-nums mb-4"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                >
                  — {m.number}
                </div>
                <h2
                  className="text-ink-900 text-3xl md:text-4xl lg:text-5xl leading-tight font-bold mb-3"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                >
                  {m.title}
                </h2>
                <Link
                  href={`/pitmasters/${m.pitmasterSlug}`}
                  className="inline-flex items-center gap-2 text-gold-700 hover:text-ink-900 text-sm md:text-base font-semibold transition-colors mb-6"
                >
                  <Image
                    src={`/flags/${m.pitmasterCountry}.svg`}
                    alt=""
                    width={14}
                    height={14}
                    className="w-3.5 h-3.5 rounded-full object-cover"
                  />
                  {m.pitmasterName}
                </Link>
                <p className="text-ink-600 text-base md:text-lg leading-relaxed mb-6">
                  {m.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-ink-900 font-medium mb-6">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gold-600" strokeWidth={2} />
                    {m.day} · {m.time}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gold-600" strokeWidth={2} />
                    {m.duration} · {m.seats}
                  </span>
                </div>
                <Link
                  href="/billetterie/particulier"
                  className="group inline-flex items-center gap-3 text-ink-900 hover:text-gold-700 text-sm md:text-base font-bold uppercase tracking-widest transition-colors"
                >
                  <span>Réserver cette masterclass</span>
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2} />
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
