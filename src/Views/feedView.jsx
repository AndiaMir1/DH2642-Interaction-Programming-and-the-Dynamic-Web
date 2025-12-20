import "./style/feed.css";

export default function FeedView(props) {

    function handleGoToFriends() {
        props.onGoToFriends();
    }

    function handleUserClickACB(uid) {
        props.onUserClick(uid);
    }

    return (
        <div className="feed">
            <div className="feed-header">
                <h2>Following</h2>
                <button
                className="manage-friends-button"
                onClick={handleGoToFriends}
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
                                onClick={function () {handleUserClickACB(item.uid);}}
                                style={{ cursor: "pointer"}}
                                >{item.user}</strong>{" "}
                                {item.text}
                            </div>

                            <div className="feed-timestamp">
                                {item.timestamp}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
