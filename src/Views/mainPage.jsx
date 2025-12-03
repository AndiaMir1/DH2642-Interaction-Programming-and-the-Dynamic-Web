import NaviagtionBar from "./navigationBar";
import React from "react";

export function MainPage (props) {
    const {model} = props;
    return (
        <div className="main-page">
            <NaviagtionBar model={model}/>

            <div className="content">
                <h1>Welcome to Here Comses the Song</h1>
            </div>

        </div>

    );
}