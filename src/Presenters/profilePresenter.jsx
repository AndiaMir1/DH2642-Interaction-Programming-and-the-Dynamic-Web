import { useObserver } from "mobx-react-lite";
import { appStore } from "../model/mobxReactiveModel.jsx";
import ProfileView  from "/src/Views/profileView.jsx";

export default function ProfilePresenter() {
    function handleSavedACB(newCity) {
        appStore.setCity(newCity);
        appStore.getWeather(newCity);
    }

    return useObserver(function renderPresenter() {

        const currentCity = appStore.currentCity;
        const isLoading = appStore.weatherPromiseState.promise && !appStore.weatherPromiseState.data && !appStore.weatherPromiseState.error;

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