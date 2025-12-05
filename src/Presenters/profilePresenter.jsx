import React from "react";
import { useObserver } from "mobx-react-lite";
import { appStore } from "../model/mobxReactiveModel.jsx";
import ProfileView from "../views/profileView.jsx";

export default function ProfilePresenter() {
    function handleSavedACB(newCity) {
        appStore.setCity(newCity);
        appStore.getWeather(newCity);
    }

    return useObserver(function renderPresenter() {

        const currentCity = appStore.currentCity;
        const isLoading = appStore.isLoading;

        return (
            <div>
                <ProfileView
                    currentCity={currentCity}
                    isSaving={isLoading}
                    onSaveClick={handleSavedACB}
                />
            </div>
        );
    });
} 