"use client";
import { useLocale } from "next-intl";
import { Medal } from "lucide-react";

/**
 * AwardsMechanics — how the gold/silver/bronze system actually works.
 * 3 medal cards with detailed scoring mechanics.
 */

const UI: Record<
  string,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    gold: { name: string; pct: string; body: string };
    silver: { name: string; pct: string; body: string };
    bronze: { name: string; pct: string; body: string };
  }
> = {
  fr: {
    eyebrow: "Mécanique",
    title: "Or, argent, bronze.",
    subtitle:
      "Chaque catégorie délivre une médaille d'or, une d'argent, une de bronze. Le jury évalue à l'aveugle sur trois critères : innovation, qualité d'exécution, impact marché.",
    gold: {
      name: "Or",
      pct: "Note ≥ 90/100",
      body: "La distinction suprême. Une marque qui redéfinit son segment, que le jury place au sommet de la discipline.",
    },
    silver: {
      name: "Argent",
      pct: "Note 75–89/100",
      body: "Une marque qui excelle dans son segment. Qualité d'exécution irréprochable, proposition de valeur claire.",
    },
    bronze: {
      name: "Bronze",
      pct: "Note 60–74/100",
      body: "Une marque remarquée et recommandée par le jury. Une proposition solide qui mérite reconnaissance.",
    },
  },
  en: {
    eyebrow: "Mechanics",
    title: "Gold, silver, bronze.",
    subtitle:
      "Each category awards one gold, one silver, one bronze medal. The jury scores blind on three criteria: innovation, execution quality, market impact.",
    gold: {
      name: "Gold",
      pct: "Score ≥ 90/100",
      body: "The supreme distinction. A brand that redefines its segment, placed by the jury at the top of the discipline.",
    },
    silver: {
      name: "Silver",
      pct: "Score 75–89/100",
      body: "A brand that excels in its segment. Flawless execution quality, clear value proposition.",
    },
    bronze: {
      name: "Bronze",
      pct: "Score 60–74/100",
      body: "A brand noticed and recommended by the jury. A solid offering that deserves recognition.",
    },
  },
  es: {
    eyebrow: "Mecánica",
    title: "Oro, plata, bronce.",
    subtitle:
      "Cada categoría otorga una medalla de oro, una de plata, una de bronce. El jurado evalúa a ciegas sobre tres criterios: innovación, calidad de ejecución, impacto en el mercado.",
    gold: {
      name: "Oro",
      pct: "Nota ≥ 90/100",
      body: "La distinción suprema. Una marca que redefine su segmento, que el jurado coloca en la cima de la disciplina.",
    },
    silver: {
      name: "Plata",
      pct: "Nota 75–89/100",
      body: "Una marca que destaca en su segmento. Calidad de ejecución impecable, propuesta de valor clara.",
    },
    bronze: {
      name: "Bronce",
      pct: "Nota 60–74/100",
      body: "Una marca notada y recomendada por el jurado. Una propuesta sólida que merece reconocimiento.",
    },
  },
  de: {
    eyebrow: "Mechanik",
    title: "Gold, Silber, Bronze.",
    subtitle:
      "Jede Kategorie vergibt eine Goldmedaille, eine Silbermedaille, eine Bronzemedaille. Die Jury bewertet blind nach drei Kriterien: Innovation, Ausführungsqualität, Marktauswirkung.",
    gold: {
      name: "Gold",
      pct: "Note ≥ 90/100",
      body: "Die höchste Auszeichnung. Eine Marke, die ihr Segment neu definiert, von der Jury an die Spitze gesetzt.",
    },
    silver: {
      name: "Silber",
      pct: "Note 75–89/100",
      body: "Eine Marke, die sich in ihrem Segment auszeichnet. Einwandfreie Ausführungsqualität, klares Wertversprechen.",
    },
    bronze: {
      name: "Bronze",
      pct: "Note 60–74/100",
      body: "Eine von der Jury bemerkte und empfohlene Marke. Ein solides Angebot, das Anerkennung verdient.",
    },
  },
  nl: {
    eyebrow: "Mechaniek",
    title: "Goud, zilver, brons.",
    subtitle:
      "Elke categorie reikt één gouden, één zilveren en één bronzen medaille uit. De jury scoort blind op drie criteria: innovatie, uitvoeringskwaliteit, marktimpact.",
    gold: {
      name: "Goud",
      pct: "Score ≥ 90/100",
      body: "De hoogste onderscheiding. Een merk dat zijn segment herdefinieert, door de jury aan de top geplaatst.",
    },
    silver: {
      name: "Zilver",
      pct: "Score 75–89/100",
      body: "Een merk dat uitblinkt in zijn segment. Onberispelijke uitvoeringskwaliteit, heldere waardepropositie.",
    },
    bronze: {
      name: "Brons",
      pct: "Score 60–74/100",
      body: "Een merk dat door de jury wordt opgemerkt en aanbevolen. Een solide aanbod dat erkenning verdient.",
    },
  },
  pt: {
    eyebrow: "Mecânica",
    title: "Ouro, prata, bronze.",
    subtitle:
      "Cada categoria atribui uma medalha de ouro, uma de prata, uma de bronze. O júri avalia às cegas em três critérios: inovação, qualidade de execução, impacto no mercado.",
    gold: {
      name: "Ouro",
      pct: "Nota ≥ 90/100",
      body: "A distinção suprema. Uma marca que redefine o seu segmento, colocada pelo júri no topo.",
    },
    silver: {
      name: "Prata",
      pct: "Nota 75–89/100",
      body: "Uma marca que se destaca no seu segmento. Qualidade de execução impecável, proposta de valor clara.",
    },
    bronze: {
      name: "Bronze",
      pct: "Nota 60–74/100",
      body: "Uma marca reconhecida e recomendada pelo júri. Uma proposta sólida que merece reconhecimento.",
    },
  },
  it: {
    eyebrow: "Meccanica",
    title: "Oro, argento, bronzo.",
    subtitle:
      "Ogni categoria assegna una medaglia d'oro, una d'argento, una di bronzo. La giuria valuta alla cieca su tre criteri: innovazione, qualità di esecuzione, impatto sul mercato.",
    gold: {
      name: "Oro",
      pct: "Voto ≥ 90/100",
      body: "La distinzione suprema. Un marchio che ridefinisce il proprio segmento, collocato dalla giuria al vertice.",
    },
    silver: {
      name: "Argento",
      pct: "Voto 75–89/100",
      body: "Un marchio che eccelle nel suo segmento. Qualità di esecuzione impeccabile, proposta di valore chiara.",
    },
    bronze: {
      name: "Bronzo",
      pct: "Voto 60–74/100",
      body: "Un marchio notato e raccomandato dalla giuria. Una proposta solida che merita riconoscimento.",
    },
  },
};

