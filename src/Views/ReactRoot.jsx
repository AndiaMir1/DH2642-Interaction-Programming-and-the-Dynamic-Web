import { observer } from "mobx-react-lite";
import { MainPage } from "./mainPage.jsx";
import { BrowserRouter } from "react-router-dom";

const ReactRoot = observer(function ReactRoot(props){
    return (
        <BrowserRouter>
    <div>
        <MainPage model={props.model} />
    </div>
    </BrowserRouter>

    );
})
export default ReactRoot;