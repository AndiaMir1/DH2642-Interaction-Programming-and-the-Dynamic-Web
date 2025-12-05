import { makeObservable, observable, action } from "mobx";
import { fetchWeatherData } from "../apiConfig/weatherSource";

export const model = {
    user:undefined,
    isUserLoggedIn:false,
    currentView: "main"};

//Holds the global state of the application
class RootModel {

    isUserLoggedIn = true;
    user = true;
    currentView = "main";
    weatherData = null;
    isLoading = false;
    currentCity = null;

    //making properties observable and actions
    constructor() {
        makeObservable(this, {
            isUserLoggedIn: observable,
            currentView: observable,
            user: observable,

            weatherData: observable,
            isLoading: observable,
            currentCity: observable,

            getWeather: action.bound,
            setCity: action.bound,
            setUser: action.bound,
        });
    } 

    //Save the selected city in MobX
    setCity(city) {
        this.currentCity = city;
    }

    //save user info in MobX
    setUser(user) {
        this.user = user;
        this.isUserLoggedIn = !!user; //true if user is not null
    }   

    //Get data from weather API
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
}

export default new RootModel();
