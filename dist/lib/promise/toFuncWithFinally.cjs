'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isPromiseLike = require('../isPromiseLike.cjs');
var promise_promiseFinally = require('./promiseFinally.cjs');

/** @deprecated */
function toFuncWithFinally(func, onFinally) {
    if (!onFinally) {
        return func;
    }
    return function funcWithFinally() {
        try {
            const resultOrPromise = func.apply(this, arguments);
            if (!isPromiseLike.isPromiseLike(resultOrPromise)) {
                onFinally();
                return resultOrPromise;
            }
            return promise_promiseFinally.promiseFinally(resultOrPromise, onFinally);
        }
        catch (err) {
            onFinally();
            throw err;
        }
    };
}

exports.toFuncWithFinally = toFuncWithFinally;
