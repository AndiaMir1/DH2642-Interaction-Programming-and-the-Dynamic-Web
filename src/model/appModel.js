import { fetchWeatherData } from "../apiConfig/weatherSource";
import { getTrack, getArtist } from "../apiConfig/musicSource";

function resolvePromise(promise, stateObject) {
    stateObject.promise = promise;
    stateObject.data = null;
    stateObject.error = null;

    promise
        .then(function(data) {
            if (stateObject.promise === promise) {
                stateObject.data = data;
                stateObject.error = null;
            }
        })
        .catch(function(error) {
            if (stateObject.promise === promise) {
                stateObject.data = null;
                stateObject.error = error;
            }
        });
}

export const rootModel = {

    isUserLoggedIn: true,
    user: true,
    currentView: "main",

    currentCity: null,
    weatherPromiseState: {},

    tracks: [], 
    currentTrackId: null,
    currentArtistId: null,
    searchParams: {},
    searchResultsPromiseState: {},
    currentTrackPromiseState: {},
    currentArtistPromiseState: {},

    setCity(city) {
        this.currentCity = city;
    },

    setUser(user) {
        this.user = user;
        this.isUserLoggedIn = !!user;
    },

    setCurrentTrackId(trackId) {
        this.currentTrackId = trackId;
    },

    setCurrentArtistId(artistId) {
        this.currentArtistId = artistId;
    },

    addToTracks(trackToAdd) {
        this.tracks = [...this.tracks, trackToAdd];
    },

    removeFromTracks(trackToRemove) {
        function shouldWeKeepTrackCB(track) {
            return trackToRemove.id !== track.id;
        }
        this.tracks = this.tracks.filter(shouldWeKeepTrackCB);
    },

    setSearchQuery(query) {
        this.searchParams.query = query;
    },

    setSearchType(type) {
        this.searchParams.type = type;
    },

    getWeather(city) {
        if (!city) {
            console.warn("City is not chosen");
            return;
        }
        resolvePromise(fetchWeatherData(city), this.weatherPromiseState);
    },

    doMusicSearch(params) {
        console.log("Music search not implemented yet", params);

    },

    currentTrackEffect() {
        if (this.currentTrackId) {
            resolvePromise(getTrack(this.currentTrackId), this.currentTrackPromiseState);
        } else {
            this.currentTrackPromiseState = {};
        }
    },

    currentArtistEffect() {
        if (this.currentArtistId) {
            resolvePromise(getArtist(this.currentArtistId), this.currentArtistPromiseState);
        } else {
            this.currentArtistPromiseState = {};
        }
    }
};
