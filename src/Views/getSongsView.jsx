import { useEffect, useState } from "react";
import "./style/recommendedSongsView.css";
import "./style/weatherView.css";
import { getCurrentUser } from "../apiConfig/musicSource";

export function GetSongsView(props) {
    const [isTokenValid, setIsTokenValid] = useState(false);

    useEffect(() => {
        async function validateToken() {
            if (props.spotifyToken) {
                try {
                    const data = await getCurrentUser(props.spotifyToken);
                    if (data) {
                        setIsTokenValid(true);
                    } else {
                        setIsTokenValid(false);
                        if (props.onTokenInvalid) {
                            props.onTokenInvalid();
                        }
                    }
                } catch (error) {
                    setIsTokenValid(false);
                    if (props.onTokenInvalid) {
                        props.onTokenInvalid();
                    }
                }
            } else {
                setIsTokenValid(false);
            }
        }
        
        validateToken();
    }, [props.spotifyToken]);

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
        <section className="get-songs-section">
            <div className="get-songs-container">
                <div className="get-songs-header">
                    <h2>{!props.spotifyToken || !isTokenValid ? "Log in with Spotifiy to get started!" : "Get Music Recommendations"}</h2>
                </div>
                <div className="get-songs-content">
                    {!props.spotifyToken || !isTokenValid ? (
                        <>
                            <p>Log in with Spotify to get started!</p>
                            <button onClick={spotifyLoginACB} className="spotify-login-btn">
                                Log in with Spotify
                            </button>
                        </>
                    ) : (
                        <p>Welcome! You're logged in to Spotify.</p>
                    )}
                    
                    <button onClick={recommendSongsACB} className="get-songs-btn">Get Songs</button>
                    
                    {props.searchError && (
                        <p className="error-message">Logga in igen</p>
                    )}
                </div>

                <div className="songs-container">
                {props.searchResults.map((track) => (
                    <div key={track.id} className="track-item">
                        <div className="track-content">
                            <div className="track-header">
                                <button onClick={() => likeSongACB(track)} className="like-btn">
                                    {isLikedACB(track.id) ? "Unlike" : "❤"}
                                </button>
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
            </div>
        </section>
    );
}
