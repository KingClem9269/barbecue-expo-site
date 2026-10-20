import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buildMetadata } from "@/lib/seo";

/** Mentions légales (français, anglais pour les autres langues). */

type Bloc = { titre: string; lignes: string[] };
type Contenu = { meta: string; titre: string; blocs: Bloc[]; confidentialite: string; lien: string };

const FR: Contenu = {
  meta: "Mentions légales — Barbecue Expo",
  titre: "Mentions légales",
  blocs: [
    {
      titre: "Éditeur du site",
      lignes: [
        "JPC EVENTS, SAS au capital de 63 080 €",
        "RCS Nanterre 825 256 902",
        "Route de la Pyramide, 75012 Paris, France",
        "info@barbecue-expo.fr · 09 83 90 16 15",
      ],
    },
    { titre: "Directeur de la publication", lignes: ["Clément Champault"] },
    {
      titre: "Hébergement",
      lignes: ["Vercel Inc.", "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis", "vercel.com"],
    },
    {
      titre: "Propriété intellectuelle",
      lignes: [
        "Les textes, photos, vidéos, logos et marques présents sur ce site sont la propriété de JPC EVENTS ou de leurs auteurs. Toute reproduction sans autorisation écrite est interdite.",
      ],
    },
  ],
  confidentialite: "Données personnelles et cookies :",
  lien: "politique de confidentialité",
};

const EN: Contenu = {
  meta: "Legal notice — Barbecue Expo",
  titre: "Legal notice",
  blocs: [
    {
      titre: "Publisher",
      lignes: [
        "JPC EVENTS, French SAS with a share capital of €63,080",
        "Registered in Nanterre under no. 825 256 902",
        "Route de la Pyramide, 75012 Paris, France",
        "info@barbecue-expo.fr · +33 9 83 90 16 15",
      ],
    },
    { titre: "Publication director", lignes: ["Clément Champault"] },
    {
      titre: "Hosting",
      lignes: ["Vercel Inc.", "440 N Barranca Ave #4133, Covina, CA 91723, USA", "vercel.com"],
    },
    {
      titre: "Intellectual property",
      lignes: [
        "The texts, photos, videos, logos and trademarks on this site belong to JPC EVENTS or their authors. Any reproduction without written permission is prohibited.",
      ],
    },
  ],
  confidentialite: "Personal data and cookies:",
  lien: "privacy policy",
};

const contenu = (locale: string) => (locale === "fr" ? FR : EN);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = contenu(locale);
  return buildMetadata(locale, "/mentions-legales", { title: c.meta, description: c.blocs[0].lignes.join(" · ") });
}

export default async function MentionsLegalesPage() {
  const locale = await getLocale();
  const c = contenu(locale);

  return (
    <div className="bg-cream-50 text-ink-900 pt-32 md:pt-40 pb-20" lang={locale === "fr" ? "fr" : "en"}>
      <article className="max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="text-5xl md:text-7xl leading-[0.95]" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
          {c.titre}
        </h1>
        {c.blocs.map((b) => (
          <section key={b.titre} className="mt-12">
            <h2 className="text-2xl md:text-3xl" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{b.titre}</h2>
            <div className="mt-4 space-y-1 leading-relaxed text-ink-700">
              {b.lignes.map((l) => <p key={l}>{l}</p>)}
            </div>
          </section>
        ))}
        <p className="mt-12 text-ink-700">
          {c.confidentialite}{" "}
          <Link href="/confidentialite" className="underline underline-offset-2 hover:text-gold-700">{c.lien}</Link>.
        </p>
      </article>
    </div>
  );
}
