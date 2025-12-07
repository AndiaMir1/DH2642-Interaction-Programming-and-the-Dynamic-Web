import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { appStore } from "../model/mobxReactiveModel.jsx";
import ProfileView from "../Views/profileView.jsx";
import { getTrack } from "../apiConfig/musicSource"; 

function ProfilePresenter() {
    
    function handleSavedACB(newCity) {
        appStore.setCity(newCity);
        appStore.getWeather(newCity);
    }


    const [trackData, setTrackData] = useState(null);
    const [searchStatus, setSearchStatus] = useState(""); 

    async function handleTrackSearchACB(id) {
        if(!id) return;
        
        setSearchStatus("loading");
        setTrackData(null);
        
        try {
            const data = await getTrack(id);
            setTrackData(data);
            setSearchStatus("success");
        } catch (err) {
            console.error(err);
            setSearchStatus("error");
        }
    }


    return (
        <div>
            <ProfileView
                
                currentCity={appStore.currentCity}
                isSaving={appStore.isLoading}
                onSaveClick={handleSavedACB}

                
                searchResult={trackData}
                searchStatus={searchStatus}
                onSearch={handleTrackSearchACB}
            />
        </div>
    );
}


export default observer(ProfilePresenter);