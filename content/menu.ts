export type MenuSubItem = {
  title: string;
  href: string;
  description?: string;
};

export type MenuItem = {
  title: string;
  href: string;
  submenu?: MenuSubItem[];
};

export const bbq_menu: MenuItem[] = [
  {
    title: "Le Salon",
    href: "/le-salon",
    submenu: [
      {
        title: "Edito",
        href: "/le-salon",
      },
      {
        title: "Les Espaces",
        href: "/le-salon",
      },
      {
        title: "Liste des exposants",
        href: "/le-salon",
      },
      {
        title: "Galerie & Presse",
        href: "/le-salon",
      },
    ],
  },
  {
    title: "Programme",
    href: "/programme",
    submenu: [
      {
        title: "Chefs & Cooking Shows",
        href: "/programme",
      },
      {
        title: "Masterclasses",
        href: "/programme",
      },
      {
        title: "Conférences",
        href: "/programme",
      },
      {
        title: "BBQ Street Food",
        href: "/programme",
      },
    ],
  },
  {
    title: "Exposants",
    href: "/exposants",
    submenu: [
      {
        title: "Pourquoi exposer ?",
        href: "/exposants",
      },
      {
        title: "Nos exposants",
        href: "/exposants",
      },
      {
        title: "Devenez exposant",
        href: "/exposants",
      },
      {
        title: "Espace pro & B2B",
        href: "/exposants",
      },
    ],
  },
  {
    title: "Info Pratiques",
    href: "/info-pratiques",
    submenu: [
      {
        title: "Dates & Horaires",
        href: "/exposants",
      },
      {
        title: "Accès",
        href: "/exposants",
      },
      {
        title: "Hébergement",
        href: "/exposants",
      },
      {
        title: "FAQ",
        href: "/exposants",
      },
      {
        title: "Contact",
        href: "/exposants",
      },
    ],
  },
  {
    title: "Espace Pro & B2B",
    href: "/espace-pro-b2b",
    submenu: [
      {
        title: "Pourquoi visiter ?",
        href: "/espace-pro-b2b",
      },
      {
        title: "Liste des exposants",
        href: "/espace-pro-b2b",
      },
      {
        title: "Plan du salon",
        href: "/espace-pro-b2b",
      },
      {
        title: "Badge pro",
        href: "/espace-pro-b2b",
      },
    ],
  },
];
