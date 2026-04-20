import type { MenuItemBlok } from "@/types/storyblok";
import { getMenuItemLinkProps } from "./getLinkUrl";
import { MenuItemLink } from "./MenuItemLink";

export const NavMenuItem = ({
  menuItem,
  className,
}: {
  menuItem: MenuItemBlok;
  className?: string;
}) => {
  const { href, isExternal } = getMenuItemLinkProps(menuItem);

  return (
    <li className={`hidden lg:block ${className}`}>
      <MenuItemLink
        href={href}
        isExternal={isExternal}
        className="nav-item relative inline-flex items-center justify-center px-4 py-2 text-sm tracking-wide transition-colors duration-200 hover:text-gold-500 focus:outline-none focus-visible:text-gold-500"
      >
        <span className="nav-item-label relative">
          {menuItem.label}
        </span>
      </MenuItemLink>
    </li>
  );
};
