
import { observer } from "mobx-react-lite";
import {SuspenseView} from "/src/Views/suspenseView.jsx";
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


