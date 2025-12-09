import { useObserver } from "mobx-react-lite";
import { reactiveModel } from "../model/mobxReactiveModel.jsx";
import ProfileView  from "/src/Views/profileView.jsx";

export default function ProfilePresenter() {
    function handleSavedACB(newCity) {
        reactiveModel.setCity(newCity);
        reactiveModel.getWeather(newCity);
    }

    return useObserver(function renderPresenter() {

        const currentCity = reactiveModel.currentCity;
        const isLoading = reactiveModel.weatherPromiseState.promise && !reactiveModel.weatherPromiseState.data && !reactiveModel.weatherPromiseState.error;

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