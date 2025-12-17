import { generateCodeVerifier, generateCodeChallenge } from '/src/utils/authUtils';
import { clientId, redirectUri } from "./musicConfig";
export async function redirectToSpotifyLogin() {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    
    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", redirectUri);
    params.append("scope", "user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}


export async function getAccessTokenFromCode(code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const data = await result.json();
    return data.access_token;
}


export async function searchMusic(query, token) {
    if (!token) {
         console.error("No token found!");
         return [];
    }

    // 1. Define the URL
    const url = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=10&market=US`;
    
    // 2. PRINT IT (This is the important part!)
    console.log("🔗 FETCHING URL:", url);

    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
    });

    const data = await response.json();
    return data.tracks.items;
}

export async function getTrack(id, token) {
    if (!token) return Promise.reject("No token");
    
    const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) {
        console.error("Spotify request failed:", response.status, await response.text());
        return null; 
            }
    return await response.json();
}

export async function getArtist(artistId, token) {
    
    if (!token) {
         console.error("No token found! User must log in.");
         return null;
    }

    
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    
    return await response.json();
}
// song imp
/*
export async function getAudioFeatures(trackIds, token) {
    if(!token) {
        return null;
    }

    const ids = trackIds.join(",");

    const response = await fetch (
        `https://api.spotify.com/v1/audio-features?ids=${ids}`, 
        {
            headers: { Authorization: `Bearer ${token}`}
        });

        if (!response.ok) {
        console.error("Spotify request failed:", response.status, await response.text());
        return null; 
            }
        return await response.json();

    }

export async function getRecommendedSongsByAudioFeature(token, audioFeatures) {
    if (!token) {
        return [];
    }
    const url = new URL(`https://api.spotify.com/v1/recommendations`);
  

    //const seedTrackId = "3n3Ppam7vgaVa1iaRUc9Lp";
    const seedGenre = audioFeatures.genre || "pop";
    url.searchParams.append("seed_genres", seedGenre);
    //url.searchParams.append("limit", 5);

    if(audioFeatures.energy !== undefined) {
        url.searchParams.append("target_energy", audioFeatures.energy);
    }
    if(audioFeatures.tempo !== undefined) {
        url.searchParams.append("target_tempo", audioFeatures.tempo);
    }

    const response = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
        console.error("Spotify request failed:", response.status, await response.text());
        return null; 
            }
    const data = await response.json();
    return data.tracks || [];
}  

export async function searchMusic(query, token) {
    if (!token) {
         console.error("No token found! User must log in.");
         return [];
    }
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    return data.tracks.items;
}
*/
export async function getCurrentUser(token) {
    if (!token) return null;

    const response = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) {
        console.error("Spotify request failed:", response.status, await response.text());
        return null; 
            }

    return await response.json();
}

export async function createSpotifyPlaylist(userId, name, description, isPublic, token) {
    const response = await fetch (`https://api.spotify.com/v1/me/playlists`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            name,
            description,
            public: isPublic
        })
    }
    );

    if(!response.ok) {
        throw new Error("failed to create playlist");
    }
    return await response.json();
}

export async function addTracksToPlaylist(playlistId, trackUris, token) {
    var response = await fetch(
        "https://api.spotify.com/v1/playlists/" + playlistId + "/tracks",
        {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uris: trackUris
            })

        }
    );
    if (!response.ok) {
        console.error("Spotify request failed:", response.status, await response.text());
        return null; 
            }

    return await response.json();
}
