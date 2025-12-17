import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./fireStoreModel.js";
import { fetchWeatherData } from "../apiConfig/weatherSource";
import { getTrack, getArtist, createSpotifyPlaylist, 
    addTracksToPlaylist, getCurrentUser,searchMusic, 
    getRecommendedSongsByAudioFeature
 } from "../apiConfig/musicSource";
import { setDoc, doc, addDoc, serverTimestamp, orderBy, limit } from "firebase/firestore";
import { weatherMusic, getWind, getTemperature, getWeatherCategory } from "../utils/weatherUtils.js"

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


    tracks: [], 
    likedSongs: [],
    currentTrackId: null,
    currentArtistId: null,
    searchParams: {},
    currentTrackPromiseState: {},
    currentArtistPromiseState: {},
    spotifyToken: null,
    searchResultsPromiseState: {},

    currentGenre: null,

    // song imp
    //playedTrackIds: [],

    //friends list imp
    friends: [],
    // feed imp
    friendFeed: [],

    getMusicRecommendations(weatherData){
         const category = getWeatherCategory(weatherData.conditionId);
         const temp = getTemperature(weatherData.temp);
         const wind = getWind(weatherData.windSpeed);

         const features = weatherMusic?.[category]?.[temp]?.[wind];
         
        return features || { energy: 0.5, tempo: 100}; 

    },

        /*

        var category = getWeatherCategory(weatherData.condition.Id);
        var temp = getTemperature(weatherData.temp);
        var wind = getWind(weatherData.windSpeed);

        if (
            weatherMusic[category] &&
            weatherMusic[category][temp] &&
            weatherMusic[category][temp][wind]
        ) {
            return weatherMusic[category][temp][wind];
        }
        //defaults
        return { energ7: 0.5, tempo: 100};
        */

    setCity(city) {
        this.currentCity = city;
        //feed imp
        this.addUserUpdate("CITY_CHANGE", {city : city});
    },

    setUser(user) {
        this.user = user;
        this.isUserLoggedIn = !!user;
    },
    
    setUsername(name) {
       this.currentUsername = name;
    },

    setFriends(friendsArray) {
        this.friends = friendsArray;
    },

    setGenre(genre) {
        this.currentGenre = genre;
        this.addUserUpdate("GENRE_CHANGE",{genre : genre});
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
            this.friends = this.friends.concat([friendObject]);
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

    //feed imp

    addUserUpdate(type, payload) {
        if(!this.user) return;

        var updatesRef = collection(db, "USER", this.user.uid, "updates");

        addDoc(updatesRef, {
            type: type,
            payload: payload,
            timestamp: serverTimestamp()
        })
    },

    async fetchRecommendedSongs() {
        if(!this.spotifyToken) {
            console.warn("Spotify token missing");
            return;
        }

        const audioFeatures = this.getMusicRecommendations({
            conditionId: this.weatherPromiseState.data?.weather?.[0].id, 
            temp: this.weatherPromiseState.data?.main?.temp,
            windSpeed: this.weatherPromiseState.data?.wind?.speed
        });

        try {
            const tracks = await getRecommendedSongsByAudioFeature(this.spotifyToken, audioFeatures)
            this.tracks = tracks;
        } catch (err) {
            console.error("failed", err);
        }
    },

    fetchFriendFeed () {
        var model = this;

        if (!model.user || model.friends.length === 0) {
            model.friendFeed = [];
            return;
        }
        model.friendFeed = [];

        var promises = model.friends.map(function(friend) {
            var updatesRef = collection(db, "USER", friend.uid, "updates");
            var q = query(updatesRef, orderBy("timestamp", "desc"), limit(200));

            return getDocs(q).then(function(snapshot) {
                return snapshot.docs.map(function(docSnap) {
                    return {
                        id: docSnap.id,
                        user: friend.username,
                        uid: friend.uid,
                        type: docSnap.data().type,
                        payload: docSnap.data().timestamp
                    };
                });
            });
        });

        Promise.all(promises)
        .then(function(results) {
            var merged = [];
            results.forEach(function(arr) {
                merged.push.apply(merged, arr);
            });

            model.friendFeed = merged;

            merged.sort(function(a, b) {
                return b.timestamp?.seconds - a.timestamp?.seconds;
            })
            .catch(function(err) {
                console.error ("failed to fetch friend feed", err);
            });
        })

    },


    // song imp
    storePlayedTracks (tracks) {
        var model = this;

        tracks.forEach(function (track) {
            if (track && track.id) {
                if(model.playedTrackIds.indexOf(track.id) === -1) {
                    model.playedTrackIds.push(track.id);
                }
            }
        });

    },


    setLikedSong(track) {
        const exists = this.likedSongs.some(function(song) {
            return song.id === track.id;
        });

        if (exists) return;

        this.likedSongs = this.likedSongs.concat([{
            id: track.id,
            uri: track.uri,
            name: track.name,
            artist: track.artists[0].name,
            image: track.album.images[0]?.url
        }]);
    },

    setRemoveSong(trackId) {
        this.likedSongs = this.likedSongs.filter(function(song) {
            return song.id !== trackId;
        });
    },

    async exportLikedSongsToSpotify () {
        var token = this.spotifyToken || localStorage.getItem("spotifyToken");

        if (!token) {
            throw new Error("Spotify login required");
        }

        if (this.likedSongs.length === 0) {
            throw new Error ("no liked songs to export");
        }

        var user = await getCurrentUser(token);
        var playlist = await createSpotifyPlaylist (
            user.id,
            "playlist",
            "songs liked from HCTS",
            true,
            token
        );

        var uris = this.likedSongs.map(function(song) {
            return song.uri;
        });

        await addTracksToPlaylist(playlist.id, uris, token);
        return playlist;
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
            searchMusic(query, this.spotifyToken),
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
