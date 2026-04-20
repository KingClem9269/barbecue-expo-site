"use client";

import { Link } from "@/i18n/navigation";
import type { MenuItemBlok, StoryblokMultilink } from "@/types/storyblok";
import { getLinkUrl } from "./getLinkUrl";
import { ArrowUpRight } from "lucide-react";

export const MobileNavItem = ({
  menuItem,
  onLinkClick,
  index = 0,
}: {
  menuItem: MenuItemBlok;
  onLinkClick?: () => void;
  index?: number;
}) => {
  return (
    <li className="group border-b border-white/10 last:border-none">
      <Link
        href={getLinkUrl(
          menuItem.link as string | StoryblokMultilink | undefined,
        )}
        onClick={onLinkClick}
        className="flex items-center justify-between py-5 pr-2 text-cream-50 hover:text-gold-500 transition-colors focus:outline-none focus-visible:text-gold-500"
      >
        <span className="flex items-baseline gap-4">
          <span className="text-gold-500/60 text-xs font-semibold tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="text-3xl sm:text-4xl tracking-tight font-bold"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {menuItem.label}
          </span>
        </span>
        <ArrowUpRight
          className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
          strokeWidth={2}
        />
      </Link>
    </li>
  );
};
