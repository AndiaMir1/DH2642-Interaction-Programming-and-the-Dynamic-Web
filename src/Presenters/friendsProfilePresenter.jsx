import { useEffect, useState } from "react";
import { SuspenseView } from "../Views/suspenseView.jsx";
import { FriendsProfileView } from  "../Views/friendsProfileView.jsx";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../model/fireStoreModel.js";
import { observer } from "mobx-react-lite";

const FriendsProfilePresenter = observer(function FriendsProfilePresenter(props) {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const uid = props.model.selectedUserUid;
        if (!uid) {
            setProfile(null);
            return;
        }

        const docRef = doc(db, "USER", uid);
        getDoc(docRef).then(snapshot => {
            setProfile(snapshot.data());
        });
    }, [props.model.selectedUserUid]);

    if (!profile) {
        return <SuspenseView />;
    }

    return <FriendsProfileView profile={profile} />;
});

export default FriendsProfilePresenter;
