import { useState } from "react";
import { onEnterKey } from "../utils/viewHandlers.js"

export default function playlistView(props) {
    const [trackInput, setTrackInput] = useState("");

    function onTrackInputChangeACB(event) {
        setTrackInput(event.target.value);
    }

    function onAddTrackACB() {
        props.onAddTrack(trackInput.trim());
        setTrackInput("");
    }

    function onRemoveTrackACB(uri) {
        props.onRemoveTrack(uri);
    }

    return (
        <div className="playlist-view">
            <h2>{props.playlist.name}</h2>
            {props.playlist.spotifyUrl && (
                <a href={props.playlist.spotifyUrl} target="_blank" rel="noopener noreferrer">
                    Open in Spotify
                </a>
            )}

            <ul>
                {props.playlist.trackUris && props.playlist.trackUris.map(function(uri) {
                    return (
                        <li key={uri}>
                            {uri}
                            <button onClick={function() { onRemoveTrackACB(uri); }}>Remove</button>
                        </li>
                    );
                })}
            </ul>

            <input
                type="text"
                placeholder="Track URI to add"
                value={trackInput}
                onChange={onTrackInputChangeACB}
                onKeyDown={onEnterKey(onAddTrackACB)}
            />
            <button onClick={onAddTrackACB}>Add Track</button>
            <button onClick={props.onClose}>Close</button>
        </div>
    );
}