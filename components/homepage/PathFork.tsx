"use client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";

/**
 * PathFork — B2B / B2C decision section.
 *
 * Two split-screen cards inviting the visitor to choose their path.
 * Hover: subtle scale + glow + arrow motion. Fully accessible.
 *
 * JSON blok:
 * {
 *   "_uid": "...",
 *   "component": "path-fork",
 *   "b2c": {
 *     "eyebrow": "Grand public",
 *     "title": "Je viens déguster",
 *     "description": "...",
 *     "href": "/billetterie/particulier",
 *     "cta": "Réserver ma place",
 *     "image": "/content/images/xxx.jpg"
 *   },
 *   "b2b": { ... same shape ... }
 * }
 */

interface Path {
  eyebrow?: string;
  title: string;
  description?: string;
  href: string;
  cta?: string;
  image?: string;
}

interface PathForkBlok {
  _uid?: string;
  b2c?: Path;
  b2b?: Path;
}

const DEFAULTS: Record<string, { b2c: Path; b2b: Path }> = {
  fr: {
    b2c: {
      eyebrow: "Grand public",
      title: "Je viens déguster",
      description:
        "Masterclasses, street food, cooking shows — trois jours d'expérience sensorielle autour du feu.",
      href: "/billetterie/particulier",
      cta: "Réserver ma place",
    },
    b2b: {
      eyebrow: "Professionnels",
      title: "Je viens faire du business",
      description:
        "Rencontrez 250+ marques, dealers et distributeurs européens. Le rendez-vous annuel du secteur BBQ & outdoor cooking.",
      href: "/billetterie/pro-b2b",
      cta: "Accéder à l'espace Pro",
    },
  },
  en: {
    b2c: {
      eyebrow: "General public",
      title: "I'm here to taste",
      description:
        "Masterclasses, street food, cooking shows — three days of sensory experience around fire.",
      href: "/billetterie/particulier",
      cta: "Book my ticket",
    },
    b2b: {
      eyebrow: "Professionals",
      title: "I'm here for business",
      description:
        "Meet 250+ European brands, dealers and distributors. The annual event for the BBQ & outdoor cooking industry.",
      href: "/billetterie/pro-b2b",
      cta: "Access the Pro area",
    },
  },
  es: {
    b2c: {
      eyebrow: "Gran público",
      title: "Vengo a degustar",
      description:
        "Masterclasses, street food, cooking shows — tres días de experiencia sensorial alrededor del fuego.",
      href: "/billetterie/particulier",
      cta: "Reservar mi entrada",
    },
    b2b: {
      eyebrow: "Profesionales",
      title: "Vengo por negocios",
      description:
        "Conozca 250+ marcas, distribuidores europeos. La cita anual del sector BBQ & cocina exterior.",
      href: "/billetterie/pro-b2b",
      cta: "Acceder al área Pro",
    },
  },
  de: {
    b2c: {
      eyebrow: "Allgemeines Publikum",
      title: "Ich bin hier zum Genießen",
      description:
        "Masterclasses, Street Food, Cooking Shows — drei Tage Sinneserfahrung rund ums Feuer.",
      href: "/billetterie/particulier",
      cta: "Ticket buchen",
    },
    b2b: {
      eyebrow: "Fachleute",
      title: "Ich bin beruflich hier",
      description:
        "Treffen Sie 250+ europäische Marken, Händler und Distributoren. Das jährliche Event der BBQ- und Outdoor-Cooking-Branche.",
      href: "/billetterie/pro-b2b",
      cta: "Zum Pro-Bereich",
    },
  },
  nl: {
    b2c: {
      eyebrow: "Algemeen publiek",
      title: "Ik kom proeven",
      description:
        "Masterclasses, street food, cooking shows — drie dagen zintuiglijke beleving rond het vuur.",
      href: "/billetterie/particulier",
      cta: "Mijn ticket boeken",
    },
    b2b: {
      eyebrow: "Professionals",
      title: "Ik kom voor zaken",
      description:
        "Ontmoet 250+ Europese merken, dealers en distributeurs. Het jaarlijkse evenement voor de BBQ- & outdoor-cooking-industrie.",
      href: "/billetterie/pro-b2b",
      cta: "Naar de Pro-ruimte",
    },
  },
  pt: {
    b2c: {
      eyebrow: "Grande público",
      title: "Venho provar",
      description:
        "Masterclasses, street food, cooking shows — três dias de experiência sensorial em torno do fogo.",
      href: "/billetterie/particulier",
      cta: "Reservar o meu bilhete",
    },
    b2b: {
      eyebrow: "Profissionais",
      title: "Venho a negócios",
      description:
        "Conheça 250+ marcas europeias, distribuidores e dealers. O encontro anual do setor BBQ & cozinha ao ar livre.",
      href: "/billetterie/pro-b2b",
      cta: "Aceder à área Pro",
    },
  },
  it: {
    b2c: {
      eyebrow: "Grande pubblico",
      title: "Vengo per degustare",
      description:
        "Masterclass, street food, cooking show — tre giorni di esperienza sensoriale attorno al fuoco.",
      href: "/billetterie/particulier",
      cta: "Prenota il mio biglietto",
    },
    b2b: {
      eyebrow: "Professionisti",
      title: "Vengo per affari",
      description:
        "Incontra 250+ marchi europei, dealer e distributori. L'appuntamento annuale del settore BBQ & cucina outdoor.",
      href: "/billetterie/pro-b2b",
      cta: "Accedi all'area Pro",
    },
  },
};

