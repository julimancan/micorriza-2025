"use client";
import { Button } from "@/app/components/Button";
import { YoutubeApiResponse } from "@/app/lib/getYoutubeVideosFromPlaylistId";
import YoutubeIframe from "./YoutubeIframe";
import { useEffect, useState } from "react";

const Videos = ({
  playlistLink,
  title,
}: {
  playlistLink: string;
  title: string;
}) => {
  const [showAll, setShowAll] = useState(false);
  const [playlist, setPlaylist] = useState<YoutubeApiResponse["items"]>([]);

  const playlistId = playlistLink?.split("list=")[1];

  useEffect(() => {
    const getVideos = async () => {
      try {
        const apiUrl = `/api/get-playlist-from-yt-id?playlistId=${playlistId}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          console.error(
            "YouTube API error:",
            response.status,
            await response.text()
          );
          return;
        }

        const data: YoutubeApiResponse = await response.json();
        if (!data?.items) return;

        setPlaylist(data.items);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    if (playlistId) getVideos();
  }, [playlistId]);

  return (
    <section className="py-24 px-6 bg-band-dark">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-band-light">
          <span className="bg-gradient-accent bg-clip-text text-transparent ml-4">
            {title}
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {playlist?.slice(0, 3).map((video, index) => (
            <div key={`${video.id}-${index}`} className="group cursor-pointer">
              <div className="relative aspect-video bg-gradient-card overflow-hidden shadow-card hover:shadow-intense transition-smooth">
                <YoutubeIframe
                  thumbnail={video.snippet.thumbnails.high.url}
                  videoId={video.snippet.resourceId.videoId}
                  videoTitle={video.snippet.title}
                />

                <div className="pointer-events-none absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-smooth" />
              </div>
            </div>
          ))}
          {showAll &&
            playlist?.slice(3).map((video, index) => (
              <div
                key={`${video.id}-${index}`}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video bg-gradient-card overflow-hidden shadow-card hover:shadow-intense transition-smooth">
                  <YoutubeIframe
                    thumbnail={video.snippet.thumbnails.high.url}
                    videoId={video.snippet.resourceId.videoId}
                    videoTitle={video.snippet.title}
                  />

                  <div className="pointer-events-none absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-smooth" />
                </div>
              </div>
            ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-band-primary text-band-primary hover:bg-band-primary hover:text-band-light transition-smooth"
            onClick={() => setShowAll(!showAll)}
          >
            Ver {showAll ? "Menos" : "Todos"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Videos;
