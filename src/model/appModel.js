//import { makeObservable, observable, action } from "mobx";
import { fetchWeatherData } from "../apiConfig/weatherSource";

// Holds the global state of the application
export const model = {
    isUserLoggedIn : true,
    user : true,
    currentView : "main",
    weatherData : null,
    isLoading : false,
    currentCity : null,

    // Save the selected city in MobX
    setCity(city) {
        this.currentCity = city;
    },

    // Set user authentication state
    setUser(user) {
        this.user = user;
        this.isUserLoggedIn = !!user;
    },

    // Get data from weather API
    async getWeather(city) {
        if (!city) {
            console.warn("City is not chosen");
            return;
        }

        this.isLoading = true;
        this.weatherData = null;

        try {
            const data = await fetchWeatherData(city);
            this.weatherData = data;
        } catch (error) {
            console.error("Failed to fetch weather data:", error);
        } finally {
            this.isLoading = false;
        }
    }
};


