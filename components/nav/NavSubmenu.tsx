import type { MenuItemBlok } from "@/types/storyblok";
import { getMenuItemLinkProps } from "./getLinkUrl";
import { MenuItemLink } from "./MenuItemLink";

export const NavSubmenu = ({ submenu }: { submenu: MenuItemBlok[] }) => {
  return (
    <div className="absolute top-full left-0 pt-1 w-[300px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity text-black">
      <div className="p-2 bg-white">
        <ul className="grid gap-2">
          {submenu.map((subItem) => {
            const { href, isExternal } = getMenuItemLinkProps(subItem);
            return (
              <li key={subItem._uid}>
                <MenuItemLink
                  href={href}
                  isExternal={isExternal}
                  className="block px-3 py-2"
                >
                  <div className="text-sm leading-none font-medium">
                    {subItem.label}
                  </div>
                </MenuItemLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};


