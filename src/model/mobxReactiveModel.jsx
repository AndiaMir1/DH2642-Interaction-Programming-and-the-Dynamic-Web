//reactiveModel

import { observable, configure, reaction } from "mobx";
import {model} from "./appModel.js";
import {connectToPersistence} from "/src/model/firestoreModel.js";
configure({ enforceActions: "never" });

export const reactiveModel = observable(model);
export const appStore = reactiveModel;

window.myModel = reactiveModel;

connectToPersistence(reactiveModel, reaction);