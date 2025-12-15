import React, { useState } from "react";
import {onEnterKey} from "../utils/viewHandlers";

import "./style/profileView.css";

export default function ProfileView(props) {
    const [cityInput, setCityInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");
    const [artistInput, setArtistInput] = useState("");
    const [showUsernameChange, setShowUsernameChange] = useState(false);

    function onTextChangeACB(event) {
        setCityInput(event.target.value);
    }

    function onGenreChangeACB(event) {
        if (props.onGenreChange) {
            props.onGenreChange(event.target.value);
        }
    }
    function onUsernameChangeACB(event) {
        setUsernameInput(event.target.value);
    }
   

    function onArtistChangeACB(event) {
        setArtistInput(event.target.value);
    }

    function onSavedACB() {
        var trimmedCity = cityInput.trim();
        if (trimmedCity && props.onSaveClick) {
            props.onSaveClick(trimmedCity);
            setCityInput("");
        }
    }

    function onUsernameKeySavedACB() {
        var trimmedUsername = usernameInput.trim();
        if (trimmedUsername && props.onUsernameChange) {
            props.onUsernameChange(trimmedUsername);
            setUsernameInput("");
            setShowUsernameChange(false);
        }
    }

    function onUsernameClickACB() {
        setShowUsernameChange(true);
    }
   
   
    function onSearchMusicACB() {
        if (!artistInput) return;
        if (props.onSearchMusic) {
            props.onSearchMusic(artistInput);
        }
    }

    return (
        <div className="profile-view">
            <h1>My Profile</h1>

            <section className="current-location">             
                <p>
                    Hometown:
                    <strong> {props.currentCity || "Not Selected"} </strong>
                </p>
            </section>
            <section className="current-location" onClick={onUsernameClickACB}>
                <p>
                    Username:
                    <strong> {props.currentUsername || "Not Selected"} </strong>
                </p>
            </section>

            {showUsernameChange && (
                <section className="change-location">
                    <h2>Change Username</h2>
                    <input
                        type="text"
                        placeholder="Enter new username"
                        value={usernameInput}
                        onChange={onUsernameChangeACB}
                        onKeyDown={onEnterKey(onUsernameKeySavedACB)}
                    />
                    <button onClick={onUsernameKeySavedACB} disabled={props.isSaving}>
                        {props.isSaving ? "Saving..." : "Save"}
                    </button>
                </section>
            )}

            <section className="change-location">
                <h2>Change City</h2>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={cityInput}
                    onChange={onTextChangeACB}
                    onKeyDown={onEnterKey(onSavedACB)}
                />
                <button onClick={onSavedACB} disabled={props.isSaving}>
                    {props.isSaving ? "Saving..." : "Save"}
                </button>
            </section>

            <section className="change-genre" style={{ marginTop: "20px" }}>
                <h2>Favorite Genre</h2>
                <p>Pick a vibe for your weather recommendations:</p>
                <select 
                    value={props.currentGenre || ""} 
                    onChange={onGenreChangeACB}
                    style={{ padding: "8px", fontSize: "1rem" }}
                >
                    <option value="" disabled>Select a genre...</option>
                    <option value="pop">Pop</option>
                    <option value="rock">Rock</option>
                    <option value="hip-hop">Hip Hop</option>
                    <option value="jazz">Jazz</option>
                    <option value="classical">Classical</option>
                    <option value="electronic">Electronic</option>
                    <option value="country">Country</option>
                    <option value="r-n-b">R&B</option>
                </select>
            </section>

            {/* 🎵 Spotify test */}
            <section
                className="music-test"
                style={{ marginTop: "40px", borderTop: "2px dashed #aaa", paddingTop: "20px" }}
            >
                <h2>🎵 Test Spotify API</h2>

                <input
                    type="text"
                    placeholder="Type an artist (e.g. Queen)"
                    value={artistInput}
                    onChange={onArtistChangeACB}
                />

                <button onClick={onSearchMusicACB}>Search Songs</button>

                <div style={{ marginTop: "15px", textAlign: "left" }}>
                    {(props.searchResults || []).map(function (track) {
                        return (
                            <div
                                key={track.id}
                                style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                            >
                                <strong>{track.name}</strong>
                                <span style={{ marginLeft: "10px", color: "gray" }}>
                                    {track.artists[0].name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );

}
