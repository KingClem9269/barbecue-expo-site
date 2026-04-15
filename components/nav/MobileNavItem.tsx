"use client";

import { Link } from "@/i18n/navigation";
import type { MenuItemBlok, StoryblokMultilink } from "@/types/storyblok";
import { getLinkUrl } from "./getLinkUrl";

export const MobileNavItem = ({
  menuItem,
  onLinkClick,
}: {
  menuItem: MenuItemBlok;
  onLinkClick?: () => void;
}) => {
  return (
    <li>
      <Link
        href={getLinkUrl(
          menuItem.link as string | StoryblokMultilink | undefined
        )}
        onClick={onLinkClick}
        className="block px-4 py-3 text-lg"
      >
        {menuItem.label}
      </Link>
    </li>
  );
};






