import { client, urlFor } from "./sanity";
import type { Image } from "sanity";

/* ---------- raw shapes from Sanity ---------- */
type Loc = { hu?: string; en?: string };

export type SettingsDoc = {
  companyName?: string;
  phone?: string;
  phoneHref?: string;
  whatsapp?: string;
  whatsappHref?: string;
  email?: string;
  address?: string;
  mapsUrl?: string;
  hourlyRate?: Loc;
  hours?: { _key: string; day?: Loc; time?: Loc }[];
  facebook?: string;
  instagram?: string;
};

export type BackgroundsDoc = {
  hero?: Image;
  heroMobile?: Image;
  cta?: Image;
  services?: Image;
  gallery?: Image;
  about?: Image;
  contact?: Image;
  notFound?: Image;
};

export type HeroDoc = { overline?: Loc; headline?: Loc; subhead?: Loc };

export type AboutDoc = {
  overline?: Loc;
  title?: Loc;
  subhead?: Loc;
  intro?: Loc;
  groupPhoto?: Image;
  stats?: { _key: string; num?: string; label?: Loc }[];
  certs?: { _key: string; label?: Loc }[];
  closing?: Loc;
};

export type ServiceDoc = {
  _id: string;
  title?: Loc;
  description?: Loc;
  priceText?: Loc;
  icon?: string;
  order?: number;
};

export type TestimonialDoc = {
  _id: string;
  quote?: Loc;
  name?: string;
  city?: string;
  order?: number;
};

export type GalleryDoc = {
  _id: string;
  title?: Loc;
  image?: Image;
  order?: number;
};

/* ---------- fallbacks (used when a field/doc is empty in Sanity) ---------- */
export const FALLBACK_BG = {
  hero: "https://res.cloudinary.com/dnnfhyeuv/image/upload/v1782369091/hero_light_hivheo.jpg",
  heroMobile: "https://res.cloudinary.com/dnnfhyeuv/image/upload/v1782369091/hero_light_hivheo.jpg",
  cta: "https://res.cloudinary.com/dnnfhyeuv/image/upload/v1782369091/Final_CTA_band_background_light_odzjkc.jpg",
  services: "https://res.cloudinary.com/dnnfhyeuv/image/upload/v1782369091/Services_page_header_strip_light_c8773n.jpg",
  gallery: "https://res.cloudinary.com/dnnfhyeuv/image/upload/v1782369091/Gallery_page_header_light_rhzued.jpg",
  about: "https://res.cloudinary.com/dnnfhyeuv/image/upload/v1782294634/rolunk_ckpell.jpg",
  contact: "https://res.cloudinary.com/dnnfhyeuv/image/upload/v1782369091/Contact_page_background_light_tlnbpu.jpg",
  notFound: "https://res.cloudinary.com/dnnfhyeuv/image/upload/v1782369091/404_page_light_yvlhmk.jpg",
};

export const FALLBACK_SETTINGS: SettingsDoc = {
  companyName: "Euro Car Service",
  phone: "+36 20 414 0234",
  phoneHref: "+36204140234",
  whatsapp: "+36 20 414 0244",
  whatsappHref: "36204140244",
  email: "eurocarservicekft@gmail.com",
  address: "Táncsics Mihály út 2/G, Tatabánya, 2800",
  mapsUrl:
    "https://www.google.com/maps?q=T%C3%A1ncsics%20Mih%C3%A1ly%20%C3%BAt%202%2FG%2C%20Tatab%C3%A1nya%2C%202800&output=embed",
  hours: [],
  facebook: "https://www.facebook.com/profile.php?id=61558441253125",
};

/* ---------- fetch helpers ---------- */
// Never let a CMS hiccup break the build: fall back to defaults.
async function safeFetch<T>(query: string, fallback: T): Promise<T> {
  try {
    const data = await client.fetch<T>(query);
    return (data ?? fallback) as T;
  } catch (e) {
    console.warn("[sanity] fetch failed, using fallback:", (e as Error).message);
    return fallback;
  }
}

export async function getSettings(): Promise<SettingsDoc> {
  const d = await safeFetch<SettingsDoc | null>(`*[_type=="siteSettings"][0]`, null);
  return { ...FALLBACK_SETTINGS, ...(d ?? {}) };
}

export async function getBackgrounds(): Promise<Record<string, string>> {
  const d = await safeFetch<BackgroundsDoc | null>(`*[_type=="backgrounds"][0]`, null);
  return {
    hero: urlFor(d?.hero) ?? FALLBACK_BG.hero,
    heroMobile: urlFor(d?.heroMobile, 900) ?? urlFor(d?.hero) ?? FALLBACK_BG.heroMobile,
    cta: urlFor(d?.cta) ?? FALLBACK_BG.cta,
    services: urlFor(d?.services) ?? FALLBACK_BG.services,
    gallery: urlFor(d?.gallery) ?? FALLBACK_BG.gallery,
    about: urlFor(d?.about) ?? FALLBACK_BG.about,
    contact: urlFor(d?.contact) ?? FALLBACK_BG.contact,
    notFound: urlFor(d?.notFound) ?? FALLBACK_BG.notFound,
  };
}

export async function getHero(): Promise<HeroDoc> {
  return safeFetch<HeroDoc>(`*[_type=="hero"][0]`, {});
}

export async function getAbout(): Promise<AboutDoc> {
  return safeFetch<AboutDoc>(`*[_type=="about"][0]`, {});
}

export async function getServices(): Promise<ServiceDoc[]> {
  return safeFetch<ServiceDoc[]>(`*[_type=="service"] | order(order asc)`, []);
}

export async function getTestimonials(): Promise<TestimonialDoc[]> {
  return safeFetch<TestimonialDoc[]>(`*[_type=="testimonial"] | order(order asc)`, []);
}

export async function getGallery(): Promise<{ id: string; title: string; url: string }[]> {
  const items = await safeFetch<GalleryDoc[]>(`*[_type=="galleryItem"] | order(order asc)`, []);
  return items
    .map((g) => ({ id: g._id, titleLoc: g.title, url: urlFor(g.image, 1400) }))
    .filter((g) => !!g.url)
    .map((g) => ({ id: g.id, title: g.titleLoc?.hu ?? "", url: g.url as string }));
}

export { urlFor };
