import { useNavigate } from "react-router-dom";
import "./style/feed.css";
export default function FeedView(props) {
    var nav = useNavigate();

    function goToFriends() {
        nav("/friends");
    }

    function goToFriendsProfile(uid) {
        if (uid) {
            props.onUserClick(uid);
            nav("/friendsProfileView");
        }
    }

    function renderUpdateText(update) {
        if (!update.payload) {
            return "did something";
        }

        if (update.type === "CITY_CHANGE") {
            return "changed city to " + update.payload.city;
        }

        if (update.type === "GENRE_CHANGE") {
            return "changed favorite genre to " + update.payload.genre;
        }

        if (update.type === "TRACK_ADDED") {
            return "added track " + update.payload.trackName;
        }

        return "did something";
    }

    function renderTimestamp(timestamp) {
        if (!timestamp || !timestamp.seconds) {
            return "";
        }

        var date = new Date(timestamp.seconds * 1000);
        return date.toLocaleString();
    }

    return (
        <div className="feed">
            <div className="feed-header">
                <h2>Following</h2>
                <button
                className="manage-friends-button"
                onClick={goToFriends}
                >Manage Friends</button>
            </div>

            {(!props.feed || props.feed.length === 0) && (
                <p>Add some friends to see updates</p>
    )}
            <ul className="feed-list">
                {props.feed.map(function (item) {
                    return (
                        <li key={item.id} className="feed-item">
                            <div>
                                <strong
                                className="clickable-username"
                                onClick={function () { goToFriendsProfile(item.uid);}}
                                style={{ cursor: "pointer"}}
                                >{item.user}</strong>{" "}
                                {renderUpdateText(item)}
                            </div>

                            <div className="feed-timestamp">
                                {renderTimestamp(item.timestamp)}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
