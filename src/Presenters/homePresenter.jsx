import {TestLayout} from "/src/Views/homeLayoutView.jsx";
import { observer } from "mobx-react-lite";
import {SuspenseView} from "/src/Views/suspenseView.jsx";
import {RecommendedSongsView} from "/src/Views/RecommendedSongsView.jsx";
import WeatherView from "/src/Views/weatherView.jsx";
import { GetSongsView } from "/src/Views/getSongsView.jsx"
import { useState, useEffect } from "react";

const Home = observer(
    function HomeRender(props){
        const searchPromiseState = props.model.searchResultsPromiseState
        const [isLiked, setIsLiked] = useState(false);
        const [isTokenValid, setIsTokenValid] = useState(false);
        const searchResults = props.model.searchResultsPromiseState.data || [];
        const searchError = props.model.searchResultsPromiseState.error;
        const weatherPromiseState = props.model.weatherPromiseState;
        const currentCity = props.model.currentCity;
        const spotifyToken = props.model.spotifyToken;
        const weatherData = props.model.weatherPromiseState.data;
        let searchWord = {};

        useEffect(() => {
            async function validateToken() {
                if (spotifyToken) {
                    try {
                        const isValid = await props.model.validateSpotifyToken();
                        setIsTokenValid(isValid);
                    } catch (error) {
                        setIsTokenValid(false);
                        handleTokenInvalidACB();
                    }
                } else {
                    setIsTokenValid(false);
                }
            }
            validateToken();
        }, [spotifyToken]);
        
        function handleRecommendSongsACB(){
            if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
                searchWord = props.model.getMusicRecommendations({
                    conditionId: weatherData.weather[0].id,
                    temp: weatherData.main.temp,
                    windSpeed: weatherData.wind.speed
                });
            }
                if (!spotifyToken) {
                    alert("You need to log in below first!");
                    return;
                }

            props.model.doMusicSearch(searchWord);  
        }

        function handleSpotifyLoginACB(){
            props.model.spotifyLogin();
        }

        function handleTokenInvalidACB(){
            props.model.setSpotifyToken(null);
            localStorage.removeItem('spotifyToken');
        }

        function handleLikedSong(track){
             setIsLiked(!isLiked);
            props.model.setLikedSong(track)
        }

        function handleExportPlaylistACB(playlistName) {
            return props.model.exportLikedSongsToSpotify(playlistName);
        }
        
        if (!weatherData || weatherPromiseState.promise && !weatherPromiseState.data){
            return <SuspenseView 
                promise={weatherPromiseState.promise} 
                error={weatherPromiseState.error}/>
        }
        
       if (searchPromiseState.promise && !searchPromiseState.data && !searchPromiseState.error) {
        return <SuspenseView 
            promise={searchPromiseState.promise} 
            error={searchPromiseState.error}/>;
}

        return (<TestLayout
                    weather={
                        <WeatherView weatherData = {weatherData}
                                    currentCity = {currentCity}
                                
                    />}
                    recommended={
                        <RecommendedSongsView 
                            likedSongs={props.model.likedSongs}
                            onRemoveLikedSong={function(trackId) { props.model.setRemoveSong(trackId); }}
                            onExportPlaylist={handleExportPlaylistACB}
                        />}
                    getSong={
                        <GetSongsView
                            onRecommendSongs={handleRecommendSongsACB}
                            spotifyToken={spotifyToken}
                            isTokenValid={isTokenValid}
                            onSpotifyLogin={handleSpotifyLoginACB}
                            onTokenInvalid={handleTokenInvalidACB}
                            searchError={searchError}
                            searchResults={searchResults}
                            likedSongs={props.model.likedSongs}
                            onLikeSong={handleLikedSong}
                            isLiked={isLiked}
                        />
                    }
                />);
    }
);

export {Home}