import Reveal from "@/components/Reveal";
import Wordmark from "@/components/Wordmark";
import { UsersIcon } from "@/components/Icons";
import { getAbout, getSettings } from "@/lib/queries";
import { getUi, type Locale, toLocale } from "@/lib/i18n";
import { t, urlFor } from "@/lib/sanity";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const s = await getSettings();
  const tr = getUi(locale);
  const a = await getAbout();
  const photo = urlFor(a.groupPhoto, 1600);

  return (
    <>
      <section className="page-header ph-about">
        <div className="ph-bg" />
        <div className="ph-overlay" />
        <div className="wrap">
          <Wordmark name={s.companyName} />
          <span className="overline">{t(a.overline, locale) || tr.nav.about}</span>
          <h1>{t(a.title, locale)}</h1>
          <p className="ph-sub">{t(a.subhead, locale)}</p>
        </div>
      </section>

      <section>
        <Reveal className="wrap about-close">
          <p>{t(a.intro, locale)}</p>
        </Reveal>
      </section>

      {(a.stats?.length ?? 0) > 0 && (
        <div className="stats-band">
          <div className="wrap">
            <div className="stats-grid">
              {a.stats!.map((st, i) => (
                <Reveal className="stat" key={st._key} delay={i % 3}>
                  <div className="num">{st.num}</div>
                  <div className="lab">{t(st.label, locale)}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      )}

      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <h2 className="serif">{tr.about.teamTitle}</h2>
            <p className="intro">{tr.about.teamIntro}</p>
          </Reveal>
          <Reveal className="team-photo">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo} alt={tr.about.teamTitle} />
            ) : (
              <div className="ph">
                <UsersIcon />
                <span>{tr.about.teamPhotoPlaceholder}</span>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {(a.certs?.length ?? 0) > 0 && (
        <div className="stats-band">
          <div className="wrap" style={{ padding: "64px 0" }}>
            <Reveal className="sec-head" style={{ textAlign: "center", marginBottom: 30 }}>
              <span className="overline">{tr.about.certsLabel}</span>
            </Reveal>
            <Reveal className="certs">
              {a.certs!.map((c) => (
                <div className="cert" key={c._key}>{t(c.label, locale)}</div>
              ))}
            </Reveal>
          </div>
        </div>
      )}

      {t(a.closing, locale) && (
        <section>
          <Reveal className="wrap about-close">
            <p>„{t(a.closing, locale)}”</p>
          </Reveal>
        </section>
      )}
    </>
  );
}
