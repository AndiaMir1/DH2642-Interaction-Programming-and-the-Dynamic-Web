import { useEffect, useState } from "react";
import { SuspenseView } from "../Views/suspenseView.jsx";
import { FriendsProfileView } from  "../Views/friendsProfileView.jsx";
import { observer } from "mobx-react-lite";
import { fetchSelectedFriendUid } from "../utils/firebaseUtil.js";
import { useNavigate } from "react-router-dom";

const FriendsProfilePresenter = observer(function FriendsProfilePresenter(props) {
    const [profile, setProfile] = useState(null);
    const uid = props.model.selectedUserUid;
    const navigate = useNavigate();

    useEffect(() => {
        if (!uid) {
            setProfile(null);
            return;
        }

        fetchSelectedFriendUid(uid).then(setProfile);
    }, [uid]);

    if (!profile) {
        return <SuspenseView />;
    }

    function handleBackToFeedACB() {
        navigate("/feed");
    }

    return (
        <FriendsProfileView 
        profile={profile}
        onBack={handleBackToFeedACB}
         />
    );
});

export default FriendsProfilePresenter;
