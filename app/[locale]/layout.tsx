import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";

import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { getConfig } from "@/lib/content";
import { DesktopNav } from "@/components/nav/DesktopNav";
import Footer from "@/components/global/Footer";
import Newsletter from "@/components/widget/Newsletter";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import SkipLink from "@/components/a11y/SkipLink";
import { AudienceProvider } from "@/components/nav/AudienceContext";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale);
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const siteSettings = await getConfig(locale);
  if (!hasLocale(routing.locales, locale)) {
    <div>Not found</div>;
  }

  // Google Tag Manager — conteneur Barbecue Expo (GTM-5NCHQMXR).
  // Surchargeable via NEXT_PUBLIC_GTM_ID (autre conteneur, ou "" pour désactiver).
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-5NCHQMXR";

  return (
    <html lang={locale}>
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      <head>
        {/* Preload the branded display font to prevent FOIT on first paint */}
        <link
          rel="preload"
          href="/SansPlomb-98.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />

        {/* Favicons : les fichiers app/icon.png, app/apple-icon.png et
            app/favicon.ico (monogramme « B ») sont injectés automatiquement
            par Next. On garde seulement le mask-icon (onglet épinglé Safari). */}
        <link rel="mask-icon" href="/logo_b_only.svg" color="#F4AD3C" />

        {/* Theme color — drives mobile browser UI tinting */}
        <meta name="theme-color" content="#0E0E0E" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#F4AD3C" media="(prefers-color-scheme: light)" />

        {/* PWA-lite niceties */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
      </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* GTM noscript (fallback JS désactivé) — le composant Next ne l'inclut pas */}
          {gtmId ? (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
          ) : null}
          <NextIntlClientProvider locale={locale}>
            <AudienceProvider>
            <SkipLink />
            <main id="main" className="w-full relative">
              {siteSettings?.content?.header_menu && (
                <DesktopNav
                  menuItems={siteSettings.content.header_menu}
                  tickets={siteSettings.content.tickets}
                  tickets_slug={siteSettings.content.tickets_slug}
                  tickets_b2c_label={siteSettings.content.tickets_b2c_label}
                  tickets_b2c_slug={siteSettings.content.tickets_b2c_slug}
                  tickets_b2b_label={siteSettings.content.tickets_b2b_label}
                  tickets_b2b_slug={siteSettings.content.tickets_b2b_slug}
                  tickets_press_label={siteSettings.content.tickets_press_label}
                  tickets_press_slug={siteSettings.content.tickets_press_slug}
                />
              )}
              {children}
            </main>
            <Newsletter />
            <Footer data={siteSettings?.content} locale={locale} />
            </AudienceProvider>
          </NextIntlClientProvider>
        </body>
      {/* GA4 chargé en direct — propriété « Barbecue - GA4 » (G-YBVVEXBHWM).
          Quand GA4 sera configuré comme tag DANS GTM, retirer cette ligne
          pour éviter le double comptage des pages vues. */}
      <GoogleAnalytics gaId="G-YBVVEXBHWM" />
    </html>
  );
}
