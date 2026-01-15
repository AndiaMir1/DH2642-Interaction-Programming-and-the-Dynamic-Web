import { runInAction } from "mobx";

export function resolvePromise(promise, stateObject) {
    runInAction (() => {
        stateObject.promise = promise;
        stateObject.data = null;
        stateObject.error = null;
    }); 
    promise
        .then(function(data) {
            if (stateObject.promise === promise) {
                runInAction(() => {
                    stateObject.data = data;
                    stateObject.error = null;
                });
            }
        })
        .catch(function(error) {
            if (stateObject.promise === promise) {
                runInAction(() => {
                stateObject.data = null;
                stateObject.error = error;
                });
            }
        });
}