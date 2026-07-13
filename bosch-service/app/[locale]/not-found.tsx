import Link from "next/link";

export default function NotFound() {
  return (
    <section className="err-page">
      <div className="err-bg" />
      <div className="err-overlay" />
      <div className="err-content">
        <div className="code">404</div>
        <h1 className="serif">Ez az út zsákutca. / This road is a dead end.</h1>
        <p>
          A keresett oldal nem található. / The page you are looking for cannot be found.
        </p>
        <div className="err-ctas">
          <Link href="/hu" className="btn btn--primary">Főoldal</Link>
          <Link href="/en" className="btn btn--ghost">Home</Link>
        </div>
      </div>
    </section>
  );
}
