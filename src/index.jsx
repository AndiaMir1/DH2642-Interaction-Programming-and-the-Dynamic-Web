import React from "react";
import { createRoot } from "react-dom/client";
import ReactRoot from "./Views/ReactRoot.jsx";
import { reactiveModel } from "./model/mobxReactiveModel.jsx";
import { connectToPersistence } from "./model/fireStoreModel.jsx";

connectToPersistence(reactiveModel);
createRoot(document.getElementById('root')).render(
    <ReactRoot model = {reactiveModel}/>
);