import type { MetadataRoute } from "next";

const BASE = "https://eurocarservice.hu";
const paths = ["", "/szolgaltatasok", "/rolunk", "/galeria", "/kapcsolat"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of ["hu", "en"]) {
    for (const p of paths) {
      entries.push({
        url: `${BASE}/${locale}${p}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: p === "" ? 1 : 0.8,
      });
    }
  }
  // legal pages, lower priority
  for (const locale of ["hu", "en"]) {
    for (const p of ["/adatvedelem", "/cookie-szabalyzat"]) {
      entries.push({
        url: `${BASE}/${locale}${p}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
      });
    }
  }
  return entries;
}
