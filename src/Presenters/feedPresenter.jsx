import { observer } from "mobx-react-lite";
import FeedView from "../Views/feedView";

const Feed = observer(function FeedRender(props) {
function filterFriendFeed (feed, friends) {
if(!feed || !friends) return [];
return feed.filter(function (update) {
    if(!update || !update.uid) return false;
    return friends.some(function(friend) {
        return friend.uid === update.uid;
    });
});
}

var visibleFeed = filterFriendFeed(props.model.friendFeed, props.model.friends);
    return <FeedView feed ={visibleFeed} />;

});


export { Feed };