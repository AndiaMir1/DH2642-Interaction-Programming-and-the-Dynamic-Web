import { useState } from "react";
import { onEnterKey } from "../utils/viewHandlers";
import "./style/profileView.css";

export default function ProfileView(props) {
    const [cityInput, setCityInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");
    const [showUsernameChange, setShowUsernameChange] = useState(false);
    const [showCityChange, setShowCityChange] = useState(false);

    function onTextChangeACB(event) {
        setCityInput(event.target.value);
    }

    function onGenreChangeACB(event) {
            props.onGenreChange(event.target.value); 
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
            setShowCityChange(false);
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

    function onChangeUsernameClickACB() {
        setShowUsernameChange(true);
    }

    function onChangeCityClickACB() {
        setShowCityChange(true);
    }

    function onCloseUsernameACB() {
        setShowUsernameChange(false);
        setUsernameInput("");
    }

    function onCloseCityACB(){
        setShowCityChange(false);
        setCityInput("");
    }

    return (
        <div className="profile-view">
            <h1>My Profile</h1>

            <section className="current-location">
                <p>
                    Hometown:
                    <strong> {props.currentCity || "Not Selected"} </strong>
                </p>
                <button onClick={onChangeCityClickACB}>Edit</button>
            </section>

            {showCityChange && (
                <section className="change-location">
                    <h2>Change City</h2>
                    <button className="close-btn" onClick={onCloseCityACB}>Close</button>
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
            )}

            <section className="current-location">
                <p>
                    Username:
                    <strong> {props.currentUsername || props.userName || "Not Selected"} </strong>
                </p>
                <button onClick={onChangeUsernameClickACB}>Edit</button>
            </section>

            {showUsernameChange && (
                <section className="change-location">
                    <h2>Change Username</h2>
                    <button className="close-btn" onClick={onCloseUsernameACB}>Close</button>
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

            <section>
    <button
        onClick={function () {
            props.onExportPlaylist();
        }}
    >
        Export liked songs to Spotify
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
             
        </div>
    );
}
