import {HomeLayout} from "/src/Views/homeLayoutView.jsx";
import { observer } from "mobx-react-lite";
import {SuspenseView} from "/src/Views/suspenseView.jsx";
import {RecommendedSongsView} from "/src/Views/RecommendedSongsView.jsx";
import WeatherView from "/src/Views/weatherView.jsx";
import { GetSongsView } from "/src/Views/getSongsView.jsx"
import { useState } from "react";

const Home = observer(
    function HomeRender(props){
        const searchPromiseState = props.model.searchResultsPromiseState
        const [isLiked, setIsLiked] = useState(false);
        const searchError = props.model.searchResultsPromiseState.error;
        const weatherPromiseState = props.model.weatherPromiseState;
        const currentCity = props.model.weatherPromiseState.data?.name ?? props.model.currentCity;
        const spotifyToken = props.model.spotifyToken;
        const weatherData = props.model.weatherPromiseState.data;
        const cityError = !props.model.currentCity || weatherPromiseState.error;

        function handleSpotifyLoginACB(){
            props.model.spotifyLogin();
        }

        function handleLikedSong(track){
             setIsLiked(!isLiked);
            props.model.setLikedSong(track)
        }

        function handleExportPlaylistACB(playlistName, existingPlaylistId) {
            return props.model.exportLikedSongsToSpotify(playlistName, existingPlaylistId);
        }
        
        if (weatherPromiseState.promise && !weatherPromiseState.data && !weatherPromiseState.error){
            return <SuspenseView 
                promise={weatherPromiseState.promise} 
                error={weatherPromiseState.error}/>
        }
        
       if (searchPromiseState.promise && !searchPromiseState.data && !searchPromiseState.error) {
        return <SuspenseView 
            promise={searchPromiseState.promise} 
            error={searchPromiseState.error}/>;
}

        return (<HomeLayout
                    weather={
                        <WeatherView weatherData = {weatherData}
                                    currentCity = {currentCity}
                                
                    />}
                    recommended={
                        <RecommendedSongsView 
                        weatherSongs={
                            props.model.searchResultsPromiseState.data
                            ? props.model.searchResultsPromiseState.data.tracks.items
                            : []
                        }
                        onRefresh={() => props.model.searchWeatherSongs()}
                        onSetLikedSong={(track) => props.model.setLikedSong(track)}
                        weatherCondition={
                            props.model.weatherPromiseState.data
                            ? props.model.weatherPromiseState.data.conditionId
                            : "Current Weather"
                        }
                            likedSongs={props.model.likedSongs}
                            onRemoveLikedSong={function(trackId) { props.model.setRemoveSong(trackId); }}
                            onClearAllSongs={() => props.model.setClearLikedSongs()}
                            onExportPlaylist={handleExportPlaylistACB}
                            existingPlaylists={props.model.exportedPlaylists}
                        />}
                    getSong={
                        <GetSongsView
                            
                            onRecommendSongs={() => props.model.searchWeatherSongs()}
                            searchResults={
                                props.model.searchResultsPromiseState.data && props.model.searchResultsPromiseState.data.tracks
                                ? props.model.searchResultsPromiseState.data.tracks.items
                                : []
                            }
                            spotifyToken={spotifyToken}
                            onSpotifyLogin={handleSpotifyLoginACB}
                            weatherError={props.model.weatherPromiseState.error}
                            cityError={cityError}
                            likedSongs={props.model.likedSongs}
                            onLikeSong={handleLikedSong}
                            isLiked={isLiked}
                        />
                    }
                />);
                  
    }
);

export {Home}