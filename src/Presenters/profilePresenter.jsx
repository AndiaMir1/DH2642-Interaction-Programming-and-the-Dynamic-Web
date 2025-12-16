import { observer } from "mobx-react-lite";
import ProfileView from "/src/Views/profileView";
const Profile = observer(
    function ProfileRender(props){
        const currentUsername = props.model.currentUsername;
        const currentCity = props.model.currentCity;
        const isLoading = props.model.weatherPromiseState.promise && !props.model.weatherPromiseState.data && !props.model.weatherPromiseState.error;
        const currentGenre = props.model.currentGenre;
        const searchResults = props.model.searchResultsPromiseState.data || [];
        const weatherPromiseState = props.model.weatherPromiseState;
        
        function handleSavedACB(newCity) {
            props.model.setCity(newCity);
            props.model.getWeather(newCity);
        }

        function handleUsernameChangeACB(newUsername) {
            props.model.setUsername(newUsername);
        }
    
        function handleSearchMusicACB(query) {
            props.model.doMusicSearch(query);
        }

        function handleGenreChangeACB(newGenre) {
        // if (reactiveModel.setGenre) {
            props.model.setGenre(newGenre); 
        //}
        }

        function handleExportPlaylistACB() {
            props.model.exportLikedSongsToSpotify();
        }

        const weatherData = weatherPromiseState.data;

    let artist = [];

    if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
    artist = props.model.getMusicRecommendations({
        conditionId: weatherData.weather[0].id,
        temp: weatherData.main.temp,
        windSpeed: weatherData.wind.speed
    });
}

        return <ProfileView 
                    currentUsername = {currentUsername}
                    currentCity={currentCity}
                    isSaving={isLoading}
                    onSaveClick={handleSavedACB}
                    onUsernameChange={handleUsernameChangeACB}
                    //ta bort nedan? 
                    recommendedArtist={artist}
                    //onRecommendSongsACB={handleRecommendedSongsACB}
                    /*onSearchMusic={handleSearchMusicACB}*/
                    searchResults={searchResults}
                    onExportPlaylist={handleExportPlaylistACB}

                    currentGenre={currentGenre} 
                    onGenreChange={handleGenreChangeACB}
        
        />;
    }
);

export {Profile}




/*import { useObserver } from "mobx-react-lite";
import { reactiveModel } from "../model/mobxReactiveModel.jsx";
import ProfileView  from "/src/Views/profileView.jsx";
export default function ProfilePresenter() {
    function handleSavedACB(newCity) {
        reactiveModel.setCity(newCity);
        reactiveModel.getWeather(newCity);
    }

    function handleUsernameChangeACB(newUsername) {
        reactiveModel.setUsername(newUsername);
    }
    
    function handleSearchMusicACB(query) {
    reactiveModel.doMusicSearch(query);
}

function handleGenreChangeACB(newGenre) {
        if (reactiveModel.setGenre) {
            reactiveModel.setGenre(newGenre); 
        }
    }


    return useObserver(function renderPresenterACB() {
        
        const currentCity = reactiveModel.currentCity;
        const isLoading = reactiveModel.weatherPromiseState.promise && !reactiveModel.weatherPromiseState.data && !reactiveModel.weatherPromiseState.error;

        return (
            <div>
                <ProfileView
                    currentUsername = {reactiveModel.currentUsername}
                    currentCity={currentCity}
                    isSaving={isLoading}
                    onSaveClick={handleSavedACB}
                    onUsernameChange={handleUsernameChangeACB}
                    
                    onSearchMusic={handleSearchMusicACB}
                    searchResults={reactiveModel.searchResultsPromiseState.data || []}

                    currentGenre={reactiveModel.currentGenre} 
                    onGenreChange={handleGenreChangeACB}

                />
            </div>
        );
    });
} 
*/