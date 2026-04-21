/**
 * Pro nav menu — used when audience === 'pro'.
 * Static definition keeps it simple: no JSON content needed.
 *
 * Each item supports localized labels per locale.
 * Items can have submenus for grouped sections.
 */

export type ProMenuItem = {
  key: string;
  labels: Record<string, string>;
  href: string;
  submenu?: ProMenuItem[];
};

export const PRO_MENU: ProMenuItem[] = [
  {
    key: "becomeExhibitor",
    labels: {
      fr: "Devenir exposant",
      en: "Become exhibitor",
      es: "Ser expositor",
      de: "Aussteller werden",
      nl: "Exposant worden",
      pt: "Ser expositor",
      it: "Diventare espositore",
    },
    href: "/devenez-exposants",
  },
  {
    key: "exhibitors",
    labels: {
      fr: "Exposants",
      en: "Exhibitors",
      es: "Expositores",
      de: "Aussteller",
      nl: "Exposanten",
      pt: "Expositores",
      it: "Espositori",
    },
    href: "/exposants",
  },
  {
    key: "awards",
    labels: {
      fr: "Awards",
      en: "Awards",
      es: "Premios",
      de: "Awards",
      nl: "Awards",
      pt: "Prémios",
      it: "Awards",
    },
    href: "/awards",
  },
  {
    key: "matchmaking",
    labels: {
      fr: "Espace Pro & B2B",
      en: "Pro & B2B area",
      es: "Área Pro & B2B",
      de: "Pro & B2B-Bereich",
      nl: "Pro & B2B-ruimte",
      pt: "Área Pro & B2B",
      it: "Area Pro & B2B",
    },
    href: "/espace-pro-b2b",
  },
  {
    key: "press",
    labels: {
      fr: "Espace Presse",
      en: "Press room",
      es: "Sala de prensa",
      de: "Pressebereich",
      nl: "Perszaal",
      pt: "Sala de imprensa",
      it: "Sala stampa",
    },
    href: "/gallery-press",
  },
];

export function getProMenuLabel(item: ProMenuItem, locale: string): string {
  return item.labels[locale] || item.labels.fr;
}
