import Link from "next/link";
import Reveal from "@/components/Reveal";
import HeroBg from "@/components/HeroBg";
import Wordmark from "@/components/Wordmark";
import { PhoneIcon, ShieldIcon, ClockIcon, Wrench, ServiceIcon, whyIcons } from "@/components/Icons";
import { getSettings, getHero, getServices, getTestimonials } from "@/lib/queries";
import { getUi, type Locale, toLocale } from "@/lib/i18n";
import { t } from "@/lib/sanity";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const tr = getUi(locale);
  const [s, hero, services, testimonials] = await Promise.all([
    getSettings(),
    getHero(),
    getServices(),
    getTestimonials(),
  ]);

  return (
    <>
      <section className="hero">
        <HeroBg />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="wrap">
            <div className="hero-inner">
              <Wordmark name={s.companyName} />
              <span className="overline">{t(hero.overline, locale)}</span>
              <h1>{t(hero.headline, locale)}</h1>
              <p className="sub">{t(hero.subhead, locale)}</p>
              <div className="hero-ctas">
                <a href={`tel:${s.phoneHref}`} className="btn btn--primary">
                  <PhoneIcon /> {tr.common.callNow}: {s.phone}
                </a>
                <Link href={`/${locale}/szolgaltatasok`} className="btn btn--ghost">
                  {tr.nav.services}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-cue">
          <span>{tr.common.scroll}</span>
          <div className="line" />
        </div>
      </section>

      <div className="trustbar">
        <div className="trustbar-inner">
          <div className="trust-item"><ShieldIcon /> {tr.home.trust1}</div>
          <span className="trust-dot">·</span>
          <div className="trust-item"><ClockIcon /> {tr.home.trust2}</div>
          <span className="trust-dot">·</span>
          <div className="trust-item"><Wrench /> {tr.home.trust3}</div>
        </div>
      </div>

      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <h2 className="serif">{tr.home.servicesTitle}</h2>
            <p className="intro">{tr.home.servicesIntro}</p>
          </Reveal>
          <Reveal className="services-scroll">
            {services.map((svc) => (
              <article className="svc-card" key={svc._id}>
                <div className="svc-ico"><ServiceIcon name={svc.icon} /></div>
                <h3>{t(svc.title, locale)}</h3>
                <p>{t(svc.description, locale)}</p>
              </article>
            ))}
          </Reveal>
          <Reveal className="svc-bottom">
            <Link href={`/${locale}/szolgaltatasok`} className="btn btn--ghost">
              {tr.common.allServices} →
            </Link>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <h2 className="serif">{tr.home.whyTitle}</h2>
          </Reveal>
          <div className="why-grid">
            <Reveal className="why-col" delay={1}>
              <div className="why-icon"><whyIcons.Diagnostics /></div>
              <h3>{tr.home.why1Title}</h3>
              <p>{tr.home.why1Text}</p>
            </Reveal>
            <Reveal className="why-col" delay={2}>
              <div className="why-icon"><whyIcons.Wrench /></div>
              <h3>{tr.home.why2Title}</h3>
              <p>{tr.home.why2Text}</p>
            </Reveal>
            <Reveal className="why-col" delay={3}>
              <div className="why-icon"><whyIcons.Receipt /></div>
              <h3>{tr.home.why3Title}</h3>
              <p>{tr.home.why3Text}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="testi">
          <div className="wrap">
            <Reveal className="sec-head">
              <span className="overline">{tr.home.testimonials}</span>
            </Reveal>
            <div className="testi-grid">
              {testimonials.map((tm, i) => (
                <Reveal className="testi-card" key={tm._id} delay={i % 3}>
                  <div className="quote-mark">”</div>
                  <blockquote>{t(tm.quote, locale)}</blockquote>
                  <div className="testi-meta">{tm.name} — {tm.city}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="wrap">
          <Reveal className="final-cta">
            <h2 className="serif">{tr.home.ctaTitle}</h2>
            <p>{tr.home.ctaText}</p>
            <div className="cta-row">
              <a href={`tel:${s.phoneHref}`} className="btn btn--primary">
                <PhoneIcon /> {tr.common.callNow}: {s.phone}
              </a>
              <Link href={`/${locale}/kapcsolat`} className="link-ghost">
                {tr.common.sendMessage} →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
