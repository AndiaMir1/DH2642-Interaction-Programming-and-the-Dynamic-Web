import React from "react";

export default function DashboardView() {
  const { filteredCities, filterHighTemp, filterHighWind, showAll } = DashboardPresenter();

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="filter-buttons">
        <button onClick={showAll}>Show All</button>
        <button onClick={filterHighTemp}>High Temperature</button>
        <button onClick={filterHighWind}>High Wind</button>
      </div>

      <ul>
        {filteredCities.map((city) => (
          <li key={city.id}>
            <strong>{city.name}</strong> - Temp: {city.main.temp}°C - Wind: {city.wind.speed} m/s - Condition: {city.weather[0].main}
          </li>
        ))}
      </ul>
    </div>
  );
}
