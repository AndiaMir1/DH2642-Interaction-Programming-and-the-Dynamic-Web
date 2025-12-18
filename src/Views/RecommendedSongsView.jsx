import { useState, useEffect } from "react";
import "./style/profileView.css";
import { searchMusic,/*getRecommendedSongsByAudioFeature,*/ redirectToSpotifyLogin, getCurrentUser } from "../apiConfig/musicSource";

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
        if (!props.recommendedArtist) return;
        const token = localStorage.getItem("spotifyToken");
        if (!token) {
            alert("You need to log in below first!");
            return;
        }
        
        const result = await searchMusic(props.recommendedArtist, token);
        
        setSearchResults(result || []);
        
        /*
        const result = await getRecommendedSongsByAudioFeature(
            token,
            props.recommendedAudioFeatures,
            props.playedTrackIds
        );
        setSearchResults(result || []);*/
    }

    function onLikeSongACB(){
        
    }

    return (<div>
                <section className="music-test" style={{ marginTop: "40px", borderTop: "2px dashed #aaa", paddingTop: "20px" }}>
                                <h2>🎵 Log in to spotify and press Get Songs</h2>
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
                                        <div key={track.id} style={{ padding: "8px", borderBottom: "1px solid #ddd", display: 'flex', gap: 12, alignItems: 'center' }}>
                                            <img
                                                src={track.album?.images?.[0]?.url || ''}
                                                alt={track.name}
                                                width={100}
                                                height={100}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <div>
                                                    <strong>{track.name}</strong>
                                                    <span style={{ color: "gray", marginLeft: "10px" }}>{track.artists?.[0]?.name}</span>
                                                </div>

                                                <div style={{ marginTop: 8 }}>
                                                    {track.preview_url && (
                                                        <audio controls src={track.preview_url} style={{ display: 'block' }} />
                                                    )}
                                                </div>

                                                <div style={{ marginTop: 8 }}>
                                                    <iframe
                                                        title={`spotify-${track.id}`}
                                                        src={`https://open.spotify.com/embed/track/${track.id}`}
                                                        width="600"
                                                        height="83"
                                                        
                                                        allow="encrypted-media"
                                                        style= {{ boarder: 2 ,borderRadius: "15px" } }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

            </div>
    
    );
}