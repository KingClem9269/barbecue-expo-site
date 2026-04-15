import { Link } from "@/i18n/navigation";

type MenuItemLinkProps = {
  href: string;
  isExternal?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function MenuItemLink({
  href,
  isExternal = false,
  className,
  children,
}: MenuItemLinkProps) {
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
