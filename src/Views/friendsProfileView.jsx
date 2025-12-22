import './style/friendsProfile.css';

export function FriendsProfileView (props) {
     function handleBackACB() {
        props.onBack();
    }
    return (
        <div className="friends-profile">  
        <button 
                className="back-to-feed-button" 
                onClick={handleBackACB}
            >
                ← Back to Feed
            </button>
            <h2>{props.profile.username}</h2>
            <div className="profile-bio">
                <strong>About me: </strong>{props.profile.bio || "This user hasn't written a bio yet."}
            </div>
            <p><strong>Current City: </strong> {props.profile.currentCity || "Not set"}</p>
            <p><strong> Favorite genre: </strong> {props.profile.genre || "Not set"}</p>

        <div className="profile-playlists">
            <h3>Created Playlists: </h3>
            {props.profile.exportedPlaylists && props.profile.exportedPlaylists.length > 0 ? (
                <ul>
                    {props.profile.exportedPlaylists.map((pl, index) => (
                        <li key={pl.playlistId || index}>
                            <a 
                                href={pl.spotifyUrl}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="playlist-link"
                            >
                                {pl.name}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No playlists exported yet.</p>
            )}
            </div>
        </div>
        

    );
    
}