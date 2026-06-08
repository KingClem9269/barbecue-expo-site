"use client";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Download } from "lucide-react";

/**
 * PressRoom — warm editorial. One full-bleed photo, a paragraph,
 * a quiet list of downloads. No card grid, no transactional UI.
 */

const UI: Record<
  string,
  {
    eyebrow: string;
    headline: string;
    paragraph: string;
    downloadsTitle: string;
    accreditationCta: string;
    assets: { title: string; format: string }[];
  }
> = {
  fr: {
    eyebrow: "Presse & médias",
    headline: "Le vestiaire de la presse.",
    paragraph:
      "Tout ce qu'il vous faut pour écrire, filmer, photographier, raconter Barbecue Expo 2027. Dossier de presse, photos en haute définition, citations officielles, plan du salon. Demandez votre accréditation, l'équipe presse vous répond sous 48 heures.",
    downloadsTitle: "À télécharger",
    accreditationCta: "Demander mon accréditation",
    assets: [
      { title: "Dossier de presse 2027", format: "PDF · 2,4 MB" },
      { title: "Pack photos haute définition", format: "ZIP · 480 MB" },
      { title: "Citations officielles & interviews", format: "PDF · 0,8 MB" },
      { title: "Plan du salon 2027", format: "PDF · 1,2 MB" },
    ],
  },
  en: {
    eyebrow: "Press & media",
    headline: "The press wardrobe.",
    paragraph:
      "Everything you need to write, film, photograph and tell the story of Barbecue Expo 2027. Press kit, high-definition photos, official quotes, floor plan. Request your accreditation, our press team replies within 48 hours.",
    downloadsTitle: "To download",
    accreditationCta: "Request my accreditation",
    assets: [
      { title: "2027 press kit", format: "PDF · 2.4 MB" },
      { title: "HD photo pack", format: "ZIP · 480 MB" },
      { title: "Official quotes & interviews", format: "PDF · 0.8 MB" },
      { title: "2027 floor plan", format: "PDF · 1.2 MB" },
    ],
  },
  es: {
    eyebrow: "Prensa & medios",
    headline: "El vestidor de la prensa.",
    paragraph:
      "Todo lo que necesita para escribir, filmar, fotografiar y contar Barbecue Expo 2027. Dossier de prensa, fotos de alta definición, citas oficiales, plano del salón. Solicite su acreditación, el equipo de prensa responde en 48 horas.",
    downloadsTitle: "Para descargar",
    accreditationCta: "Solicitar acreditación",
    assets: [
      { title: "Dossier de prensa 2027", format: "PDF · 2,4 MB" },
      { title: "Pack fotos alta definición", format: "ZIP · 480 MB" },
      { title: "Citas oficiales & entrevistas", format: "PDF · 0,8 MB" },
      { title: "Plano del salón 2027", format: "PDF · 1,2 MB" },
    ],
  },
  de: {
    eyebrow: "Presse & Medien",
    headline: "Die Pressegarderobe.",
    paragraph:
      "Alles, was Sie brauchen, um Barbecue Expo 2027 zu schreiben, zu filmen, zu fotografieren, zu erzählen. Pressemappe, hochauflösende Fotos, offizielle Zitate, Hallenplan. Beantragen Sie Ihre Akkreditierung, das Presseteam antwortet binnen 48 Stunden.",
    downloadsTitle: "Zum Herunterladen",
    accreditationCta: "Akkreditierung beantragen",
    assets: [
      { title: "Pressemappe 2027", format: "PDF · 2,4 MB" },
      { title: "HD-Fotopaket", format: "ZIP · 480 MB" },
      { title: "Offizielle Zitate & Interviews", format: "PDF · 0,8 MB" },
      { title: "Hallenplan 2027", format: "PDF · 1,2 MB" },
    ],
  },
  nl: {
    eyebrow: "Pers & media",
    headline: "De persgarderobe.",
    paragraph:
      "Alles wat u nodig heeft om Barbecue Expo 2027 te schrijven, te filmen, te fotograferen en te vertellen. Perskit, HD-foto's, officiële quotes, plattegrond. Vraag uw accreditatie aan, het persteam antwoordt binnen 48 uur.",
    downloadsTitle: "Te downloaden",
    accreditationCta: "Accreditatie aanvragen",
    assets: [
      { title: "Perskit 2027", format: "PDF · 2,4 MB" },
      { title: "HD-fotopakket", format: "ZIP · 480 MB" },
      { title: "Officiële quotes & interviews", format: "PDF · 0,8 MB" },
      { title: "Plattegrond 2027", format: "PDF · 1,2 MB" },
    ],
  },
  pt: {
    eyebrow: "Imprensa & media",
    headline: "O vestiário da imprensa.",
    paragraph:
      "Tudo o que precisa para escrever, filmar, fotografar e contar Barbecue Expo 2027. Dossier de imprensa, fotos em alta definição, citações oficiais, plano do salão. Peça a sua acreditação, a equipa de imprensa responde em 48 horas.",
    downloadsTitle: "Para descarregar",
    accreditationCta: "Pedir a minha acreditação",
    assets: [
      { title: "Dossier de imprensa 2027", format: "PDF · 2,4 MB" },
      { title: "Pacote de fotos HD", format: "ZIP · 480 MB" },
      { title: "Citações oficiais & entrevistas", format: "PDF · 0,8 MB" },
      { title: "Plano do salão 2027", format: "PDF · 1,2 MB" },
    ],
  },
  it: {
    eyebrow: "Stampa & media",
    headline: "Il guardaroba della stampa.",
    paragraph:
      "Tutto ciò che ti serve per scrivere, filmare, fotografare e raccontare Barbecue Expo 2027. Cartella stampa, foto in alta definizione, citazioni ufficiali, piantina. Richiedi il tuo accredito, il team stampa risponde entro 48 ore.",
    downloadsTitle: "Da scaricare",
    accreditationCta: "Richiedere l'accredito",
    assets: [
      { title: "Cartella stampa 2027", format: "PDF · 2,4 MB" },
      { title: "Pacchetto foto HD", format: "ZIP · 480 MB" },
      { title: "Citazioni ufficiali & interviste", format: "PDF · 0,8 MB" },
      { title: "Piantina 2027", format: "PDF · 1,2 MB" },
    ],
  },
};

