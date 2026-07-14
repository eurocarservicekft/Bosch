import Link from "next/link";
import { PhoneIcon } from "./Icons";
import CookieSettingsLink from "./CookieSettingsLink";
import type { SettingsDoc } from "@/lib/queries";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/sanity";

export default function Footer({ s, locale, tr }: { s: SettingsDoc; locale: Locale; tr: any }) {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link href={`/${locale}`} className="logo">
              <span className="mark">{(s.companyName ?? "E").charAt(0)}</span>
              <span className="logo-text">{s.companyName}</span>
              <span className="logo-dot">.</span>
            </Link>
            <p className="foot-tag">
              {locale === "hu"
                ? "Megbízható autószerviz modern Bosch technológiával és igazi szakmai gondoskodással."
                : "A car service you can trust — modern Bosch technology and genuine professional care."}
            </p>
            <span className="foot-badge">
              <span className="dot" /> {tr.home.trust1}
            </span>
          </div>

          <div>
            <h4>{tr.common.pages}</h4>
            <ul>
              <li><Link href={`/${locale}/szolgaltatasok`}>{tr.nav.services}</Link></li>
              <li><Link href={`/${locale}/rolunk`}>{tr.nav.about}</Link></li>
              <li><Link href={`/${locale}/galeria`}>{tr.nav.gallery}</Link></li>
              <li><Link href={`/${locale}/kapcsolat`}>{tr.nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h4>{tr.common.contact}</h4>
            <ul>
              <li><a href={`tel:${s.phoneHref}`}>{s.phone}</a></li>
              {s.whatsapp && (
                <li>
                  <a href={`https://wa.me/${s.whatsappHref}`} target="_blank" rel="noopener">
                    WhatsApp: {s.whatsapp}
                  </a>
                </li>
              )}
              <li><a href={`mailto:${s.email}`}>{s.email}</a></li>
              <li><Link href={`/${locale}/kapcsolat`}>{s.address}</Link></li>
            </ul>
          </div>

          <div>
            <h4>{tr.common.openingHours}</h4>
            <ul>
              {(s.hours ?? []).map((h) => (
                <li key={h._key}>
                  {t(h.day, locale)}: {t(h.time, locale)}
                </li>
              ))}
            </ul>
            <div className="social" style={{ marginTop: 16 }}>
              {s.facebook && (
                <a href={s.facebook} aria-label="Facebook" target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              )}
              {s.instagram && (
                <a href={s.instagram} aria-label="Instagram" target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} {s.companyName}. {tr.common.rightsReserved}</span>
          <span>
            <Link href={`/${locale}/adatvedelem`}>{tr.common.privacy}</Link> ·{" "}
            <Link href={`/${locale}/cookie-szabalyzat`}>{tr.common.cookiePolicy}</Link> ·{" "}
            <CookieSettingsLink label={tr.common.cookieSettings} />
          </span>
        </div>
      </div>
    </footer>
  );
}

export function MobileBar({ s, locale, tr }: { s: SettingsDoc; locale: Locale; tr: any }) {
  return (
    <nav className="mobilebar">
      <a href={`tel:${s.phoneHref}`}>
        <PhoneIcon /> {tr.common.call}
      </a>
      <Link href={`/${locale}/kapcsolat`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        {tr.common.message}
      </Link>
      <Link href={`/${locale}/kapcsolat`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {tr.common.map}
      </Link>
    </nav>
  );
}
