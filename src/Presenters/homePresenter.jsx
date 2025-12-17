import { observer } from "mobx-react-lite";
import {HomeView} from "/src/Views/HomeView.jsx";
import {RecommendedSongsView} from "/src/Views/RecommendedSongsView.jsx";
const Home = observer(
    function HomeRender(props){
        const searchResults = props.model.searchResultsPromiseState.data || [];
        const weatherData = props.model.weatherPromiseState.data;
        //const playedTrackIds = props.model.playedTrackIds;
        
        var audioFeatures = {};
        if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
            audioFeatures = props.model.getMusicRecommendations({
                conditionId: weatherData.weather[0].id,
                temp: weatherData.main.temp,
                windSpeed: weatherData.wind.speed
            });
        }

        function handleSearchMusicACB(query) {
            props.model.doMusicSearch(query);
        }

        return (<div>
                    <HomeView weatherData = {weatherData}
                              
                    />
                    <RecommendedSongsView recommendedAudioFeatures={audioFeatures}
                                          onSearchMusic={handleSearchMusicACB}
                                          searchResults={searchResults}

                    />
                </div>);
    }
);

export {Home}