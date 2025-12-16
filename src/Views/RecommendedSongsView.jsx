/*export function RecommendedSongsView (props) {  
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
                
                                
                                <button onClick={onSearchMusicACB}>Get Songs</button>
                
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
}*/