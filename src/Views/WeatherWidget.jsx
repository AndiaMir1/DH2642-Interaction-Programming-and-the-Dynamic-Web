import React from "react";
import "./style/weatherWidget.css";

export default function WeatherWidget({ weatherData }) {
    console.log("WeatherWidget rendering with data:", weatherData);
    
    if (!weatherData) {
        return (
            <div className="weather-widget" style={{ background: "lightgreen", padding: "20px", border: "2px solid red" }}>
                <div className="weather-widget-content">
                    <h3>Weather</h3>
                    <p className="no-weather">Select a city in your profile to see weather</p>
                </div>
            </div>
        );
    }

    const temp = Math.round(weatherData.main.temp);
    const description = weatherData.weather[0].description;
    const iconCode = weatherData.weather[0].icon;
    const city = weatherData.name;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    return (
        <div className="weather-widget">
            <div className="weather-widget-content">
                <h3>Current Weather</h3>
                <div className="weather-info">
                    <img src={iconUrl} alt={description} className="weather-icon" />
                    <div className="weather-details">
                        <p className="city-name">{city}</p>
                        <p className="temperature">{temp}°C</p>
                        <p className="description">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
