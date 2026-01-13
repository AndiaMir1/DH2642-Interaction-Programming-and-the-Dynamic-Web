import { collection, query, where, getDocs, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import {db} from "../model/fireStoreModel.js";
import {runInAction} from "mobx";

export function fetchFriendFeedForModel (model) {
        if (!model.user || model.friends.length === 0) {
        runInAction(() => { model.friendFeed = []; });
        return;
    }

    model.friends.forEach(friend => {
        const updatesRef = collection(db, "USER", friend.uid, "updates");
        const q = query(updatesRef, orderBy("timestamp", "desc"), limit(200));

        onSnapshot(q, snapshot => {
            const updates = snapshot.docs.map(docSnap => ({
                id: docSnap.id,
                user: friend.username || friend.username,
                uid: friend.uid,
                type: docSnap.data().type,
                payload: docSnap.data().payload,
                timestamp: docSnap.data().timestamp,
            }));

            runInAction(() => {
                const otherUpdates = model.friendFeed.filter(u => u.uid !== friend.uid);
                model.friendFeed = otherUpdates.concat(updates);
                model.friendFeed.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
            });
        });
    });
}

export function addUserUpdateForModel(model, type, payload) {
    if(!model.user) return;

    var updatesRef = collection(db, "USER", model.user.uid, "updates");

    addDoc(updatesRef, {
        type: type,
        payload: payload,
        username: model.currentUsername,
        uid: model.user.uid,
        timestamp: serverTimestamp()
    });
}


export async function findUserUidByUsername(username) {
    if (!username) return null;

    const usersRef = collection(db, "USER");
    const q = query(usersRef, where("username", "==", username), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        return null;
    }

    const doc = snapshot.docs[0];
    return {
        uid: doc.id,
        ...doc.data()
    };
}
   