import React from "react";
import { Routes, Route } from "react-router-dom";
import NaviagtionBar from "./navigationBar";
import ProfilePresenter from "../Presenters/profilePresenter";

export function MainPage (props) {

    return (
        <div className="main-page">
            <NaviagtionBar model={props.model}/>

            <div className="content">
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                <Routes>
                    <Route
                        path="/"
                        element={<h1>Welcome to Here Comses the Song</h1>}
                    />
                    <Route
                        path="/profile"
                        element={<ProfilePresenter />}
                    />
                    <Route
                        path="*"
                        element={<h1>404 - Page Not Found</h1>}
                    />
                </Routes>
=======
                <h1>Welcome to Here Comse The Song</h1>
>>>>>>> Stashed changes
=======
                <h1>Welcome to Here Comse The Song</h1>
>>>>>>> Stashed changes
=======
                <h1>Welcome to Here Comse The Song</h1>
>>>>>>> Stashed changes
            </div>
        </div>
    );
}