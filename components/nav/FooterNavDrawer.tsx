"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { MenuItemBlok } from "@/types/storyblok";

const FooterNavDrawer = ({
  item,
  key,
}: {
  item: MenuItemBlok;
  key: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div key={key}>
      <div>
        <h3 className="font-semibold mb-4">
          {item.submenu ? (
            <>
              {/* Desktop: regular link */}
              <a href={item.link} className="hidden md:inline hover:underline">
                {item.label}
              </a>
              {/* Mobile: button with toggle */}
              <button
                onClick={toggleDrawer}
                className="flex items-center justify-between w-full text-left md:hidden"
                aria-expanded={isOpen}
                aria-controls={`drawer-${key}`}
              >
                <span className="hover:underline">{item.label}</span>
                <ChevronDown
                  className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </>
          ) : (
            <a href={item.link} className="hover:underline">
              {item.label}
            </a>
          )}
        </h3>
      </div>
      {item.submenu && (
        <div
          id={`drawer-${key}`}
          className={`overflow-hidden transition-all duration-300 ease-in-out md:max-h-none md:opacity-100 ${
            isOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 md:max-h-96 md:opacity-100"
          }`}
        >
          <ul className="space-y-2 pb-2 md:pb-0">
            {item.submenu.map((subItem, subIndex) => (
              <li key={subIndex}>
                <a href={subItem.link} className="hover:underline">
                  {subItem.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FooterNavDrawer;
