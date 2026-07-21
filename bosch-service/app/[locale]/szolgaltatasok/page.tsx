import { getSettings, getServices } from "@/lib/queries";
import { EvIcon } from "@/components/Icons";
import Wordmark from "@/components/Wordmark";
import { getUi, type Locale, toLocale } from "@/lib/i18n";
import { t } from "@/lib/sanity";
import Reveal from "@/components/Reveal";

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const tr = getUi(locale);
  const [s, services] = await Promise.all([getSettings(), getServices()]);

  return (
    <>
      <section className="page-header ph-services">
        <div className="ph-bg" />
        <div className="ph-overlay" />
        <div className="wrap">
          <Wordmark name={s.companyName} />
          <span className="overline">{tr.nav.services}</span>
          <h1>{tr.services.title}</h1>
          <p className="ph-sub">{tr.services.subtitle}</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="ev-band">
            <div className="ev-icon"><EvIcon /></div>
            <div>
              <h2>{tr.services.evTitle}</h2>
              <p>{tr.services.evText}</p>
            </div>
          </div>

          {t(s.hourlyRate, locale) && (
            <div className="rate-band">
              <div className="rate-main">
                <span className="rate-label">{tr.services.hourlyLabel}</span>
                <span className="rate-value">{t(s.hourlyRate, locale)}</span>
              </div>
              <p className="rate-note">{tr.services.hourlyNote}</p>
            </div>
          )}

          <div className="svc-grid">
            {services.map((svc, i) => (
              <Reveal key={svc._id} delay={i % 3}>
                <article className="svc-tile">
                  <div className="tile-body">
                    <h3>{t(svc.title, locale)}</h3>
                    <p>{t(svc.description, locale)}</p>
                    <div className="svc-price">{t(svc.priceText, locale)}</div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="vat-note">{tr.services.vatNote}</p>
          <div className="svc-cta-band">
            {tr.services.notFound} <a href={`tel:${s.phoneHref}`}>{s.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
