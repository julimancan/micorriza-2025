import { Button } from "@/app/components/Button";
import { HOMEPAGE_CONTENT_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { getLogo } from "@/sanity/queries/siteSettingsQueries";
import Image from "next/image";
import SocialIcons from "./SocialIcons";

const Hero = async ({
  hero,
}: {
  hero: NonNullable<HOMEPAGE_CONTENT_QUERYResult>["hero"];
}) => {
  const logo = await getLogo();
  return (
    <>
      <section
        id="hero"
        className="relative h-screen flex flex-col overflow-hidden items-center justify-center w-full aspect-video"
      >
        {/* <div className="absolute z-10 text-emerald-500 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"> */}
        <div className="absolute z-10 left-1/2 -translate-x-1/2 text-emerald-500 top-1/2 -translate-y-1/2">
          {logo?.logo && (
            <img
              src={urlFor(logo.logo)
                // .format("webp")
                .width(300)
                .height(300)
                .url()}
              width={300}
              height={300}
              alt={"Logo Micorriza"}
              className="mx-auto object-cover w-[500px]"
            />
          )}
          {/* <h1 className="text-4xl font-bold text-center font-title">
          {content.title}
          </h1>
          <h2 className="text-2xl font-bold text-center font-subtitle">
          {content.subtitle}
          </h2> */}
          <div className="flex flex-col items-center gap-20">
            <Button
              // variant={"destructive"}
              size="lg"
              className="bg-gradient-accent hover:shadow-glow transition-smooth px-8 py-6 text-lg"
            >
              Escucha Ahora
            </Button>
            {/* Scroll Indicator */}
            <div className="text-white animate-bounce">
              <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        {hero?.socialLinks && (
          <SocialIcons
            color="text-emerald-500"
            socialIcons={hero.socialLinks}
            className="absolute flex-col left-[5vw] z-10"
          />
        )}
        <Video video={hero?.bgVideo} />
      </section>
    </>
  );
};

export default Hero;

const Video = ({
  video,
}: {
  video:
    | {
        url: string | null;
        alt: string;
        fallback: string | null;
        fallbackImage: string | null;
      }
    | null
    | undefined;
}) => {
  return (
    <>
      {!video?.url && !video?.fallback ? (
        video ? (
          video.fallbackImage && (
            <Image
              src={video.fallbackImage}
              alt={video.alt}
              className="object-cover w-full h-full aspect-video"
            />
          )
        ) : null
      ) : (
        <video
          className="w-full min-h-[100dvh] h-full object-cover"
          autoPlay
          loop
          muted
        >
          {video.url && <source src={video.url} type="video/webm" />}
          {video.fallback && <source src={video.fallback} type="video/mp4" />}
          {video.fallbackImage && (
            <img src={video.fallbackImage} alt={video.alt} />
          )}
        </video>
      )}
    </>
  );
};