export default function AwardsMechanics() {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section className="relative w-full bg-cream-50 py-14 md:py-20" aria-label="Award mechanics">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8 md:mb-12">
          <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          {ui.eyebrow}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 md:mb-16">
          <div className="lg:col-span-8">
            <h2
              className="text-ink-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight font-bold"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {ui.title}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-ink-600 text-base md:text-lg leading-relaxed">
              {ui.subtitle}
            </p>
          </div>
        </div>

        {/* 3 medal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <MedalCard
            tone="gold"
            name={ui.gold.name}
            pct={ui.gold.pct}
            body={ui.gold.body}
          />
          <MedalCard
            tone="silver"
            name={ui.silver.name}
            pct={ui.silver.pct}
            body={ui.silver.body}
          />
          <MedalCard
            tone="bronze"
            name={ui.bronze.name}
            pct={ui.bronze.pct}
            body={ui.bronze.body}
          />
        </div>
      </div>
    </section>
  );
}

function MedalCard({
  tone,
  name,
  pct,
  body,
}: {
  tone: "gold" | "silver" | "bronze";
  name: string;
  pct: string;
  body: string;
}) {
  const toneClass =
    tone === "gold"
      ? {
          ring: "ring-gold-500/60",
          bg: "bg-gradient-to-br from-gold-100/60 to-cream-100",
          icon: "text-gold-600",
          accent: "bg-gold-500",
          glow: "shadow-[0_0_60px_-15px_rgba(244,173,60,0.5)]",
        }
      : tone === "silver"
        ? {
            ring: "ring-slate-400/50",
            bg: "bg-cream-100",
            icon: "text-slate-500",
            accent: "bg-slate-400",
            glow: "",
          }
        : {
            ring: "ring-ember-600/40",
            bg: "bg-cream-100",
            icon: "text-ember-600",
            accent: "bg-ember-600",
            glow: "",
          };

  return (
    <div
      className={`relative border border-ink-900/10 ring-1 ${toneClass.ring} ${toneClass.bg} ${toneClass.glow} rounded-sm p-6 md:p-8 flex flex-col`}
    >
      <div className="flex items-start justify-between mb-6">
        <Medal
          className={`w-14 h-14 md:w-16 md:h-16 ${toneClass.icon}`}
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <span className="text-xs text-ink-600 uppercase tracking-widest font-semibold whitespace-nowrap">
          {pct}
        </span>
      </div>
      <span
        className={`inline-block w-8 h-px ${toneClass.accent} mb-4`}
        aria-hidden="true"
      />
      <h3
        className="text-ink-900 text-3xl md:text-4xl leading-tight font-bold mb-4"
        style={{ fontFamily: "SansPlomb-98, sans-serif" }}
      >
        {name}
      </h3>
      <p className="text-ink-600 text-base leading-relaxed">{body}</p>
    </div>
  );
}
