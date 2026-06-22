import type { Campaign } from "../types";

const campaign: Campaign = {
  slug: "awards",
  format: "portrait",
  caption: {
    fr: `Nouveauté 2027 : les Barbecue Expo Awards. Or, argent, bronze sur 6 catégories, jury international, évaluation à l'aveugle. Une médaille qui devient votre meilleur argument de vente pendant un an. 🥇 Candidatez en exposant 👉 barbecue-expo.fr/devenez-exposants
#BarbecueExpo #Awards #BBQ #Innovation`,
    en: `New in 2027: the Barbecue Expo Awards. Gold, silver, bronze across 6 categories, international jury, blind judging. A medal that becomes your best sales argument for a whole year. 🥇 Apply as an exhibitor 👉 barbecue-expo.fr/devenez-exposants
#BarbecueExpo #Awards #BBQ #Innovation`,
  },
  slides: [
    { kind: "hook", eyebrow: { fr: "Nouveauté 2027", en: "New in 2027" }, title: { fr: "Première édition :\nles Barbecue\nExpo Awards.", en: "First edition:\nthe Barbecue\nExpo Awards." }, highlight: { fr: ["Barbecue\nExpo Awards."], en: ["Barbecue\nExpo Awards."] }, photo: "bbq-expo-720.jpg" },
    { kind: "awards", title: { fr: "6 catégories.\nUne pastille\nà décrocher.", en: "6 categories.\nOne badge\nto win." }, highlight: { fr: ["6 catégories."], en: ["6 categories."] }, items: [
      { category: "Best BBQ" },
      { category: "Best Innovation" },
      { category: "Best Accessory" },
      { category: "Best Food" },
      { category: "Best Stand" },
      { category: "Best Live" },
    ] },
    { kind: "medals", title: { fr: "Or · Argent · Bronze", en: "Gold · Silver · Bronze" }, sub: { fr: "sur 6 catégories", en: "across 6 categories" } },
    { kind: "text", title: { fr: "Un label\nqui pèse.", en: "A label\nthat matters." }, body: { fr: "Jury international · évaluation à l'aveugle · cérémonie au Parc Floral de Paris.", en: "International jury · blind judging · ceremony at Parc Floral de Paris." }, highlight: { fr: ["qui pèse."], en: ["that matters."] } },
    { kind: "cta", title: { fr: "Une médaille = un\nargument de vente\npour un an.", en: "A medal = a\nsales argument\nfor a year." }, highlight: { fr: ["pour un an."], en: ["for a year."] }, sub: { fr: "Candidature ouverte aux exposants 2027.", en: "Open to 2027 exhibitors." }, button: { fr: "Candidatez en exposant", en: "Apply as an exhibitor" }, url: "barbecue-expo.fr/devenez-exposants", photo: "bbq-expo-477.jpg" },
  ],
};

export default campaign;
