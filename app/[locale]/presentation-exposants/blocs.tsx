"use client";

/**
 * Petits blocs communs à la présentation du salon, au catalogue exposant et à
 * la page des campagnes : surtitre, titre, section, drapeaux de langue.
 */

import { useT, type Lang } from "./i18n";

export function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 text-xs md:text-sm uppercase tracking-widest font-semibold ${light ? "text-gold-500" : "text-ink-900"}`}>
      <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
      {children}
    </div>
  );
}

export function H2({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 className={`${light ? "text-cream-50" : "text-ink-900"} text-3xl sm:text-4xl md:text-5xl leading-tight font-bold`} style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
      {children}
    </h2>
  );
}

const LANG_META: Record<Lang, { flag: string; label: string }> = {
  fr: { flag: "fr", label: "Français" },
  en: { flag: "gb", label: "English" },
  es: { flag: "es", label: "Español" },
  de: { flag: "de", label: "Deutsch" },
  nl: { flag: "nl", label: "Nederlands" },
  pt: { flag: "pt", label: "Português" },
  it: { flag: "it", label: "Italiano" },
};

export function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  // FR (langue source) + langue de la page (ou EN si elle est en FR)
  const other: Lang = lang === "fr" ? "en" : lang;
  const flags = (["fr", other] as Lang[]).map((l) => ({ l, ...LANG_META[l] }));
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      {flags.map(({ l, flag, label }) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          aria-label={label}
          title={label}
          className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${lang === l ? "border-gold-500 scale-105" : "border-cream-50/25 opacity-55 hover:opacity-100"}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/flags/${flag}.svg`} alt={label} className="w-full h-full object-cover" />
        </button>
      ))}
    </div>
  );
}

/* small wrapper for a catalog section */
export function Sec({ id, eyebrow, title, children, dark }: { id: string; eyebrow: string; title: string; children: React.ReactNode; dark?: boolean }) {
  const { t } = useT();
  return (
    <section id={id} className={`scroll-mt-20 py-16 md:py-24 ${dark ? "bg-ink-950" : "bg-cream-50"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Eyebrow light={dark}>{t(eyebrow)}</Eyebrow>
        <div className="mt-5 mb-10"><H2 light={dark}>{t(title)}</H2></div>
        {children}
      </div>
    </section>
  );
}
