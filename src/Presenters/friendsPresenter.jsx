import { useObserver } from "mobx-react-lite";
import { reactiveModel } from "../model/mobxReactiveModel.jsx";
import FriendsListView from "../Views/FriendsListView";
import { useNavigate } from "react-router-dom";

export default function FriendsPresenter() {
    const navigate = useNavigate();

    function handleSearchACB(username) {
    if (!username) return Promise.resolve([]);

    return reactiveModel.findUserUidByUsername(username).then(function(friendObject) {
        if (!friendObject) return [];
        return [friendObject];
            });
        }

    function handleAddFriendsACB(friendObject) {
            reactiveModel.addFriend(friendObject);
        }

    function handleRemoveACB(uid) {
        reactiveModel.removeFriend(uid);
            }
    

    function handleSelectFriendACB(uid) {
        reactiveModel.selectedUserUid = uid;
        navigate(`/friendsProfileView`);
    }

    return useObserver(function renderPresenterACB() {
        return (
            <FriendsListView
                friends={reactiveModel.friends}
                onSearch={handleSearchACB}
                onAddFriend={handleAddFriendsACB}
                onRemoveFriend={handleRemoveACB}
                onSelectFriend={handleSelectFriendACB}
            />
        );
    });
}
