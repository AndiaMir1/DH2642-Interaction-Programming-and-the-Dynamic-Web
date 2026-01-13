import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import FriendsListView from "/src/Views/friendsListView";
import { useState } from "react";
import { useEffect } from "react";

const FriendsList = observer(
    function FriendsListRender(props){
        const navigate = useNavigate();
        const [searchError, setSearchError] = useState(null);
        const [addError, setAddError] = useState(null);
        const [results, setResults] = useState([]);

        useEffect(() => {
            if (props.model.friends.length > 0) {
                props.model.refreshFriends(); 
            }
        }, []);

        const friends = props.model.friends;

        async function handleSearchACB(username) {
            try {
                if (!username) {
                setSearchError( "Please enter a username.");
                setResults([]);
                setTimeout(function () {
                    setSearchError(null);
                }, 3000);
                return;
                }

                const friend = await props.model.searchUser(username);
                if (friend) {
                    setSearchError( null);
                    setResults([friend]);
                } else {
                    setSearchError( "User not found");
                    setResults([]);
                    setTimeout(function () {
                    setSearchError(null);
                }, 3000);
                }
            } catch (err) {
                setSearchError( "An error occurred while searching.");
                setResults([]);
                setTimeout(function () {
                    setSearchError(null);
                }, 3000);
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
