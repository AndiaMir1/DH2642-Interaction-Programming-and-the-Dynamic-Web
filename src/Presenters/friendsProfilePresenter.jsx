import { useEffect, useState } from "react";
import { SuspenseView } from "../Views/suspenseView.jsx";
import { FriendsProfileView } from  "../Views/friendsProfileView.jsx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

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
        
        props.model.fetchSelectedFriendUid(uid).then(setProfile);
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
