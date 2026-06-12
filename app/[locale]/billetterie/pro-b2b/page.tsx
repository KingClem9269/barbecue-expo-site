import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { Clock } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

const UI: Record<
  string,
  { eyebrow: string; title: string; message: string; back: string }
> = {
  fr: {
    eyebrow: "Édition 2027",
    title: "Billetterie Pro",
    message: "La billetterie pro arrive bientôt. Revenez prochainement pour réserver votre pass professionnel et vos accès B2B.",
    back: "Voir la billetterie grand public",
  },
  en: {
    eyebrow: "2027 edition",
    title: "Pro tickets",
    message: "Pro ticketing is coming soon. Check back shortly to book your professional pass and B2B access.",
    back: "See general-public tickets",
  },
  es: {
    eyebrow: "Edición 2027",
    title: "Entradas Pro",
    message: "La venta de entradas Pro estará disponible próximamente. Vuelve pronto para reservar tu pase profesional y tus accesos B2B.",
    back: "Ver entradas para el público general",
  },
  de: {
    eyebrow: "Ausgabe 2027",
    title: "Pro-Tickets",
    message: "Der Pro-Ticketverkauf kommt bald. Schauen Sie bald wieder vorbei, um Ihren Profi-Pass und B2B-Zugang zu buchen.",
    back: "Tickets für das allgemeine Publikum ansehen",
  },
  nl: {
    eyebrow: "Editie 2027",
    title: "Pro-tickets",
    message: "De pro-ticketverkoop komt binnenkort. Kom snel terug om je professionele pas en B2B-toegang te boeken.",
    back: "Bekijk tickets voor het grote publiek",
  },
  pt: {
    eyebrow: "Edição 2027",
    title: "Bilhetes Pro",
    message: "A bilheteira pro chega em breve. Volte em breve para reservar o seu passe profissional e os seus acessos B2B.",
    back: "Ver bilhetes para o público geral",
  },
  it: {
    eyebrow: "Edizione 2027",
    title: "Biglietti Pro",
    message: "La biglietteria pro arriva presto. Torna a breve per prenotare il tuo pass professionale e gli accessi B2B.",
    back: "Vedi i biglietti per il pubblico",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = UI[locale] || UI.fr;
  return buildMetadata(locale, "/billetterie/pro-b2b", {
    title: `${ui.title} — Barbecue Expo 2027`,
    description: ui.message,
  });
}

export default async function BilletterieProPage() {
  const locale = await getLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <div className="bg-ink-950 min-h-[70vh] flex items-center">
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-32 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-500/15 text-gold-500 mb-8">
          <Clock className="w-8 h-8" strokeWidth={1.75} />
        </div>
        <div className="flex items-center justify-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-5">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
        </div>
        <h1 className="text-cream-50 text-4xl sm:text-5xl md:text-6xl leading-[0.95] font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
          {ui.title}
        </h1>
        <p className="mt-6 text-cream-50/75 text-lg leading-relaxed">{ui.message}</p>
        <Link
          href="/billetterie"
          className="mt-10 inline-flex items-center justify-center bg-gold-500 text-ink-950 px-7 py-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-gold-300 transition-colors"
        >
          {ui.back}
        </Link>
      </div>
    </div>
  );
}
