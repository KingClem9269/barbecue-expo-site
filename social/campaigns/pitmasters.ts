import type { Campaign } from "../types";

const campaign: Campaign = {
  slug: "pitmasters",
  format: "portrait",
  caption: {
    fr: `Plus de 2,3 millions d'abonnés cumulés montent sur scène à Barbecue Expo 2027. Du Texas à l'Allemagne, les plus grands pitmasters au même endroit. 🔥 Réservez votre place 👉 barbecue-expo.fr/devenez-exposants
#BarbecueExpo #Pitmaster #BBQ #GrillArena #Paris`,
    en: `Over 2.3 million combined followers take the stage at Barbecue Expo 2027. From Texas to Germany, the greatest pitmasters in one place. 🔥 Book your spot 👉 barbecue-expo.fr/devenez-exposants
#BarbecueExpo #Pitmaster #BBQ #GrillArena #Paris`,
  },
  slides: [
    { kind: "hook", eyebrow: { fr: "Pitmasters 2027", en: "Pitmasters 2027" }, title: { fr: "15 pitmasters.\n5 pays.\nUne seule arène.", en: "15 pitmasters.\n5 countries.\nOne arena." }, highlight: { fr: ["Une seule arène."], en: ["One arena."] }, photo: "bbq-expo-688.jpg" },
    { kind: "portrait", img: "content/images/03d1a93764_camillo-tomanek.jpeg", name: "Camillo Tomanek", flag: "de", followers: { fr: "510K abonnés", en: "510K followers" } },
    { kind: "portrait", img: "photos-2026/bbq-expo-293.jpg", name: "Philipp\n« Bees & BBQ »", flag: "de", followers: { fr: "370K abonnés", en: "370K followers" } },
    { kind: "portrait", img: "content/images/pm-david-w-olson.jpg", name: "David W. Olson", flag: "us", followers: { fr: "345K abonnés", en: "345K followers" } },
    { kind: "portrait", img: "content/images/9c60fdfdd8_bbq_dude.jpeg", name: "The Barbecue Dude", flag: "de", followers: { fr: "271K abonnés", en: "271K followers" } },
    { kind: "portrait", img: "content/images/pm-le-barbecue-de-rafa.jpg", name: "Le Barbecue\nde Rafa", flag: "fr", followers: { fr: "200K abonnés", en: "200K followers" } },
    { kind: "portraitDuo",
      left: { img: "content/images/pm-stephane-nowo.jpg", name: "Stéphane\nNowowiejski", flag: "fr", followers: "130K" },
      right: { img: "content/images/pm-danielle-bennett.jpg", name: "Danielle\n« Diva Q »", flag: "us", followers: "111K" },
    },
    { kind: "stat", value: "2,3 M+", label: { fr: "d'abonnés cumulés", en: "combined followers" }, sub: { fr: "réunis sur l'affiche pitmasters 2027.", en: "on the 2027 pitmaster line-up." } },
    { kind: "cta", title: { fr: "Tous sur scène\nen mars 2027.", en: "All on stage\nin March 2027." }, highlight: { fr: ["en mars 2027."], en: ["in March 2027."] }, sub: { fr: "Votre marque à leurs côtés, sur la Grill Arena.", en: "Your brand by their side, on the Grill Arena." }, button: { fr: "Réservez votre place", en: "Book your spot" }, url: "barbecue-expo.fr/devenez-exposants", photo: "bbq-expo-689.jpg" },
  ],
};

export default campaign;
