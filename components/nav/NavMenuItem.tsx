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
        className="inline-flex items-center justify-center px-4 py-2"
      >
        {menuItem.label}
      </MenuItemLink>
    </li>
  );
};
