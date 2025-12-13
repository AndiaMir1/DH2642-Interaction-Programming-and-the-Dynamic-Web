import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "../../firebaseConfig.js";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// uncomment the following lines when you have your firebaseConfig. Understand what the lines are doing!
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const COLLECTION="USER";
//user imp
export const auth = getAuth(app);

//firebase globally available for testing in console
window.db = db;
window.doc = doc;        
window.setDoc = setDoc;

export function connectToPersistence(model, watchFunction) {
    //sets model.ready to false until data is loaded
    model.ready = false;
    //user imp
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
                    model.currentCity = data.currentCity;
                   
                    model.getWeather(model.currentCity);
        
                    model.ready = true;
            })
        .catch(function getDocErrorACB(err) {
            console.error("error: ", err);
            model.ready = true;
        });
    } else {
        currentCity = null;
        model.ready = true;
        //favoriteGenre=null;
        //likedSongs =[];
        //likedArtist =[];
        //producedPlaylists = [];
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
        return model.currentCity;
        //favorite genre
        //liked songs
        //produced playlists
        //liked artists
    }
    
    // saves model to Firestore when watcherACB results change
    function sideEffectACB() {
        //user imp
        if (model.ready && model.user) {
            const docRef = doc(db, "USER", model.user.uid);
            //only saves if model is ready (data has been loaded)
            setDoc(docRef, {
               currentCity: model.currentCity
            }, {merge : true })
            //handle asynchronous saving
            .then(persistSuccessACB) //success
            .catch(persistErrorACB); //error
}
    }

     
    //install watcher at setup
        watchFunction(watchACB, sideEffectACB);

}
        