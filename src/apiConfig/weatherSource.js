import { WEATHER_API_URL, WEATHER_API_KEY } from "./weatherConfig";

/**
* @param {string} city 
 */

export async function fetchWeatherData(city) {
    const url = `${WEATHER_API_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;

    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error("HTTP Error: " + response.status);
    }
    return response.json();
    
} 

