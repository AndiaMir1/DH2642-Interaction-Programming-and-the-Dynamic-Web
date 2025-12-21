import { useState } from "react";
import { onEnterKey } from "../utils/viewHandlers";
import "./style/profileView.css";

export default function ProfileView(props) {
    const [cityInput, setCityInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");
    const [bioInput, setBioInput] = useState("");
    const [showUsernameChange, setShowUsernameChange] = useState(false);
    const [showCityChange, setShowCityChange] = useState(false);
    const [showBioChange, setShowBioChange] = useState(false);

    function onTextChangeACB(event) {
        setCityInput(event.target.value);
    }

    function onBioChangeACB(event) {
        setBioInput(event.target.value);

    }

    function onGenreChangeACB(event) {
            props.onGenreChange(event.target.value); 
    }

    function onUsernameChangeACB(event) {
        setUsernameInput(event.target.value);
    }
//desc imp
    function onBioSaveACB() {
        if (props.onBioChange) {
            props.onBioChange(bioInput);
            setShowBioChange(false);
        }
    }

    function onCloseBioACB() {
        setShowBioChange(false);
    }
 
   /*
    function onArtistChangeACB(event) {
        setArtistInput(event.target.value);
    }
*/

    function onSavedACB() {
        const trimmedCity = cityInput.trim();
        if (trimmedCity && props.onSaveClick) {
            props.onSaveClick(trimmedCity);
            setCityInput("");
            setShowCityChange(false);
        }
    }

    function onUsernameKeySavedACB() {
        if (props.onUsernameChange) {
            props.onUsernameChange(usernameInput, {
            onSuccess: function () {
                setUsernameInput("");
                setShowUsernameChange(false);
            }
            });
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
                    Bio: <strong>{props.currentBio || "No bio added yet..."}</strong>
                </p>
                <button onClick={function() { 
                    setBioInput(props.currentBio || ""); 
                    setShowBioChange(true); 
                }}>Edit</button>
            </section>
            {showBioChange && (
            <section className="change-location">
                <h2>Edit Bio</h2>
                <button className="close-btn" onClick={onCloseBioACB}>Close</button>
                <input
                    type="text"
                    placeholder="Tell us about yourself!"
                    value={bioInput}
                    onChange={onBioChangeACB}
                    onKeyDown={onEnterKey(onBioSaveACB)}
                />
                <button onClick={onBioSaveACB}>Save</button>
            </section> )}


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
                    { props.invalidCityError && (
                        <div className="error-message">
                            Type another valid city!
                        </div>
                    )}
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={cityInput}
                        onChange={onTextChangeACB}
                        onKeyDown={onEnterKey(onSavedACB)}
                    />
                    <button onClick={onSavedACB} >
                        Save
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
            


                        <section className="change-genre">
                            <h2>Favorite Genre</h2>
                            <p></p>
                            <div className="input-group"></div>
                            <select
                            className="genre-select"
                            value={props.currentGenre || ""}
                            onChange={onGenreChangeACB}
            
                            >
            
                                <option value="" disabled>Select a Genre</option>
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

                        <section className="exported-playlists">
                            <h2>Created Playlists</h2>

                            {(!props.exportedPlaylists || props.exportedPlaylists.length === 0) && (
                                <p>No playlists exported yet.</p>
                            )}

                            {props.exportedPlaylists && props.exportedPlaylists.length > 0 && (
                                <ul className="playlist-list">
                                    {props.exportedPlaylists.map(function (playlist) {
                                        return (
                                            <li key={playlist.playlistId} className="playlist-item">
                                                {playlist.image && (
                                                    <img
                                                        src={playlist.image}
                                                        alt={playlist.name}
                                                        className="playlist-image"
                                                    />
                                                )}

                                                <div className="playlist-info">
                                                    <strong>{playlist.name}</strong>

                                                    {playlist.spotifyUrl && (
                                                        <div>
                                                            <a
                                                                href={playlist.spotifyUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                Open in Spotify
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </section>
                    </div>
                );
}
