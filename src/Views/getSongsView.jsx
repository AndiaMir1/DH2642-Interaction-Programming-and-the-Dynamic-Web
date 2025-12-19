import { useState, useEffect } from "react";
import "./style/recommendedSongsView.css";
import "./style/weatherView.css";
import { searchMusic, /*getRecommendedSongsByAudioFeature,*/ redirectToSpotifyLogin, getCurrentUser } from "../apiConfig/musicSource";

export function GetSongsView(props) {
    const [searchResults, setSearchResults] = useState([]);

    function isLikedACB(trackId) {
        return props.likedSongs && props.likedSongs.some((song) => song.id === trackId);
    }

    useEffect(() => {
        const token = localStorage.getItem("spotifyToken");
        if (token) {
            getCurrentUser(token)
                .then((data) => {
                    console.log("🕵️ IDENTITY CHECK:");
                    console.log("Name:", data.display_name);
                    console.log("Email:", data.email);
                    console.log("ID:", data.id);
                })
                .catch(() => {});
        }
    }, []);

    async function onRecommendSongsACB() {
        if (!props.recommendedArtist) return;
        const token = localStorage.getItem("spotifyToken");
        if (!token) {
            alert("You need to log in below first!");
            return;
        }

        const result = await searchMusic(props.recommendedArtist, token);
        setSearchResults(result || []);
    }

    function onLikeSongACB(track) {
        if (isLikedACB(track.id)) {
            props.onRemoveLikedSong(track.id);
        } else {
            props.onLikeSong(track);
        }
    }

    return(
        <section className="centered-below">
            <h2>🎵 Test Spotify API</h2>
            <button onClick={redirectToSpotifyLogin} className="spotify-login-btn">
                        Log in with Spotify
            </button>

            <br />

            <button onClick={onRecommendSongsACB} className="get-songs-btn">Get Songs</button>ok

            <div className="songs-container">
                {searchResults.map((track) => (
                    <div key={track.id} className="track-item">
                        <img
                            src={track.album?.images?.[0]?.url || ''}
                            alt={track.name}
                            className="track-image"
                        />
                        <div className="track-content">
                            <div className="track-header">
                                <strong>{track.name}</strong>
                                <span className="artist-name">{track.artists?.[0]?.name}</span>
                                <button onClick={() => onLikeSongACB(track)} className="like-btn">
                                    {isLikedACB(track.id) ? 'Unlike' : 'Like Song'}
                                </button>
                            </div>

                            <div className="audio-container">
                                {track.preview_url && (
                                    <audio controls src={track.preview_url} className="audio-player" />
                                )}
                            </div>

                            <div className="iframe-container">
                                <iframe
                                    title={`spotify-${track.id}`}
                                    src={`https://open.spotify.com/embed/track/${track.id}`}
                                    className="spotify-embed"
                                    frameBorder="0"
                                    allow="encrypted-media"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
