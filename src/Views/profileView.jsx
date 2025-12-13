import React, { useState } from "react";
import "./style/profileView.css";
// 1.
import { searchMusic } from "../apiConfig/musicSource"; 

export default function ProfileView(props) {
    const [cityInput, setCityInput] = useState("");

    // 2.
    const [artistInput, setArtistInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    function onTextChangeACB(event) {
        setCityInput(event.target.value);
    }

    function onSavedACB(){
        const trimmedCity = cityInput.trim();
        if (trimmedCity && props.onSaveClick) {
            props.onSaveClick(trimmedCity);
            setTimeout(() => {
                setCityInput("");
            }, 0);
        }
    }

    function onKeyDownACB(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSavedACB();
        }
    } 

    // 3.
    async function onSearchMusicACB() {
        if (!artistInput) return; 
        const results = await searchMusic(artistInput);
        setSearchResults(results);
    }

    return (
        <div className="profile-view">
            <h1>My Profile</h1>
            <section className="current-location">
                <h2>Current City</h2>
                <p>City: 
                    <strong> {props.currentCity || "Not Selected"} </strong>
                </p>
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
                <button 
                    onClick={onSavedACB}
                    disabled={props.isSaving}
                >
                    {props.isSaving ? "Saving..." : "Save"}
                </button>
            </section>

            {/* 4. Music test thinngy */}
            <section className="music-test" style={{ marginTop: "40px", borderTop: "2px dashed #aaa", paddingTop: "20px" }}>
                <h2>🎵 Test Spotify API</h2>
                <input 
                    type="text" 
                    placeholder="Type an artist (e.g. Queen)" 
                    value={artistInput}
                    onChange={(e) => setArtistInput(e.target.value)}
                />
                <button onClick={onSearchMusicACB}>Search Songs</button>

                {/* Resultat ellr ngt */}
                <div style={{ marginTop: "15px", textAlign: "left" }}>
                    {searchResults.map(track => (
                        <div key={track.id} style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                            <strong>{track.name}</strong> 
                            <span style={{ color: "gray", marginLeft: "10px" }}>
                                {track.artists[0].name}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    )
}