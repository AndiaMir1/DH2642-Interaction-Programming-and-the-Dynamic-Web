import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../model/fireStoreModel";
import { SuspenseView } from "./suspenseView";
import './style/friendsProfile.css';
export default function FriendsProfileView(props) {

    const [profile, setProfile] = useState(null);

    useEffect(function() {
        function fetchProfile() {
            if(!props.uid) return;

            const docRef = doc(db, "USER", props.uid);
            getDoc(docRef).then(function(snapshot) {
                setProfile(snapshot.data());
            });
        }
        fetchProfile();
    }, [props.uid]);

    if (!profile) {
        return <SuspenseView/>;
    }

    return (
        <div className="friends-profile">  
            <h2>{profile.username}</h2>
            <div className="profile-bio">
                <p><strong>About me:</strong></p>
                <p className="bio-text">{profile.bio || "This user hasn't written a bio yet."}</p>
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