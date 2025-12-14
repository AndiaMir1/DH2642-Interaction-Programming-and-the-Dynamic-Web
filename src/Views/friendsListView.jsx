import React, { useState } from "react";
import "./style/friendsListView.css";

export default function FriendsListView(props) {
    const [newFriend, setNewFriend] = useState("");

    function handleInputACB(event) {
        setNewFriend(event.target.value);
    }

    function handleAddACB() {
        const uid = newFriend.trim();
        if (uid && props.onAddFriend) {
            props.onAddFriend(uid);
            setNewFriend("");
        }
    }

    function handleKeyDownACB(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddACB();
        }
    }

    function handleRemoveACB(uid) {
        if (props.onRemoveFriend) {
            props.onRemoveFriend(uid);
        }
    }

    return (
        <div className="friends-list">
            <h2>Friends</h2>

            <div className="add-friend">
                <input
                    type="text"
                    value={newFriend}
                    placeholder="Enter friend UID"
                    onChange={handleInputACB}
                    onKeyDown={handleKeyDownACB}
                />
                <button onClick={handleAddACB}>Add Friend</button>
            </div>

            <ul>
                {props.friends.length === 0 && <li>No friends added yet.</li>}
                {props.friends.map(function(uid) {
                    return (
                        <li key={uid}>
                            {uid}{" "}
                            <button onClick={function() { handleRemoveACB(uid); }}>
                                Remove
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
