import type { MenuItemBlok } from "@/types/storyblok";
import { ChevronDownIcon } from "@/components/icons";
import { NavSubmenu } from "@/components/nav/NavSubmenu";
import { getMenuItemLinkProps } from "./getLinkUrl";
import { MenuItemLink } from "./MenuItemLink";

export const NavMenuWithSubmenu = ({
  menuItem,
  className,
}: {
  menuItem: MenuItemBlok;
  className?: string;
}) => {
  const { href, isExternal } = getMenuItemLinkProps(menuItem);

  return (
    <li className={`relative hidden lg:block group ${className}`}>
      <MenuItemLink
        href={href}
        isExternal={isExternal}
        className="nav-item relative inline-flex items-center justify-center px-4 py-2 cursor-pointer text-sm tracking-wide transition-colors duration-200 group-hover:text-gold-500 focus:outline-none focus-visible:text-gold-500"
      >
        <span className="nav-item-label relative">{menuItem.label}</span>
        <ChevronDownIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
      </MenuItemLink>
      {menuItem.submenu && <NavSubmenu submenu={menuItem.submenu} />}
    </li>
  );
};
