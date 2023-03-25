'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isPromiseLike = require('../isPromiseLike.cjs');
var promise_promiseFinally = require('./promiseFinally.cjs');

function toFuncWithFinally(func, onFinally) {
    return function funcWithFinally() {
        try {
            const resultOrPromise = func.apply(this, arguments);
            if (!isPromiseLike.isPromiseLike(resultOrPromise)) {
                return resultOrPromise;
            }
            return promise_promiseFinally.promiseFinally(resultOrPromise, onFinally);
        }
        finally {
            onFinally();
        }
    };
}

exports.toFuncWithFinally = toFuncWithFinally;
