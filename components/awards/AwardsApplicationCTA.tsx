"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, FileText } from "lucide-react";

/**
 * AwardsApplicationCTA — apply to submit a brand to the Awards.
 * Cream-100 bg with bold CTA block.
 */

const UI: Record<
  string,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    primary: string;
    secondary: string;
    note: string;
  }
> = {
  fr: {
    eyebrow: "Candidatez",
    title: "Votre marque mérite une médaille.",
    subtitle:
      "Les candidatures ouvrent le 15 septembre 2026. Préparez dès maintenant votre dossier — fiche produit, photos HD, argumentaire technique. Tout sera soumis à l'évaluation d'un jury international.",
    primary: "Candidater maintenant",
    secondary: "Télécharger le règlement",
    note: "Frais de candidature : 250 € HT par catégorie. Gratuit pour les exposants Or du salon.",
  },
  en: {
    eyebrow: "Apply",
    title: "Your brand deserves a medal.",
    subtitle:
      "Applications open September 15, 2026. Start preparing your file now — product sheet, HD photos, technical pitch. Everything will be evaluated by an international jury.",
    primary: "Apply now",
    secondary: "Download rules",
    note: "Entry fee: €250 excl. VAT per category. Free for Gold exhibitors.",
  },
  es: {
    eyebrow: "Postularse",
    title: "Su marca merece una medalla.",
    subtitle:
      "Las candidaturas abren el 15 de septiembre de 2026. Prepare su dossier desde ahora — ficha de producto, fotos HD, argumentario técnico. Todo será evaluado por un jurado internacional.",
    primary: "Postularse ahora",
    secondary: "Descargar el reglamento",
    note: "Tasa: 250 € sin IVA por categoría. Gratis para expositores Oro.",
  },
  de: {
    eyebrow: "Bewerben",
    title: "Ihre Marke verdient eine Medaille.",
    subtitle:
      "Die Bewerbungen öffnen am 15. September 2026. Beginnen Sie jetzt mit Ihrer Bewerbung — Produktdatenblatt, HD-Fotos, technische Argumentation. Alles wird von einer internationalen Jury bewertet.",
    primary: "Jetzt bewerben",
    secondary: "Regelwerk herunterladen",
    note: "Gebühr: 250 € netto pro Kategorie. Kostenlos für Gold-Aussteller.",
  },
  nl: {
    eyebrow: "Inschrijven",
    title: "Uw merk verdient een medaille.",
    subtitle:
      "Inschrijvingen openen op 15 september 2026. Bereid uw dossier nu voor — productfiche, HD-foto's, technisch pleidooi. Alles wordt door een internationale jury beoordeeld.",
    primary: "Nu inschrijven",
    secondary: "Reglement downloaden",
    note: "Kosten: € 250 excl. BTW per categorie. Gratis voor Goud-exposanten.",
  },
  pt: {
    eyebrow: "Candidatar-se",
    title: "A sua marca merece uma medalha.",
    subtitle:
      "As candidaturas abrem a 15 de setembro de 2026. Prepare o seu dossier desde já — ficha de produto, fotos HD, argumentário técnico. Tudo será avaliado por um júri internacional.",
    primary: "Candidatar-se agora",
    secondary: "Descarregar regulamento",
    note: "Taxa: 250 € sem IVA por categoria. Gratuito para expositores Ouro.",
  },
  it: {
    eyebrow: "Candidati",
    title: "Il tuo marchio merita una medaglia.",
    subtitle:
      "Le candidature aprono il 15 settembre 2026. Prepara il tuo dossier fin da ora — scheda prodotto, foto HD, argomentario tecnico. Tutto sarà valutato da una giuria internazionale.",
    primary: "Candidati ora",
    secondary: "Scarica il regolamento",
    note: "Tassa: 250 € IVA esclusa per categoria. Gratis per espositori Oro.",
  },
};

export default function AwardsApplicationCTA() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section className="relative w-full bg-cream-100 py-14 md:py-20" aria-label="Awards application">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        <h2
          className="text-ink-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight font-bold mb-8 max-w-4xl"
          style={{ fontFamily: "SansPlomb-98, sans-serif" }}
        >
          {ui.title}
        </h2>

        <p className="text-ink-600 text-lg md:text-xl leading-relaxed max-w-3xl mb-10 md:mb-12">
          {ui.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Link
            href="/devenez-exposants"
            className="group inline-flex items-center gap-4 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
          >
            <span>{ui.primary}</span>
            <ArrowUpRight
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={2.5}
            />
          </Link>
          <button
            type="button"
            className="group inline-flex items-center gap-4 border border-ink-900/30 hover:border-gold-500 text-ink-900 hover:text-gold-700 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          >
            <FileText className="w-5 h-5" strokeWidth={2} />
            <span>{ui.secondary}</span>
          </button>
        </div>

        <p className="text-ink-600 text-sm italic max-w-2xl">{ui.note}</p>
      </div>
    </section>
  );
}
