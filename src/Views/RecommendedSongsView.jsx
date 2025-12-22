import { useState } from "react";
import "./style/recommendedSongsView.css";
import "./style/popUp.css";

export function RecommendedSongsView(props) {
    const [showPlaylistPopUp, setShowPlaylistPopUp] = useState(false);
    const [playlistName, setPlaylistName] = useState("");
    const [statusMessage, setStatusMessage] = useState(null);

    function openPlaylistPopup() {
        setShowPlaylistPopUp(true);
    }

    function closePlaylistPopup() {
        setShowPlaylistPopUp(false);
        setPlaylistName("");
    }

    function onPlayListNameChangeACB(event) {
        setPlaylistName(event.target.value);
    }

    async function onHandleExportPlaylist(name, existingPlaylistId) {
    if (!existingPlaylistId) {
        var finalName = name || playlistName;
        if (!finalName.trim()) {
            setStatusMessage("Please enter a playlist name!");
            setTimeout(function () {
                setStatusMessage(null);
            }, 2000);
            return;
        }
    }

    try {
        await props.onExportPlaylist(finalName, existingPlaylistId);
        setStatusMessage("Playlist exported successfully!");
        setTimeout(function () {
            setStatusMessage(null);
            closePlaylistPopup();
        }, 2000);
        
    } catch (err) {
        if (err === "LOGIN_REQUIRED") {
            setStatusMessage("Please log in to Spotify first!");
        } else {
            setStatusMessage(`Error exporting playlist: ${err.message || err}`);
        }
        setTimeout(function () {
            setStatusMessage(null);
        }, 3000);
        
    }
}

    function onEnterKey(callback) {
        return function(event) {
            if (event.key === 'Enter') {
                callback();
            }
        };
    }
    return (
        <div className="recommend-right">
                <h1>Liked songs</h1>
                <button className="buttonpopup export-btn" onClick={openPlaylistPopup}>
                    Create spotify playlist with liked songs
                </button>
                <div className="playlist-placeholder">
                    <div className="placeholder-content">
                        
                        {props.likedSongs && props.likedSongs.length > 0 ? (
                            props.likedSongs.map((track, index) => (

                                
                                <div key={track.id || index} className="track-item">
                                    <div className="track-content">
                                        <div className="track-header">
                                            <button
                                                onClick={() => props.onRemoveLikedSong(track.id)}
                                                className="like-btn"
                                            >
                                                Unlike
                                            </button>
                                        </div>
                                        <div className="iframe-container">
                                            <iframe
                                                title={`spotify-${track.id || index}`}
                                                src={`https://open.spotify.com/embed/track/${track.id}`}
                                                className="spotify-embed"
                                                frameBorder="0"
                                                allow="encrypted-media"
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div >
                                <div >
                                    <h2>🎵 No songs yet</h2>
                                    <p>Like some songs to fill up your playlist!</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
            

            {showPlaylistPopUp && (
                <div id="bg-modal">
                    <div className="modal-contact">
                        <span className="close" onClick={closePlaylistPopup}>&times;</span>
                         {statusMessage && <div className="status-banner"><p className="error-message">{statusMessage}</p></div>}
                         {!statusMessage && <div>
                        <h3>Create a new playlist:</h3>
                        <input
                            type="text"
                            placeholder="New playlist name"
                            value={playlistName}
                            onChange={onPlayListNameChangeACB}
                            onKeyDown={onEnterKey(() => onHandleExportPlaylist())}
                        />
                        <button
                            className="buttonpopup"
                            onClick={() => onHandleExportPlaylist()}   
                        >
                            Create
                        </button>

                        {props.existingPlaylists && props.existingPlaylists.length > 0 && (
                        <div>
                            <h3>Or add to existing playlist:</h3>
                            {props.existingPlaylists.map((pl, index) => (
                                <button
                                    key={pl.playlistId || index}
                                    onClick={() => onHandleExportPlaylist(null, pl.playlistId)}
                                >
                                    {pl.name}
                                </button>
                            ))}
                        </div>
                    )}
                    </div>}

                        
                    </div>
                </div>
            )}
        </div>
    );
}