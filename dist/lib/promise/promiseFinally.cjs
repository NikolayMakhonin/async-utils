'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isPromiseLike = require('../isPromiseLike.cjs');

function promiseFinally(promise, onFinally) {
    if (!onFinally) {
        return promise;
    }
    return promise.then((result) => {
        const voidOrPromise = onFinally();
        if (!isPromiseLike.isPromiseLike(voidOrPromise)) {
            return result;
        }
        return voidOrPromise.then(() => result);
    }, (err) => {
        const voidOrPromise = onFinally();
        if (!isPromiseLike.isPromiseLike(voidOrPromise)) {
            throw err;
        }
        return voidOrPromise.then(() => {
            throw err;
        });
    });
}

exports.promiseFinally = promiseFinally;
