"use client";

import { useState } from "react";
import type { MenuItemBlok } from "@/types/storyblok";
import { CloseIcon } from "@/components/icons";
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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    const minSwipeDistance = 50;

    // Swipe right to left (close menu)
    if (diff > minSwipeDistance) {
      onClose();
    }

    setTouchStart(null);
  };

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } ${className}`}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Side Nav */}
      <div
        className={`absolute top-0 left-0 h-full w-full bg-white shadow-xl overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="p-4 border-b text-right flex justify-between items-center"
          onClick={onClose}
        >
          <Link href="/">
            <NavLogo color="black" className="w-32 h-12" />
          </Link>
          <CloseIcon className="inline-block cursor-pointer" />
        </div>
        <ul className="list-none m-0 p-0">
          {menuItems.map((item) => {
            const menuItem = item as MenuItemBlok;
            const hasSubmenu = menuItem.submenu && menuItem.submenu.length > 0;

            if (hasSubmenu) {
              return (
                <MobileNavSubmenu
                  key={item._uid}
                  menuItem={menuItem}
                  onLinkClick={onClose}
                />
              );
            }

            return (
              <MobileNavItem
                key={item._uid}
                menuItem={menuItem}
                onLinkClick={onClose}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
