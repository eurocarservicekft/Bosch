import { getSettings, getServices } from "@/lib/queries";
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
      <section className="page-header ph-services" style={{ padding: 0 }}>
        <div className="ph-bg" />
        <div className="ph-overlay" />
        <div className="wrap">
          <span className="overline">{tr.nav.services}</span>
          <h1>{tr.services.title}</h1>
          <p className="ph-sub">{tr.services.subtitle}</p>
        </div>
      </section>

      <section>
        <div className="wrap">
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
          <div className="svc-cta-band">
            {tr.services.notFound} <a href={`tel:${s.phoneHref}`}>{s.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
