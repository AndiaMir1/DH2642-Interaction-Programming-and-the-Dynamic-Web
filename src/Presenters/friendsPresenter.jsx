import { useObserver } from "mobx-react-lite";
import { reactiveModel } from "../model/mobxReactiveModel.jsx";
import FriendsListView from "../Views/FriendsListView";
import { useNavigate } from "react-router-dom";

export default function FriendsPresenter() {
    const navigate = useNavigate();

    async function handleSearchACB(username) {
        if (!username) return [];

        const uid = await reactiveModel.findUserUidByUsername(username);

        if (!uid || reactiveModel.friends.includes(uid)) return [];

        return [{ username: username } ];
    }

    function handleAddFriendACB(username) {
        reactiveModel.findUserUidByUsername(username).then(function(uid) {
            if (uid && !reactiveModel.friends.includes(uid)) {
                reactiveModel.addFriend(uid);
            }
        });
    }


    function handleRemoveFriendACB(username) {
        reactiveModel.findUserUidByUsername(username).then(function(uid) {
            if (uid) reactiveModel.removeFriend(uid);
                reactiveModel.addFriend(uid);
            });
    }

    function handleSelectFriendACB(username) {
        reactiveModel.selectedUserUid = uid;
        navigate(`/friendsProfileView`);
    }

    return useObserver(function renderPresenterACB() {
        return (
            <FriendsListView
                friends={reactiveModel.friends}
                onSearch={handleSearchACB}
                onAddFriend={handleAddFriendACB}
                onRemoveFriend={handleRemoveFriendACB}
                onSelectFriend={handleSelectFriendACB}
            />
        );
    });
}
