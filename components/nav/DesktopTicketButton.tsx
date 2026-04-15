import { Link } from "@/i18n/navigation";
import { ChevronDownIcon } from "../icons";

export function DesktopTicketButton({
  tickets,
  tickets_slug,
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
  return (
    <div className="relative hidden md:block group">
      <Link href={tickets_slug || ""}>
        <div className="inline-flex items-center justify-center p-2 px-4 font-bold border border-white/10 bg-black/40 backdrop-blur-md lg:border-white text-white rounded-full lg:rounded-none cursor-pointer">
          {tickets}
          <ChevronDownIcon className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
        </div>
      </Link>
      <div className="absolute top-full right-0 pt-1 w-[128px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity text-black">
        <div className="p-2 bg-white">
          <ul className="grid gap-2">
            <li>
              <Link href={tickets_b2c_slug || ""} className="block px-3 py-2">
                <div className="text-sm leading-none font-medium">
                  {tickets_b2c_label}
                </div>
              </Link>
            </li>
            <li>
              <Link href={tickets_b2b_slug || ""} className="block px-3 py-2">
                <div className="text-sm leading-none font-medium">
                  {tickets_b2b_label}
                </div>
              </Link>
            </li>
            <li>
              <Link href={tickets_press_slug || ""} className="block px-3 py-2">
                <div className="text-sm leading-none font-medium">
                  {tickets_press_label}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
