import { getTrack, getArtist, createSpotifyPlaylist, 
    addItemsToPlaylist, getCurrentUser,searchMusic, redirectToSpotifyLogin, getAccessTokenFromCode, addTracksToPlaylist
 } from "../apiConfig/musicSource";
import { fetchFriendFeedForModel, addUserUpdateForModel, findUserUidByUsername } from "../utils/firebaseUtil.js";
import { fetchWeatherData } from "../apiConfig/weatherSource.js";
import { weatherMusic, getWind, getTemperature, getWeatherCategory, getRandomKeyword } from "../utils/weatherUtils.js";
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
    currentPlaylist: null,
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
    
    seenSongIds: new Set(),

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

    async exportLikedSongsToSpotify(playlistName, existingPlaylistId) {
    const token = this.spotifyToken;
    if (!token) throw "LOGIN_REQUIRED";
    if (this.likedSongs.length === 0) throw new Error("No liked songs to export");

    const uris = this.likedSongs.map(s => s.uri);
    
    if (existingPlaylistId) {
        try {
            await addItemsToPlaylist(existingPlaylistId, uris, token);
        } catch (err) {
            throw new Error("Failed to add tracks to existing playlist: " + err.message);
        }

        const found = this.exportedPlaylists.find(p => p.playlistId === existingPlaylistId);
        if (found) {
            found.trackUris = [...new Set([...found.trackUris, ...uris])];
            this.addUserUpdate("PLAYLIST_UPDATE", { playlistId: existingPlaylistId, action: "ADD", trackUris: uris });
        }
        return found || { playlistId: existingPlaylistId, trackUris: uris };
    }

    const finalName = playlistName || this.playlistName;
    if (!finalName || !finalName.trim()) throw new Error("Please provide a playlist name");

    const user = await getCurrentUser(token);
    if (!user?.id) throw new Error("Spotify session invalid");

    let playlist;
    try {
        playlist = await createSpotifyPlaylist(
            user.id,
            finalName.trim(),
            "Songs liked from HCTS",
            true,
            token
        );
    } catch (err) {
        throw new Error("Failed to create playlist: " + err.message);
    }

    try {
        await addTracksToPlaylist(playlist.id, uris, token);
    } catch (err) {
        throw new Error("Failed to add tracks to new playlist: " + err.message);
    }

    const playlistToSave = {
        playlistId: playlist.id,
        name: playlist.name,
        spotifyUrl: playlist.external_urls.spotify,
        trackUris: uris
    };
    this.setExportedPlaylist(playlistToSave);

    return playlistToSave;
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
                
                this.spotifyToken = null;
                localStorage.removeItem('spotifyToken');
                return false;
            }
            return true;
        } catch (error) {
            
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

async searchWeatherSongs(retryCount = 0) {
        
        const weatherData = this.weatherPromiseState.data; 

        if (!weatherData || !this.spotifyToken) {
            console.log("Cannot search: Missing weather or token");
            return;
        }

        const conditionId = weatherData.weather[0].id;
        const temp = weatherData.main.temp;
        const windSpeed = weatherData.wind.speed;

        if (!this.recentQueries) {
            this.recentQueries = [];
        }

        
        let query = getRandomKeyword(conditionId, temp, windSpeed);
        
        
        let attempts = 0;
        while (this.recentQueries.includes(query) && attempts < 10) {
            query = getRandomKeyword(conditionId, temp, windSpeed);
            attempts++;
        }

        this.recentQueries.push(query);
        if (this.recentQueries.length > 5) {
            this.recentQueries.shift();
        }

        const randomOffset = Math.floor(Math.random() * 100);

        try {
            const tracks = await searchMusic(query, this.spotifyToken, randomOffset);
            
            if (tracks && tracks.length > 0) {
                
                
                let uniqueTracks = tracks.filter(track => !this.seenSongIds.has(track.id));

                
                if (uniqueTracks.length < 5) {
                    
                    
                    if (retryCount < 5) { 
                        return this.searchWeatherSongs(retryCount + 1);
                    }
                    
                    
                    
                    this.seenSongIds.clear(); 
                    uniqueTracks = tracks; 
                }

                
                const top5Songs = uniqueTracks.slice(0, 5);

                
                top5Songs.forEach(track => this.seenSongIds.add(track.id));

                this.searchResultsPromiseState = {
                    promise: Promise.resolve(top5Songs),
                    data: { tracks: { items: top5Songs } }, 
                    error: null
                };
            }
        } catch (error) {
            console.error("Search error:", error);
            this.searchResultsPromiseState = { promise: null, data: null, error: error };
        }
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
        console.log("varför");
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

    setSelectedUserUid(uid) {
        this.selectedUserUid = uid;
    },

    async searchUser(username) {
        const userData = await findUserUidByUsername(username);
        return userData;
    },
    /******************************************FIREBASE***************************************************** */
    fetchFriendFeed() {
        fetchFriendFeedForModel(this);
    },

    addUserUpdate(type, payload) {
        addUserUpdateForModel(this, type, payload);
    },

    //test
setCurrentPlaylist(playlistId) {
    var playlist = null;
    for (var i = 0; i < this.exportedPlaylists.length; i++) {
        if (this.exportedPlaylists[i].playlistId === playlistId) {
            playlist = this.exportedPlaylists[i];
            break;
        }
    }
    this.currentPlaylist = playlist || null;
},

closeCurrentPlaylist () {
    this.currentPlaylist = null;
}
    

};
