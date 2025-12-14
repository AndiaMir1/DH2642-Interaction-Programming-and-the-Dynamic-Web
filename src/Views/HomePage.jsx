import React from "react";
import { useObserver } from "mobx-react-lite";
import { reactiveModel } from "../model/mobxReactiveModel.jsx";
import "./style/homePage.css";

export default function HomePage() {
    return useObserver(function renderHomePageACB() {
        try {
            const weatherData = reactiveModel.weatherPromiseState.data;

            return (
                <div className="home-page">
                    <div className="home-sidebar">
                        <div className="weather-widget">
                            <div className="weather-widget-content">
                                <h3>Current Weather</h3>
                                {weatherData && weatherData.main && weatherData.weather && weatherData.weather[0] ? (
                                    <div className="weather-info">
                                        <div className="weather-details">
                                            <p className="city-name">{weatherData.name || "Unknown"}</p>
                                            <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
                                            <p className="description">{weatherData.weather[0].description || ""}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="no-weather">Select a city in your profile to see weather</p>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="home-main">
                        <h1>Welcome to Here Comes the Song</h1>
                        <p className="welcome-text">
                            Discover music that matches your mood and weather. 
                            Set your location in your profile to get started!
                        </p>
                        
                        <div className="playlist-placeholder">
                            <div className="placeholder-content">
                                <h2>🎵 Weather-Based Playlists</h2>
                                <p>Coming soon! We'll generate playlists based on your local weather.</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } catch (error) {
            console.error("Error rendering HomePage:", error);
            return (
                <div className="home-page">
                    <div className="home-main">
                        <h1>Welcome to Here Comes the Song</h1>
                        <p>Something went wrong loading the page. Please try again.</p>
                    </div>
                </div>
            );
        }
    });
}
