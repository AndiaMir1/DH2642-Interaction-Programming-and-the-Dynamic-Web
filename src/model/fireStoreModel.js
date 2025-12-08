import { initializeApp } from "firebase/app";
//import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "../../firebaseConfig.js";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";


const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const COLLECTION_USERS = "USERS";
const theDoc = doc(database, COLLECTION_USERS, "userData");

export function connectToPersistence(model, watchFunction){
    model.ready = false;

    getDoc(theDoc).then(loadACB).catch(catchErrorACB);

    function loadACB(snapshot){
        
        const dataFromCloud = snapshot.data() || {};
        if (dataFromCloud.currentCity !== undefined){
            model.currentCity = dataFromCloud.currentCity;
        }
            else {
                model.currentCity = null
            }
         if (dataFromCloud.weatherData !== undefined){
            model.weatherData = dataFromCloud.weatherData;
        }
            else {
                model.weatherData = null
            }
        model.ready = true;
    }
    
    function catchErrorACB(error){
        console.log("error", error)
    }

    function checkInfoACB(){
        return [model.currentCity, model.weatherData];
    }

    function saveACB(){
        if(model.ready){
            const dataToCloud = {
                currentCity: model.currentCity,
                weatherData: model.weatherData
            }
            setDoc(theDoc, dataToCloud, {merge:true});
        }
    }
    watchFunction(checkInfoACB,saveACB);
}


/*
const COLLECTION_USER_DATA = "USER_DATA";

export const auth = getAuth(app);

export function connectToPersistence(model, watcher) {
    model.ready = false;
    model.user = undefined;

    onAuthStateChanged(auth, function(user) {
        model.setUser(user);
    });
}
    */