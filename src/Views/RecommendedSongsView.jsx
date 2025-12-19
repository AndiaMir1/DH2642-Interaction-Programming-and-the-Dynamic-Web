import "./style/recommendedSongsView.css";

export function RecommendedSongsView(props) {
    return (
        <div className="recommended-root">
            <div className="recommend-right">
                <h1>Liked songs</h1>
                <div className="playlist-placeholder">
                    <div className="placeholder-content">
                        <h2>🎵 Your liked songs </h2>
                        {props.likedSongs && props.likedSongs.length > 0 ? (
                            props.likedSongs.map((track) => (
                                <div key={track.id} className="track-item">
                                    <img
                                        src={track.image || track.album?.images?.[0]?.url || ''}
                                        className="track-image"
                                        alt={track.name}
                                    />
                                    <div className="track-content">
                                        <div className="track-header">
                                            <strong>{track.name}</strong>
                                            <span className="artist-name">{track.artist || track.artists?.[0]?.name}</span>
                                            <button
                                                onClick={() => props.onRemoveLikedSong(track.id)}
                                                className="like-btn"
                                            >
                                                Unlike
                                            </button>
                                        </div>
                                        <div className="iframe-container">
                                            <iframe
                                                title={`spotify-${track.id}`}
                                                src={`https://open.spotify.com/embed/track/${track.id}`}
                                                className="spotify-embed"
                                                frameBorder="0"
                                                allow="encrypted-media"
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="playlist-placeholder">
                                <div className="placeholder-content">
                                    <h2>🎵 No songs yet</h2>
                                    <p>Like some songs to fill up your playlist!</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}