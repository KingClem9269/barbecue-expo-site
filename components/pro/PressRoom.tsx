"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Download, FileText, Camera, MessageSquareQuote } from "lucide-react";

/**
 * PressRoom — B2B press-focused section with downloadable assets.
 * Dark background (ink-950) with gold accent. 3 download cards.
 */

const UI: Record<
  string,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    accreditationCta: string;
    assets: { title: string; description: string; format: string }[];
  }
> = {
  fr: {
    eyebrow: "Presse & médias",
    title: "Espace presse 2027",
    subtitle:
      "Dossier de presse, photos haute définition, communiqués — tout ce dont vous avez besoin pour couvrir Barbecue Expo 2027.",
    accreditationCta: "Accréditation presse",
    assets: [
      {
        title: "Dossier de presse",
        description: "Présentation générale, chiffres clés, programme 2027.",
        format: "PDF · 2,4 MB",
      },
      {
        title: "Pack photos HD",
        description: "Sélection de 30 photos libres de droits édition 2026.",
        format: "ZIP · 480 MB",
      },
      {
        title: "Citations officielles",
        description: "Interviews de la direction, paroles de pitmasters.",
        format: "PDF · 0,8 MB",
      },
    ],
  },
  en: {
    eyebrow: "Press & media",
    title: "2027 Press room",
    subtitle:
      "Press kit, high-definition photos, releases — everything you need to cover Barbecue Expo 2027.",
    accreditationCta: "Press accreditation",
    assets: [
      {
        title: "Press kit",
        description: "Overview, key figures, 2027 program.",
        format: "PDF · 2.4 MB",
      },
      {
        title: "HD photo pack",
        description: "Selection of 30 royalty-free photos from 2026.",
        format: "ZIP · 480 MB",
      },
      {
        title: "Official quotes",
        description: "Leadership interviews, pitmaster statements.",
        format: "PDF · 0.8 MB",
      },
    ],
  },
  es: {
    eyebrow: "Prensa & medios",
    title: "Sala de prensa 2027",
    subtitle:
      "Dossier de prensa, fotos de alta definición, comunicados — todo lo que necesita para cubrir Barbecue Expo 2027.",
    accreditationCta: "Acreditación de prensa",
    assets: [
      {
        title: "Dossier de prensa",
        description: "Presentación general, cifras clave, programa 2027.",
        format: "PDF · 2,4 MB",
      },
      {
        title: "Pack fotos HD",
        description: "Selección de 30 fotos libres de derechos edición 2026.",
        format: "ZIP · 480 MB",
      },
      {
        title: "Citas oficiales",
        description: "Entrevistas de la dirección, palabras de pitmasters.",
        format: "PDF · 0,8 MB",
      },
    ],
  },
  de: {
    eyebrow: "Presse & Medien",
    title: "Pressebereich 2027",
    subtitle:
      "Pressemappe, hochauflösende Fotos, Pressemitteilungen — alles, was Sie für die Berichterstattung zu Barbecue Expo 2027 benötigen.",
    accreditationCta: "Presseakkreditierung",
    assets: [
      {
        title: "Pressemappe",
        description: "Übersicht, Schlüsselzahlen, Programm 2027.",
        format: "PDF · 2,4 MB",
      },
      {
        title: "HD-Fotopaket",
        description: "Auswahl von 30 lizenzfreien Fotos aus 2026.",
        format: "ZIP · 480 MB",
      },
      {
        title: "Offizielle Zitate",
        description: "Interviews der Leitung, Statements der Pitmaster.",
        format: "PDF · 0,8 MB",
      },
    ],
  },
  nl: {
    eyebrow: "Pers & media",
    title: "Perszaal 2027",
    subtitle:
      "Perskit, HD-foto's, persberichten — alles wat u nodig heeft om Barbecue Expo 2027 te verslaan.",
    accreditationCta: "Persaccreditatie",
    assets: [
      {
        title: "Perskit",
        description: "Overzicht, kerncijfers, programma 2027.",
        format: "PDF · 2,4 MB",
      },
      {
        title: "HD-fotopakket",
        description: "Selectie van 30 rechtenvrije foto's editie 2026.",
        format: "ZIP · 480 MB",
      },
      {
        title: "Officiële quotes",
        description: "Interviews met de leiding, uitspraken van pitmasters.",
        format: "PDF · 0,8 MB",
      },
    ],
  },
  pt: {
    eyebrow: "Imprensa & media",
    title: "Sala de imprensa 2027",
    subtitle:
      "Dossier de imprensa, fotografias de alta definição, comunicados — tudo o que precisa para cobrir Barbecue Expo 2027.",
    accreditationCta: "Acreditação de imprensa",
    assets: [
      {
        title: "Dossier de imprensa",
        description: "Visão geral, números-chave, programa 2027.",
        format: "PDF · 2,4 MB",
      },
      {
        title: "Pack fotos HD",
        description: "Seleção de 30 fotos livres de direitos edição 2026.",
        format: "ZIP · 480 MB",
      },
      {
        title: "Citações oficiais",
        description: "Entrevistas da direção, palavras de pitmasters.",
        format: "PDF · 0,8 MB",
      },
    ],
  },
  it: {
    eyebrow: "Stampa & media",
    title: "Sala stampa 2027",
    subtitle:
      "Cartella stampa, foto in alta definizione, comunicati — tutto ciò di cui avete bisogno per raccontare Barbecue Expo 2027.",
    accreditationCta: "Accreditamento stampa",
    assets: [
      {
        title: "Cartella stampa",
        description: "Panoramica, cifre chiave, programma 2027.",
        format: "PDF · 2,4 MB",
      },
      {
        title: "Pacchetto foto HD",
        description: "Selezione di 30 foto royalty-free edizione 2026.",
        format: "ZIP · 480 MB",
      },
      {
        title: "Citazioni ufficiali",
        description: "Interviste della direzione, parole dei pitmaster.",
        format: "PDF · 0,8 MB",
      },
    ],
  },
};

