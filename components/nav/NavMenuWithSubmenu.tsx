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
        className="inline-flex items-center justify-center px-4 py-2 cursor-pointer"
      >
        {menuItem.label}
        <ChevronDownIcon className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
      </MenuItemLink>
      {menuItem.submenu && <NavSubmenu submenu={menuItem.submenu} />}
    </li>
  );
};
