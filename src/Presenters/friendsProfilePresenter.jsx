import { useEffect, useState } from "react";
import { SuspenseView } from "../Views/suspenseView.jsx";
import { FriendsProfileView } from  "../Views/friendsProfileView.jsx";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../model/fireStoreModel.js";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { handleBackToFeedACB } from "../utils/navigationsUtils.js";

const FriendsProfilePresenter = observer(function FriendsProfilePresenter(props) {
    const [profile, setProfile] = useState(null);
    const uid = props.model.selectedUserUid;
    const navigate = useNavigate();

    useEffect(() => {
        props.model.setSelectedUserUid(uid);
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


    return (
        <FriendsProfileView 
        profile={profile}
        onBack={handleBackToFeedACB(navigate)}
    
         />
    );
});

export default FriendsProfilePresenter;
