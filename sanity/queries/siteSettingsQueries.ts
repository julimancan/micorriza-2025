import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";
import { cache } from "react";

const SOCIAL_ICONS_QUERY = defineQuery(`*[_type == "siteSettings"] [0] {
  socialLinks
}`);

export const getSocialIcons = cache(async () => {
  try {
    const data = await sanityFetch({ query: SOCIAL_ICONS_QUERY });
    return data.data;
  } catch (error) {
    console.error(error);
    throw Error("failed to get homepage seo");
  }
});

const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"] [0] {
  siteTitle,
  siteDescription,
  "subscribe": subscribe {
    title,
    subtitle,
    bottomMsg,
    subscribedMessage,
  },
  socialLinks,
  "ogImage": *[_type == "homepage"] {"url": hero.bgVideo.fallbackImage.asset->url}
}`);

export const getSiteSettings = cache(async () => {
  try {
    const data = await sanityFetch({ query: SITE_SETTINGS_QUERY });
    return data.data;
  } catch (error) {
    console.error(error);
    throw Error("failed to get homepage seo");
  }
});

const LOGO_QUERY = defineQuery(`*[_type == "siteSettings"] [0] {
  logo
}`);

export const getLogo = cache(async () => {
  try {
    const data = await sanityFetch({ query: LOGO_QUERY });
    return data.data;
  } catch (error) {
    console.error(error);
    throw Error("failed to get homepage seo");
  }
});
