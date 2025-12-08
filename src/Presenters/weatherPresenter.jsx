import React from "react";
import { useObserver } from "mobx-react-lite";
import { appStore } from "../model/mobxReactiveModel";
import WeatherView from "../Views/weatherView";
import { SuspenseView } from "../Views/suspenseView";

export default function WeatherPresenter() {

    return useObserver(function renderPresenter() {
        const weatherPromiseState = appStore.weatherPromiseState;
        const currentCity = appStore.currentCity;

        if (!currentCity) {
            return <h2>Please choose a city in your Profile</h2>;
        }

        // Show suspense view while loading
        if (weatherPromiseState.promise && !weatherPromiseState.data && !weatherPromiseState.error) {
            return <SuspenseView promise={weatherPromiseState.promise} />;
        }

        // Show error if there's an error
        if (weatherPromiseState.error) {
            return <h2>Error loading weather data: {weatherPromiseState.error.message}</h2>;
        }

        // Show weather data if available
        if (weatherPromiseState.data) {
            return (
                <div>
                    <WeatherView weatherData={weatherPromiseState.data} />
                </div>
            );
        }

        // Default state - no data loaded yet
        return <h2>No weather data available for {currentCity}</h2>;
    });
}