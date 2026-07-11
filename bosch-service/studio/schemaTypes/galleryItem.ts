import { defineType, defineField } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Galéria kép",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Cím", type: "localeString" }),
    defineField({ name: "image", title: "Kép", type: "image", options: { hotspot: true } }),
    defineField({
      name: "category",
      title: "Kategória",
      type: "string",
      options: {
        list: [
          { title: "Műhely", value: "muhely" },
          { title: "Csapat", value: "csapat" },
          { title: "Felszerelés", value: "felszereles" },
        ],
      },
    }),
    defineField({ name: "order", title: "Sorrend", type: "number" }),
  ],
  preview: { select: { title: "title.hu", media: "image" } },
});
