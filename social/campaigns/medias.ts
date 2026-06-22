import type { Campaign } from "../types";

const campaign: Campaign = {
  slug: "medias",
  format: "portrait",
  caption: `JT de 20h, matinales radio, presse nationale : Barbecue Expo, c'est 500 millions de contacts générés. Exposer ici, c'est exister bien au-delà du salon. 🔥
#BarbecueExpo #BBQ #Presse #Media #Paris #SalonBBQ`,
  slides: [
    { kind: "hook", eyebrow: "Retombées médiatiques", title: "Ils ont parlé de\nBarbecue Expo.", highlight: ["Barbecue Expo."], photo: "bbq-expo-105.jpg" },
    { kind: "stat", value: "500 M+", label: "de contacts générés", sub: "TV · Radio · Presse — couverture nationale." },
    { kind: "mediaWall", title: "À la télé", items: [
      { name: "TF1" }, { name: "M6" }, { name: "France 2" }, { name: "France 5" }, { name: "LCI" },
    ] },
    { kind: "mediaWall", title: "À la radio &\ndans la presse", items: [
      { logo: "media-logos/20-minutes.webp" },
      { logo: "media-logos/lci.jpg" },
      { logo: "media-logos/rtl-matinale.avif" },
      { name: "RTL" }, { name: "RMC" }, { name: "France Info" }, { name: "Radio Nova" },
    ] },
    { kind: "stats", eyebrow: "Affichage public", title: "Dans toute la ville", items: [
      { value: "3 500", label: "affiches publiques" },
      { value: "20 M", label: "de personnes touchées" },
      { value: "500 M", label: "de contacts visuels" },
    ], photo: "affichage/affiche-02.jpg" },
    { kind: "cta", title: "Rejoignez le\nrendez-vous que\nles médias couvrent.", highlight: ["les médias couvrent."], button: "barbecue-expo.fr" },
  ],
};

export default campaign;
