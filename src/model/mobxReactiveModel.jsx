//reactiveModel

import { observable, configure } from "mobx";
import { rootModel } from "./appModel.js";

configure({ enforceActions: "never" }); // Changed to "never" since we're not using MobX actions

export const appStore = observable(rootModel);
export const reactiveModel = appStore;

window.appStore = appStore;