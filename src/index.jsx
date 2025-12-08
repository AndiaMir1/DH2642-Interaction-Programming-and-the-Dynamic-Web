
import { createRoot } from "react-dom/client";
import "./Views/style/style.css";
import ReactRoot from "./Views/ReactRoot.jsx";
import { reactiveModel } from "./model/mobxReactiveModel.jsx";
import { connectToPersistence } from "./model/fireStoreModel.jsx";

connectToPersistence(reactiveModel);
createRoot(document.getElementById('root')).render(
    <ReactRoot model = {reactiveModel}/>
);