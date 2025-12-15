import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../model/fireStoreModel";

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../model/fireStoreModel";

export default function FriendsProfileView(props) { 

useEffect(function() {
        function fetchProfile() {
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
        <div>
            <h2>user.username</h2>
        </div>
    );
}