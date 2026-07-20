import Gallery from "@/components/Gallery";
import Wordmark from "@/components/Wordmark";
import { getGallery, getSettings } from "@/lib/queries";
import { getUi, type Locale, toLocale } from "@/lib/i18n";

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const s = await getSettings();
  const tr = getUi(locale);
  const items = await getGallery();

  return (
    <>
      <section className="page-header ph-gallery">
        <div className="ph-bg" />
        <div className="ph-overlay" />
        <div className="wrap">
          <Wordmark name={s.companyName} />
          <span className="overline">{tr.nav.gallery}</span>
          <h1>{tr.gallery.title}</h1>
          <p className="ph-sub">{tr.gallery.subtitle}</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          {items.length > 0 ? (
            <Gallery items={items} />
          ) : (
            <p style={{ color: "var(--text-2)", textAlign: "center" }}>{tr.gallery.empty}</p>
          )}
        </div>
      </section>
    </>
  );
}
