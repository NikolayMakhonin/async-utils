'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var abortControllerFast = require('@flemist/abort-controller-fast');

function combineAbortSignals(...abortSignals) {
    let abortController;
    function onAbort(reason) {
        abortController.abort(reason);
    }
    let prevAbortSignal;
    for (let i = 0; i < abortSignals.length; i++) {
        const abortSignal = abortSignals[i];
        if (!abortSignal) {
            continue;
        }
        if (abortSignal.aborted) {
            onAbort.call(abortSignal);
            break;
        }
        else if (!prevAbortSignal) {
            prevAbortSignal = abortSignal;
        }
        else {
            if (!abortController) {
                abortController = new abortControllerFast.AbortControllerFast();
                prevAbortSignal.subscribe(onAbort);
            }
            abortSignal.subscribe(onAbort);
        }
    }
    return abortController
        ? abortController.signal
        : prevAbortSignal || new abortControllerFast.AbortControllerFast().signal;
}

exports.combineAbortSignals = combineAbortSignals;
