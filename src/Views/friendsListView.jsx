import { useState } from "react";
import { onEnterKey } from "../utils/viewHandlers";
import './style/friendsListView.css';

export default function FriendsListView(props) {
    const [query, setQuery] = useState("");

    function handleInputACB(event) {
        setQuery(event.target.value);
        props.onClearAddError?.();
    }

    async function handleSearchACB() {
        await props.onSearch(query.trim());
    }

    function handleAddFriendsACB(friendObject) {
        props.onAddFriend(friendObject);
    }

    function handleSelectFriendACB(uid) {
        props.onSelectFriend= uid;
        localStorage.setItem("selectedUserUid", uid);
    }

    function handleRemoveACB(uid) {
        props.onRemoveFriend(uid);
    }

    function handleBackACB() {
        props.onBack();
    }

    return (
        <div className="friends-list">
            <h2>Friends</h2>
            <button onClick={handleBackACB}>Back to Feed</button>

            <div className="add-friend">
                <input
                    type="text"
                    value={query}
                    placeholder="Search"
                    onChange={handleInputACB}
                    onKeyDown={onEnterKey(handleSearchACB)}
                />
                <button onClick={handleSearchACB}>Search</button>
            </div>

            {props.searchError && <p style={{ color: "red" }}>{props.searchError}</p>}
            {props.addError && <p style={{ color: "red" }}>{props.addError}</p>}

            <div className="search-results">
                <h3>Results</h3>
                <ul>
                    {props.searchResults?.map(user => (
                        <li key={user.uid}>
                            <button
                                className="profile-button"
                                onClick={() => handleSelectFriendACB(user.uid)}
                            >
                                {user.username}
                            </button>
                            <button
                                className="add-button"
                                onClick={() => handleAddFriendsACB(user)}
                            >
                                Add Friend
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <hr />

            <div className="current-friends">
                <h3>Your Friends</h3>
                <ul>
                    {props.friends.length === 0 && <li>No friends added yet.</li>}
                    {props.friends.map(user => (
                        <li key={user.uid}>
                            <button
                                className="profile-button"
                                onClick={() => handleSelectFriendACB(user.uid)}
                            >
                                {user.username}
                            </button>
                            <button
                                className="remove-button"
                                onClick={() => handleRemoveACB(user.uid)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
