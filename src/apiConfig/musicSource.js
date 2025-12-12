const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

let accessToken = "";
let tokenExpiration = 0;

// --- Helper: Get Valid Token ---
async function getAccessToken() {
    // Check if we have a valid token in memory
    const now = Date.now();
    if (accessToken && now < tokenExpiration - 60000) {
        return accessToken;
    }

    // If not, ask Spotify for a new one using our Proxy
    const authString = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    
    const response = await fetch('/spotify-auth/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${authString}`
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    
    if (data.error) throw new Error("Spotify Auth Failed: " + data.error_description);
    
    accessToken = data.access_token;
    tokenExpiration = now + (data.expires_in * 1000); 
    
    return accessToken;
}


async function fetchFromSpotify(endpoint) {
    const token = await getAccessToken();
    const res = await fetch(`/spotify-api/v1${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error(`Spotify Error: ${res.statusText}`);
    return await res.json();
}

// --- EXPORTS ---

export const getTrack = async (trackId) => {
    try {
        return await fetchFromSpotify(`/tracks/${trackId}`);
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const searchMusic = async (query) => {
    if (!query) return [];
    try {
        // Limit to 10 results
        const data = await fetchFromSpotify(`/search?q=${encodeURIComponent(query)}&type=track&limit=10`);
        return data.tracks.items;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getArtist = async (artistId) => {
    try {
        return await fetchFromSpotify(`/artists/${artistId}`);
    } catch (error) {
        console.error(error);
        return null;
    }
};