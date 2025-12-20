import './style/friendsProfile.css';

export function FriendsProfileView ({profile}) {
    return (
        <div className="friends-profile">  
            <h2>{profile.username}</h2>
            <div className="profile-bio">
                <strong>About me: </strong>{profile.bio || "This user hasn't written a bio yet."}
            </div>
            <p><strong>Current City: </strong> {profile.currentCity || "Not set"}</p>
            <p><strong> Favorite genre: </strong> {profile.genre || "Not set"}</p>

        <div className="profile-playlists">
            <h3>Created Playlists: </h3>
            {profile.exportedPlaylists && profile.exportedPlaylists.length > 0 ? (
                <ul>
                    {profile.exportedPlaylists.map((pl, index) => (
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