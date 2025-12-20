import { useEffect } from "react";
import "./style/recommendedSongsView.css";
import "./style/weatherView.css";
import { getCurrentUser } from "../apiConfig/musicSource";

export function GetSongsView(props) {
    /************kan tas bort sen****************/
    useEffect(() => {
        //const token = localStorage.getItem("spotifyToken");
        if (props.spotifyToken) {
            getCurrentUser(props.spotifyToken)
                .then((data) => {
                    console.log("🕵️ IDENTITY CHECK:");
                    console.log("Name:", data.display_name);
                    console.log("Email:", data.email);
                    console.log("ID:", data.id);
                })
                .catch(() => {});
        }
    }, []);

    function isLikedACB(trackId) {
        function sameSongCB(song) {
            return song.id === trackId;
        }
        return props.likedSongs && props.likedSongs.some(sameSongCB);
    }
    
    function likeSongACB(track) {
        props.onLikeSong(track);
    }

    function spotifyLoginACB(){
        props.onSpotifyLogin();
    }
    
    function recommendSongsACB(){
        props.onRecommendSongs();
    }

    return(
        <section className="centered-below">
            <h2>🎵 Test Spotify API</h2>
            <button onClick={spotifyLoginACB} className="spotify-login-btn">
                        Log in with Spotify
            </button>

            <br />

            <button onClick={recommendSongsACB} className="get-songs-btn">Get Songs</button>
            {props.searchError && (
                <p>Logga in igen</p>
            )}

            <div className="songs-container">
                {props.searchResults.map((track) => (
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
                                <button onClick={() => likeSongACB(track)} className="like-btn">
                                    {isLikedACB(track.id) ? "Unlike" : "Like Song"}
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

/*
    

    
    async function onRecommendSongsACB() {
        if (!props.searchWord) return;
        const token = localStorage.getItem("spotifyToken");
        if (!token) {
            alert("You need to log in below first!");
            return;
        }

        const result = await searchMusic(props.searchWord, token);
        setSearchResults(result || []);
    }*/
