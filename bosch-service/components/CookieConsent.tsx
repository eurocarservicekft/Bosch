"use client";
import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

const GA_ID = "G-2767D9YLJ1";
const KEY = "ecs-cookie-consent-v1";
type Consent = "accepted" | "rejected" | null;

export default function CookieConsent({ locale, tr }: { locale: Locale; tr: any }) {
  const [consent, setConsent] = useState<Consent>(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let saved: Consent = null;
    try {
      saved = (localStorage.getItem(KEY) as Consent) ?? null;
    } catch {}
    setConsent(saved);
    setOpen(!saved);
    setReady(true);
    const reopen = () => setOpen(true);
    window.addEventListener("open-cookie-settings", reopen);
    return () => window.removeEventListener("open-cookie-settings", reopen);
  }, []);

  function choose(v: Exclude<Consent, null>) {
    try {
      localStorage.setItem(KEY, v);
    } catch {}
    setConsent(v);
    setOpen(false);
  }

  return (
    <>
      {ready && consent === "accepted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {open && (
        <div className="cookie-banner" role="dialog" aria-label={tr.cookie.title}>
          <div className="cookie-inner">
            <div className="cookie-text">
              <strong>{tr.cookie.title}</strong>
              <p>
                {tr.cookie.text}{" "}
                <Link href={`/${locale}/cookie-szabalyzat`}>{tr.cookie.policyLink}</Link>.
              </p>
            </div>
            <div className="cookie-actions">
              <button className="btn btn--ghost" onClick={() => choose("rejected")}>
                {tr.cookie.onlyNecessary}
              </button>
              <button className="btn btn--primary" onClick={() => choose("accepted")}>
                {tr.cookie.acceptAll}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
