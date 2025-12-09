//reactiveModel

import { observable, configure, reaction } from "mobx";
import { rootModel } from "./appModel.js";

configure({ enforceActions: "never" }); // Changed to "never" since we're not using MobX actions

export const reactiveModel = observable(rootModel);
import {connectToPersistence} from "/src/model/fireStoreModel.jsx";
connectToPersistence(reactiveModel, reaction);
window.appStore = reactiveModel;

