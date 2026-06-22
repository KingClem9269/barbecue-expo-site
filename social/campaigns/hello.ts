import type { Campaign } from "../types";

/** Campagne d'exemple minimale — vérifie le rendu PNG + l'export. */
const campaign: Campaign = {
  slug: "hello",
  format: "portrait", // 1080×1350
  caption: `Le socle social Barbecue Expo est en place 🔥

Génération d'assets Instagram brandés directement depuis le repo : accroche, chiffres énormes, accent or, CTA daté. Rendu HTML/CSS → capture Chrome → PNG net.

12 · 13 · 14 Mars 2027 — Parc Floral de Paris

#barbecueexpo #bbq #paris #salon #2027`,
  slides: [
    {
      kind: "hook",
      eyebrow: "Test du socle",
      title: "Le générateur\nd'assets est\nen ligne.",
      highlight: ["en ligne."],
      photo: "bbq-expo-066.jpg",
    },
    {
      kind: "stat",
      value: "1 080",
      unit: "px",
      label: "rendu en 2160 puis exporté net",
      sub: "Supersampling ×2 via Chrome headless pour des titres parfaitement nets.",
    },
    {
      kind: "text",
      title: "Une idée\npar slide.",
      body: "Chiffres énormes, accent or sur les mots-clés, marges de sécurité de 90 px.",
      highlight: ["Une idée", "or"],
    },
    {
      kind: "cta",
      title: "On passe aux\nvraies campagnes.",
      highlight: ["vraies campagnes."],
      sub: "Donne-moi le contenu, je sors les slides, le contact-sheet et les animations.",
      photo: "bbq-expo-105.jpg",
    },
  ],
};

export default campaign;
