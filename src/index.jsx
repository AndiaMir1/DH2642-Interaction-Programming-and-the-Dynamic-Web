import React from "react";
import { createRoot } from "react-dom/client";
import ReactRoot from "./Views/ReactRoot.jsx";
import { reactiveModel } from "./model/mobxReactiveModel.jsx";

createRoot(document.getElementById('root')).render(
    <ReactRoot model = {reactiveModel}/>
);