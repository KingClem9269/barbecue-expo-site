import { redirect } from "@/i18n/navigation";

/**
 * /visiter now lives on the main homepage "/" (the Grand Public homepage
 * became the site homepage). Redirect any old links to "/".
 */
export default async function VisiterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: "/", locale });
}
