import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import CompareFriendsPlaylistsView from "../Views/comparePlaylistsView";

const CompareFriendsPlaylistsPresenter = observer(function ({ model }) {
    const [selectedFriendUid, setSelectedFriendUid] = useState(null);
    const [selectedMyPlaylist, setSelectedMyPlaylist] = useState(null);
    const [selectedFriendPlaylist, setSelectedFriendPlaylist] = useState(null);
    const [similarityScore, setSimilarityScore] = useState(null);
    const selectedFriendProfile = model.selectedFriendProfile;


    const myPlaylists = (model.exportedPlaylists || []).map(function(p) {
        return {
            ...p,
            trackUris: p.trackUris || []
        };
    });

    useEffect(function () {
    if (!selectedFriendUid) {
        model.selectedFriendProfile = null;
        setSelectedFriendPlaylist(null);
        setSimilarityScore(null);
        return;
    }

    model.fetchFriendProfile(selectedFriendUid);
    setSelectedFriendPlaylist(null);
    setSimilarityScore(null);
    }, [selectedFriendUid]);


    function handleSelectMyPlaylist(pl) {
        if(selectedMyPlaylist?.playlistId === pl.playlistId)
        {
            setSelectedMyPlaylist(null);
        } else {
            setSelectedMyPlaylist(pl)
        }
        setSimilarityScore(null);
    }

    function handleSelectFriendPlaylist(pl) {
       if(selectedFriendPlaylist?.playlistId === pl.playlistId)
        {
            setSelectedFriendPlaylist(null);
        } else {
            setSelectedFriendPlaylist(pl)
        }
        setSimilarityScore(null);
    }

    function handleSelectFriend(uid) {
        if(selectedFriendUid === uid) {
            setSelectedFriendUid(null);
        } else {
        setSelectedFriendUid(uid);
        }
    }

    function comparePlaylists() {
        if (!selectedMyPlaylist || !selectedFriendPlaylist) return;

        const mySet = new Set(selectedMyPlaylist.trackUris);
        const friendSet = new Set(selectedFriendPlaylist.trackUris);

        const intersection = [];
        mySet.forEach(function(track) {
            if (friendSet.has(track)) {
                intersection.push(track);
            }
        });
        
        const union = new Set([...mySet, ...friendSet]);

        const similarity = union.size === 0 ? 0 : (intersection.length / union.size) * 100;
        setSimilarityScore(parseFloat(similarity.toFixed(2)));
    }

    return (
        <CompareFriendsPlaylistsView
            myPlaylists={myPlaylists}
            friends={model.friends}
            selectedFriendUid={selectedFriendUid}
            friendPlaylists={selectedFriendProfile?.exportedPlaylists || []}
            selectedMyPlaylist={selectedMyPlaylist}
            selectedFriendPlaylist={selectedFriendPlaylist}
            onSelectMyPlaylist={handleSelectMyPlaylist}
            onSelectFriendPlaylist={handleSelectFriendPlaylist}
            onSelectFriend={handleSelectFriend}
            onCompare={comparePlaylists}
            similarityScore={similarityScore}
            friendName={selectedFriendProfile?.username || "Friend"}
        />
    );
});

export default CompareFriendsPlaylistsPresenter;