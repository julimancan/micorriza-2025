import type { StructureResolver } from "sanity/structure";
import { siteSettingsSchema } from "./schema/siteSettings";
import { homepageSchema } from "./schema/pages/homepageSchema";
import pagesStructure from "./pagesStructure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) => {
  const siteSettingsListItem = S.listItem()
    .title(siteSettingsSchema.title || "")
    .icon(siteSettingsSchema.icon)
    .child(
      S.editor()
        .id(siteSettingsSchema.name)
        .schemaType(siteSettingsSchema.name)
        .documentId(siteSettingsSchema.name)
    );
  const hiddenDocTypes = (listItem: any) => {
    return ![siteSettingsSchema.name, homepageSchema.name].includes(
      listItem.getId()
    );
  };

  return S.list()
    .title("Contenido")
    .items([
      siteSettingsListItem,
      S.divider(),
      pagesStructure(S),
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);
};
