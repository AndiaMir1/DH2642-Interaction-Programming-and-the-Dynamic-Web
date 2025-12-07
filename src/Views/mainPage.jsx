import React from "react";
import { Routes, Route } from "react-router-dom";
import NaviagtionBar from "./navigationBar";
import ProfilePresenter from "../Presenters/profilePresenter";

export function MainPage (props) {

    return (
        <div className="main-page">
            <NaviagtionBar model={props.model}/>

            <div className="content">

                <h1>Welcome to Here Comse The Song</h1>

            </div>
        </div>
    );
}