import { useState } from "react";
import { onEnterKey } from "../utils/viewHandlers";
import './style/friendsListView.css';

export default function FriendsListView(props) {
    const [query, setQuery] = useState("");
    const [results, setResults] =  useState([]);
    const [error, setError] = useState(null);

    function handleInputACB(event) {
        setQuery(event.target.value);
        setError(null);
    }

    async function handleSearchACB() {
        const trimmed = query.trim();
        const searchResult = await props.onSearch(trimmed);
        setResults(searchResult.results);
        setError(searchResult.error);
    }

    function handleAddFriendsACB(friendObject) {
        props.onAddFriend(friendObject);
        setResults([]);
        setQuery("");

    }

    function handleSelectFriendACB(user) {
        props.onSelectFriend(user);
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
                
                <button onClick={handleSearchACB }>Search</button>
            </div>
                {error && <p style={{color: "red"}}>{error}</p>}

                <div className="search-results">
                    <h3>Results</h3>
                <ul>
                    {results.map(function (user) {
                        return (
                            <li key ={user.uid}>
                                <button 
                                className="profile-button"
                                onClick={function() {
                                    handleSelectFriendACB(user.uid);
                                }}
                                >
                                    {user.username}
                                </button>
                                <button 
                                className="add-button"
                                onClick={function () {
                                    
                                    handleAddFriendsACB(user);
                                }}>
                                    Add Friend
                                </button>
                            </li>
                        );
                    })}
                </ul>
             </div>   
             <hr />

             <div className="current-friends">
                 <h3>Your Friends</h3>
            <ul>
                
                {props.friends.length === 0 && <li>No friends added yet.</li>}
                {props.friends.map(function(user) {
                    return (
                        <li key={user.uid}>
                            <button 
                            className="profile-button"
                            onClick={function() { 
                                handleSelectFriendACB(user.uid); 
                                }}>
                                {user.username}
                            </button>

                            <button 
                            className="remove-button"
                            onClick={function () {
                                handleRemoveACB(user.uid);
                            }}
                            >
                                Remove
                            </button>
                        </li>
                    );
                })}
            </ul>
            </div>
     </div>

    );
}
