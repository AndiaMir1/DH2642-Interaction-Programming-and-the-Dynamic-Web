import {TestLayout} from "/src/Views/homeLayoutView.jsx";
import { observer } from "mobx-react-lite";
import {SuspenseView} from "/src/Views/suspenseView.jsx";
import {RecommendedSongsView} from "/src/Views/RecommendedSongsView.jsx";
import WeatherView from "/src/Views/weatherView.jsx";
import { GetSongsView } from "/src/Views/getSongsView.jsx"

const Home = observer(
    function HomeRender(props){
        const searchResults = props.model.searchResultsPromiseState.data || [];
        const searchError = props.model.searchResultsPromiseState.error;
        const weatherPromiseState = props.model.weatherPromiseState;
        const currentCity = props.model.currentCity;
        const spotifyToken = props.model.spotifyToken;
        const weatherData = props.model.weatherPromiseState.data;
        let searchWord = {};
        
        function handleReccomendSongsACB(){
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
        
         if(weatherData && weatherData.weather && weatherData.weather.length > 0){
            return (<TestLayout
                    weather={
                        <WeatherView weatherData = {weatherData}
                                    currentCity = {currentCity}
                                
                    />}
                    recommended={
                        <RecommendedSongsView 
                            likedSongs={props.model.likedSongs}
                            onRemoveLikedSong={function(trackId) { props.model.setRemoveSong(trackId); }}
                        />}
                    getSong={
                        <GetSongsView
                            onRecommendSongs={handleReccomendSongsACB}
                            spotifyToken={spotifyToken}
                            onSpotifyLogin={handleSpotifyLoginACB}
                            searchError={searchError}
                            searchResults={searchResults}
                            likedSongs={props.model.likedSongs}
                            onLikeSong={function(track) { props.model.setLikedSong(track); }}
                            onRemoveLikedSong={function(trackId) { props.model.setRemoveSong(trackId); }}
                        />
                    }
                />);

        }
         <SuspenseView promise={weatherPromiseState.promise}
                                error={weatherPromiseState.error} />;
                  
    }
);

export {Home}