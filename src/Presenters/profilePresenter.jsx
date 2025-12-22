import { observer } from "mobx-react-lite";
import ProfileView from "/src/Views/profileView";
import { useState,useEffect  } from "react";
const Profile = observer(
    function ProfileRender(props){
        const currentUsername = props.model.currentUsername;
        const currentCity = props.model.currentCity;
        const isLoading = props.model.weatherPromiseState.promise && !props.model.weatherPromiseState.data && !props.model.weatherPromiseState.error;
        const currentGenre = props.model.currentGenre;
        const invalidCityError = props.model.weatherPromiseState.error;
        const exportedPlaylists = props.model.exportedPlaylists;
        const currentBio = props.model.currentBio;
        const [usernameError, setUsernameError] = useState("");
      
        
        async function handleSavedACB(newCity) {
            return await props.model.setCity(newCity);
    
        }

        async function handleUsernameChangeACB(newUsername) {
            const trimmed = newUsername?.trim();
            setUsernameError("");

            if(!trimmed) {
                setUsernameError("Username cannot be empty");
                return false;
            }

            const existingUser = await props.model.searchUser(trimmed);
            if(existingUser && existingUser.uid !== props.model.user?.uid) {
                setUsernameError("This username is already taken.");
            return false;
            }
            props.model.setUsername(newUsername);
            return true;
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
                    usernameError={usernameError}
                    
        
        />);
    }
);

export {Profile}