export default function PressRoom() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section className="relative w-full bg-ink-950 overflow-hidden" aria-label="Press room">
      {/* Hero photo + dark gradient */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
        <Image
          src="/photos-2026/bbq-expo-720.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-12 md:pb-16">
            <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-6">
              <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
              {ui.eyebrow}
            </div>
            <h2
              className="text-cream-50 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight font-bold max-w-4xl"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {ui.headline}
            </h2>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Paragraph */}
        <div className="lg:col-span-7">
          <p className="text-cream-50/85 text-lg md:text-xl leading-relaxed">
            {ui.paragraph}
          </p>

          {/* CTA */}
          <Link
            href="/billetterie/presse"
            className="group mt-10 md:mt-12 inline-flex items-center gap-3 text-cream-50 hover:text-gold-500 text-sm md:text-base font-bold uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
          >
            <span>{ui.accreditationCta}</span>
            <span
              aria-hidden="true"
              className="inline-block w-10 h-px bg-gold-500 origin-left transition-transform duration-300 group-hover:scale-x-[1.6]"
            />
          </Link>
        </div>

        {/* Quiet downloads list */}
        <div className="lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-10 xl:pl-12">
          <div className="text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-6">
            {ui.downloadsTitle}
          </div>
          <ul className="divide-y divide-white/10 border-t border-b border-white/10">
            {ui.assets.map((a, i) => (
              <li key={i}>
                <button
                  type="button"
                  className="group w-full flex items-center justify-between gap-4 py-4 text-left text-cream-50 hover:text-gold-500 transition-colors focus:outline-none focus-visible:text-gold-500"
                >
                  <div className="min-w-0">
                    <div className="text-base md:text-lg font-medium leading-tight">
                      {a.title}
                    </div>
                    <div className="text-xs text-cream-50/60 uppercase tracking-widest mt-1">
                      {a.format}
                    </div>
                  </div>
                  <Download
                    className="w-5 h-5 text-cream-50/50 group-hover:text-gold-500 transition-colors shrink-0"
                    strokeWidth={2}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
