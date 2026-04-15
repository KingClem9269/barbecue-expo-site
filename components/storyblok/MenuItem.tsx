import { Link } from "@/i18n/navigation";

export default function MenuItem({ blok }: { blok: any }) {
  const href = blok.link || "#";
  const isExternal = Boolean(blok.external);

  const linkProps = {
    className: "menu-item underline",

  };

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...linkProps}>
        <span>{blok.label}</span>
      </a>
    );
  }

  return (
    <Link href={href} {...linkProps}>
      <span>{blok.label}</span>
    </Link>
  );
}
