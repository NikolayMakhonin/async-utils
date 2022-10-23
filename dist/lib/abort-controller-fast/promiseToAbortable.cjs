'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var customPromise_rejectAsResolve = require('../custom-promise/rejectAsResolve.cjs');

function promiseToAbortable(abortSignal, promise) {
    return new Promise(function executor(resolve) {
        if (abortSignal && abortSignal.aborted) {
            customPromise_rejectAsResolve.rejectAsResolve(resolve, abortSignal.reason);
            return;
        }
        let unsubscribe;
        function onResolve(value) {
            if (unsubscribe) {
                unsubscribe();
            }
            resolve(value);
        }
        let rejected;
        function onReject(value) {
            if (rejected) {
                return;
            }
            rejected = true;
            if (unsubscribe) {
                unsubscribe();
            }
            customPromise_rejectAsResolve.rejectAsResolve(resolve, value);
        }
        promise
            .then(onResolve)
            .catch(onReject);
        if (abortSignal) {
            unsubscribe = abortSignal.subscribe(onReject);
        }
    });
}

exports.promiseToAbortable = promiseToAbortable;
