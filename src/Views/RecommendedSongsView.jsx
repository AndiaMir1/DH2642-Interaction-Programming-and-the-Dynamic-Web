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

    async function onHandleExportPlaylist() {
        if (!playlistName.trim()) {
            setStatusMessage("Please enter a playlist name!");
            setTimeout(function () {
                setStatusMessage(null);
            }, 2000);
            return;
        }
        try {
            await props.onExportPlaylist(playlistName.trim());
            setStatusMessage("Playlist exported successfully!");
            setTimeout(function () {
                setStatusMessage(null);
            }, 2000);
            closePlaylistPopup();
        } catch (err) {
            if(err === "LOGIN_REQUIRED") {
                setStatusMessage("Please log in to Spotify first!");
            } else {
                setStatusMessage(`Error exporting playlist: ${err.message || err}`);
            }
            setTimeout(function () {
                setStatusMessage(null);
            }, 3000);
            closePlaylistPopup();
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
        <div className="recommended-root">
            {statusMessage && (
               <div className="status-banner">
                {statusMessage}
                </div>
            )}
            <div className="recommend-right">
                <h1>Liked songs</h1>
                <button 
                    className="buttonpopup export-btn" 
                    onClick={openPlaylistPopup}
                >
                    Export liked songs to Spotify
                </button>
                <div className="playlist-placeholder">
                    <div className="placeholder-content">
                        <h2>🎵 Your liked songs </h2>
                        {props.likedSongs && props.likedSongs.length > 0 ? (
                            props.likedSongs.map((track) => (
                                <div key={track.id} className="track-item">
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
                                                title={`spotify-${track.id}`}
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
                            <div className="playlist-placeholder">
                                <div className="placeholder-content">
                                    <h2>🎵No songs yet</h2>
                                    <p>Like some songs to fill up your playlist!</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showPlaylistPopUp && (
                <div id="bg-modal">
                    <div className="modal-contact">
                        <span className="close" 
                        onClick={closePlaylistPopup}>&times;</span>
                        <h2>Name your playlist</h2>
                        <input type="text"
                        placeholder="playlist name"
                        value={playlistName} 
                        onChange={onPlayListNameChangeACB}
                        />
                        <button className="buttonpopup"
                        onClick={onHandleExportPlaylist}
                        onKeyDown={onEnterKey(onHandleExportPlaylist)}>
                            Export
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}