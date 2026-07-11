import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer, { MobileBar } from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { getSettings, getBackgrounds } from "@/lib/queries";
import { getUi, locales, type Locale, toLocale } from "@/lib/i18n";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const hu = locale !== "en";
  return {
    metadataBase: new URL("https://eurocarservice.hu"),
    title: {
      default: hu
        ? "Euro Car Service — Autószerviz Tatabányán"
        : "Euro Car Service — Car service in Tatabánya",
      template: "%s — Euro Car Service",
    },
    description: hu
      ? "Euro Car Service autószerviz Tatabányán. Modern diagnosztika, időszakos szerviz, fék, futómű, gumi és klíma — átlátható árazással."
      : "Euro Car Service in Tatabánya, Hungary. Modern diagnostics, scheduled servicing, brakes, suspension, tyres and A/C — with transparent pricing.",
    alternates: {
      canonical: `/${locale}`,
      languages: { hu: "/hu", en: "/en" },
    },
    openGraph: {
      type: "website",
      locale: hu ? "hu_HU" : "en_GB",
      siteName: "Euro Car Service",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const [s, bg] = await Promise.all([getSettings(), getBackgrounds()]);
  const tr = getUi(locale);

  // Backgrounds are CMS-editable: injected as CSS variables the design already uses.
  const bgVars = `
    :root{
      --img-hero:url("${bg.hero}");
      --img-hero-phone:url("${bg.heroMobile}");
      --img-cta:url("${bg.cta}");
      --img-services:url("${bg.services}");
      --img-gallery:url("${bg.gallery}");
      --img-about:url("${bg.about}");
      --img-contact:url("${bg.contact}");
      --img-404:url("${bg.notFound}");
    }
  `;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: s.companyName,
    telephone: s.phone,
    email: s.email,
    address: { "@type": "PostalAddress", streetAddress: s.address },
    url: "https://eurocarservice.hu",
  };

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{ __html: bgVars }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header s={s} locale={locale} tr={tr} />
        {children}
        <Footer s={s} locale={locale} tr={tr} />
        <MobileBar s={s} locale={locale} tr={tr} />
        <CookieConsent locale={locale} tr={tr} />
      </body>
    </html>
  );
}
