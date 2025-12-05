import React, { useState } from "react";

export default function ProfileView(props) {
    const [cityInput, setCityInput] = useState(props.currentCity || "");

    function onTextChangeACB(event) {
        setCityInput(event.target.value);
    }

    function onSavedACB(){
        if (cityInput && props.onSaveClick) {
            props.onSaveClick(cityInput);
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