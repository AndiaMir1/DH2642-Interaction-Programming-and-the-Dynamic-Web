var spotifyToken = null;

export function setSpotifyToken(token) {
    spotifyToken = token;
}

async function fetchFromSpotify(endpoint) {
    if (!spotifyToken) {
        throw new Error("Spotify token missing");
    }

    var response = await fetch(
        "https://api.spotify.com/v1" + endpoint,
        {
            headers: {
                Authorization: "Bearer " + spotifyToken
            }
        }
    );

    if (!response.ok) {
        throw new Error("Spotify API error");
    }

    return await response.json();
}

export async function searchMusic(query) {
    if (!query) return [];

    var data = await fetchFromSpotify(
        "/search?q=" + encodeURIComponent(query) + "&type=track&limit=10"
    );

    return data.tracks.items;
}

export async function getTrack(id) {
    return await fetchFromSpotify("/tracks/" + id);
}

export async function getArtist(id) {
    return await fetchFromSpotify("/artists/" + id);
}
