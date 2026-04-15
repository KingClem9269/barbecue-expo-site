import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  // Debug locale detection - remove in production
  if (process.env.NODE_ENV === "development") {
    const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;
    const acceptLanguage = request.headers.get("accept-language");
    const pathname = request.nextUrl.pathname;

    console.log("[locale-debug]", {
      pathname,
      cookie: localeCookie ?? "(none)",
      "accept-language": acceptLanguage ?? "(none)",
      defaultLocale: routing.defaultLocale,
    });
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
