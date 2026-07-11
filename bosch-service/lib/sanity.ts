import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "2x8l1i27";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder({ projectId, dataset });

/** Sanity image -> URL. Returns undefined when no image is set. */
export function urlFor(source?: Image | null, width = 1920): string | undefined {
  if (!source) return undefined;
  try {
    return builder.image(source).width(width).auto("format").quality(80).url();
  } catch {
    return undefined;
  }
}

export type Locale = "hu" | "en";

/** Pick a locale value, falling back to Hungarian, then to an empty string. */
export type LocaleField = { hu?: string; en?: string } | undefined | null;

export function t(field: LocaleField, locale: Locale): string {
  if (!field) return "";
  return (locale === "en" ? field.en : field.hu) || field.hu || field.en || "";
}
