'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function isPromiseLike(obj) {
    if (obj != null
        && typeof obj === 'object'
        && typeof obj.then === 'function') {
        return true;
    }
    return false;
}

exports.isPromiseLike = isPromiseLike;
