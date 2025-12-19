import { useState, useEffect } from "react";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../apiConfig/weatherConfig";
import { getTemperature, getWind } from "../utils/weatherUtils";

const Filter = {
  highTemp: (cities) => cities.filter(c => getTemperature(c.main.temp) === "highTemp"),
  highWind: (cities) => cities.filter(c => getWind(c.wind.speed) === "highWind"),
};

const DashboardPresenter = () => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
  try {
    const cityIds = "5128581,2643743,2950159"; 
    const response = await fetch(
      `${WEATHER_API_URL}?id=${cityIds}&units=metric&appid=${WEATHER_API_KEY}`
    );
    const data = await response.json();
    setCities(data.list);
    setFilteredCities(data.list);
  } catch (err) {
    console.error("Error fetching cities", err);
  }
};

  const filterHighTemp = () => setFilteredCities(Filter.highTemp(cities));
  const filterHighWind = () => setFilteredCities(Filter.highWind(cities));
  const showAll = () => setFilteredCities(cities);

  return {
    cities,
    filteredCities,
    filterHighTemp,
    filterHighWind,
    showAll,
  };
};

export default DashboardPresenter;
