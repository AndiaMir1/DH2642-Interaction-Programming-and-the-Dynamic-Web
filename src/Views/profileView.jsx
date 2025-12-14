import React, { useState } from "react";
import {onEnterKey} from "../utils/viewHandlers";

import "./style/profileView.css";

export default function ProfileView(props) {
    const [cityInput, setCityInput] = useState("");
    const [artistInput, setArtistInput] = useState("");

    function onTextChangeACB(event) {
        setCityInput(event.target.value);
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
            <section className="current-location" >
                <p>
                    Username:
                    <strong> {props.currentUsername || "Not Selected"} </strong>
                </p>
            </section>

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
