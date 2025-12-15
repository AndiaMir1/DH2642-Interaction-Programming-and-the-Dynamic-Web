import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../model/fireStoreModel";
import { SuspenseView } from "./suspenseView";

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../model/fireStoreModel";
const [profile, setProfile] = useState(null);

export default function FriendsProfileView(props) { 

useEffect(function() {
        function fetchProfile() {
            if(!props.uid) return;

            const docRef = doc(db, "USER", props.uid);
            getDoc(docRef).then(function(snapshot) {
                setProfile(snapshot.data());
            });
        }
    }, [props.uid]);

    if (!profile) {
        return <SuspenseView/>;
    }

    return (
        <div>
            <h2>{profile.username}</h2>
        </div>
    );
}