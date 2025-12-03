import { DEEZER_API_URL } from "./musicConfig";


export const getTrack = async (trackId) => {
  try {
    const res = await fetch(`${DEEZER_API_URL}/track/${trackId}`);
    const data = await res.json();
    return data; 
  } catch (error) {
    console.error("Error fetching track:", error);
    return null;
  }
};


export const getArtist = async (artistId) => {
  try {
    const res = await fetch(`${DEEZER_API_URL}/artist/${artistId}`);
    const data = await res.json();
    return data; 
  } catch (error) {
    console.error("Error fetching artist:", error);
    return null;
  }
};


export const getGenre = async (genreId) => {
  if (!genreId) return null;
  try {
    const res = await fetch(`${DEEZER_API_URL}/genre/${genreId}`);
    const data = await res.json();
    return data; 
  } catch (error) {
    console.error("Error fetching genre:", error);
    return null;
  }
};