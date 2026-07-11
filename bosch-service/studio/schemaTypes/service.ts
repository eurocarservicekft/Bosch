import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Szolgáltatás",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Cím", type: "localeString" }),
    defineField({
      name: "category",
      title: "Kategória",
      type: "string",
      options: {
        list: [
          { title: "Karbantartás", value: "karbantartas" },
          { title: "Diagnosztika", value: "diagnosztika" },
          { title: "Javítás", value: "javitas" },
          { title: "Gumiszerviz", value: "gumi" },
        ],
        layout: "radio",
      },
    }),
    defineField({ name: "description", title: "Rövid leírás", type: "localeText" }),
    defineField({ name: "priceText", title: "Ár", type: "localeString" }),
    defineField({
      name: "icon",
      title: "Ikon",
      type: "string",
      options: {
        list: ["gauge", "diagnostics", "brake", "wheel", "tire", "climate", "battery", "engine"],
      },
    }),
    defineField({ name: "order", title: "Sorrend", type: "number" }),
    defineField({ name: "featured", title: "Kiemelt", type: "boolean" }),
    defineField({ name: "body", title: "Részletes leírás", type: "localeText" }),
  ],
  orderings: [{ title: "Sorrend", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title.hu", subtitle: "category" } },
});
