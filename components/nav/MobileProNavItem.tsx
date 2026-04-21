"use client";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import type { ProMenuItem } from "./proMenu";
import { getProMenuLabel } from "./proMenu";

export function MobileProNavItem({
  item,
  index = 0,
  onLinkClick,
}: {
  item: ProMenuItem;
  index?: number;
  onLinkClick?: () => void;
}) {
  const locale = useLocale();
  return (
    <li className="group border-b border-white/10 last:border-none">
      <Link
        href={item.href}
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
            {getProMenuLabel(item, locale)}
          </span>
        </span>
        <ArrowUpRight
          className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
          strokeWidth={2}
        />
      </Link>
    </li>
  );
}
