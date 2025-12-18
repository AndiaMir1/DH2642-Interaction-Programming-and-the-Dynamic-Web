import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import FriendsListView from "/src/Views/friendsListView";

const FriendsList = observer(
    function FriendsListRender(props){
        const navigate = useNavigate();
        var friends = props.model.friends;

        function handleSearchACB(username) {
            if (!username) return Promise.resolve([]);

            return props.model.findUserUidByUsername(username).then(function(friendObject) {
            if (!friendObject) return [];
            return [friendObject];
            });
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


        return <FriendsListView friends={friends}
                                onSearch={handleSearchACB}
                                onAddFriend={handleAddFriendsACB}
                                onRemoveFriend={handleRemoveACB}
                                onSelectFriend={handleSelectFriendACB}
        
        />;
    }
);
export {FriendsList}
