import { useState, useEffect } from "react";
import "./style/profileView.css";
import { getRecommendedSongsByAudioFeature, redirectToSpotifyLogin, getCurrentUser } from "../apiConfig/musicSource";

export function RecommendedSongsView (props) {
    const [searchResults, setSearchResults] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem("spotifyToken");
        if (token) {
            getCurrentUser(token).then((data) => {
                console.log("🕵️ IDENTITY CHECK:");
                console.log("Name:", data.display_name);
                console.log("Email:", data.email);
                console.log("ID:", data.id);
            }).catch(() => {});
        }
    
    }, []);
    async function onRecommendSongsACB(){
        if (!props.recommendedAudioFeatures) return;
        const token = localStorage.getItem("spotifyToken");
        if (!token) {
            alert("You need to log in below first!");
            return;
        }
        /*
        const result = await searchMusic(props.recommendedArtist, token);
        setSearchResults(result || []);
        */

        const result = await getRecommendedSongsByAudioFeature(
            token,
            props.recommendedAudioFeatures,
            props.playedTrackIds
        );
        setSearchResults(result || []);
    }

    return (<div>
                <section className="music-test" style={{ marginTop: "40px", borderTop: "2px dashed #aaa", paddingTop: "20px" }}>
                                <h2>🎵 Test Spotify API</h2>
                                <button
                                    onClick={redirectToSpotifyLogin}
                                    style={{ marginBottom: "15px", backgroundColor: "#1DB954", color: "white", border: "none", padding: "8px 15px", borderRadius: "20px", cursor: "pointer" }}
                                >
                                    Log in with Spotify
                                </button>
                
                                <br />
                
                                
                                <button onClick={onRecommendSongsACB}>Get Songs</button>
                
                                <div style={{ marginTop: "15px", textAlign: "left" }}>
                                    {searchResults.map((track) => (
                                        <div key={track.id} style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                                            <img src= {track.album.images[0]?.url}
                                                 width={"100"}
                                                 height={"100"}
                                            />
                                            <strong>{track.name}</strong>
                                            <span style={{ color: "gray", marginLeft: "10px" }}>{track.artists[0].name}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

            </div>
    
    );
}