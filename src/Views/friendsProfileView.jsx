import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../model/fireStoreModel";
import { SuspenseView } from "./suspenseView";
import './style/friendsProfile.css';
export default function FriendsProfileView(props) {

    const [profile, setProfile] = useState(null);

    useEffect(function() {
        function fetchProfile() {
            if(!props.uid) return;

            const docRef = doc(db, "USER", props.uid);
            getDoc(docRef).then(function(snapshot) {
                setProfile(snapshot.data());
            });
        }
        fetchProfile();
    }, [props.uid]);

    if (!profile) {
        return <SuspenseView/>;
    }

    return (
        <div className="friends-profile">  
            <h2>{profile.username}</h2>
            <p><strong>Current City: </strong> {profile.currentCity || "Not set"}</p>
            <p><strong> Favorite genre: </strong> {profile.genre || "Not set"}</p>
        </div>
    );
}