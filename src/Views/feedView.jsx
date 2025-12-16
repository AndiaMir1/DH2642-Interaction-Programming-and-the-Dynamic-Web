export default function FeedView(props) {
    if(!props.feed || props.feed.length === 0) {
        return <p>Add some friends to see updates</p>
    }

    function renderUpdateText(update) {
        if(update.type === "CITY_CHANGE") {
            return "Changed city to " + update.payload.city;
        } else if (update.type === "GENRE_CHANGE") {
            return "Changed favorite genre to " + update.payload.genre;
        } else if (update.type === "TRACK_ADDED") {
            return "added track " + update.payload.trackName;
        }
        return "did something";
    }

    return (
        <div>
            <h2>Friends Feed</h2>
            <ul>
                {props.feed.map(function(item) {
                    return (
                        <li key={item.id}>
                            <strong>{item.user}</strong> {renderUpdateText(item)}
                             </li>
                    );
                })}
            </ul>
        </div>
    )
}