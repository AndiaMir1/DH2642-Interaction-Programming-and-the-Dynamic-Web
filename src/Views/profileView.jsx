import { useState, useEffect } from "react";
import { onEnterKey } from "../utils/viewHandlers";
import "./style/profileView.css";
import { searchMusic, redirectToSpotifyLogin, getCurrentUser } from "../apiConfig/musicSource";

export default function ProfileView(props) {
    const [cityInput, setCityInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");
    const [artistInput, setArtistInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showUsernameChange, setShowUsernameChange] = useState(false);

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

    function onTextChangeACB(event) {
        setCityInput(event.target.value);
    }

    function onGenreChangeACB(event) {
        //if (props.onGenreChange) {
            props.onGenreChange(event.target.value);
        //}
    }

    function onUsernameChangeACB(event) {
        setUsernameInput(event.target.value);
    }

   
    function onArtistChangeACB(event) {
        setArtistInput(event.target.value);
    }

    function onSavedACB() {
        const trimmedCity = cityInput.trim();
        if (trimmedCity && props.onSaveClick) {
            props.onSaveClick(trimmedCity);
            setCityInput("");
        }
    }

    function onUsernameKeySavedACB() {
        const trimmedUsername = usernameInput.trim();
        if (trimmedUsername && props.onUsernameChange) {
            props.onUsernameChange(trimmedUsername);
            setUsernameInput("");
            setShowUsernameChange(false);
        }
    }

    function onUsernameClickACB() {
        setShowUsernameChange(true);
    }

    async function onSearchMusicACB() {
        if (!artistInput) return;
        const token = localStorage.getItem("spotifyToken");
        if (!token) {
            alert("You need to log in below first!");
            return;
        }
        const results = await searchMusic(artistInput, token);
        setSearchResults(results || []);
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
                    <strong> {props.currentUsername || props.userName || "Not Selected"} </strong>
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
                <select value={props.currentGenre || ""} onChange={onGenreChangeACB} style={{ padding: "8px", fontSize: "1rem" }}>
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

            <section className="music-test" style={{ marginTop: "40px", borderTop: "2px dashed #aaa", paddingTop: "20px" }}>
                <h2>🎵 Test Spotify API</h2>
                <button
                    onClick={redirectToSpotifyLogin}
                    style={{ marginBottom: "15px", backgroundColor: "#1DB954", color: "white", border: "none", padding: "8px 15px", borderRadius: "20px", cursor: "pointer" }}
                >
                    Log in with Spotify
                </button>

                <br />

                <input type="text" placeholder="Type an artist (e.g. Queen)" value={artistInput} onChange={(e) => setArtistInput(e.target.value)} />
                <button onClick={onSearchMusicACB}>Search Songs</button>

                <div style={{ marginTop: "15px", textAlign: "left" }}>
                    {searchResults.map((track) => (
                        <div key={track.id} style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                            <strong>{track.name}</strong>
                            <span style={{ color: "gray", marginLeft: "10px" }}>{track.artists[0].name}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
