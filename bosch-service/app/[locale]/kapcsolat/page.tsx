import ContactForm from "@/components/ContactForm";
import { MailIcon, PinIcon, ClockIcon } from "@/components/Icons";
import { getSettings } from "@/lib/queries";
import { getUi, type Locale, toLocale } from "@/lib/i18n";
import { t } from "@/lib/sanity";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const tr = getUi(locale);
  const s = await getSettings();

  return (
    <>
      <section className="page-header ph-contact" style={{ padding: 0 }}>
        <div className="ph-bg" />
        <div className="ph-overlay" />
        <div className="wrap">
          <span className="overline">{tr.nav.contact}</span>
          <h1>{tr.contact.title}</h1>
          <p className="ph-sub">{tr.contact.subtitle}</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="contact-split">
            <ContactForm locale={locale} tr={tr} />

            <div className="contact-info">
              <a href={`tel:${s.phoneHref}`} className="big-phone">
                <span className="lab">{tr.contact.callUs}</span>
                {s.phone}
              </a>

              <div className="info-row">
                <MailIcon />
                <div>
                  <div className="lab">{tr.contact.email}</div>
                  <a href={`mailto:${s.email}`}>{s.email}</a>
                </div>
              </div>

              {s.whatsapp && (
                <div className="info-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <div>
                    <div className="lab">WhatsApp</div>
                    <a href={`https://wa.me/${s.whatsappHref}`} target="_blank" rel="noopener">{s.whatsapp}</a>
                  </div>
                </div>
              )}

              <div className="info-row">
                <PinIcon />
                <div>
                  <div className="lab">{tr.contact.address}</div>
                  <a href={s.mapsUrl} target="_blank" rel="noopener">{s.address}</a>
                </div>
              </div>

              <div className="info-row">
                <ClockIcon />
                <div style={{ flex: 1 }}>
                  <div className="lab">{tr.common.openingHours}</div>
                  <table className="hours-table">
                    <tbody>
                      {(s.hours ?? []).map((h) => (
                        <tr key={h._key}>
                          <td>{t(h.day, locale)}</td>
                          <td>{t(h.time, locale)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="map-embed">
            <iframe title={tr.common.map} loading="lazy" src={s.mapsUrl} />
          </div>

          <div className="directions">
            <h3 className="serif">{tr.contact.directionsTitle}</h3>
            <p>{tr.contact.directions}</p>
          </div>
        </div>
      </section>
    </>
  );
}
