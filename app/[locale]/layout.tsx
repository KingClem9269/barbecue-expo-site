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
import { GoogleAnalytics } from "@next/third-parties/google";
import { ClientRegistryInit } from "@/lib/ClientRegistry";
import EmberCursor from "@/components/signature/EmberCursor";
import PageTransition from "@/components/signature/PageTransition";
import SkipLink from "@/components/a11y/SkipLink";

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

  return (
    <html lang={locale}>
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

        {/* Brand icons */}
        <link rel="icon" href="/logo_b_white.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo_b_only.svg" />
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
          <ClientRegistryInit />
          <NextIntlClientProvider locale={locale}>
            <SkipLink />
            <EmberCursor />
            <PageTransition />
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
          </NextIntlClientProvider>
        </body>
      <GoogleAnalytics gaId="G-YTGWDLVH99" />
    </html>
  );
}
