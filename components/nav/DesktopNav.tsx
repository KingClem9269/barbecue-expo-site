"use client";
import { useState, useEffect } from "react";
import type { MenuItemBlok } from "@/types/storyblok";
import { NavMenuItem } from "./NavMenuItem";
import { NavMenuWithSubmenu } from "./NavMenuWithSubmenu";
import { BurgerMenuButton } from "./BurgerMenuButton";
import { MobileNav } from "./MobileNav";
import { NavLogo } from "./NavLogo";
import { MobileTicketButton } from "./MobileTicketButton";
import { DesktopTicketButton } from "./DesktopTicketButton";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { AudienceToggle } from "./AudienceToggle";
import { useAudience } from "./AudienceContext";
import { PRO_MENU } from "./proMenu";
import { ProNavMenuItem } from "./ProNavMenuItem";
import { ProTicketButton } from "./ProTicketButton";

export function DesktopNav({
  menuItems,
  tickets,
  tickets_slug,
  tickets_b2c_label,
  tickets_b2c_slug,
  tickets_b2b_label,
  tickets_b2b_slug,
  tickets_press_label,
  tickets_press_slug,
}: {
  menuItems: MenuItemBlok[];
  tickets: string;
  tickets_slug: string;
  tickets_b2c_label: string;
  tickets_b2c_slug: string;
  tickets_b2b_label: string;
  tickets_b2b_slug: string;
  tickets_press_label: string;
  tickets_press_slug: string;
}) {
  const locale = useLocale();
  const { audience } = useAudience();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Check initial scroll position
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // La page « Présentation & catalogue exposant » possède sa propre barre de
  // navigation (« EXPOSER ») : on masque donc le menu global du site dessus.
  if (pathname?.startsWith("/presentation-exposants")) return null;

  return (
    <>
      <nav
        className={`px-4 py-4 fixed top-0 left-0 z-50 md:border-b md:border-white/10 flex items-center justify-between gap-3 w-screen transition-colors duration-150 ${
          isScrolled
            ? "md:bg-black/60 md:backdrop-blur-lg"
            : "md:bg-black/20 md:backdrop-blur-xs"
        }`}
      >
        <BurgerMenuButton
          isOpen={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        />
        <div className="flex items-center justify-between w-full">
          {/* Logo et billetterie dès 768 px ; le menu complet seulement à
              partir de 1280 px (en dessous, il passait sur deux lignes) :
              entre les deux, le menu reste dans le burger. */}
          <li className="hidden md:block list-none shrink-0">
            <Link href="/" aria-label="Barbecue Expo 2027 — Homepage">
              <NavLogo color="white" className="w-42 h-12" />
            </Link>
          </li>
          <ul className="hidden xl:flex flex-nowrap items-center justify-center gap-1 list-none m-0 p-0 text-white font-bold flex-1 whitespace-nowrap">
            {audience === "pro"
              ? PRO_MENU.map((item) => (
                  <ProNavMenuItem key={item.key} item={item} />
                ))
              : menuItems.map((item) => {
                  const raw = item as MenuItemBlok;
                  // En mode Grand Public, on masque « Espace Pro & B2B » du sous-menu.
                  const menuItem: MenuItemBlok = raw.submenu
                    ? { ...raw, submenu: raw.submenu.filter((s) => !/b2b/i.test(s.label || "")) }
                    : raw;
                  const hasSubmenu =
                    menuItem.submenu && menuItem.submenu.length > 0;

                  if (hasSubmenu) {
                    return (
                      <NavMenuWithSubmenu key={item._uid} menuItem={menuItem} />
                    );
                  }

                  return <NavMenuItem key={item._uid} menuItem={menuItem} />;
                })}
          </ul>
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <AudienceToggle />
            <LocaleSwitcher currentLocale={locale} />
            {audience === "pro" ? (
              <ProTicketButton />
            ) : (
              <DesktopTicketButton
                tickets={tickets}
                tickets_slug={tickets_slug}
                tickets_b2c_label={tickets_b2c_label}
                tickets_b2c_slug={tickets_b2c_slug}
                tickets_b2b_label={tickets_b2b_label}
                tickets_b2b_slug={tickets_b2b_slug}
                tickets_press_label={tickets_press_label}
                tickets_press_slug={tickets_press_slug}
              />
            )}
          </div>
        </div>
      </nav>
      {/* Billetterie : on y est déjà ; les pages de pass ont leur bouton « Prendre mes billets ». */}
      {!/^\/billetterie(\/(individuel|groupes|food))?$/.test(pathname ?? "") && (
      <MobileTicketButton
        tickets={tickets}
        tickets_slug={tickets_slug}
        tickets_b2c_label={tickets_b2c_label}
        tickets_b2c_slug={tickets_b2c_slug}
        tickets_b2b_label={tickets_b2b_label}
        tickets_b2b_slug={tickets_b2b_slug}
        tickets_press_label={tickets_press_label}
        tickets_press_slug={tickets_press_slug}
      />
      )}

      <MobileNav
        isOpen={isMobileMenuOpen}
        menuItems={menuItems}
        onClose={closeMobileMenu}
      />
    </>
  );
}
