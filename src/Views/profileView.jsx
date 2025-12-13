import React, { useState } from "react";
import "./style/profileView.css";

export default function ProfileView(props) {
    const [cityInput, setCityInput] = useState("");
    const [input, setInput] = useState("");
    const [artistInput, setArtistInput] = useState("");
    const [showChangeName, setShowChangeName] = useState(false);

    function onTextChangeACB(event) {
        setCityInput(event.target.value);
    }

    function textChangeACB(event) {
        setInput(event.target.value);
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

    function onTestSavedACB() {
        var trimmedInput = input.trim();
        if (trimmedInput && props.onTestSaveClick) {
             setInput("");
            props.onTestSaveClick(trimmedInput);
           setShowChangeName(false);
        }
    }

    function onKeyDownACB(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            onSavedACB();
        }
    }

    function onChangeNameACB() {
        setShowChangeName(true);
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
                <h2>Current City</h2>
                <p>
                    City:
                    <strong> {props.currentCity || "Not Selected"} </strong>
                </p>
            </section>

            <section className="current-location" onClick={onChangeNameACB}>
                <p>
                    User name:
                    <strong> {props.userName || "Not Selected"} </strong>
                </p>

                {showChangeName && (
                    <section className="change-location">
                        <input
                            type="text"
                            placeholder="Change name"
                            value={input}
                            onChange={textChangeACB}
                            
                        />
                        <button onClick={onTestSavedACB} disabled={props.isSaving}>
                            {props.isSaving ? "Saving..." : "Save"}
                        </button>
                    </section>
                )}
            </section>

            <section className="change-location">
                <h2>Change City</h2>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={cityInput}
                    onChange={onTextChangeACB}
                    onKeyDown={onKeyDownACB}
                />
                <button onClick={onSavedACB} disabled={props.isSaving}>
                    {props.isSaving ? "Saving..." : "Save"}
                </button>
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
