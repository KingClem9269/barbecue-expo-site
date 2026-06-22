import type { Campaign } from "../types";

const campaign: Campaign = {
  slug: "pitmasters",
  format: "portrait",
  caption: `Plus de 2,3 millions d'abonnés cumulés montent sur scène à Barbecue Expo 2027. Du Texas à l'Allemagne, les plus grands pitmasters au même endroit. 🔥
#BarbecueExpo #Pitmaster #BBQ #GrillArena #Paris`,
  slides: [
    { kind: "hook", eyebrow: "Pitmasters 2027", title: "15 pitmasters.\n5 pays.\nUne seule arène.", highlight: ["Une seule arène."], photo: "bbq-expo-105.jpg" },
    { kind: "portrait", img: "content/images/03d1a93764_camillo-tomanek.jpeg", name: "Camillo Tomanek", flag: "de", followers: "510K abonnés" },
    { kind: "portrait", img: "photos-2026/bbq-expo-078.jpg", name: "Philipp\n« Bees & BBQ »", flag: "de", followers: "370K abonnés" },
    { kind: "portrait", img: "content/images/pm-david-w-olson.jpg", name: "David W. Olson", flag: "us", followers: "345K abonnés" },
    { kind: "portrait", img: "content/images/9c60fdfdd8_bbq_dude.jpeg", name: "The Barbecue Dude", flag: "de", followers: "271K abonnés" },
    { kind: "portrait", img: "content/images/pm-le-barbecue-de-rafa.jpg", name: "Le Barbecue\nde Rafa", flag: "fr", followers: "200K abonnés" },
    { kind: "portraitDuo",
      left: { img: "content/images/pm-stephane-nowo.jpg", name: "Stéphane\nNowowiejski", flag: "fr", followers: "130K" },
      right: { img: "content/images/pm-danielle-bennett.jpg", name: "Danielle\n« Diva Q »", flag: "us", followers: "111K" },
    },
    { kind: "stat", value: "2,3 M+", label: "d'abonnés cumulés", sub: "réunis sur l'affiche pitmasters 2027." },
    { kind: "cta", title: "Tous sur scène\nen mars 2027.", highlight: ["en mars 2027."], button: "Réservez votre place", url: "barbecue-expo.fr", photo: "bbq-expo-403.jpg" },
  ],
};

export default campaign;
