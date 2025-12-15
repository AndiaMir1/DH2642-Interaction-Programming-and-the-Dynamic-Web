import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./fireStoreModel.js";
import { fetchWeatherData } from "../apiConfig/weatherSource";
import { getTrack, getArtist } from "../apiConfig/musicSource";
import { searchMusic } from "../apiConfig/musicSource";
import { setDoc, doc } from "firebase/firestore";

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
    user: undefined,
    currentView: "main",
    currentCity: null,
    currentUsername: null,
    weatherPromiseState: {},
    //friends list imp
    selectedUserUid: null,

    spotifyToken: null,

    tracks: [], 
    currentTrackId: null,
    currentArtistId: null,
    searchParams: {},
    currentTrackPromiseState: {},
    currentArtistPromiseState: {},
    spotifyToken: null,
    searchResultsPromiseState: {},

    currentGenre: null,

    //friends list imp
    friends: [],

    setCity(city) {
        this.currentCity = city;
    },

    setUser(user) {
        this.user = user;
        this.isUserLoggedIn = !!user;
    },
    
    setUsername(name) {
       this.currentUsername = name;
    },
    /**ska denna vara här, finns en liknande längre ner ? */
    setSpotifyToken(token) {  // <--- NEW
        this.spotifyToken = token;
    },

    setFriends(friendsArray) {
        this.friends = friendsArray;
    },

    setGenre(genre) {
        this.currentGenre = genre;
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

    addFriend (friendObject) {
        const exists = this.friends.some(function(pal) {
            return pal.uid === friendObject.uid;
        });

        if(!exists) {
            this.friends.push(friendObject);
            this.persistFriends();
        }
    },

    removeFriend (friendUid) {
        function shouldKeepACB(pal) {
            return pal.uid !== friendUid;
        }
        this.friends = this.friends.filter(shouldKeepACB)
        this.persistFriends();
    },

    persistFriends () {
        if (!this.user) return;

        const docRef = doc(db, "USER", this.user.uid);
        const friendsToPersist = this.friends.map(function(friend) {
            return { uid: friend.uid, username: friend.username};
        });

        setDoc(docRef, {friends: friendsToPersist}, {merge : true })
        .then(function persistSuccessACB() {
            console.log("friends list updated");
        })
        .catch(function persistErrorACB(err) {
            console.error("Error updating friends list", err);
        });
    },

    async findUserUidByUsername (username) {
        if(!username) return null;
        
        const userQuery = query(collection(db, "USER"), where("username", "==", username));

            const querySnapshot = await getDocs(userQuery);

            if (querySnapshot.empty) {
                return null;
            }

           const docSnap = querySnapshot.docs[0];
           return {uid: docSnap.id, username: docSnap.data().username };
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
        if (this.currentTrackId && this.spotifyToken) { // <--- CHECK FOR TOKEN
            resolvePromise(getTrack(this.currentTrackId, this.spotifyToken), this.currentTrackPromiseState);
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
