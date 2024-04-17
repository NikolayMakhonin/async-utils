'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var abortControllerFast = require('@flemist/abort-controller-fast');
var promise_runWithFinally = require('../promise/runWithFinally.cjs');
require('../isPromiseLike.cjs');
require('../promise/promiseFinally.cjs');

function useAbortController(func) {
    const abortController = new abortControllerFast.AbortControllerFast();
    return promise_runWithFinally.runWithFinally(null, () => func(abortController.signal), () => {
        abortController.abort();
    });
}

exports.useAbortController = useAbortController;
