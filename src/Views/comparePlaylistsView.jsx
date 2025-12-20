import './style/comparePlaylistsView.css';

export default function CompareFriendsPlaylistsView(props) {
    return (
        <div className="compare-playlists">
            <h1>Compare Playlists with {props.friendName}</h1>

            <div className="friend-selection">
                <h3>Select a Friend:</h3>
                <ul className="friend-list">
                    {props.friends.map(function(friend) {
                        var isSelected = props.selectedFriendUid === friend.uid;
                        var classNames = "friend-btn " + (isSelected ? "selected" : "");
                        
                        return (
                            <li key={friend.uid}>
                                <button
                                    className={classNames}
                                    onClick={function() { props.onSelectFriend(friend.uid); }}
                                >
                                    {friend.username}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="playlist-section">
                <h3>Your Playlists</h3>
                <ul className="playlist-list">
                    {props.myPlaylists.map(function(pl) {
                        var isSelected = props.selectedMyPlaylist && props.selectedMyPlaylist.playlistId === pl.playlistId;
                        var classNames = "playlist-btn " + (isSelected ? "selected" : "");

                        return (
                            <li key={pl.playlistId}>
                                <button
                                    className={classNames}
                                    onClick={function() { props.onSelectMyPlaylist(pl); }}
                                >
                                    {pl.name}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="playlist-section">
                <h3>{props.friendName}'s Playlists</h3>
                <ul className="playlist-list">
                    {props.friendPlaylists.map(function(pl) {
                        var isSelected = props.selectedFriendPlaylist && props.selectedFriendPlaylist.playlistId === pl.playlistId;
                        var classNames = "playlist-btn " + (isSelected ? "selected" : "");

                        return (
                            <li key={pl.playlistId}>
                                <button
                                    className={classNames}
                                    onClick={function() { props.onSelectFriendPlaylist(pl); }}
                                >
                                    {pl.name}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <button
                className="compare-btn"
                onClick={props.onCompare}
                disabled={!props.selectedMyPlaylist || !props.selectedFriendPlaylist}
            >
                Compare Selected Playlists
            </button>

            {props.similarityScore !== null && (
                <div className="similarity-result">
                    <h3>Similarity: {props.similarityScore}%</h3>
                </div>
            )}
        </div>
    );
}