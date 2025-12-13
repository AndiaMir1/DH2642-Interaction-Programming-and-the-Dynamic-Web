import { useObserver } from "mobx-react-lite";
import { reactiveModel } from "../model/mobxReactiveModel.jsx";
import ProfileView  from "/src/Views/profileView.jsx";
import { updateProfile } from "firebase/auth";
import { auth } from "../model/fireStoreModel.js";
export default function ProfilePresenter() {
    function handleSavedACB(newCity) {
        reactiveModel.setCity(newCity);
        reactiveModel.getWeather(newCity);
    }

    function handleSavedNameACB(input){
        if (!auth.currentUser) return;
        updateProfile(auth.currentUser, {displayName: input})
        .then(function(){reactiveModel.setUser(auth.currentUser);

        }).catch(function(error){
            console.error(error);
        });
        
    }
    function handleSearchMusicACB(query) {
    reactiveModel.doMusicSearch(query);
}


    return useObserver(function renderPresenterACB() {
        //const username = reactiveModel.username;
        const currentCity = reactiveModel.currentCity;
        const isLoading = reactiveModel.weatherPromiseState.promise && !reactiveModel.weatherPromiseState.data && !reactiveModel.weatherPromiseState.error;

        return (
            <div>
                <ProfileView
                    userName = {reactiveModel.userName()}
                    currentCity={currentCity}
                    isSaving={isLoading}
                    onSaveClick={handleSavedACB}
                    onTestSaveClick={handleSavedNameACB}
                    onSearchMusic={handleSearchMusicACB}
                    searchResults={reactiveModel.searchResultsPromiseState.data || []}

                />
            </div>
        );
    });
} 