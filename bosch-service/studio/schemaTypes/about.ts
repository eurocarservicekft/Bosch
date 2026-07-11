import { defineType, defineField } from "sanity";

export const about = defineType({
  name: "about",
  title: "Rólunk oldal",
  type: "document",
  fields: [
    defineField({ name: "overline", title: "Felső címke", type: "localeString" }),
    defineField({ name: "title", title: "Cím", type: "localeString" }),
    defineField({ name: "subhead", title: "Alcím", type: "localeText" }),
    defineField({ name: "intro", title: "Bevezető", type: "localeText" }),
    defineField({ name: "groupPhoto", title: "Csoportkép", type: "image", options: { hotspot: true } }),
    defineField({
      name: "stats",
      title: "Számok",
      type: "array",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            { name: "num", title: "Szám", type: "string" },
            { name: "label", title: "Felirat", type: "localeString" },
          ],
          preview: { select: { title: "num", subtitle: "label.hu" } },
        },
      ],
    }),
    defineField({
      name: "certs",
      title: "Minősítések",
      type: "array",
      of: [
        {
          type: "object",
          name: "cert",
          fields: [{ name: "label", title: "Név", type: "localeString" }],
          preview: { select: { title: "label.hu" } },
        },
      ],
    }),
    defineField({ name: "closing", title: "Záró idézet", type: "localeText" }),
  ],
  preview: { prepare: () => ({ title: "Rólunk oldal" }) },
});
