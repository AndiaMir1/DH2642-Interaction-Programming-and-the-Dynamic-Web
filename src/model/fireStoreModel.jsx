import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "../../firebaseConfig.js";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";


const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const COLLECTION_USER_DATA = "USERS";
let theDoc = null;
export const auth = getAuth(app);


export function connectToPersistence(model, watchFunction){
    model.ready = false;
    model.user = undefined;

    onAuthStateChanged(auth, function(user) {
        model.setUser(user);

        if(!user) {
            model.ready = true;
            return;
        }
        theDoc = doc(database, COLLECTION_USER_DATA, "userData");
        getDoc(theDoc).then(loadACB).catch(catchErrorACB);
    });

    function loadACB(snapshot){
        
        const dataFromCloud = snapshot.data() || {};
        if (dataFromCloud.currentCity !== undefined){
            model.currentCity = dataFromCloud.currentCity;
        }
            else {
                model.currentCity = null
            }
           
        model.ready = true;

        if(model.currentCity){
            model.getWeather(model.currentCity);
        }
    }
    
    function catchErrorACB(error){
        console.log("error", error)
    }

    function checkInfoACB(){
        return model.currentCity;
    }

    function saveACB(){
        if(model.ready){
            const dataToCloud = {
                currentCity: model.currentCity,
                /*We need more user data saved, genre, liked songs, alredy suggested songs etc*/ 
            }
            setDoc(theDoc, dataToCloud, {merge:true});
        }
    }
    watchFunction(checkInfoACB,saveACB);
}


/*
const COLLECTION_USER_DATA = "USER_DATA";

export const auth = getAuth(app);


    onAuthStateChanged(auth, function(user) {
        model.setUser(user);
    });
}
    */