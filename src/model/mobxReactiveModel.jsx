//reactiveModel
import { observable, configure, reaction } from "mobx";
import { rootModel } from "./appModel.js";

configure({ enforceActions: "never" }); 

export const reactiveModel = observable(rootModel);
import {connectToPersistence} from "/src/model/fireStoreModel.js";
connectToPersistence(reactiveModel, reaction);
window.appStore = reactiveModel;
