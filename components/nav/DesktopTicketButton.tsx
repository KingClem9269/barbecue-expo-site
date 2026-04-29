import { Link } from "@/i18n/navigation";

/**
 * DesktopTicketButton — Grand Public ticket CTA in the desktop nav.
 *
 * Same solid gold visual as ProTicketButton (consistent design across both
 * audiences). Links to the unified /billetterie page that already shows
 * the 5-tier comparison; no dropdown needed anymore.
 *
 * Props remain compatible with the legacy CMS data structure (Storyblok
 * exported tickets / tickets_slug) so existing pages don't break.
 */
export function DesktopTicketButton({
  tickets,
  tickets_slug,
}: {
  tickets: string;
  tickets_slug?: string;
  tickets_b2c_label?: string;
  tickets_b2c_slug?: string;
  tickets_b2b_label?: string;
  tickets_b2b_slug?: string;
  tickets_press_label?: string;
  tickets_press_slug?: string;
}) {
  // Default to /billetterie if Storyblok hasn't filled the slug
  const href = tickets_slug && tickets_slug !== "" ? tickets_slug : "/billetterie";
  const label = tickets || "Billetterie";

  return (
    <Link
      href={href}
      className="hidden lg:inline-flex items-center justify-center px-4 py-2 text-sm font-bold uppercase tracking-widest border-2 border-gold-500 bg-gold-500 text-ink-950 hover:bg-gold-300 hover:border-gold-300 transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
    >
      {label}
    </Link>
  );
}
