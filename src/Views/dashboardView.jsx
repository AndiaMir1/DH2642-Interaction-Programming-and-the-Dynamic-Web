import React from "react";
import DashboardPresenter from "../Presenters/sashboardPresenter.jsx"

export default function DashboardView() {
    const {
        cities,
        filteredCities,
        filterHighTemp,
        filterHighWind,
        showAll

    } = DashboardPresenter();

    return (
      <div className="dashboard">
        <h2>Dashboard</h2>
      </div>
    )
}