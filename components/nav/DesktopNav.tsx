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
import { Link } from "@/i18n/navigation";

export function DesktopNav({
  menuItems,
  city,
  date,
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
  city: string;
  date: string;
  tickets: string;
  tickets_slug: string;
  tickets_b2c_label: string;
  tickets_b2c_slug: string;
  tickets_b2b_label: string;
  tickets_b2b_slug: string;
  tickets_press_label: string;
  tickets_press_slug: string;
}) {
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

  return (
    <>
      <nav
        className={`px-4 py-4 fixed top-0 left-0 z-50 lg:border-b lg:border-white/10 flex justify-between w-screen transition-colors duration-150 ${
          isScrolled
            ? "lg:bg-black/60 lg:backdrop-blur-lg"
            : "lg:bg-black/20 lg:backdrop-blur-xs"
        }`}
      >
        <BurgerMenuButton
          isOpen={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        />
        <div className="flex items-center justify-between w-full">
          <ul className="flex flex-wrap items-center gap-2 list-none m-0 p-0 text-white font-bold">
            <li className="hidden lg:block">
              <Link href="/">
                <NavLogo color="white" className="w-42 h-12" />
              </Link>
            </li>

            {menuItems.map((item) => {
              const menuItem = item as MenuItemBlok;
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
          <div className="text-xs md:text-base border border-white/10 bg-black/40 backdrop-blur-md text-white rounded-full p-2 px-4 lg:border-none lg:bg-transparent lg:rounded-none lg:backdrop-blur-none">
            {city} | {date}
          </div>
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
        </div>
      </nav>
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

      <MobileNav
        isOpen={isMobileMenuOpen}
        menuItems={menuItems}
        onClose={closeMobileMenu}
      />
    </>
  );
}
