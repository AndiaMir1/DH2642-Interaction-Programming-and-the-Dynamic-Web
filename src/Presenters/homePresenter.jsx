import {TestLayout} from "/src/Views/homeLayoutView.jsx";
import { observer } from "mobx-react-lite";
import {SuspenseView} from "/src/Views/suspenseView.jsx";
import {RecommendedSongsView} from "/src/Views/RecommendedSongsView.jsx";
import WeatherView from "/src/Views/weatherView.jsx";
const Home = observer(
    function HomeRender(props){
        const searchResults = props.model.searchResultsPromiseState.data || [];
        const weatherPromiseState = props.model.weatherPromiseState;
        const currentCity = props.model.currentCity;

        const weatherData = props.model.weatherPromiseState.data;
        let recommendedArtist = {};

        if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
            recommendedArtist = props.model.getMusicRecommendations({
                conditionId: weatherData.weather[0].id,
                temp: weatherData.main.temp,
                windSpeed: weatherData.wind.speed
            });
        }

        function handleSearchMusicACB(query) {
            props.model.doMusicSearch(query);
        }

        

         if(weatherData){
            return (<TestLayout
                    weather={
                    <WeatherView weatherData = {weatherData}
                                 currentCity = {currentCity}
                              
                    />}
                    recommended={
                    <RecommendedSongsView 
                        recommendedArtist={recommendedArtist}
                        onSearchMusic={handleSearchMusicACB}
                        searchResults={searchResults}
                        likedSongs={props.model.likedSongs}
                        onLikeSong={function(track) { props.model.setLikedSong(track); }}
                        onRemoveLikedSong={function(trackId) { props.model.setRemoveSong(trackId); }}
                    />}
                    
                />);
        }
        return <SuspenseView promise={weatherPromiseState.promise}
                                error={weatherPromiseState.error} />;
                  
    }
);

export {Home}