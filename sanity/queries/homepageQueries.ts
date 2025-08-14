import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";
import { cache } from "react";

const HOMEPAGE_SEO_QUERY = defineQuery(`
  *[_type == "homepage"][0].seo    
`);

export const getHomepageSeo = async () => {
  try {
    const data = await sanityFetch({ query: HOMEPAGE_SEO_QUERY });
    return data.data;
  } catch (error) {
    console.error(error);
    throw Error("failed to get homepage seo");
  }
};

const HOMEPAGE_CONTENT_QUERY = defineQuery(`
  *[_type == "homepage"] [0] {
  seo,
  "hero": hero {
    title,
    subtitle,
    "bgVideo": bgVideo {
      "url": asset->url,
      alt,
      "fallback": fallback.asset->url,
      "fallbackImage": fallbackImage.asset->url
    },
    "bgVideo1": bgVideo,
    "socialLinks": *[_type == "siteSettings"] [0] {
      socialLinks,
    }.socialLinks,
  },
  bio,
  "youtubePlaylist": youtubePlaylist {
    titulo,
    youtubePlaylistLink,
  },
  photos,
  hongo
}
`);

export const getHomepageContent = cache(async () => {
  try {
    const data = await sanityFetch({ query: HOMEPAGE_CONTENT_QUERY });
    return data.data;
  } catch (error) {
    console.error(error);
    throw Error("failed to get homepage seo");
  }
});
