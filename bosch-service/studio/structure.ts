import type { StructureResolver } from "sanity/structure";

// Singletons shown as single documents; collections as lists.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Tartalom")
    .items([
      S.listItem()
        .title("Általános beállítások")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Főoldal – Hero")
        .id("hero")
        .child(S.document().schemaType("hero").documentId("hero")),
      S.listItem()
        .title("Háttérképek")
        .id("backgrounds")
        .child(S.document().schemaType("backgrounds").documentId("backgrounds")),
      S.listItem()
        .title("Rólunk oldal")
        .id("about")
        .child(S.document().schemaType("about").documentId("about")),
      S.divider(),
      S.documentTypeListItem("service").title("Szolgáltatások"),
      S.documentTypeListItem("testimonial").title("Vélemények"),
      S.documentTypeListItem("galleryItem").title("Galéria"),
    ]);
