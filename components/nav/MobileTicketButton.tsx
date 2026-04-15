"use client";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowOpenIcon } from "../icons";
import { MinusIcon, PlusIcon } from "lucide-react";

export function MobileTicketButton({
  tickets,
  tickets_b2c_label,
  tickets_b2c_slug,
  tickets_b2b_label,
  tickets_b2b_slug,
  tickets_press_label,
  tickets_press_slug,
}: {
  tickets: string;
  tickets_slug?: string;
  tickets_b2c_label: string;
  tickets_b2c_slug: string;
  tickets_b2b_label: string;
  tickets_b2b_slug: string;
  tickets_press_label: string;
  tickets_press_slug: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const buttonClassName =
    "flex md:hidden p-2 px-4 w-fit font-bold border border-white/10 bg-black/40 backdrop-blur-md lg:border-white text-white rounded-full lg:rounded-none items-center gap-1";

  return (
    <div className="fixed bottom-0 w-full z-50 flex flex-col justify-center items-center pb-4 gap-2">
      {isExpanded && (
        <>
          <Link
            href={tickets_b2c_slug || ""}
            className={`${buttonClassName}`}
            style={{
              animation: "fadeInUp 0.3s ease-out",
            }}
          >
            {tickets_b2c_label}
            <ArrowOpenIcon className="h-4 w-4" />
          </Link>
          <Link
            href={tickets_b2b_slug || ""}
            className={`${buttonClassName}`}
            style={{
              animation: "fadeInUp 0.3s ease-out 0.075s both",
            }}
          >
            {tickets_b2b_label}
            <ArrowOpenIcon className="h-4 w-4" />
          </Link>
          <Link
            href={tickets_press_slug || ""}
            className={`${buttonClassName}`}
            style={{
              animation: "fadeInUp 0.3s ease-out 0.15s both",
            }}
          >
            {tickets_press_label}
            <ArrowOpenIcon className="h-4 w-4" />
          </Link>
        </>
      )}
      <button onClick={toggleExpanded} className={buttonClassName}>
        {tickets}
        {isExpanded ? (
          <MinusIcon className="h-4 w-4" />
        ) : (
          <PlusIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
