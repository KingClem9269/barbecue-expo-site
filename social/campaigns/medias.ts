import type { Campaign } from "../types";

const campaign: Campaign = {
  slug: "medias",
  format: "portrait",
  caption: {
    fr: `JT de 20h, matinales radio, presse nationale : Barbecue Expo, c'est 500 millions de contacts générés. Exposer ici, c'est exister bien au-delà du salon. 🔥 Dossier exposant 👉 barbecue-expo.fr/devenez-exposants
#BarbecueExpo #BBQ #Presse #Media #Paris #SalonBBQ`,
    en: `Prime-time TV, radio breakfast shows, national press: Barbecue Expo means 500 million contacts generated. Exhibiting here means existing far beyond the show. 🔥 Exhibitor pack 👉 barbecue-expo.fr/devenez-exposants
#BarbecueExpo #BBQ #Press #Media #Paris #BBQShow`,
  },
  slides: [
    { kind: "hook", eyebrow: { fr: "Retombées médiatiques", en: "Media coverage" }, title: { fr: "Ils ont parlé de\nBarbecue Expo.", en: "The media\ntalked about us." }, highlight: { fr: ["Barbecue Expo."], en: ["talked about us."] }, photo: "bbq-expo-107.jpg" },
    { kind: "stat", value: "500 M+", label: { fr: "de contacts générés", en: "contacts generated" }, sub: { fr: "TV · Radio · Presse — couverture nationale.", en: "TV · Radio · Press — national coverage." } },
    { kind: "mediaWall", title: { fr: "À la télé", en: "On TV" }, items: [
      { name: "TF1" }, { name: "M6" }, { name: "France 2" }, { name: "France 5" }, { name: "LCI" },
    ] },
    { kind: "mediaWall", title: { fr: "À la radio &\ndans la presse", en: "On radio &\nin the press" }, items: [
      { logo: "media-logos/20-minutes.webp" },
      { logo: "media-logos/lci.jpg" },
      { logo: "media-logos/rtl-matinale.avif" },
      { name: "RTL" }, { name: "RMC" }, { name: "France Info" }, { name: "Radio Nova" },
    ] },
    { kind: "stats", eyebrow: { fr: "Affichage public", en: "Out-of-home" }, title: { fr: "Dans toute la ville", en: "All over the city" }, items: [
      { value: "3 500", label: { fr: "affiches publiques", en: "public posters" } },
      { value: "20 M", label: { fr: "de personnes touchées", en: "people reached" } },
      { value: "500 M", label: { fr: "de contacts visuels", en: "visual impressions" } },
    ], photo: "affichage/affiche-02.jpg" },
    { kind: "cta", title: { fr: "Rejoignez le\nrendez-vous que\nles médias couvrent.", en: "Join the event\nthe media\ncan't ignore." }, highlight: { fr: ["les médias couvrent."], en: ["the media\ncan't ignore."] }, sub: { fr: "Réservez votre stand.", en: "Book your booth." }, button: { fr: "Réservez votre stand", en: "Book your booth" }, url: "barbecue-expo.fr/devenez-exposants" },
  ],
};

export default campaign;
