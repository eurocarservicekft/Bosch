import { defineType, defineField } from "sanity";

// A short text field with Hungarian + English versions.
export const localeString = defineType({
  name: "localeString",
  title: "Szöveg (HU / EN)",
  type: "object",
  fields: [
    defineField({ name: "hu", title: "Magyar", type: "string" }),
    defineField({ name: "en", title: "English", type: "string" }),
  ],
});
