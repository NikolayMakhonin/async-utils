'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var timeController = require('@flemist/time-controller');
require('tslib');
var customPromise_rejectAsResolve = require('../custom-promise/rejectAsResolve.cjs');

function delay(milliseconds, abortSignal, timeController$1) {
    return new Promise(function executor(resolve) {
        if (abortSignal && abortSignal.aborted) {
            customPromise_rejectAsResolve.rejectAsResolve(resolve, abortSignal.reason);
            return;
        }
        let unsubscribe;
        function onResolve() {
            if (unsubscribe) {
                unsubscribe();
            }
            resolve();
        }
        const _timeController = timeController$1 || timeController.timeControllerDefault;
        const handle = _timeController.setTimeout(onResolve, milliseconds);
        if (abortSignal) {
            unsubscribe = abortSignal.subscribe(function abortListener(reason) {
                _timeController.clearTimeout(handle);
                customPromise_rejectAsResolve.rejectAsResolve(resolve, reason);
            });
        }
    });
}

exports.delay = delay;
