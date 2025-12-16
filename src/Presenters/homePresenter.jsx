import { observer } from "mobx-react-lite";
import {HomeView} from "/src/Views/HomeView.jsx";
const Home = observer(
    function HomeRender(props){
        const weatherData = props.model.weatherPromiseState.data;
        return <HomeView weatherData = {weatherData}
        
        />;
    }
);

export {Home}