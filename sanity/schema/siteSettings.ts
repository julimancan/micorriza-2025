import { defineType, defineField, defineArrayMember } from "sanity";
import { CogIcon } from "@sanity/icons";
import { preview } from "sanity-plugin-icon-picker";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "siteTitle",
      title: "Título del sitio",
      type: "string",
    }),
    defineField({
      name: "siteDescription",
      title: "Descripción del sitio",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      type: "array",
      name: "socialLinks",
      title: "Links Sociales",
      description: "aparecen en el menu y en el pie de pagina.",
      of: [
        defineArrayMember({
          name: "link",
          title: "Link",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Título",
              type: "string",
            }),
            defineField({
              name: "url",
              title: "Direccion URL",
              type: "url",
            }),
            defineField({
              title: "Icono",
              name: "icon",
              type: "iconPicker",
            }),
          ],
          preview: {
            select: {
              provider: "icon.provider",
              name: "icon.name",
            },
            prepare(icon) {
              return {
                // @ts-ignore
                media: preview(icon),
                title: icon.name,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "subscribe",
      title: "Seccion de suscripción",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Título de la sección de suscripción",
          type: "string",
        }),
        defineField({
          name: "subtitle",
          title: "Subtítulo de la sección de suscripción",
          type: "text",
        }),
        defineField({
          name: "bottomMsg",
          title: "Mensajito del fondo",
          type: "text",
        }),
        defineField({
          name: "subscribedMessage",
          title: "Mensaje de suscripción exitosa",
          type: "string",
        }),
      ],
    }),
  ],
});
