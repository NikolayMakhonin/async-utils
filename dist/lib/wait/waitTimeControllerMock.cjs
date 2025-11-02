'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var wait_waitMicrotasks = require('./waitMicrotasks.cjs');
var isPromiseLike = require('../isPromiseLike.cjs');
var abortControllerFast_abortSignalToPromise = require('../abort-controller-fast/abortSignalToPromise.cjs');
var constants = require('../constants.cjs');
require('setimmediate');
require('@flemist/abort-controller-fast');

function waitTimeControllerMock(timeControllerMock, abortSignalOrPromise, options) {
    return tslib.__awaiter(this, void 0, void 0, function* () {
        let promise;
        let abortSignal;
        if (isPromiseLike.isPromiseLike(abortSignalOrPromise)) {
            promise = abortSignalOrPromise;
            abortSignal = abortControllerFast_abortSignalToPromise.promiseToAbortSignal(promise);
        }
        else {
            promise = null;
            abortSignal = abortSignalOrPromise;
        }
        const endTime = (options === null || options === void 0 ? void 0 : options.timeout) == null ? null : timeControllerMock.now() + options.timeout;
        while (true) {
            if ((options === null || options === void 0 ? void 0 : options.awaitsPerIteration) != null) {
                for (let i = 0, len = options.awaitsPerIteration; i < len; i++) {
                    yield Promise.resolve().then(constants.EMPTY_FUNC);
                    if (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) {
                        break;
                    }
                }
            }
            else {
                yield wait_waitMicrotasks.waitMicrotasks(abortSignal).catch(constants.EMPTY_FUNC);
            }
            if (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) {
                break;
            }
            if (endTime != null && timeControllerMock.now() >= endTime) {
                break;
            }
            let nextTime = timeControllerMock.nextQueuedTime;
            if (nextTime == null && !promise) {
                break;
            }
            if (nextTime == null || endTime != null && nextTime > endTime) {
                nextTime = endTime;
            }
            if (nextTime != null) {
                timeControllerMock.setTime(nextTime);
            }
        }
        return promise !== null && promise !== void 0 ? promise : void 0;
    });
}

exports.waitTimeControllerMock = waitTimeControllerMock;
