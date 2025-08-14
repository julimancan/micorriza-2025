import { defineType, defineField, defineArrayMember } from "sanity";
import { HomeIcon } from "@sanity/icons";
import { preview } from "sanity-plugin-icon-picker";

export const homepageSchema = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
  groups: [
    { title: "SEO", name: "SEO" },
    { title: "Hero", name: "hero" },
    { title: "Bio", name: "bio" },
  ],
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      description:
        "Search Engine Optimization (optimizacion de motores de busqueda) es lo que sale en google cuando buscas algo.",
      type: "object",
      group: "SEO",
      fields: [
        defineField({
          name: "title",
          title: "Título",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Descripción",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "hero",
      title: "Heroe",
      description:
        "El heroe es la primera seccion de la pagina, es lo primero que ve el usuario.",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "title",
          title: "Título",
          type: "string",
        }),
        defineField({
          name: "subtitle",
          title: "Subtítulo",
          type: "string",
        }),
        defineField({
          name: "bgVideo",
          title: "Video de fondo",
          description:
            "Subir un video en formato webm, y/o un video en formato mp4, y/o una imagen de fondo.",
          type: "file",
          options: {
            accept: "video/webm",
          },
          fields: [
            defineField({
              name: "alt",
              title: "Texto Alternativo",
              description: "Texto para personas con discapacidad visual.",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "fallback",
              title: "MP4 Para cuando no tienes webm",
              description: "Upload a MP4 video format.",
              type: "file",
              options: {
                accept: "video/mp4",
              },
            }),
            defineField({
              name: "fallbackImage",
              title:
                "Imagen de fondo para cuando el video no se puede reproducir",
              type: "image",
            }),
          ],
        }),
        // defineField({
        //   type: "array",
        //   name: "socialLinks",
        //   title: "Links Sociales",
        //   description:
        //     "Links a tus redes sociales. Estos links solo aparecen en la sección de heroe.",
        //   of: [
        //     defineArrayMember({
        //       name: "link",
        //       title: "Link",
        //       type: "object",
        //       fields: [
        //         defineField({
        //           name: "title",
        //           title: "Título",
        //           type: "string",
        //         }),
        //         defineField({
        //           name: "url",
        //           title: "Dirección URL",
        //           type: "url",
        //         }),
        //         defineField({
        //           title: "Icono",
        //           name: "icon",
        //           type: "iconPicker",
        //         }),
        //       ],
        //       preview: {
        //         select: {
        //           provider: "icon.provider",
        //           name: "icon.name",
        //         },
        //         prepare(icon) {
        //           return {
        //             // @ts-ignore
        //             media: preview(icon),
        //             title: icon.name,
        //           };
        //         },
        //       },
        //     }),
        //   ],
        // }),
      ],
    }),

    defineField({
      name: "bio",
      title: "Bio",
      type: "object",
      group: "bio",
      fields: [
        defineField({
          name: "title",
          title: "Título",
          type: "string",
        }),
        defineField({
          name: "imagenDeFondo",
          title: "Imagen De Fondo",
          type: "image",
        }),
        defineField({
          name: "text",
          title: "Texto",
          type: "array",
          of: [{ type: "block" }],
        }),
      ],
    }),
    defineField({
      name: "photos",
      title: "Fotos",
      type: "array",
      of: [
        defineArrayMember({
          name: "photo",
          title: "Photo",
          type: "object",
          fields: [
            defineField({
              name: "alt",
              title: "Texto Alternativo",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "photo",
              title: "Foto",
              type: "image",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "youtubePlaylist",
      title: "Playlist de Youtube",
      type: "object",
      fields: [
        defineField({
          name: "titulo",
          title: "Título",
          type: "string",
        }),
        defineField({
          name: "youtubePlaylistLink",
          title: "Link de la playlist de Youtube",
          description:
            "copia y pega el link que sale cuando le das compartir al playlist de youtube aqui.",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "hongo",
      title: "Hongo",
      type: "image",
    }),
  ],
  preview: {
    select: {
      title: "seo.title",
    },
  },
  // @ts-ignore
  prepare({ title }: { title: string }) {
    return {
      title,
    };
  },
});
