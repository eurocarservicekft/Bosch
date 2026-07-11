import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Vélemény",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Idézet", type: "localeText" }),
    defineField({ name: "name", title: "Név", type: "string" }),
    defineField({ name: "city", title: "Város", type: "string" }),
    defineField({ name: "order", title: "Sorrend", type: "number" }),
  ],
  orderings: [{ title: "Sorrend", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "city" } },
});
