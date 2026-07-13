import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/queries";
import { toLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "Adatvédelmi tájékoztató" };

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const s = await getSettings();
  return (
    <>
      <section className="page-header ph-legal">
        <div className="ph-bg" />
        <div className="ph-overlay" />
        <div className="wrap">
          <span className="overline">Jogi információk</span>
          <h1 className="reveal in">Adatvédelmi tájékoztató</h1>
        </div>
      </section>

      <section>
        <div className="wrap prose">
          <p>
            Jelen tájékoztató az Európai Parlament és a Tanács (EU) 2016/679
            rendelete (GDPR) és a hatályos magyar adatvédelmi jogszabályok
            alapján ismerteti, hogyan kezeljük az Ön személyes adatait a{" "}
            {s.companyName} weboldalán. Utolsó frissítés: {new Date().getFullYear()}.
          </p>

          <h2>1. Az adatkezelő</h2>
          <p>
            <strong>EURO CAR SERVICE Kft.</strong>
            <br />
            Székhely: 2800 Tatabánya, Táncsics Mihály út 2/G
            <br />
            Cégjegyzékszám: 11-09-003137
            <br />
            Adószám: 11188599-2-11
            <br />
            Képviseli: Ferencz Márton
            <br />
            E-mail: <a href={`mailto:${s.email}`}>{s.email}</a>
            <br />
            Telefon: <a href={`tel:${s.phoneHref}`}>{s.phone}</a>
          </p>

          <h2>2. Milyen adatokat kezelünk és miért</h2>
          <p>
            <strong>Kapcsolatfelvételi űrlap.</strong> Amikor Ön üzenetet küld,
            az alábbi adatokat kezeljük: név, e-mail cím, telefonszám (opcionális),
            a választott téma és az üzenet szövege. Cél: az Ön megkeresésének
            megválaszolása, kapcsolatfelvétel. Jogalap: az Ön hozzájárulása
            (GDPR 6. cikk (1) a)), illetve szerződéskötést megelőző lépések
            (GDPR 6. cikk (1) b)).
          </p>
          <p>
            <strong>Analitikai adatok.</strong> Az Ön kifejezett hozzájárulása
            esetén a Google Analytics anonimizált módon statisztikai adatokat
            gyűjt a weboldal használatáról (pl. megtekintett oldalak, eszköztípus).
            Jogalap: hozzájárulás (GDPR 6. cikk (1) a)). A hozzájárulás bármikor
            visszavonható a{" "}
            <Link href={`/${locale}/cookie-szabalyzat`}>Cookie szabályzatban</Link> leírtak
            szerint.
          </p>

          <h2>3. Az adatok tárolásának ideje</h2>
          <p>
            A kapcsolatfelvételi üzeneteket a megkeresés lezárását követően
            legfeljebb 12 hónapig őrizzük, kivéve, ha a további megőrzést
            jogszabály írja elő vagy szerződés jön létre. Az analitikai adatokat
            a Google Analytics beállításai szerint (alapértelmezetten legfeljebb
            14 hónapig) tároljuk.
          </p>

          <h2>4. Adatfeldolgozók</h2>
          <p>
            Az adatkezelés során az alábbi szolgáltatókat vesszük igénybe:
          </p>
          <ul>
            <li>
              <strong>Netlify</strong> (weboldal-tárhely és e-mail továbbítás
              technikai háttere)
            </li>
            <li>
              <strong>Google Ireland Ltd.</strong> (Google Analytics –
              webstatisztika, csak hozzájárulás esetén)
            </li>
            <li>
              <strong>Sanity</strong> (tartalomkezelő rendszer – a weboldal
              szövegeinek és képeinek tárolása)
            </li>
          </ul>
          <p>
            A kapcsolatfelvételi űrlapon keresztül küldött üzenetek a(z){" "}
            <a href={`mailto:${s.email}`}>{s.email}</a> e-mail címre érkeznek
            (Google szolgáltatás).
          </p>

          <h2>5. Sütik</h2>
          <p>
            A weboldal sütiket használ. A sütikről és kezelésükről részletesen a{" "}
            <Link href={`/${locale}/cookie-szabalyzat`}>Cookie szabályzatban</Link> olvashat.
          </p>

          <h2>6. Az Ön jogai</h2>
          <p>
            Ön jogosult tájékoztatást kérni adatai kezeléséről, kérheti azok
            helyesbítését, törlését vagy kezelésük korlátozását, tiltakozhat az
            adatkezelés ellen, és élhet az adathordozhatóság jogával. A
            hozzájáruláson alapuló adatkezelést bármikor visszavonhatja. Kéréseit
            a(z) <a href={`mailto:${s.email}`}>{s.email}</a> címen jelezheti.
          </p>

          <h2>7. Jogorvoslat</h2>
          <p>
            Amennyiben úgy véli, hogy adatai kezelése jogszabályt sért, panasszal
            fordulhat a Nemzeti Adatvédelmi és Információszabadság Hatósághoz
            (NAIH, 1055 Budapest, Falk Miksa utca 9-11.,{" "}
            <a href="https://naih.hu" target="_blank" rel="noopener">
              naih.hu
            </a>
            ), illetve bírósághoz.
          </p>

          <p>
            <em>
              Javasoljuk a tájékoztató adatvédelmi szakértővel történő
              ellenőrzését a közzététel előtt.
            </em>
          </p>
        </div>
      </section>
    </>
  );
}
