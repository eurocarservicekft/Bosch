import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Általános beállítások",
  type: "document",
  fields: [
    defineField({ name: "companyName", title: "Cégnév", type: "string" }),
    defineField({ name: "phone", title: "Telefon (megjelenő)", type: "string" }),
    defineField({ name: "phoneHref", title: "Telefon (hívható, pl. +36204140234)", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp (megjelenő)", type: "string" }),
    defineField({ name: "whatsappHref", title: "WhatsApp (számjegyek, pl. 36204140244)", type: "string" }),
    defineField({ name: "email", title: "E-mail", type: "string" }),
    defineField({ name: "address", title: "Cím", type: "string" }),
    defineField({ name: "mapsUrl", title: "Google Maps beágyazás URL", type: "url" }),
    defineField({
      name: "hours",
      title: "Nyitvatartás",
      type: "array",
      of: [
        {
          type: "object",
          name: "openingHour",
          fields: [
            { name: "day", title: "Nap", type: "localeString" },
            { name: "time", title: "Idő", type: "localeString" },
          ],
          preview: {
            select: { title: "day.hu", subtitle: "time.hu" },
          },
        },
      ],
    }),
    defineField({ name: "hourlyRate", title: "Rezsióradíj (pl. 20 000 Ft/óra + ÁFA)", type: "localeString" }),
    defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
    defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
  ],
  preview: { prepare: () => ({ title: "Általános beállítások" }) },
});
