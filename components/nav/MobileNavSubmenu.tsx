"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type {
  MenuItemBlok,
  StoryblokComponent,
  StoryblokMultilink,
} from "@/types/storyblok";
import { getLinkUrl } from "./getLinkUrl";

export const MobileNavSubmenu = ({
  menuItem,
  onLinkClick,
}: {
  menuItem: MenuItemBlok;
  onLinkClick?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubmenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <li>
      <button
        onClick={toggleSubmenu}
        className="flex items-center justify-between w-full px-4 py-3 text-lg text-left"
        aria-expanded={isOpen}
      >
        {menuItem.label}
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>
      {menuItem.submenu && (
        <ul
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {menuItem.submenu.map((subItem) => {
            const subMenuItem = subItem as MenuItemBlok;
            return (
              <li key={subMenuItem._uid}>
                <Link
                  href={getLinkUrl(
                    subMenuItem.link as string | StoryblokMultilink | undefined
                  )}
                  onClick={onLinkClick}
                  className="block px-8 py-2 text-base"
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





