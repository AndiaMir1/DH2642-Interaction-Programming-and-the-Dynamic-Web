import { createElement, Fragment} from "react";

window.React = { createElement: createElement, Fragment: Fragment} ;

import { createRoot } from "react-dom/client";
import ReactRoot from "./Views/ReactRoot";
import { reactiveModel } from "./model/mobxReactiveModel";

createRoot(document.getElementById('root')).render(
    <ReactRoot model = {reactiveModel}/>
);