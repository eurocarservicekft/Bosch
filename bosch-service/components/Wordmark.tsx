export default function Wordmark({ name }: { name?: string }) {
  return <span className="hero-wordmark">{name ?? "Euro Car Service"}</span>;
}
