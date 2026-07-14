"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PhoneIcon } from "./Icons";
import type { SettingsDoc } from "@/lib/queries";
import type { Locale } from "@/lib/i18n";

export default function Header({
  s,
  locale,
  tr,
}: {
  s: SettingsDoc;
  locale: Locale;
  tr: any;
}) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || `/${locale}`;

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { href: `/${locale}/szolgaltatasok`, label: tr.nav.services },
    { href: `/${locale}/rolunk`, label: tr.nav.about },
    { href: `/${locale}/galeria`, label: tr.nav.gallery },
    { href: `/${locale}/kapcsolat`, label: tr.nav.contact },
  ];

  // same page, other language
  const other: Locale = locale === "hu" ? "en" : "hu";
  const otherHref = pathname.replace(/^\/(hu|en)/, `/${other}`);

  return (
    <>
      <header id="site-header" className={solid ? "solid" : ""}>
        <div className="wrap nav">
          <Link href={`/${locale}`} className="logo">
            <span className="mark">{(s.companyName ?? "E").charAt(0)}</span>
            <span className="logo-text">{s.companyName}</span>
            <span className="logo-dot">.</span>
          </Link>

          <nav className="nav-links">
            {nav.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="nav-right">
            <a href={`tel:${s.phoneHref}`} className="phone-link phone-text">
              <PhoneIcon /> {s.phone}
            </a>
            <a href={`tel:${s.phoneHref}`} className="phone-icon-only" aria-label={tr.common.call}>
              <PhoneIcon />
            </a>

            <div className="lang">
              {locale === "hu" ? <b>HU</b> : <Link href={otherHref}>HU</Link>}
              <span>/</span>
              {locale === "en" ? <b>EN</b> : <Link href={otherHref}>EN</Link>}
            </div>

            <button className="hamburger" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu${open ? " open" : ""}`}>
        {nav.map((n) => (
          <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
            {n.label}
          </Link>
        ))}
        <a href={`tel:${s.phoneHref}`} className="mm-phone" onClick={() => setOpen(false)}>
          {s.phone}
        </a>
        <Link href={otherHref} className="mm-phone" style={{ fontSize: 18 }} onClick={() => setOpen(false)}>
          {locale === "hu" ? "English" : "Magyar"}
        </Link>
      </div>
    </>
  );
}
