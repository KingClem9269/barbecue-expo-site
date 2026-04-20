import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";

import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { getConfig } from "@/lib/content";
import { DesktopNav } from "@/components/nav/DesktopNav";
import Footer from "@/components/global/Footer";
import Newsletter from "@/components/widget/Newsletter";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ClientRegistryInit } from "@/lib/ClientRegistry";

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

export const metadata: Metadata = {
  title: "Barbecue Expo 2026",
  description:
    "LE SALON BBQ N°1 EN EUROPE: Le temps d’un week-end, Barbecue Expo réunit le meilleur du BBQ et de la cuisine outdoor : marques, chefs et pitmasters, nouveautés, démonstrations, dégustations, masterclass et rencontres business.",
  icons: {
    icon: "/logo_b_white.svg",
  },
};

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
      </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ClientRegistryInit />
          <NextIntlClientProvider locale={locale}>
            <div className="w-full relative">
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
            </div>
            <Newsletter />
            <Footer data={siteSettings?.content} locale={locale} />
          </NextIntlClientProvider>
        </body>
      <GoogleAnalytics gaId="G-YTGWDLVH99" />
    </html>
  );
}
