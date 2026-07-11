import { defineType, defineField } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Főoldal – Hero",
  type: "document",
  fields: [
    defineField({ name: "overline", title: "Felső címke", type: "localeString" }),
    defineField({ name: "headline", title: "Főcím", type: "localeString" }),
    defineField({ name: "subhead", title: "Alcím", type: "localeText" }),
  ],
  preview: { prepare: () => ({ title: "Főoldal – Hero" }) },
});
