'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var abortControllerFast = require('@flemist/abort-controller-fast');
var promise_toFuncWithFinally = require('../promise/toFuncWithFinally.cjs');
require('../isPromiseLike.cjs');
require('../promise/promiseFinally.cjs');

function useAbortController(func) {
    const abortController = new abortControllerFast.AbortControllerFast();
    return promise_toFuncWithFinally.toFuncWithFinally(func, () => {
        abortController.abort();
    })(abortController.signal);
}

exports.useAbortController = useAbortController;
