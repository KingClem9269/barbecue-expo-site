"use client";

import { useState, useRef, useEffect } from "react";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

const localeConfig: Record<string, { flag: string; label: string }> = {
  fr: { flag: "\u{1F1EB}\u{1F1F7}", label: "Fran\u00e7ais" },
  en: { flag: "\u{1F1EC}\u{1F1E7}", label: "English" },
  es: { flag: "\u{1F1EA}\u{1F1F8}", label: "Espa\u00f1ol" },
  de: { flag: "\u{1F1E9}\u{1F1EA}", label: "Deutsch" },
  nl: { flag: "\u{1F1F3}\u{1F1F1}", label: "Nederlands" },
  pt: { flag: "\u{1F1F5}\u{1F1F9}", label: "Portugu\u00eas" },
  it: { flag: "\u{1F1EE}\u{1F1F9}", label: "Italiano" },
};

export function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const current = localeConfig[currentLocale] || localeConfig.fr;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(locale: string) {
    setIsOpen(false);
    router.replace(pathname || "/", { locale });
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-white/30 bg-black/40 backdrop-blur-md hover:bg-white/10 transition-colors text-lg cursor-pointer"
        aria-label="Change language"
      >
        {current.flag}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden min-w-[160px] shadow-xl z-50">
          {routing.locales.map((locale) => {
            const config = localeConfig[locale];
            if (!config) return null;
            const isActive = locale === currentLocale;
            return (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm text-white hover:bg-white/10 transition-colors cursor-pointer ${
                  isActive ? "bg-white/15 font-semibold" : ""
                }`}
              >
                <span className="text-lg">{config.flag}</span>
                <span>{config.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
