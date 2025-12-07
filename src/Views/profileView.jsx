import React, { useState } from "react";
import { observer } from "mobx-react-lite"; 

function ProfileView(props) {
    const [cityInput, setCityInput] = useState(props.currentCity || "");
    const [trackIdInput, setTrackIdInput] = useState(""); 

    // --- CITY HANDLERS ---
    function onTextChangeACB(event) { setCityInput(event.target.value); }
    function onSavedACB() { props.onSaveClick(cityInput); }

    // --- MUSIC HANDLERS ---
    function onTrackIdChange(e) { setTrackIdInput(e.target.value); }
    
    function onSearchClick() {
        props.onSearch(trackIdInput);
    }

    return (
        <div className="profile-view">
            <h1>My Profile</h1>

            
            <section className="current-location">
                <h2>Current City</h2>
                <p>City: <strong>{props.currentCity || "Not Selected"}</strong></p>
            </section>
            
            
            <section className="change-location">
                <h2>Change City</h2>
                <input 
                    type="text" 
                    placeholder="Enter city name" 
                    value={cityInput} 
                    onChange={onTextChangeACB} 
                />
                <button 
                    onClick={onSavedACB}
                    disabled={props.isSaving}
                >
                    {props.isSaving ? "Saving..." : "Save"}
                </button>
            </section>

            <hr style={{ margin: "20px 0" }} />

            
            <section className="api-test">
                <h2>Test Deezer API</h2>
                <input 
                    type="text" 
                    placeholder="Enter Track ID (e.g. 3135556)" 
                    value={trackIdInput}
                    onChange={onTrackIdChange}
                />
                <button onClick={onSearchClick}>
                    Get Track
                </button>
                
                {props.searchStatus === "loading" && <p>Loading...</p>}
                
                {props.searchResult && (
                    <div style={{ marginTop: "20px", background: "#f0f0f0", padding: "10px", borderRadius: "8px" }}>
                        <h4>{props.searchResult.title}</h4>
                        <p>{props.searchResult.artist?.name}</p>
                        {props.searchResult.album?.cover_medium && 
                           <img src={props.searchResult.album.cover_medium} height="100" alt="Album Cover" />
                        }
                    </div>
                )}
            </section>
        </div>
    )
}

export default observer(ProfileView);