import { observer } from "mobx-react-lite";
import ProfileView from "/src/Views/profileView";
const Profile = observer(
    function ProfileRender(props){
        const currentUsername = props.model.currentUsername;
        const currentCity = props.model.currentCity;
        const isLoading = props.model.weatherPromiseState.promise && !props.model.weatherPromiseState.data && !props.model.weatherPromiseState.error;
        const currentGenre = props.model.currentGenre;
        const weatherPromiseState = props.model.weatherPromiseState;
        
        function handleSavedACB(newCity) {
            props.model.setCity(newCity);
            props.model.getWeather(newCity);
        }

        function handleUsernameChangeACB(newUsername) {
            props.model.setUsername(newUsername);
        }
    
       

        function handleGenreChangeACB(newGenre) {
        
            props.model.setGenre(newGenre); 
        
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
                   
                    onExportPlaylist={handleExportPlaylistACB}

                    currentGenre={currentGenre} 
                    onGenreChange={handleGenreChangeACB}
        
        />;
    }
);

export {Profile}

