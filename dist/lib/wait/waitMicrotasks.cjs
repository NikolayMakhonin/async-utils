'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('setimmediate');
var isPromiseLike = require('../isPromiseLike.cjs');
var abortControllerFast_abortSignalToPromise = require('../abort-controller-fast/abortSignalToPromise.cjs');
require('@flemist/abort-controller-fast');

function waitMicrotasks(abortSignalOrPromise) {
    const waitPromise = new Promise(resolve => {
        setImmediate(resolve);
    });
    const promise = isPromiseLike.isPromiseLike(abortSignalOrPromise)
        ? abortSignalOrPromise
        : abortSignalOrPromise
            ? abortControllerFast_abortSignalToPromise.abortSignalToPromise(abortSignalOrPromise)
            : null;
    return promise ? Promise.race([waitPromise, promise]) : waitPromise;
}

exports.waitMicrotasks = waitMicrotasks;
