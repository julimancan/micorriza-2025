import { getYoutubeVideosFromPlaylistId } from "@/app/lib/getYoutubeVideosFromPlaylistId";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const playlistId = searchParams.get("playlistId");

  // Validate that a playlistId was provided
  if (!playlistId || typeof playlistId !== "string") {
    return Response.json({ error: "Missing or invalid playlistId" });
  }

  try {
    // Call your function to fetch data from the YouTube API
    const data = await getYoutubeVideosFromPlaylistId(playlistId);

    // If data is returned, send it back to the client
    if (data) {
      return Response.json(data);
    } else {
      // Handle cases where your function returns undefined (e.g., API error)
      return Response.json({ error: "Failed to fetch videos from YouTube" });
    }
  } catch (error) {
    console.error("API error:", error);
    return Response.json({ error: "Internal server error" });
  }
}
