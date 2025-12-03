import { WEATHER_API_URL, WEATHER_API_KEY } from "./src/apiConfig/weatherConfig";

/**
* @param {number} lat 
* @param {number} lon
 */

export async function fetchWeatherData(lat, lon) {
    const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

    
} 