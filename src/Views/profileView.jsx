import React, { useState } from "react";
import "./style/profileView.css";

export default function ProfileView(props) {
    const [cityInput, setCityInput] = useState("");

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
        </div>
    )
}