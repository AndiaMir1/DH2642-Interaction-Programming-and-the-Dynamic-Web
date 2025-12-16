import { observer } from "mobx-react-lite";
import { MainPage } from "./mainPageView.jsx";
import { BrowserRouter } from "react-router-dom";
import {AuthPresenter} from "/src/Presenters/authPresenter.jsx";
import {SuspenseView} from "./suspenseView.jsx";
const ReactRoot = observer(function ReactRoot(props){
    if(!props.model.ready){
        return <SuspenseView promise={""}/>
    }
    if(!props.model.user) {
        return <AuthPresenter model={props.model}/>
    }
    return (
        <BrowserRouter>
    <div>
        <MainPage model={props.model} />
    </div>
    </BrowserRouter>

    );
})
export default ReactRoot;