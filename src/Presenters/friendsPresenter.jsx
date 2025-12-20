import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import FriendsListView from "/src/Views/friendsListView";

const FriendsList = observer(
    function FriendsListRender(props){
        const navigate = useNavigate();
        var friends = props.model.friends;

        async function handleSearchACB(username) {
            try {
                if (!username) {
                return { results: [], error: "Please enter a username." };
                }

                const friend = await props.model.findUserUidByUsername(username);
                if (friend) {
                    return { results: [friend], error: null };
                } else {
                    return { results: [], error: "User not found." };
                }
            } catch (err) {
                return { results: [], error: "Error searching for friend." };
            }
        }    

        function handleAddFriendsACB(friendObject) {
            props.model.addFriend(friendObject);
            }

        function handleRemoveACB(uid) {
            props.model.removeFriend(uid);
        }
        
        function handleSelectFriendACB(uid) {
            props.model.selectedUserUid = uid;
            navigate(`/friendsProfileView`);
        }

        function handleBackACB() {
            navigate("/feed");
        }

        return (
        <FriendsListView friends={friends}
                onSearch={handleSearchACB}
                onAddFriend={handleAddFriendsACB}
                onRemoveFriend={handleRemoveACB}
                onSelectFriend={handleSelectFriendACB}
                onBack={handleBackACB}
        />
    );

});
export {FriendsList}
