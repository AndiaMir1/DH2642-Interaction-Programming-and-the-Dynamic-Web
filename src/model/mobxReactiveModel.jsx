//reactiveModel

import { observable } from "mobx";
import {model} from "./appModel.jsx";

export const reactiveModel = observable(model);