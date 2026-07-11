import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="hu">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "80px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: 48, margin: 0, color: "#C8102E" }}>404</h1>
        <p style={{ color: "#5C616B" }}>
          Az oldal nem található. / Page not found.
        </p>
        <p>
          <Link href="/hu" style={{ color: "#C8102E", fontWeight: 600 }}>
            Főoldal / Home
          </Link>
        </p>
      </body>
    </html>
  );
}
