"use client";

import { useEffect, useState } from "react";
import type { MenuItemBlok } from "@/types/storyblok";
import { X } from "lucide-react";
import { MobileNavItem } from "./MobileNavItem";
import { MobileNavSubmenu } from "./MobileNavSubmenu";
import { Link } from "@/i18n/navigation";
import { NavLogo } from "./NavLogo";

export const MobileNav = ({
  isOpen,
  menuItems,
  onClose,
  className,
}: {
  isOpen: boolean;
  menuItems: MenuItemBlok[];
  onClose: () => void;
  className?: string;
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Lock body scroll while open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 60) onClose();
    setTouchStart(null);
  };

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } ${className || ""}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      {/* Immersive full-screen panel */}
      <div
        className={`absolute inset-0 h-full w-full bg-ink-950 overflow-y-auto transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Ember radial glow in top-right for signature feel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-gold-500/20 via-ember-600/10 to-transparent blur-3xl"
        />

        {/* Header — logo + close */}
        <div className="relative flex items-center justify-between px-6 py-5 border-b border-white/10">
          <Link
            href="/"
            onClick={onClose}
            aria-label="Barbecue Expo 2026 — Homepage"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
          >
            <NavLogo color="white" className="w-32 h-10" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex items-center justify-center w-11 h-11 rounded-full border border-white/20 text-cream-50 hover:border-gold-500 hover:text-gold-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {/* Oversized menu items */}
        <nav className="relative px-6 py-10 pb-24">
          <ul className="list-none m-0 p-0 flex flex-col">
            {menuItems.map((item, index) => {
              const menuItem = item as MenuItemBlok;
              const hasSubmenu =
                menuItem.submenu && menuItem.submenu.length > 0;

              if (hasSubmenu) {
                return (
                  <MobileNavSubmenu
                    key={item._uid}
                    menuItem={menuItem}
                    onLinkClick={onClose}
                    index={index}
                  />
                );
              }

              return (
                <MobileNavItem
                  key={item._uid}
                  menuItem={menuItem}
                  onLinkClick={onClose}
                  index={index}
                />
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};
