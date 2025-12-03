//reactiveModel

import { observable } from "mobx";
import {model} from "./appModel.js";

export const reactiveModel = observable(model);