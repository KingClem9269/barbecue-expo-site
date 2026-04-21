"use client";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import type { ProMenuItem } from "./proMenu";
import { getProMenuLabel } from "./proMenu";

export function ProNavMenuItem({ item }: { item: ProMenuItem }) {
  const locale = useLocale();
  return (
    <li className="hidden lg:block">
      <Link
        href={item.href}
        className="nav-item relative inline-flex items-center justify-center px-4 py-2 text-sm tracking-wide transition-colors duration-200 hover:text-gold-500 focus:outline-none focus-visible:text-gold-500"
      >
        <span className="nav-item-label relative">
          {getProMenuLabel(item, locale)}
        </span>
      </Link>
    </li>
  );
}
