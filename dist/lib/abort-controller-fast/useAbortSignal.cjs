'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var promise_toFuncWithFinally = require('../promise/toFuncWithFinally.cjs');
require('../isPromiseLike.cjs');
require('../promise/promiseFinally.cjs');

function useAbortSignal(abortSignal, onAbort, func) {
    if (!abortSignal) {
        return func(abortSignal);
    }
    const unsubscribe = abortSignal.subscribe(onAbort);
    return promise_toFuncWithFinally.toFuncWithFinally(func, unsubscribe);
}

exports.useAbortSignal = useAbortSignal;
