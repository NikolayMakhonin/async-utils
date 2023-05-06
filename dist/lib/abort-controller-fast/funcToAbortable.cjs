'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var customPromise_CustomPromise = require('../custom-promise/CustomPromise.cjs');
var customPromise_rejectAsResolve = require('../custom-promise/rejectAsResolve.cjs');
require('../promise-fast/PromiseFast.cjs');
require('../isPromiseLike.cjs');
require('../promise-fast/promiseSchedulerEnqueue.cjs');
require('../promise/helpers.cjs');

function funcToAbortable(abortSignal, func) {
    return tslib.__awaiter(this, void 0, void 0, function* () {
        if (!abortSignal) {
            return func();
        }
        if (abortSignal.aborted) {
            return customPromise_rejectAsResolve.promiseRejected(abortSignal.reason);
        }
        const promise = new customPromise_CustomPromise.CustomPromise();
        function onReject(value) {
            promise.reject(value);
        }
        const unsubscribe = abortSignal.subscribe(onReject);
        try {
            return yield func(promise.promise);
        }
        finally {
            unsubscribe();
        }
    });
}

exports.funcToAbortable = funcToAbortable;