function PathCard({
  path,
  variant,
}: {
  path: Path;
  variant: "b2c" | "b2b";
}) {
  const isB2C = variant === "b2c";
  // B2C = warm cream + gold accent | B2B = dark ink + char/gold accent
  const bg = isB2C ? "bg-cream-100" : "bg-ink-950";
  const textMain = isB2C ? "text-ink-900" : "text-cream-50";
  const textMuted = isB2C ? "text-ink-600" : "text-cream-50/70";
  const accent = isB2C ? "bg-gold-500" : "bg-gold-500";
  const hoverGlow = isB2C
    ? "group-hover:shadow-[0_0_0_1px_rgba(244,173,60,0.5)]"
    : "group-hover:shadow-[0_0_60px_-20px_rgba(244,173,60,0.6)]";

  return (
    <Link
      href={path.href}
      className={`group relative block ${bg} overflow-hidden transition-shadow duration-300 ${hoverGlow} focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2`}
    >
      {/* Optional background image with heavy overlay */}
      {path.image && (
        <>
          <Image
            src={path.image}
            alt=""
            fill
            className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div
            className={`absolute inset-0 ${isB2C ? "bg-cream-100/70" : "bg-ink-950/70"}`}
          />
        </>
      )}

      <div className="relative z-10 p-8 md:p-12 lg:p-16 min-h-[420px] md:min-h-[520px] flex flex-col justify-between">
        {/* Top: eyebrow */}
        <div
          className={`inline-flex items-center gap-3 text-xs md:text-sm uppercase tracking-widest font-semibold ${textMain}`}
        >
          <span className={`inline-block w-8 h-px ${accent}`} />
          {path.eyebrow}
        </div>

        {/* Middle: title + description */}
        <div className="mt-12 md:mt-20">
          <h3
            className={`${textMain} text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight font-bold`}
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {path.title}
          </h3>
          {path.description && (
            <p
              className={`mt-6 md:mt-8 ${textMuted} text-base md:text-lg max-w-md leading-relaxed`}
            >
              {path.description}
            </p>
          )}
        </div>

        {/* Bottom: CTA */}
        <div
          className={`mt-10 md:mt-12 inline-flex items-center gap-3 ${textMain} text-sm md:text-base font-semibold uppercase tracking-widest`}
        >
          <span>{path.cta}</span>
          <span
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gold-500 text-ink-950 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
            aria-hidden="true"
          >
            <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function PathFork({ blok }: { blok: PathForkBlok }) {
  const locale = useLocale();
  const defaults = DEFAULTS[locale] || DEFAULTS.fr;
  const b2c: Path = { ...defaults.b2c, ...blok.b2c };
  const b2b: Path = { ...defaults.b2b, ...blok.b2b };

  return (
    <section
      className="relative w-full bg-ink-950"
      aria-label="Choose your path"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <PathCard path={b2c} variant="b2c" />
        <PathCard path={b2b} variant="b2b" />
      </div>
    </section>
  );
}