const ICONS = [FileText, Camera, MessageSquareQuote];

export default function PressRoom() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section className="relative w-full bg-ink-950 py-24 md:py-32 lg:py-40 overflow-hidden" aria-label="Press room">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-radial from-gold-500/15 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8 md:mb-12">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 md:mb-16">
          <div className="lg:col-span-8">
            <h2
              className="text-cream-50 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight font-bold"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {ui.title}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-cream-50/85 text-base md:text-lg leading-relaxed">
              {ui.subtitle}
            </p>
          </div>
        </div>

        {/* Downloadable assets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-14">
          {ui.assets.map((a, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={i}
                className="group border border-white/15 bg-white/[0.02] rounded-sm p-6 hover:border-gold-500/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-5">
                  <Icon className="w-6 h-6 text-gold-500" strokeWidth={2} />
                  <Download className="w-5 h-5 text-cream-50/50 group-hover:text-gold-500 transition-colors" strokeWidth={2} />
                </div>
                <h3
                  className="text-cream-50 text-xl md:text-2xl leading-tight font-bold mb-2"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                >
                  {a.title}
                </h3>
                <p className="text-cream-50/70 text-sm leading-relaxed mb-4">
                  {a.description}
                </p>
                <span className="text-gold-500 text-xs uppercase tracking-widest font-semibold">
                  {a.format}
                </span>
              </div>
            );
          })}
        </div>

        {/* Accreditation CTA */}
        <Link
          href="/billetterie/presse"
          className="group inline-flex items-center gap-3 text-cream-50 hover:text-gold-500 text-sm md:text-base font-semibold uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
        >
          <span>{ui.accreditationCta}</span>
          <span
            aria-hidden="true"
            className="inline-block w-10 h-px bg-gold-500 origin-left transition-transform duration-300 group-hover:scale-x-[1.6]"
          />
        </Link>
      </div>
    </section>
  );
}
