import type { Campaign } from "../types";

const campaign: Campaign = {
  slug: "provenance",
  format: "portrait",
  caption: `Un public français très majoritaire, mais 20 pays sous le même toit en 2027. Le seul salon où les marques internationales rencontrent les prescripteurs européens. 🌍🔥
#BarbecueExpo #BBQ #Europe #SalonBBQ #Paris`,
  slides: [
    { kind: "hook", eyebrow: "Provenance des visiteurs", title: "D'où viennent\nles passionnés ?", highlight: ["les passionnés ?"], photo: "bbq-expo-066.jpg" },
    { kind: "flagStat", flag: "fr", value: "77%", label: "France" },
    { kind: "flagRows", title: "Et juste\nà côté…", rows: [
      { flag: "be", country: "Benelux", pct: "9,6%" },
      { flag: "de", country: "Allemagne", pct: "4,0%" },
    ] },
    { kind: "flagRows", title: "Toute l'Europe\nrépond présent", rows: [
      { flag: "gb", country: "Royaume-Uni", pct: "3,2%" },
      { flag: "it", country: "Italie", pct: "2,2%" },
      { flag: "es", country: "Espagne", pct: "1,2%" },
    ] },
    { kind: "stat", value: "20", label: "pays représentés en 2027", sub: "Un salon européen, pas seulement parisien." },
    { kind: "cta", title: "Le rendez-vous\neuropéen du feu.", highlight: ["européen"], button: "Réservez votre stand", url: "barbecue-expo.fr/devenez-exposants", photo: "bbq-expo-403.jpg" },
  ],
};

export default campaign;
