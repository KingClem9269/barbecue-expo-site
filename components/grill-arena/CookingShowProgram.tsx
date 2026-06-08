"use client";

const UI: Record<string, { eyebrow: string; title: string }> = {
  fr: {
    eyebrow: "Édition 2026 — retour en images",
    title: "Le programme Cooking Shows 2026.",
  },
  en: {
    eyebrow: "2026 edition — look back",
    title: "2026 Cooking Shows schedule.",
  },
  es: {
    eyebrow: "Edición 2026 — retrospectiva",
    title: "Programa Cooking Shows 2026.",
  },
  de: {
    eyebrow: "Ausgabe 2026 — Rückblick",
    title: "Cooking Shows Programm 2026.",
  },
  nl: {
    eyebrow: "Editie 2026 — terugblik",
    title: "Cooking Shows programma 2026.",
  },
  pt: {
    eyebrow: "Edição 2026 — retrospetiva",
    title: "Programa Cooking Shows 2026.",
  },
  it: {
    eyebrow: "Edizione 2026 — retrospettiva",
    title: "Programma Cooking Shows 2026.",
  },
};

export default function CookingShowProgram({ locale }: { locale: string }) {
  const ui = UI[locale] || UI.fr;
  // Use /fr for all non-EN locales, /en for EN
  const iframeLang = locale === "en" ? "en" : "fr";

  return (
    <section className="relative w-full bg-cream-50 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-6">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>
        <h2
          className="text-ink-900 text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight font-bold mb-12"
          style={{ fontFamily: "SansPlomb-98, sans-serif" }}
        >
          {ui.title}
        </h2>

        <iframe
          src={`https://cookingshow2026.lovable.app/${iframeLang}`}
          width="100%"
          height="1900"
          style={{ border: "none", borderRadius: "12px" }}
          title={
            locale === "en"
              ? "Cooking Shows Schedule - Barbecue Expo 2026"
              : "Programme Cooking Shows - Barbecue Expo 2026"
          }
        />
      </div>
    </section>
  );
}
