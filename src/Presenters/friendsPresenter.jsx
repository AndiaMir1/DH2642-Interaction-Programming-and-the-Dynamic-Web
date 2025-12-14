import { useObserver } from "mobx-react-lite";
import { reactiveModel } from "../model/mobxReactiveModel.jsx";
import FriendsListView from "../Views/friendsListView";

export default function FriendsPresenter() {

    function handleAddFriendACB(uid) {
        reactiveModel.addFriend(uid);
    }

    function handleRemoveFriendACB(uid) {
        reactiveModel.removeFriend(uid);
    }

    return useObserver(function renderPresenterACB() {
        return (
            <FriendsListView
                friends={reactiveModel.friends}
                onAddFriend={handleAddFriendACB}
                onRemoveFriend={handleRemoveFriendACB}
            />
        );
    });
}
