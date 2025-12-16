import { Observer } from "mobx-react-lite";

var Feed = observer( function FeedRender(props) {
    var feed = props.model.friendFeed;

    return FeedView ({ feed :feed});
});

export { Feed };