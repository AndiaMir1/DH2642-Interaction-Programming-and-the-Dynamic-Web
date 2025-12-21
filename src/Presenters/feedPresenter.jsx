import { observer } from "mobx-react-lite";
import FeedView from "../Views/feedView";
import { useNavigate } from "react-router-dom";

const Feed = observer(function FeedRender(props) {
    const navigate = useNavigate();

    function handleGoToFriends() {
        navigate("/friends");
    }

    function handleUserClick(uid) {
        props.model.setSelectedUserUid(uid);
        navigate("/friendsProfileView");
    }

    function formatUpdateText(update) {
        if (!update || !update.payload) return "did something";

        switch (update.type) {
            case "CITY_CHANGE":
                return "changed city to " + update.payload.city;
            case "GENRE_CHANGE":
                return "changed favorite genre to " + update.payload.genre;
            case "LIKED_SONG":
                return "liked a track " + (update.payload.track || "Unknown Track");
            case "PLAYLIST_EXPORT":
                return "created a new playlist " + (update.payload.playlistName || "untitled");
            case "BIO_CHANGE":
                return "updated their bio " + (update.payload.bio || "");
            case "PLAYLIST_UPDATE":
                return "added songs to existing playlist";
            default:
                return "did something";
        }
    }

    function formatTimestamp(timestamp) {
        if (!timestamp || !timestamp.seconds) return "";
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleString();
    }

    function getVisibleFeed() {
        if (!props.model.friendFeed || !props.model.friends) return [];

        return props.model.friendFeed
            .filter(function (update) {
                return update && update.uid && props.model.friends.some(function (friend) {
                    return friend.uid === update.uid;
                });
            })
            .map(function (update) {
                return {
                    id: update.id,
                    uid: update.uid,
                    user: update.user,
                    text: formatUpdateText(update),
                    timestamp: formatTimestamp(update.timestamp)
                };
            });
    }

    const visibleFeed = getVisibleFeed();

    return (
        <FeedView
            feed={visibleFeed}
            emptyMessage="Add some friends to see updates"
            onGoToFriends={handleGoToFriends}
            onUserClick={handleUserClick}
        />
    );
});

export { Feed };