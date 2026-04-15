"use client";

import { routing } from "@/i18n/routing";
import { Link, usePathname } from "@/i18n/navigation";

export function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();

  const otherAvailableLocales = routing.locales.filter(
    (locale) => locale !== currentLocale,
  );

  const localeLabels = {
    en: "Change language to English",
    fr: "Changer la langue en français",
  };

  return otherAvailableLocales.map((locale) => (
    <Link
      key={locale}
      href={pathname || "/"}
      locale={locale}
      className="px-4 py-2 border border-white/30 rounded hover:bg-white/10 transition-colors text-sm font-medium"
    >
      {localeLabels[locale as keyof typeof localeLabels]}
    </Link>
  ));
}
