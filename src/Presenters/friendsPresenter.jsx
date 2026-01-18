import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import FriendsListView from "/src/Views/friendsListView";
import { useState } from "react";

const FriendsList = observer(
    function FriendsListRender(props){
        const navigate = useNavigate();
        const [searchError, setSearchError] = useState(null);
        const [addError, setAddError] = useState(null);
        const [results, setResults] = useState([]);

        var friends = props.model.friends;

        async function handleSearchACB(username) {
    if (!username) {
        setSearchError("Please enter a username.");
        setResults([]);
        setTimeout(() => setSearchError(null), 3000);
        return;
    }

    // starta sökning i modellen
    props.model.searchUser(username);

    try {
        // Vänta på Firestore-läsningen via resolvePromise
        const friend = await props.model.searchUserPromiseState.promise;

        if (friend) {
            setResults([friend]);
            setSearchError(null);
        } else {
            setResults([]);
            setSearchError("User not found");
            setTimeout(() => setSearchError(null), 3000);
        }
    } catch (err) {
        setResults([]);
        setSearchError("Error searching user");
        setTimeout(() => setSearchError(null), 3000);
    }
}

        function handleAddFriendsACB(user) {
            const result =props.model.addFriend(user);

            if(!result.ok) {
                if(result.reason === "SELF") {
                    setAddError("You cannot add yourself as a friend.");
                } else if(result.reason === "EXISTS") {
                    setAddError("Friend already exists.");
                } else {
                    setAddError("Failed to add friend.");
                }
                setTimeout(function () {
                    setAddError(null);
                }, 3000);
                return;
            }
                setAddError(null);
            }

        function handleRemoveACB(uid) {
            props.model.removeFriend(uid);
        }
        
        function handleSelectFriendACB(uid) {
            props.model.setSelectedUserUid(uid);
            navigate(`/friendsProfileView`);
        }

        function handleBackToFeedACB() {
        navigate("/feed");
        }

        return (
        <FriendsListView 
                friends={friends}
                onSearch={handleSearchACB}
                onAddFriend={handleAddFriendsACB}
                onRemoveFriend={handleRemoveACB}
                onSelectFriend={handleSelectFriendACB}
                onBack={handleBackToFeedACB}
                searchError={searchError}
                addError={addError}
                searchResults={results}
        />
    );

});
export { FriendsList }
