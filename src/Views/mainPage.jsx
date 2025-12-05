import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./navigationBar";
import ProfilePresenter from "../Presenters/profilePresenter";

export function MainPage (props) {

    return (
        <div className="main-page">
            <NavigationBar model={props.model}/>
            <div className="content">
                <Routes>
                    <Route
                        path="/"
                        element={<h1>Welcome to Here Comes the Song</h1>}
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
   </div>
        </div>
    );
}