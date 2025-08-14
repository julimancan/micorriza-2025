import { getHomepageContent } from "@/sanity/queries/homepageQueries";
import Hero from "./_components/Hero";
import Bio from "./_components/Bio";
import Videos from "./_components/Videos";
import Subscribe from "./_components/Subscribe";
import { getSiteSettings } from "@/sanity/queries/siteSettingsQueries";

export const revalidate = 60;

export default async function Home() {
  const content = await getHomepageContent();
  const siteSettings = await getSiteSettings();
  if (!content) return;

  return (
    <main className="">
      {content?.hero && <Hero hero={content.hero} />}
      {content?.bio && <Bio bio={content.bio} fotos={content.photos} />}

      {content?.youtubePlaylist?.youtubePlaylistLink && (
        <Videos
          title={content.youtubePlaylist.titulo ?? "Videos"}
          playlistLink={content.youtubePlaylist.youtubePlaylistLink}
        />
      )}
      {siteSettings?.subscribe && (
        <Subscribe subscribe={siteSettings.subscribe} />
      )}
    </main>
  );
}
