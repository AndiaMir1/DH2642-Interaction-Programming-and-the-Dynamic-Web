import { useState, useEffect } from "react";
import { WEATHER_API_URL } from "../apiConfig/weatherConfig";

const DashboardPresenter = () => {
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);

    useEffect(() => {
        fetchCities();
    }, []);


    const fetchCities = async () => {
        try {
            const response = await fetch(WEATHER_API_URL);
            const data = await response.json();
            setCities(data);
            setFilteredCities(data);
        } catch (err) {
            console.error("error fetching cities", err);
        }
    };
    const filterHighTemp = () => setFilteredCities(Filter.filterLocale(cities, "highTemp"));
    const filterHighWind = () => setFilteredCities(Filter.filterLocale(cities, "highWind"));


    const showAll =() => setFilteredCities(cities);

    return {
    cities: filteredCities,
    filterHighTemp,
    filterHighWind,
    showAll
    }
}

export default DashboardPresenter;