import { fetchWeatherData } from "../apiConfig/weatherSource";
import { getTrack, getArtist } from "../apiConfig/musicSource";
import { searchMusic } from "../apiConfig/musicSource";
import { runInAction } from "mobx";

function resolvePromise(promise, stateObject) {
    runInAction(function initPromiseACB() {
    stateObject.promise = promise;
    stateObject.data = null;
    stateObject.error = null;
    });

    promise
        .then(function promiseReolvedACB(data) {
            runInAction(function resolvedACB() {
            if (stateObject.promise === promise) {
                stateObject.data = data;
                stateObject.error = null;
            }
            });
        })
        .catch(function promiseRejectedACB (error) {
            runInAction(function rejectedACB() {
            if (stateObject.promise === promise) {
                stateObject.data = null;
                stateObject.error = error;
                }
            });
        });
}

export const rootModel = {

    isUserLoggedIn: true,
    user: undefined,
    currentView: "main",
    currentCity: undefined,
    //username: null,
    weatherPromiseState: {},

    tracks: [], 
    currentTrackId: null,
    currentArtistId: null,
    searchParams: {},
    currentTrackPromiseState: {},
    currentArtistPromiseState: {},
    spotifyToken: null,
    searchResultsPromiseState: {},

    //friends list imp
    friends: [],

    setCity(city) {
        this.currentCity = city;
    },

    setUser(user) {
        this.user = user;
        this.isUserLoggedIn = !!user;
    },

    userName() {
        return this.user?.displayName || "";
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

    // friends list imp
    setFriends(friendsArray) {
        this.friends = friendsArray;
    },

    addFriend (friendUid) {
        if (this.friends.indexOf(friendUid) === -1) {
            this.friends = [...this.friends, friendUid];
            this.persistFriends()
        }
    },        


    removeFriend (friendUid) {
        function shouldKeepACB(uid) {
            return uid !== friendUid;
        }
        this.friends = this.friends.filter(shouldKeepACB)
        this.persistFriends();
    },

    persistFriends () {
        if (!this.user) return;
        const docRef = doc(db, "USER", this.user.uid);
        setDoc(docRef, {friends: this.friends}, {merge : true })
        .then(function persistSuccessACB() {
            console.log("friends list updated");
        })
        .catch(function persistErrorACB(err) {
            console.error("Error updating friends list", err);
        });
    },

    getWeather(city) {
        if (!city) {
            console.warn("City is not chosen");
            return;
        }
        resolvePromise(fetchWeatherData(city), this.weatherPromiseState);
    },

    

    setSpotifyToken: function (token) {
        this.spotifyToken = token;
    },

    doMusicSearch: function (query) {
        resolvePromise(
            searchMusic(query),
            this.searchResultsPromiseState
        );
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
