import type { MenuItemBlok, StoryblokMultilink } from "@/types/storyblok";

export function getLinkUrl(
  link: string | StoryblokMultilink | undefined,
): string {
  if (!link) return "#";
  // If it's already a string (resolved by Storyblok), use it directly
  if (typeof link === "string") return link;
  // If it's a StoryblokMultilink object, extract the URL
  if (typeof link === "object" && link.cached_url) return link.cached_url;
  if (typeof link === "object" && link.url) return link.url;
  return "#";
}

export function getMenuItemLinkProps(menuItem: MenuItemBlok) {
  return {
    href: getLinkUrl(
      menuItem.link as string | StoryblokMultilink | undefined
    ),
    isExternal: Boolean(menuItem.external),
  };
}
