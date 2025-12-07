import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "../../firebaseConfig";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const COLLECTION_USERS = "USERS";
const COLLECTION_USER_DATA = "USER_DATA";

export const auth = getAuth(app);

export function connectToPersistence(model, watcher) {
    model.ready = false;
    model.user = undefined;

    onAuthStateChanged(auth, function(user) {
        model.setUser(user);
    });
}