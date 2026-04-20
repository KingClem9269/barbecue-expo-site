import type { MenuItemBlok } from "@/types/storyblok";
import { getMenuItemLinkProps } from "./getLinkUrl";
import { MenuItemLink } from "./MenuItemLink";
import { ArrowUpRight } from "lucide-react";

export const NavSubmenu = ({ submenu }: { submenu: MenuItemBlok[] }) => {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[280px] opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50"
    >
      <div className="bg-ink-950/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl shadow-black/50 overflow-hidden">
        <ul className="p-2">
          {submenu.map((subItem) => {
            const { href, isExternal } = getMenuItemLinkProps(subItem);
            return (
              <li key={subItem._uid}>
                <MenuItemLink
                  href={href}
                  isExternal={isExternal}
                  className="group/item flex items-center justify-between px-3 py-2.5 rounded-md text-sm text-cream-50/90 hover:text-gold-500 hover:bg-white/5 transition-all duration-200 focus:outline-none focus-visible:text-gold-500 focus-visible:bg-white/5"
                >
                  <span className="font-medium tracking-wide">
                    {subItem.label}
                  </span>
                  <ArrowUpRight
                    className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200"
                    strokeWidth={2.2}
                  />
                </MenuItemLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
