'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var promise_toFuncWithFinally = require('../promise/toFuncWithFinally.cjs');
require('../isPromiseLike.cjs');
require('../promise/promiseFinally.cjs');

function toFuncWithAbortSignal(abortSignal, onAbort, func) {
    if (!abortSignal || !onAbort) {
        return func;
    }
    const unsubscribe = abortSignal.subscribe(onAbort);
    return promise_toFuncWithFinally.toFuncWithFinally(func, unsubscribe);
}

exports.toFuncWithAbortSignal = toFuncWithAbortSignal;
