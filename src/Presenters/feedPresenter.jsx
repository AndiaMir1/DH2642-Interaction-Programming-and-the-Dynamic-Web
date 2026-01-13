import { observer } from "mobx-react-lite";
import FeedView from "../Views/feedView";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Feed = observer(function FeedRender(props) {
    const navigate = useNavigate();
    const [visibleCount, setVisibleCount] = useState(15);

    function handleGoToFriends() {
        navigate("/friends");
    }

    function handleUserClick(uid) {
        props.model.selectedUserUid = uid;
        navigate("/friendsProfileView");
    }

    function formatUpdateText(update) {
        if (!update || !update.payload) return "did something";

        switch (update.type) {
            case "USERNAME_CHANGE":
                //console.log("hallå");
                return "changed their username to " + (update.payload.username || "unknown");
            case "CITY_CHANGE":
                return "changed city to " + update.payload.city;
            case "GENRE_CHANGE":
                return "changed favorite genre to " + update.payload.genre;
            case "LIKED_SONG":
                return "liked a track " + (update.payload.track || "unknown track");
            case "PLAYLIST_EXPORT":
                return "created a new playlist " + (update.payload.playlistName || "untitled");
            case "BIO_CHANGE":
                return "updated their bio " + (update.payload.bio || "");
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
            .filter(update =>
                update &&
                update.uid &&
                props.model.friends.some(friend => friend.uid === update.uid)
            )
            .map(update => ({
                id: update.id,
                uid: update.uid,
                user: update.user,
                username: update.username,
                text: formatUpdateText(update),
                timestamp: formatTimestamp(update.timestamp)
            }))
            .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
            .slice(0, visibleCount); 
    }

    function handleSeeOlderUpdates() {
        setVisibleCount(prev => prev + 15);
    }


    const visibleFeed = getVisibleFeed();

    return (
        <FeedView
            feed={visibleFeed}
            emptyMessage="Add some friends to see updates"
            onGoToFriends={handleGoToFriends}
            onUserClick={handleUserClick}
            onSeeOlderUpdates={handleSeeOlderUpdates}
            hasMore={visibleFeed.length < props.model.friendFeed.length}
            
        />
    );
});

export { Feed };