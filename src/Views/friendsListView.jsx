import { useState } from "react";
import { onEnterKey } from "../utils/viewHandlers";
import "./style/friendsListView.css";

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
        if(!trimmed || !props.onSearch) return;
        
        setError(null);
        const result = await props.onSearch(trimmed);
            if (!result  || result.length === 0) {
                setResults([]);
                setError("user not found");
            } else {
                setResults(result);
                setError(null);
            }
        }

    function handleAddFriendsACB(friendObject) {
        if (props.onAddFriend) {
            
            props.onAddFriend(friendObject);
            setResults([]);
            setQuery("");
        }
    }

    function handleSelectFriendACB(uid) {
        
        if (props.onSelectFriend) {
            props.onSelectFriend(uid);
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
                    value={query}
                    placeholder="Search"
                    onChange={handleInputACB}
                    onKeyDown={onEnterKey(handleSearchACB)}
                />
                
                <button onClick={handleSearchACB }>Search</button>

                {error && <p style={{color: "red"}}>{error}</p>}

                <ul>
                    {results.map(function (user) {
                        return (
                            <li key ={user.uid}>
                                <button 
                                onClick={function() {
                                    handleSelectFriendACB(user.uid);
                                }}
                                >
                                    {user.username}
                                </button>

                                <button onClick={function () {
                                    
                                    handleAddFriendsACB(user);
                                }}>
                                    Add
                                </button>
                            </li>
                        );
                    })}
                </ul>
             </div>   
     
            <ul>
                
                {props.friends.length === 0 && <li>No friends added yet.</li>}
                {props.friends.map(function(user) {
                    return (
                        <li key={user.uid}>
                            <button onClick={function() { 
                                handleSelectFriendACB(user.uid); 
                                }}>
                                {user.username}
                            </button>

                            <button onClick={function () {
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

    );
}
