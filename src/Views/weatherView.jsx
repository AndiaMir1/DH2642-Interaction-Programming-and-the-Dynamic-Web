
import "./style/weatherView.css";

export default function WeatherView(props) {

    if (!props.weatherData || !props.currentCity) {
        return <h2>Choose a city in your profile</h2>;
    }

    const data = props.weatherData;
    const city = data.name;
    const temp = Math.round(data.main.temp); //round temperature
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`

    return (
        <div className="weather-view">
            <div className= "weather-left">
            <h1>Weather in {city}</h1>

            <div className="weather-details">
                <img src={iconUrl} alt={description} />
                <p className="temperature">Temperature: {temp} °C</p>
            </div>

            <p className="description">Description: {description}</p>
            <div className="weather-details">
                <p className="wind-speed">Wind Speed: {windSpeed} m/s</p>
                <p className="humidity">Humidity: {humidity} %</p>
                <p className="pressure">Pressure: {pressure} hPa</p>
            </div>
            </div>
            <div className="music-left">
                <h1>Generate playlist</h1>
            <div className="playlist-placeholder">
                            <div className="placeholder-content">
                                <h2>🎵 Weather-Based Playlists</h2>
                                <p>Coming soon! We'll generate playlists based on your local weather.</p>
                            </div>
                        </div>
            </div>
            </div>
        
    );
}
