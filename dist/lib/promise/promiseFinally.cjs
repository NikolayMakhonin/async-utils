'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function promiseFinally(promise, onFinally) {
    if (!onFinally) {
        return promise;
    }
    return promise.then((result) => {
        onFinally();
        return result;
    }, (err) => {
        onFinally();
        throw err;
    });
}

exports.promiseFinally = promiseFinally;
