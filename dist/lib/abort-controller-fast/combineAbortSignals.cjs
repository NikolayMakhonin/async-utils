'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var abortControllerFast = require('@flemist/abort-controller-fast');

function combineAbortSignals(...abortSignals) {
    const abortController = new abortControllerFast.AbortControllerFast();
    function onAbort(reason) {
        abortController.abort(reason);
    }
    for (let i = 0; i < abortSignals.length; i++) {
        const abortSignal = abortSignals[i];
        if (!abortSignal) {
            continue;
        }
        if (abortSignal.aborted) {
            onAbort.call(abortSignal);
            break;
        }
        else {
            abortSignal.subscribe(onAbort);
        }
    }
    return abortController.signal;
}

exports.combineAbortSignals = combineAbortSignals;
