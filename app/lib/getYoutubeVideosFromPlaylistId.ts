"use server";
type YoutubeVideo = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
      standard: {
        url: string;
        width: number;
        height: number;
      };
      maxres: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
  };
};

export type YoutubeApiResponse = {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubeVideo[];
};

export const getYoutubeVideosFromPlaylistId = async (
  youtubePlaylistId: string
): Promise<YoutubeApiResponse | undefined> => {
  const YOUTUBE_PLAYLIST_ITEMS_API =
    "https://www.googleapis.com/youtube/v3/playlistItems";

  const queryString = `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=${youtubePlaylistId}&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`;

  try {
    const res = await fetch(queryString);

    if (!res.ok) {
      console.error("YouTube API error", res.status, await res.text());
      return undefined;
    }

    const data: YoutubeApiResponse = (await res.json()) as YoutubeApiResponse;
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
