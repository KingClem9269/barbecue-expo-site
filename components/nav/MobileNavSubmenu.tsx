"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { MenuItemBlok, StoryblokMultilink } from "@/types/storyblok";
import { getLinkUrl } from "./getLinkUrl";

export const MobileNavSubmenu = ({
  menuItem,
  onLinkClick,
  index = 0,
}: {
  menuItem: MenuItemBlok;
  onLinkClick?: () => void;
  index?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubmenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <li className="group border-b border-white/10 last:border-none">
      <button
        onClick={toggleSubmenu}
        className="flex items-center justify-between w-full py-5 pr-2 text-cream-50 hover:text-gold-500 transition-colors focus:outline-none focus-visible:text-gold-500"
        aria-expanded={isOpen}
      >
        <span className="flex items-baseline gap-4">
          <span className="text-gold-500/60 text-xs font-semibold tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="text-3xl sm:text-4xl tracking-tight font-bold text-left"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {menuItem.label}
          </span>
        </span>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-gold-500" : ""
          }`}
          aria-hidden="true"
          strokeWidth={2}
        />
      </button>
      {menuItem.submenu && (
        <ul
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {menuItem.submenu.map((subItem) => {
            const subMenuItem = subItem as MenuItemBlok;
            return (
              <li key={subMenuItem._uid}>
                <Link
                  href={getLinkUrl(
                    subMenuItem.link as string | StoryblokMultilink | undefined,
                  )}
                  onClick={onLinkClick}
                  className="block py-3 pl-10 text-cream-50/80 hover:text-gold-500 transition-colors text-base focus:outline-none focus-visible:text-gold-500"
                >
                  {subMenuItem.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};
