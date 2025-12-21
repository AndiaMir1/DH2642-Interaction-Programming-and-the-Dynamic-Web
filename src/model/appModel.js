import { getTrack, getArtist, createSpotifyPlaylist, 
    addTracksToPlaylist, getCurrentUser,searchMusic, redirectToSpotifyLogin, getAccessTokenFromCode
 } from "../apiConfig/musicSource";
import { fetchFriendFeedForModel, addUserUpdateForModel, findUserUidByUsername } from "../utils/firebaseUtil.js";
import { fetchWeatherData } from "../apiConfig/weatherSource.js";
import { weatherMusic, getWind, getTemperature, getWeatherCategory } from "../utils/weatherUtils.js";
//import { runInAction } from "mobx";
import {resolvePromise} from "/src/resolvePromise.js";

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
        var token = this.spotifyToken ;

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

    async validateSpotifyToken() {
        if (!this.spotifyToken) {
            return false;
        }
        
        try {
            const user = await getCurrentUser(this.spotifyToken);
            if (!user) {
                // Token is invalid, clear it
                this.spotifyToken = null;
                localStorage.removeItem('spotifyToken');
                return false;
            }
            return true;
        } catch (error) {
            // Token is invalid, clear it
            this.spotifyToken = null;
            localStorage.removeItem('spotifyToken');
            return false;
        }
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


    /*******************************************USER************************************************/
    setUser(user) {
        this.user = user;
        this.isUserLoggedIn = !!user;
    },
    
    async setUsername(name) {
       this.currentUsername = name;
        this.addUserUpdate("NAME_CHANGE", {name : name});

    },

    async searchUser(username) {
        const userData = await findUserUidByUsername(username);
        return userData;
    },
    
    setBio(bio) {
        this.currentBio = bio
        this.addUserUpdate("BIO_CHANGE",{bio : bio});
    },
    /******************************************FIREBASE***************************************************** */
    fetchFriendFeed() {
        fetchFriendFeedForModel(this);
    },

    addUserUpdate(type, payload) {
        addUserUpdateForModel(this, type, payload);
    }
    

};
