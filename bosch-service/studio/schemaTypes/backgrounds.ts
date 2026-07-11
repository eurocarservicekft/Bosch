import { defineType, defineField } from "sanity";

// Editable background images. If a field is left empty, the site falls back
// to the default image shipped in the design.
export const backgrounds = defineType({
  name: "backgrounds",
  title: "Háttérképek",
  type: "document",
  fields: [
    defineField({ name: "hero", title: "Főoldal – hero háttér", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroMobile", title: "Főoldal – hero háttér (mobil)", type: "image", options: { hotspot: true } }),
    defineField({ name: "cta", title: "Záró CTA sáv háttér", type: "image", options: { hotspot: true } }),
    defineField({ name: "services", title: "Szolgáltatások oldal fejléc", type: "image", options: { hotspot: true } }),
    defineField({ name: "gallery", title: "Galéria oldal fejléc", type: "image", options: { hotspot: true } }),
    defineField({ name: "about", title: "Rólunk oldal fejléc", type: "image", options: { hotspot: true } }),
    defineField({ name: "contact", title: "Kapcsolat oldal fejléc", type: "image", options: { hotspot: true } }),
    defineField({ name: "notFound", title: "404 oldal háttér", type: "image", options: { hotspot: true } }),
  ],
  preview: { prepare: () => ({ title: "Háttérképek" }) },
});
