//reactiveModel

import { observable, configure } from "mobx";
import rootModel from "./appModel.js";

configure({ enforceActions: "observed" });

export const appStore = observable(rootModel);
export const reactiveModel = appStore;

window.appStore = appStore;