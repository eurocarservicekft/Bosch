import { defineType, defineField } from "sanity";

// A longer text field with Hungarian + English versions.
export const localeText = defineType({
  name: "localeText",
  title: "Hosszú szöveg (HU / EN)",
  type: "object",
  fields: [
    defineField({ name: "hu", title: "Magyar", type: "text", rows: 3 }),
    defineField({ name: "en", title: "English", type: "text", rows: 3 }),
  ],
});
