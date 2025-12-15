
import { observer } from "mobx-react-lite";
import WeatherView from "/src/Views/weatherView.jsx";
const Weather = observer(
    function WeatherRender(props){
        const weatherPromiseState = props.model.weatherPromiseState;
        const currentCity = props.model.currentCity;

        const weatherData = props.model.weatherPromiseState.data;
        
        if (!currentCity) {
            return <h2>Please choose a city in your Profile</h2>;
        }

        else if(weatherData){
            return <WeatherView weatherData = {weatherData} />;
        }
        return <SuspenseView promise={weatherPromiseState.promise}
                                error={weatherPromiseState.error} />;
                  
    }
);
export {Weather}



/*
import { useObserver } from "mobx-react-lite";
import { reactiveModel } from "../model/mobxReactiveModel";
import WeatherView from "../Views/weatherView";
import { SuspenseView } from "../Views/suspenseView";

export default function WeatherPresenter() {

    return useObserver(function renderPresenter() {
        const weatherPromiseState = reactiveModel.weatherPromiseState;
        const currentCity = reactiveModel.currentCity;

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
    */