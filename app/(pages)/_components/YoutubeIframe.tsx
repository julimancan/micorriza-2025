"use client";
import { Button } from "@/app/components/Button";
import { type FC, useState, useRef } from "react";
import { FaPlay } from "react-icons/fa";
type Props = {
  thumbnail: string;
  videoId: string;
  videoTitle: string;
};

const YoutubeIframe: FC<Props> = ({ thumbnail, videoId, videoTitle }) => {
  const [showVideo, setShowVideo] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const playVideo = () => {
    setShowVideo(true);
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage("play", "*");
    }
  };

  return (
    <div onClick={playVideo} className="mt-2 aspect-video w-full">
      {showVideo ? (
        <iframe
          className="w-full aspect-video"
          title={videoTitle}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          ref={iframeRef}
        />
      ) : (
        <div className="relative w-fit">
          <img
            className="aspect-video min-h-[160px] max-w-full object-cover"
            src={thumbnail}
            alt={videoTitle}
            width={640}
            height={360}
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              size="lg"
              className="w-16 h-16 rounded-full bg-band-primary/90 hover:bg-band-primary hover:shadow-glow transition-smooth group-hover:scale-110"
            >
              <FaPlay className="w-6 h-6 ml-1" fill="currentColor" />
            </Button>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default YoutubeIframe;
