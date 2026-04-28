import EditorialManifesto from "@/components/editorial/EditorialManifesto";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "next-intl/server";

const CONTENT_FR: Parameters<typeof EditorialManifesto>[0] = {
  eyebrow: "Pour les marques · Édition 2027",
  heroImage: "/photos-2026/bbq-expo-008.jpg",
  heroTitle: { line1: "Cinq raisons", line2_highlight: "d'exposer", line3: "à Paris en 2027." },
  heroSubtitle:
    "Chaque marque exposante de Barbecue Expo investit. Voici comment, concrètement, le salon transforme cet investissement en croissance — vu par les exposants 2026.",
  reasons: [
    {
      number: "01",
      title: "Une audience qui n'est pas en balade.",
      body: "Vingt-cinq mille huit cent quatre-vingt-seize visiteurs en 2026. Plus de la moitié sont des prescripteurs : journalistes spécialisés, chefs, pitmasters, revendeurs, distributeurs. Vos cibles sont déjà là, vous n'avez plus qu'à leur parler.",
      image: "/photos-2026/bbq-expo-184.jpg",
    },
    {
      number: "02",
      title: "Le matchmaking B2B, vraiment.",
      body: "Trois mois avant le salon, vous recevez la liste complète des acheteurs présents : enseignes spécialisées, GMS, e-commerçants, distributeurs européens, HORECA. Vous demandez vos rendez-vous, nous bloquons les créneaux. Vous arrivez avec un agenda, pas avec de l'espoir.",
      image: "/photos-2026/bbq-expo-184.jpg",
    },
    {
      number: "03",
      title: "L'Europe en trois jours.",
      body: "Quinze pays exposants. Vingt-cinq nationalités côté visiteurs. Le seul endroit en Europe où votre marque peut, depuis un seul stand, parler à un acheteur belge, à un distributeur allemand, à un e-commerçant espagnol et à un caviste italien. Un trimestre de roadshow gagné.",
      image: "/photos-2026/bbq-expo-403.jpg",
    },
    {
      number: "04",
      title: "Les Awards 2027 distinguent les meilleurs.",
      body: "Première édition des Barbecue Expo Awards. Or, argent, bronze sur cinq catégories : Innovation, Accessoire, Design, Rapport qualité-prix, Marque émergente. Une médaille, c'est un argument de vente que vous porterez dans votre communication pendant un an.",
      image: "/photos-2026/bbq-expo-105.jpg",
    },
    {
      number: "05",
      title: "Votre présence presse multipliée.",
      body: "Médias gastronomiques, presse outdoor, podcasts BBQ, blogueurs, presse régionale. Cinq communiqués envoyés par mois pendant les six mois précédant le salon. Photos haute définition de votre stand, de votre nouveauté, de votre équipe — tout est partagé avec la presse partenaire.",
      image: "/photos-2026/bbq-expo-720.jpg",
    },
  ],
  cta: { label: "Demander le dossier exposant", href: "/devenez-exposants" },
  ctaSecondary: { label: "Voir l'espace Pro & B2B", href: "/espace-pro-b2b" },
  closingQuote:
    "Le bon salon, au bon moment, avec les bonnes personnes. Trois jours, et un an de retour sur investissement.",
};

const CONTENT_EN: Parameters<typeof EditorialManifesto>[0] = {
  eyebrow: "For brands · 2027 edition",
  heroImage: "/photos-2026/bbq-expo-008.jpg",
  heroTitle: { line1: "Five reasons", line2_highlight: "to exhibit", line3: "in Paris 2027." },
  heroSubtitle:
    "Every exhibiting brand invests at Barbecue Expo. Here is how, concretely, the show turns that investment into growth — seen through 2026 exhibitors.",
  reasons: [
    { number: "01", title: "An audience that isn't strolling.", body: "Twenty-five thousand visitors in 2026. More than half are tastemakers: specialist journalists, chefs, pitmasters, resellers, distributors. Your targets are already there.", image: "/photos-2026/bbq-expo-184.jpg" },
    { number: "02", title: "B2B matchmaking, for real.", body: "Three months before the show, you receive the complete list of attending buyers: specialty chains, mass retailers, e-commerce, European distributors, HORECA. You request meetings, we lock the slots. You arrive with an agenda, not with hope.", image: "/photos-2026/bbq-expo-184.jpg" },
    { number: "03", title: "Europe in three days.", body: "Fifteen exhibiting countries. Twenty-five visitor nationalities. The only place in Europe where your brand can, from a single stand, talk to a Belgian buyer, German distributor, Spanish e-commerce and Italian wine seller. A quarter of roadshow saved.", image: "/photos-2026/bbq-expo-403.jpg" },
    { number: "04", title: "The 2027 Awards distinguish the best.", body: "First edition of the Barbecue Expo Awards. Gold, silver, bronze in five categories: Innovation, Accessory, Design, Value, Emerging Brand. A medal becomes a selling argument you carry in your communication for a full year.", image: "/photos-2026/bbq-expo-105.jpg" },
    { number: "05", title: "Your press presence multiplied.", body: "Food media, outdoor press, BBQ podcasts, bloggers, regional press. Five releases sent per month during the six months before the show. HD photos of your stand, your novelty, your team — all shared with our press partners.", image: "/photos-2026/bbq-expo-720.jpg" },
  ],
  cta: { label: "Request the exhibitor kit", href: "/devenez-exposants" },
  ctaSecondary: { label: "See Pro & B2B area", href: "/espace-pro-b2b" },
  closingQuote: "The right show, at the right time, with the right people. Three days, one full year of return on investment.",
};

const CONTENT: Record<string, Parameters<typeof EditorialManifesto>[0]> = {
  fr: CONTENT_FR,
  en: CONTENT_EN,
  es: CONTENT_FR,
  de: CONTENT_FR,
  nl: CONTENT_FR,
  pt: CONTENT_FR,
  it: CONTENT_FR,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT.fr;
  return buildMetadata(locale, "/pourquoi-exposer", {
    title: "Pourquoi exposer — Barbecue Expo 2027",
    description: c.heroSubtitle,
  });
}

export default async function PourquoiExposerPage() {
  const locale = await getLocale();
  const c = CONTENT[locale] || CONTENT.fr;
  return <EditorialManifesto {...c} />;
}
