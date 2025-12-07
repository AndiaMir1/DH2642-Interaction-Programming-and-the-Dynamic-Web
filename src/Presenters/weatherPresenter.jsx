import React from "react";
import { useObserver } from "mobx-react-lite";
import { appStore } from "../model/mobxReactiveModel";
import WeatherView from "../Views/weatherView";

export default function WeatherPresenter() {

    return useObserver(function renderPresenter() {
        const weatherData = appStore.weatherData;
        const isLoading = appStore.isLoading;
        const currentCity = appStore.currentCity;

        if(isLoading) {
            return <h2>Loading the weather for {currentCity || 'Chosen city'}...</h2>;
        }

        if (!currentCity) {
            return <h2>Please  choose a city in your Profie</h2>;
        }

        if (!weatherData) {
            return <h2>No weather data available for {currentCity}</h2>;
        }

        return (
            <div>
                <WeatherView weatherData={weatherData} />
            </div>
        );

})

}