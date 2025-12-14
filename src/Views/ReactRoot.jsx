import { observer } from "mobx-react-lite";
import { MainPage } from "./mainPageView.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthPage from "./authPage.jsx";


const ReactRoot = observer(function ReactRoot(props){

    if(!props.model.user) {
        return <AuthPage model ={props.model}/>
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