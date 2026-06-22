import type { Campaign } from "../types";

const campaign: Campaign = {
  slug: "provenance",
  format: "portrait",
  caption: {
    fr: `Un public français très majoritaire, mais 20 pays sous le même toit en 2027. Le seul salon où les marques internationales rencontrent les prescripteurs européens. 🌍🔥 Réservez votre stand 👉 barbecue-expo.fr/devenez-exposants
#BarbecueExpo #BBQ #Europe #SalonBBQ #Paris`,
    en: `A largely French audience, but 20 countries under one roof in 2027. The only show where international brands meet European decision-makers. 🌍🔥 Book your booth 👉 barbecue-expo.fr/devenez-exposants
#BarbecueExpo #BBQ #Europe #BBQShow #Paris`,
  },
  slides: [
    { kind: "hook", eyebrow: { fr: "Provenance des visiteurs", en: "Where visitors come from" }, title: { fr: "D'où viennent\nles passionnés ?", en: "Where do the\nfans come from?" }, highlight: { fr: ["les passionnés ?"], en: ["the\nfans"] }, photo: "bbq-expo-171.jpg" },
    { kind: "flagStat", flag: "fr", value: "77%", label: { fr: "France", en: "France" } },
    { kind: "flagRows", title: { fr: "Et juste\nà côté…", en: "And right\nnext door…" }, rows: [
      { flag: "be", country: { fr: "Benelux", en: "Benelux" }, pct: "9,6%" },
      { flag: "de", country: { fr: "Allemagne", en: "Germany" }, pct: "4,0%" },
    ] },
    { kind: "flagRows", title: { fr: "Toute l'Europe\nrépond présent", en: "All of Europe\nshows up" }, rows: [
      { flag: "gb", country: { fr: "Royaume-Uni", en: "United Kingdom" }, pct: "3,2%" },
      { flag: "it", country: { fr: "Italie", en: "Italy" }, pct: "2,2%" },
      { flag: "es", country: { fr: "Espagne", en: "Spain" }, pct: "1,2%" },
    ] },
    { kind: "stat", value: "20", label: { fr: "pays représentés en 2027", en: "countries represented in 2027" }, sub: { fr: "Un salon européen, pas seulement parisien.", en: "A European show, not just a Parisian one." } },
    { kind: "cta", title: { fr: "Le rendez-vous\neuropéen du feu.", en: "Europe's\nfire gathering." }, highlight: { fr: ["européen"], en: ["Europe's"] }, sub: { fr: "Touchez les prescripteurs de 20 pays.", en: "Reach decision-makers from 20 countries." }, button: { fr: "Réservez votre stand", en: "Book your booth" }, url: "barbecue-expo.fr/devenez-exposants", photo: "bbq-expo-441.jpg" },
  ],
};

export default campaign;
