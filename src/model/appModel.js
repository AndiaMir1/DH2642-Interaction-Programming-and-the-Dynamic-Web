import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./fireStoreModel.js";
import { getTrack, getArtist, createSpotifyPlaylist, 
    addTracksToPlaylist, getCurrentUser,searchMusic, redirectToSpotifyLogin, getAccessTokenFromCode
 } from "../apiConfig/musicSource";
import { fetchWeatherData } from "../apiConfig/weatherSource.js";
import { addDoc, serverTimestamp, orderBy, limit, onSnapshot } from "firebase/firestore";
import { weatherMusic, getWind, getTemperature, getWeatherCategory } from "../utils/weatherUtils.js"
import { runInAction } from "mobx";
import {resolvePromise} from "/src/resolvePromise.js"

export const rootModel = {

    isUserLoggedIn: true,
    user: undefined,
    selectedUserUid: null,

    currentUsername: null,
    currentBio: null,
    currentCity: null,
    weatherPromiseState: {},
    currentGenre: null,
    
    playlistName: null,
    exportedPlaylists: [],
    tracks: [], 
    likedSongs: [],
    currentTrackId: null,
    currentArtistId: null,

    searchParams: {},
    accessTokenFromCodePromiseState: {},
    spotifyLoginPromiseState: {},
    currentTrackPromiseState: {},
    currentArtistPromiseState: {},
    spotifyToken: null,
    searchResultsPromiseState: {},
    
    friends: [],
    friendFeed: [],

    setSearchQuery(query) {
        this.searchParams.query = query;
    },

    setSearchType(type) {
        this.searchParams.type = type;
    },

    /**************************MUSIC*************************************/
    spotifyLogin(){
        resolvePromise(redirectToSpotifyLogin(), this.spotifyLoginPromiseState);
    },

    spotifyAcces(code){
        resolvePromise(getAccessTokenFromCode(code), this.accessTokenFromCodePromiseState);
    },

    getMusicRecommendations(weatherData){
        const category = getWeatherCategory(weatherData.conditionId);
        const temp = getTemperature(weatherData.temp);
        const wind = getWind(weatherData.windSpeed);

        const features = weatherMusic?.[category]?.[temp]?.[wind];
        
        if (Array.isArray(features) && features.length > 0) {
            
            const shuffled = [...features].sort (() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 3);
            const alphabet = "abcdefghijklmnopqrstuvwxyz";
            const randomChar= alphabet.charAt(Math.floor(Math.random() * alphabet.length));

            return "(" + selected.join(" OR ") + ")" + randomChar;
        }

        return features || ""; 

    },
     setGenre(genre) {
        this.currentGenre = genre;
        this.addUserUpdate("GENRE_CHANGE",{genre : genre});
    },
// playlist save imp

    setExportedPlaylist(playlist) {
        var exists = this.exportedPlaylists.some(function(p) {
            return p.playlistId === playlist.playlistId;
        });

         if (exists) return;
          const newEntry = {
        playlistId: playlist.playlistId,
        name: playlist.name,
        spotifyUrl: playlist.spotifyUrl,
        trackUris: playlist.trackUris || []
    };
        this.exportedPlaylists = this.exportedPlaylists.concat([newEntry]);
        this.addUserUpdate("PLAYLIST_EXPORT",{playlistName : playlist.name});
    },
    
    setCurrentTrackId(trackId) {
        this.currentTrackId = trackId;
    },


    setCurrentArtistId(artistId) {
        this.currentArtistId = artistId;
    },

    setPlaylistName(listName) {
        this.playlistName = listName;
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

    async exportLikedSongsToSpotify (playlistName) {
        var token = this.spotifyToken || localStorage.getItem("spotifyToken");

        if (!token) {
            throw "LOGIN_REQUIRED";
        }

        if (this.likedSongs.length === 0) {
            throw new Error ("no liked songs to export");
        }

        var user = await getCurrentUser(token);

        if (!user || !user.id) {
            throw new Error("Spotfiy session invalid");
        }
        var playlist = await createSpotifyPlaylist (
            user.id,
            playlistName,
            "songs liked from HCTS",
            true,
            token
        );

        var uris = this.likedSongs.map(function(song) {
            return song.uri;
        });

        await addTracksToPlaylist(playlist.id, uris, token);
        const playlistToSave = {
            playlistId: playlist.id,
            name: playlist.name,
            spotifyUrl: playlist.external_urls.spotify,
            trackUris: uris
        };
        this.setExportedPlaylist(playlistToSave);
            
        return playlist;
    },


    setLikedSong(track){
        function sameSongCB(song){
            return song.id === track.id
            }

             if (this.likedSongs.some(sameSongCB)){

            this.likedSongs= this.likedSongs.filter(function(song) {
            return song.id !== track.id;
            });}
            
            else {
            this.likedSongs= [...this.likedSongs, track]
            this.addUserUpdate("LIKED_SONG",{track : track.name});
            }

        },

    setRemoveSong(trackId) {
        this.likedSongs = this.likedSongs.filter(function(song) {
            return song.id !== trackId;
        });
    }, 

    setSpotifyToken(token) {
        this.spotifyToken = token;
    },

    doMusicSearch(query) {
        resolvePromise(
            searchMusic(query, this.spotifyToken),
            this.searchResultsPromiseState
        );
    },

    currentTrackEffect() {
        if (this.currentTrackId && this.spotifyToken) { 
            resolvePromise(getTrack(this.currentTrackId, this.spotifyToken), this.currentTrackPromiseState);
        } else {
            this.currentTrackPromiseState = {};
        }
    },

    //används inte
    currentArtistEffect() {
        if (this.currentArtistId) {
            resolvePromise(getArtist(this.currentArtistId), this.currentArtistPromiseState);
        } else {
            this.currentArtistPromiseState = {};
        }
    },

    //Används inte just nu
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

    /************************WEATHER******************************************/
    setCity(city) {
        this.currentCity = city;
        //feed imp
        this.addUserUpdate("CITY_CHANGE", {city : city});
        this.fetchFriendFeed();
    },
    
    getWeather(city) {
        if (!city) {
            console.warn("City is not chosen");
            return;
        }
        resolvePromise(fetchWeatherData(city), this.weatherPromiseState);
    },

    /***************************FRIENDS*********************************************/
     setFriends(friendsArray) {
        this.friends = friendsArray;
    },

    addFriend (friendObject) {
        if(!this.user) return;
        if (friendObject.uid === this.user.uid) {
            return {ok: false, reason: "SELF"};
        }
        const exists = this.friends.some(function(pal) {
            return pal.uid === friendObject.uid;
        });

        if(exists) {
            return {ok: false, reason: "EXISTS"};
        }
        this.friends = this.friends.concat([friendObject]);
        return {ok: true};  
    },

    removeFriend (friendUid) {
        function shouldKeepACB(pal) {
            return pal.uid !== friendUid;
        }
        this.friends = this.friends.filter(shouldKeepACB)
    },

    fetchFriendFeed() {
    var model = this;

    if (!model.user || model.friends.length === 0) {
        runInAction(function() {  
            model.friendFeed = [];
        });
        return;
    }

    model.friends.forEach(function(friend) {
        var updatesRef = collection(db, "USER", friend.uid, "updates");
        var q = query(updatesRef, orderBy("timestamp", "desc"), limit(200));

        onSnapshot(q, function(snapshot) {
            var updates = snapshot.docs.map(function(docSnap) {
                return {
                    id: docSnap.id,
                    user: friend.username || friend.username,
                    uid: friend.uid,
                    type: docSnap.data().type,
                    payload: docSnap.data().payload,
                    timestamp: docSnap.data().timestamp,
                };


            });
            runInAction(function() { 
            var otherUpdates = model.friendFeed.filter(function(u) {
                return u.uid !== friend.uid;
            });

                model.friendFeed = otherUpdates.concat(updates);
                model.friendFeed.sort(function(a,b) {
                    return (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0);
                });
            });
        });
    });
},

    /******************************USER************************************************/
    setUser(user) {
        this.user = user;
        this.isUserLoggedIn = !!user;
    },
    
    setUsername(name) {
       this.currentUsername = name;
        this.addUserUpdate("NAME_CHANGE", {name : name});

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
    
    setBio(bio) {
        this.currentBio = bio
        this.addUserUpdate("BIO_CHANGE",{bio : bio});
    },

    addUserUpdate(type, payload) {
        if(!this.user) return;

        var updatesRef = collection(db, "USER", this.user.uid, "updates");

        addDoc(updatesRef, {
            type: type,
            payload: payload,
            username: this.currentUsername,
            uid: this.user.uid,
            timestamp: serverTimestamp()
        });
    },
    

};
