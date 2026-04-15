"use client";

import * as React from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import logo from "@/public/logo-barbecue-expo2025-logo.png";
import { bbq_menu, type MenuItem, type MenuSubItem } from "@/content/menu";

export function NavigationMenuDemo() {
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (title: string) => {
    // Clear any existing timeout when entering
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenDropdown(title);
  };

  const handleMouseLeave = () => {
    // Add a delay before closing the dropdown
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200); // 200ms delay
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="p-4 absolute top-0 left-0 w-full z-50">
      <ul className="flex flex-wrap items-center gap-2 list-none m-0 p-0">
        <li>
          <Image
            src={logo}
            alt="Logo"
            width={30}
            height={30}
            className="mx-4"
          />
        </li>
        {bbq_menu.map((item: MenuItem) => {
          const hasSubmenu = item.submenu && item.submenu.length > 0;

          const isOpen = openDropdown === item.title;

          if (hasSubmenu && item.submenu) {
            return (
              <li
                key={item.title}
                className={`relative hidden md:block`}
                onMouseEnter={() => handleMouseEnter(item.title)}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 cursor-pointer"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  {item.title}
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
                {isOpen && (
                  <div
                    className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg w-[300px] p-2"
                    onMouseEnter={() => {
                      // Cancel any pending close when entering submenu
                      if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                        timeoutRef.current = null;
                      }
                    }}
                  >
                    <ul className="grid gap-2">
                      {item.submenu.map((subItem: MenuSubItem) => (
                        <li key={subItem.title}>
                          <Link
                            href={subItem.href}
                            className="block px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                          >
                            <div className="text-sm leading-none font-medium">
                              {subItem.title}
                            </div>
                            {subItem.description && (
                              <p className="text-gray-500 line-clamp-2 text-sm leading-snug mt-1">
                                {subItem.description}
                              </p>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          }

          return (
            <li key={item.title} className={"hidden md:block"}>
              <Link
                href={item.href}
                className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
