'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var abortControllerFast = require('@flemist/abort-controller-fast');

function abortSignalToPromise(abortSignal) {
    if (!abortSignal) {
        return;
    }
    return new Promise((_, reject) => {
        abortSignal.subscribe(error => {
            reject(error);
        });
    });
}
function promiseToAbortSignal(promise) {
    const abortController = new abortControllerFast.AbortControllerFast();
    promise.then(() => {
        abortController.abort();
    }, () => {
        abortController.abort();
    });
    return abortController.signal;
}

exports.abortSignalToPromise = abortSignalToPromise;
exports.promiseToAbortSignal = promiseToAbortSignal;
