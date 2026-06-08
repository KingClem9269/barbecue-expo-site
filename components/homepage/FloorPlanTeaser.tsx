"use client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";

/**
 * FloorPlanTeaser — Editorial homepage section showcasing the floor plan
 * with split layout: text left, plan right. Replaces the legacy
 * "Un parcours clair, pensé pour tous les profils" tertiary-bg section.
 */

const UI: Record<
  string,
  {
    eyebrow: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    cta: string;
    comingSoon: string;
    secondary: string;
  }
> = {
  fr: {
    eyebrow: "Plan du salon",
    title: "Trouvez votre route, dès l'entrée.",
    paragraph1:
      "Le Parc Floral est grand. Le salon est dense. Voici de quoi organiser votre visite avant même d'y arriver — où sont les masterclasses, où se passe Grill Arena, où trouver votre marque préférée, où manger.",
    paragraph2:
      "Plan haute définition téléchargeable. Les zones sont signalées sur place par des totems lisibles à 30 mètres. Personne ne se perd à Barbecue Expo.",
    cta: "Voir le plan complet",
    comingSoon: "Bientôt disponible",
    secondary: "Infos pratiques d'accès",
  },
  en: {
    eyebrow: "Floor plan",
    title: "Find your route, from the entrance.",
    paragraph1:
      "Parc Floral is big. The show is dense. Here's what you need to plan your visit before you arrive — where the masterclasses are, where Grill Arena happens, where to find your favourite brand, where to eat.",
    paragraph2:
      "High-definition plan downloadable. Zones on-site are marked with totems readable from 30 meters away. Nobody gets lost at Barbecue Expo.",
    cta: "See full floor plan",
    comingSoon: "Coming soon",
    secondary: "Practical access info",
  },
  es: {
    eyebrow: "Plano del salón",
    title: "Encuentre su ruta desde la entrada.",
    paragraph1:
      "El Parc Floral es grande. El salón está denso. Aquí tiene lo necesario para organizar su visita antes de llegar — masterclasses, Grill Arena, su marca favorita, dónde comer.",
    paragraph2:
      "Plano de alta definición descargable. Las zonas están señalizadas in situ con tótems legibles a 30 metros. Nadie se pierde en Barbecue Expo.",
    cta: "Ver el plano completo",
    comingSoon: "Próximamente",
    secondary: "Información práctica de acceso",
  },
  de: {
    eyebrow: "Hallenplan",
    title: "Finden Sie Ihren Weg, schon am Eingang.",
    paragraph1:
      "Der Parc Floral ist groß. Die Messe ist dicht. Hier alles, um Ihren Besuch im Voraus zu planen — Masterclasses, Grill Arena, Ihre Lieblingsmarke, Essen.",
    paragraph2:
      "Hochauflösender Plan zum Download. Zonen vor Ort mit Stelen, lesbar aus 30 Metern. Niemand verirrt sich bei Barbecue Expo.",
    cta: "Vollständigen Plan ansehen",
    comingSoon: "Bald verfügbar",
    secondary: "Praktische Anfahrt",
  },
  nl: {
    eyebrow: "Plattegrond",
    title: "Vind uw route, vanaf de ingang.",
    paragraph1:
      "Parc Floral is groot. De beurs is dicht bevolkt. Alles om uw bezoek vooraf te plannen — masterclasses, Grill Arena, uw favoriete merk, eten.",
    paragraph2:
      "HD-plattegrond te downloaden. Zones ter plaatse aangegeven met totems leesbaar op 30 meter. Niemand raakt verdwaald op Barbecue Expo.",
    cta: "Volledige plattegrond",
    comingSoon: "Binnenkort beschikbaar",
    secondary: "Praktische toegang",
  },
  pt: {
    eyebrow: "Plano do salão",
    title: "Encontre o seu caminho desde a entrada.",
    paragraph1:
      "O Parc Floral é grande. A feira é densa. Aqui está o que precisa para organizar a sua visita antes de chegar — masterclasses, Grill Arena, a sua marca favorita, onde comer.",
    paragraph2:
      "Plano de alta definição descarregável. As zonas estão sinalizadas no local com totens legíveis a 30 metros. Ninguém se perde em Barbecue Expo.",
    cta: "Ver plano completo",
    comingSoon: "Em breve",
    secondary: "Informações práticas de acesso",
  },
  it: {
    eyebrow: "Piantina",
    title: "Trova la tua strada, dall'ingresso.",
    paragraph1:
      "Il Parc Floral è grande. La fiera è densa. Ecco di che organizzare la tua visita prima ancora di arrivare — masterclass, Grill Arena, il tuo marchio preferito, dove mangiare.",
    paragraph2:
      "Piantina ad alta definizione scaricabile. Le zone sono segnalate sul posto con totem leggibili a 30 metri. Nessuno si perde a Barbecue Expo.",
    cta: "Vedi la piantina completa",
    comingSoon: "Presto disponibile",
    secondary: "Info pratiche di accesso",
  },
};

export default function FloorPlanTeaser() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section
      className="relative w-full bg-cream-100 py-14 md:py-20"
      aria-label="Plan du salon"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Text column */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.eyebrow}
          </div>
          <h2
            className="text-ink-900 text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight font-bold mb-8"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.title}
          </h2>
          <p className="text-ink-600 text-base md:text-lg leading-relaxed mb-5">
            {ui.paragraph1}
          </p>
          <p className="text-ink-600 text-base md:text-lg leading-relaxed mb-10">
            {ui.paragraph2}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
            <div className="flex flex-col gap-2">
              <span
                aria-disabled="true"
                className="inline-flex items-center gap-3 bg-ink-950/60 text-cream-50/70 px-6 py-4 rounded-sm font-bold uppercase tracking-widest text-sm cursor-not-allowed select-none"
              >
                <span>{ui.cta}</span>
                <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
              </span>
              <span className="text-ink-500 text-xs uppercase tracking-widest font-semibold pl-1">
                {ui.comingSoon}
              </span>
            </div>
            <Link
              href="/infos-pratiques"
              className="group inline-flex items-center gap-3 border border-ink-900/30 hover:border-gold-500 text-ink-900 hover:text-gold-700 px-6 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              <span>{ui.secondary}</span>
            </Link>
          </div>
        </div>

        {/* Floor plan image — detoured, no white box */}
        <div className="lg:col-span-7 relative aspect-[16/10]">
          <Image
            src="/content/images/27866dc7c3_planbbq_hd.png"
            alt="Plan du salon Barbecue Expo 2027"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
          />
        </div>
      </div>
    </section>
  );
}
