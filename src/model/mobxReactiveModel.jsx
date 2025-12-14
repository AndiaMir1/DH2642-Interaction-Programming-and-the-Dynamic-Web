//reactiveModel

import { makeAutoObservable, configure, reaction } from "mobx";
import { rootModel } from "./appModel.js";
import { connectToPersistence } from "/src/model/fireStoreModel.js";

configure({ enforceActions: "always" });

export const reactiveModel = makeAutoObservable(rootModel, {}, { autoBind : true });
connectToPersistence(reactiveModel, reaction);
window.appStore = reactiveModel;

