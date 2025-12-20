import { observer } from "mobx-react-lite";
import AboutUsView from "/src/Views/aboutUsView"
const AboutUs = observer(function AboutUsRender(props) {

    return <AboutUsView />;

});

export { AboutUs };