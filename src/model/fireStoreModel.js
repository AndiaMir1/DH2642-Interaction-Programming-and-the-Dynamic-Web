import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "../../firebaseConfig.js";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const COLLECTION="USER";

export const auth = getAuth(app);

//firebase globally available for testing in console
window.db = db;
window.doc = doc;        
window.setDoc = setDoc;

export function connectToPersistence(model, watchFunction) {
    //sets model.ready to false until data is loaded
    model.ready = false;
    model.user = undefined;

    onAuthStateChanged(auth, function(user) {
        model.user = user;

    if(user) {
    //ref to firestore document where model is stored
    const docRef = doc(db, COLLECTION, user.uid);
            getDoc(docRef).then(
                function getDocACB(snapshot) {
                    //default values:
                    const data = snapshot.data() || {};
                    model.currentCity = data.currentCity ?? null;
                    model.currentUsername = data.username ?? user.displayName ?? "unknown user";
                    model.currentGenre = data.genre ?? null;
                    model.spotifyToken = data.spotifyToken ?? null;
                    model.friends = data.friends || [];
                    model.likedSongs = data.likedSongs || [];
                    model.ready = true;
                    model.exportedPlaylists = data.exportedPlaylists || [];
                    model.currentBio = data.bio ?? null;
                    model.selectedUserUid = data.selectedUserUid ?? null;
                    model.weatherPromiseState ={};

                    model.getWeather(model.currentCity);
                    model.fetchFriendFeed();
            })
        .catch(function getDocErrorACB(err) {
            console.error("error: ", err);
            model.ready = true;
        });
    } else {
        model.spotifyToken = null;
        model.currentCity = null;
        model.currentUsername = null;
        model.currentGenre = null;
        model.friends = [];
        model.likedSongs =[];
        model.exportedPlaylists =[];
        model.currentBio = null;
        model.ready = true;
        model.selectedUserUid = null;
        model.weatherPromiseState ={};

    }
}); 

    function persistSuccessACB() {
        console.log("persisted");
    }

    function persistErrorACB(err) {
        console.error("error saving to Firestore", err);
    }
    //return properties of observed model
    function watchACB() {
        return [model.currentCity,
                model.currentUsername,
                model.currentGenre,
                model.friends,
                model.likedSongs,
                model.exportedPlaylists,
                model.currentBio,
                model.spotifyToken,
                model.selectedUserUid,
            ];

       
    }
    
    // saves model to Firestore when watcherACB results change
    function sideEffectACB() {
        //user imp
        if (model.ready && model.user) {
            const docRef = doc(db, "USER", model.user.uid);
            //only saves if model is ready (data has been loaded)
            setDoc(docRef, {
               currentCity: model.currentCity,
               username: model.currentUsername,
               genre: model.currentGenre,
               friends: model.friends,
               likedSongs: model.likedSongs,
               exportedPlaylists: model.exportedPlaylists,
               bio: model.currentBio,
               spotifyToken: model.spotifyToken,
               selectedUserUid : model.selectedUserUid
            }, { merge : true })
            //handle asynchronous saving
            .then(persistSuccessACB) //success
            .catch(persistErrorACB); //error
}
    }
    
    //install watcher at setup
        watchFunction(watchACB, sideEffectACB);

}
        