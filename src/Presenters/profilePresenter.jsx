import { observer } from "mobx-react-lite";
import ProfileView from "/src/Views/profileView";
const Profile = observer(
    function ProfileRender(props){
        const currentUsername = props.model.currentUsername;
        const currentCity = props.model.currentCity;
        const isLoading = props.model.weatherPromiseState.promise && !props.model.weatherPromiseState.data && !props.model.weatherPromiseState.error;
        const currentGenre = props.model.currentGenre;
        const invalidCityError = props.model.weatherPromiseState.error;
        const exportedPlaylists = props.model.exportedPlaylists;
        const currentBio = props.model.currentBio;
        
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

        function handleBioChangeACB(newBio) {
            props.model.setBio(newBio);
        }

        return ( 
            <ProfileView 
                    invalidCityError={invalidCityError}
                    currentUsername={currentUsername}
                    currentCity={currentCity}
                    currentBio={currentBio}
                    isSaving={isLoading}
                    onSaveClick={handleSavedACB}
                    onUsernameChange={handleUsernameChangeACB}
                    onBioChange={handleBioChangeACB}
                    currentGenre={currentGenre} 
                    onGenreChange={handleGenreChangeACB}
                    exportedPlaylists={exportedPlaylists}
        
        />);
    }
);

export {Profile}

