import { type SchemaTypeDefinition } from "sanity";
import { siteSettingsSchema } from "../schema/siteSettings";
import { homepageSchema } from "../schema/pages/homepageSchema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettingsSchema,
    // pages
    homepageSchema,
  ],
};
