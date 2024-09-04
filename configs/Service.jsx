import axios from "axios";

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

const getVideos = async (query) => {
  const params = {
    part: "snippet",
    q: query,
    maxResults: 1, // The correct property is `maxResults`, not `maxResult`
    type: "video",
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY, // Corrected typo here
  };


  try {
    const res = await axios.get(YOUTUBE_BASE_URL + "/search", { params });
    return res.data.items;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error; // Re-throw the error to handle it where this function is called
  }
};

export default {
  getVideos,
};
