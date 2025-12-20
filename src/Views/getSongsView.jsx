import { useEffect } from "react";
import "./style/recommendedSongsView.css";
import "./style/weatherView.css";
import { getCurrentUser } from "../apiConfig/musicSource";

export function GetSongsView(props) {

    useEffect(() => {
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
        <section className="get-songs-section">
            <div className="get-songs-container">
                <div className="get-songs-header">
                    <h2>{!props.spotifyToken ? "🎵 Test Spotify API" : " Get Music Recommendations"}</h2>
                </div>
                <div className="get-songs-content">
                    {!props.spotifyToken ? (
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
