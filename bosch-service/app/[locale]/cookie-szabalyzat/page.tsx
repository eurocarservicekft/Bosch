import type { Metadata } from "next";
import Wordmark from "@/components/Wordmark";
import { getSettings } from "@/lib/queries";
import Link from "next/link";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import { toLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "Cookie szabályzat" };

export default async function CookiePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const s = await getSettings();
  return (
    <>
      <section className="page-header ph-legal">
        <div className="ph-bg" />
        <div className="ph-overlay" />
        <div className="wrap">
          <Wordmark name={s.companyName} />
          <span className="overline">Jogi információk</span>
          <h1 className="reveal in">Cookie szabályzat</h1>
        </div>
      </section>

      <section>
        <div className="wrap prose">
          <h2>Mik azok a sütik?</h2>
          <p>
            A sütik (cookie-k) kis szöveges fájlok, amelyeket a böngészője tárol
            az Ön eszközén, amikor meglátogat egy weboldalt. Segítenek az oldal
            működésében, és – az Ön hozzájárulásával – abban, hogy megértsük,
            hogyan használják a látogatók az oldalt.
          </p>

          <h2>Milyen sütiket használunk?</h2>
          <h3>Szükséges sütik</h3>
          <p>
            Ezek az oldal alapvető működéséhez kellenek, és mindig aktívak. Ide
            tartozik például a süti-hozzájárulási döntésének tárolása, hogy ne
            kérdezzük meg minden alkalommal.
          </p>

          <h3>Analitikai sütik (Google Analytics)</h3>
          <p>
            Csak az Ön kifejezett hozzájárulása esetén aktiválódnak. A Google
            Analytics anonimizált statisztikai adatokat gyűjt (pl. látogatott
            oldalak, eszköztípus, hozzávetőleges földrajzi régió), hogy
            fejleszthessük a weboldalt. Ezek a sütik jellemzően a <code>_ga</code>{" "}
            és <code>_ga_*</code> nevű sütik, amelyek élettartama legfeljebb 2 év.
          </p>

          <h2>Hozzájárulás és annak visszavonása</h2>
          <p>
            Az oldal első megnyitásakor megjelenő sávban dönthet a sütik
            elfogadásáról vagy elutasításáról. Döntését bármikor módosíthatja:
            nyissa meg a <strong><CookieSettingsLink label="Cookie beállítások" /></strong> ablakot az
            oldal láblécében.
          </p>

          <h2>Sütik kezelése a böngészőben</h2>
          <p>
            A legtöbb böngésző lehetővé teszi a sütik megtekintését, törlését és
            blokkolását a beállításokban. Ne feledje, hogy egyes sütik
            letiltása befolyásolhatja az oldal működését. További információ a{" "}
            <Link href={`/${locale}/adatvedelem`}>Adatvédelmi tájékoztatóban</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
